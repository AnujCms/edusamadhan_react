import React from 'react';
import { withStyles, InputAdornment, Card, Grid, Paper } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikDateField from '../../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { classOptions6to12, classOptions0to5, sectionOptions, classMediumType, handleUserSubjectsOptions } from '../../../components/utilsFunctions';
import { formatDate } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    dateComponentAlign: { paddingTop: "10px" },
    inputSelect: { width: "320px", [theme.breakpoints.down('sm')]: { width: "330px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", marginBottom:"10px", marginTop:"10px" }
});

class HomeWorkSearchUI extends React.Component {

    handleHomeWorkChange = async (classId, sectionId, mediumType, homeWorkDate) => {
        if (classId && sectionId && mediumType && homeWorkDate) {
            let getHomeWorkData = {
                classId: classId,
                sectionId: sectionId,
                mediumType: mediumType,
                homeWorkDate: formatDate(homeWorkDate)
            }
            var response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getHomeWorktDetails/' + JSON.stringify(getHomeWorkData), null)
            if (response.data.status == 1) {
                response.data.statusDescription.forEach((item, index) => {
                    item.Action = { homeWorkId: item.homeWorkId, userId: item.userId }
                    item.subjectId = handleUserSubjectsOptions(item.subjectId, this.props.currentUser.userDetails.userType).label
                    item.count = index + 1
                });
                this.props.handleClassHmeWorkRecord(response.data.statusDescription)
            } else if (response.data.status == 0) {
                this.props.handleClassHmeWorkRecord([])
                this.setState({ errorMessage: response.data.statusDescription, isError: true });
            }
        }
    };

    handleClassIdChange = (selectedClassId) => {
        let values = this.props.formik.values;
        if (values.sectionId.value && values.mediumType.value && values.homeWorkDate) {
            this.handleHomeWorkChange(selectedClassId.value, values.sectionId.value, values.mediumType.value, values.homeWorkDate)
        }
    }
    handleSectionIdChange = (selectedSectionId) => {
        let values = this.props.formik.values;
        if (values.classId.value && values.mediumType.value && values.homeWorkDate) {
            this.handleHomeWorkChange(values.classId.value, selectedSectionId.value, values.mediumType.value, values.homeWorkDate)
        }
    }
    handleMediumTypeChange = (selectedMediumType) => {
        let values = this.props.formik.values;
        if (values.classId.value && values.sectionId.value && values.homeWorkDate) {
            this.handleHomeWorkChange(values.classId.value, values.sectionId.value, selectedMediumType.value, values.homeWorkDate)
        }
    }
    handleHomeWorkDateChange = (seletcedHomeWorkDate) => {
        let values = this.props.formik.values;
        if (values.classId.value && values.sectionId.value && values.mediumType.value) {
            this.handleHomeWorkChange(values.classId.value, values.sectionId.value, values.mediumType.value, seletcedHomeWorkDate)
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper>
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="classId"
                                    options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12}
                                    placeholder={"Select Class"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    onChange={this.handleClassIdChange}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="sectionId"
                                    options={sectionOptions}
                                    placeholder={"Select Section"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    onChange={this.handleSectionIdChange}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="mediumType"
                                    options={classMediumType}
                                    placeholder={"Select Medium Type"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    onChange={this.handleMediumTypeChange}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="homeWorkDate"
                                    onChange={this.handleHomeWorkDateChange}
                                    locale={this.dateLanguage}
                                    className={classes.dateComponentAlign}
                                    component={FormikDateField}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={classes.inputSelect}
                                    inputProps={{ style: "width=100%" }}
                                    maxDate={new Date()}
                                    textFieldProps={{
                                        variant: "filled", label: "Date of HomeWork", InputProps: {
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CalendarTodayIcon />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(HomeWorkSearchUI)));