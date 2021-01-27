import React from 'react';
import { withStyles, Card, Grid, Button, Typography } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CreateRows from './CreateRows';
import ErrorDialog from '../../../components/ErrorDialog';
import { handleMixedoption, mixedOptions, classOptions6to12, classOptions0to5, sectionOptions } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "350px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    TypographyText: { textAlign: "center", marginTop: "20px" },
    marginTopStyle: { marginTop: "20px" }
});

class SettingArrangementUI extends React.Component {
    state = { isDisabled: false, examinations: [], studentsList: [], mixedOtions: [], isRender: false, mixedStudentsNumber: '', overFlowStudentsNumber: '' }
    handleClearState = () => {
        this.props.formik.setFieldValue("totalRows", "", false);
        this.props.formik.setFieldValue("totalColumns", "", false);
        this.props.formik.setFieldValue("totalSeats", "", false);
        this.props.formik.setFieldValue("classSeatId", "", false);
    }
    handleSetFormikValues = (data) => {
        this.props.formik.setFieldValue("totalRows", data.totalRows, false);
        this.props.formik.setFieldValue("totalColumns", data.totalColumns, false);
        this.props.formik.setFieldValue("totalSeats", data.totalSeats, false);
        this.props.formik.setFieldValue("classSeatId", data.classSeatId, false);
    }

    handleDefaultMixedType = (value) => {
        let mixedArray = [];
        mixedOptions.map((item) => {
            if (item.value == value) {
                mixedArray = item
            }
        })
        this.props.formik.setFieldValue("mixedType", mixedArray, false);
    }

    handleClassSelect = async (classObj) => {
        this.setState({ isRender: false })
        if (this.props.formik.values.section.value && classObj.value) {
            let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getclassseatsdetails/" + classObj.value + "/" + this.props.formik.values.section.value, null);
            let result = await this.props.authenticatedApiCall('get', "/api/examinationservice/getseatingarrangement/" + classObj.value + "/" + this.props.formik.values.section.value, null)
            if (response.data.status == 1) {
                this.handleSetFormikValues(response.data.statusDescription[0])
            } else {
                this.handleClearState();
            }
            if (result.data.status == 1) {
                let data = result.data.statusDescription[0];
                this.handleDefaultMixedType(data.mixedOptions)
                this.setState({ isDisabled: true, isRender: true, studentsList: JSON.parse(data.mixedStudentList), mixedStudentsNumber: JSON.parse(data.mixedStudentList).length, totalColumns: data.totalColumns, totalRows: data.totalRows, totalSeats: data.totalSeats })
            } else {
                this.props.formik.setFieldValue("mixedType", '', false);
                this.setState({ isDisabled: false, isRender: false })
            }
        }
    }
    handleSectionSelect = async (section) => {
        this.setState({ isRender: false })
        if (this.props.formik.values.class.value && section.value) {
            let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getclassseatsdetails/" + this.props.formik.values.class.value + "/" + section.value, null);
            let result = await this.props.authenticatedApiCall('get', "/api/examinationservice/getseatingarrangement/" + this.props.formik.values.class.value + "/" + section.value, null)
            if (response.data.status == 1) {
                this.handleSetFormikValues(response.data.statusDescription[0])
            } else {
                this.handleClearState();
            }
            if (result.data.status == 1) {
                let data = result.data.statusDescription[0];
                this.handleDefaultMixedType(data.mixedOptions)
                this.setState({ isDisabled: true, isRender: true, studentsList: JSON.parse(data.mixedStudentList), mixedStudentsNumber: JSON.parse(data.mixedStudentList).length, totalColumns: data.totalColumns, totalRows: data.totalRows, totalSeats: data.totalSeats })
            } else {
                this.props.formik.setFieldValue("mixedType", '', false);
                this.setState({ isDisabled: false, isRender: false })
            }
        }
    }
    handleTotalSeats = (event) => {
        if (this.props.formik.values.totalRows) {
            let calculateTotalSeats = this.props.formik.values.totalRows * event.target.value
            this.props.formik.setFieldValue("totalSeats", calculateTotalSeats, false);
        }
    }

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getmixedtype', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {

            })
            this.setState({ mixedOtions: handleMixedoption(response.data.statusDescription) })
        } else {
            this.setState({ errorMessage: "error", isError: true })
        }
    }
    handleSelectedClass = async (selectedValue) => {
        if (selectedValue.length > 0) {
            let sumOfFee;
            if (this.props.formik.values.payfeetype == "1") {
                sumOfFee = this.handleBothFee(selectedValue);
            } else if (this.props.formik.values.payfeetype == "2") {
                sumOfFee = this.handleOnlySchoolFee(selectedValue);
            } else if (this.props.formik.values.payfeetype == "3") {
                sumOfFee = this.handleOnlyTransportFee(selectedValue);
            }
            this.props.formik.setFieldValue('selectedmonthfee', sumOfFee, false)
        } else {
            this.props.formik.setFieldValue('selectedmonthfee', '', false)
        }
    }
    handleSecectMixedType = async (values) => {
        let response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getmixedstudentslist/' + values.value, null);
        if (response.data.status == 1) {
            let studentLength = JSON.parse(response.data.statusDescription[0].mixedStudentList).length + 5;
            if (studentLength >= this.props.formik.values.totalSeats) {
                let totalStudents = JSON.parse(response.data.statusDescription[0].mixedStudentList)
                let usedStudents = totalStudents.splice(0, this.props.formik.values.totalSeats);
                this.props.formik.setFieldValue('usedStudentsList', usedStudents, false)
                this.props.formik.setFieldValue('unUsedStudentsList', totalStudents, false)
                this.setState({ isRender: true, studentsList: JSON.parse(response.data.statusDescription[0].mixedStudentList), mixedStudentsNumber: JSON.parse(response.data.statusDescription[0].mixedStudentList).length, overFlowStudentsNumber: JSON.parse(response.data.statusDescription[0].overFlowStudentList).length })
            } else {
                this.setState({ isRender: false, errorMessage: "Not matching", isError: true })
            }
        } else {
            this.setState({ isRender: false, errorMessage: "error", isError: true })
        }
    }
    handleDialogClose = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.handleDialogClose}>Ok</Button>]
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="class"
                            options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12}
                            placeholder={"Select Class"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            onChange={this.handleClassSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="section"
                            options={sectionOptions}
                            placeholder={"Select Section"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            onChange={this.handleSectionSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="mixedType"
                            options={this.state.mixedOtions}
                            placeholder={"Select Mixed Type"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            onChange={this.handleSecectMixedType}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            isDisabled={this.state.isDisabled}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>

                    {this.state.isRender && <>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.TypographyText}>
                            <Typography variant="h6">Mixed Students: {this.state.mixedStudentsNumber}</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.marginTopStyle}>
                            <Typography variant="h6">Over Flow Students: {this.state.overFlowStudentsNumber}</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <CreateRows data={this.state.studentsList} totalRows={this.props.formik.values.totalRows} totalColumns={this.props.formik.values.totalColumns} />
                        </Grid></>}
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleDialogClose} /> : "")}
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(SettingArrangementUI)));