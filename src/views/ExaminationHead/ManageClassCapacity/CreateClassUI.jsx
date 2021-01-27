import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { classOptions6to12, classOptions0to5, sectionOptions } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateStudentUI extends React.Component {
    state = {
        isDisabled:false
    }
    handleClearState = () =>{
        this.props.formik.setFieldValue("totalRows", "", false);
        this.props.formik.setFieldValue("totalColumns", "", false);
        this.props.formik.setFieldValue("totalSeats", "", false);
        this.props.formik.setFieldValue("classSeatId", "", false);
    }
    habdleSetFormikValues = (data)=>{
        if(data.isAssigned == 1){
            this.setState({isDisabled:true})
        }else{
            this.setState({isDisabled:false})
        }
        this.props.formik.setFieldValue("totalRows", data.totalRows, false);
        this.props.formik.setFieldValue("totalColumns", data.totalColumns, false);
        this.props.formik.setFieldValue("totalSeats", data.totalSeats, false);
        this.props.formik.setFieldValue("classSeatId", data.classSeatId, false);
    }
    handleClassSelect = async(classId) =>{
        if(this.props.formik.values.sectionId.value && classId.value){
            let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getclassseatsdetails/"+ classId.value+"/"+ this.props.formik.values.sectionId.value, null);
            if(response.data.status == 1){
                this.habdleSetFormikValues(response.data.statusDescription[0])
            }else{
                this.handleClearState();
            }
        }
    }
    handleSectionSelect = async(sectionId) =>{
        if(this.props.formik.values.classId.value && sectionId.value){
            let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getclassseatsdetails/"+ this.props.formik.values.classId.value+"/"+sectionId.value, null);
            if(response.data.status == 1){
                this.habdleSetFormikValues(response.data.statusDescription[0])
            }else{
                this.handleClearState();
            }
        }
    }
    handleTotalSeatsOnChangeColumn = (event) =>{
        if(this.props.formik.values.totalRows){
            let calculateTotalSeats = this.props.formik.values.totalRows * event.target.value
            this.props.formik.setFieldValue("totalSeats", calculateTotalSeats, false);
        }
    }

    handleTotalSeatsOnChangeRows = (event) =>{
        if(this.props.formik.values.totalColumns){
            let calculateTotalSeats = this.props.formik.values.totalColumns * event.target.value
            this.props.formik.setFieldValue("totalSeats", calculateTotalSeats, false);
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="classId"
                            options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5:classOptions6to12}
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
                    <Grid item lg={5} md={5} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="sectionId"
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
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="totalRows"
                            className={classes.inputItem}
                            variant="filled"
                            label="Total Rows"
                            onChange={this.handleTotalSeatsOnChangeRows}
                            component={FormikTextField}
                            disabled={this.state.isDisabled}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="totalColumns"
                            className={classes.inputItem}
                            variant="filled"
                            label="Total Column"
                            onChange={this.handleTotalSeatsOnChangeColumn}
                            component={FormikTextField}
                            disabled={this.state.isDisabled}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="totalSeats"
                            className={classes.inputItem}
                            variant="filled"
                            label="Total Seats"
                            component={FormikTextField}
                            disabled
                        />
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateStudentUI)));