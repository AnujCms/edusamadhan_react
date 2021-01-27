import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleEntranceExamOptions, handleQualificationOptions, handleUserRoleOptions, handleUserSubjectsOptions, handleWorkExperience, handleAwards } from '../../../components/utilsFunctions';

class EditTeacherUI extends React.Component {

    async componentDidMount() {
        let data = this.props.userDetails;
        this.props.formik.setFieldValue("firstName", data.firstName, false);
        this.props.formik.setFieldValue("lastName", data.lastName, false);
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellNumber", data.cellNumber, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("emailId", data.emailId, false);
        this.props.formik.setFieldValue("aadharNumber", data.aadharNumber, false);
        this.props.formik.setFieldValue("qualification", handleQualificationOptions(data.qualification), false);
        this.props.formik.setFieldValue("workExperience", handleWorkExperience(data.workExperience), false);
        this.props.formik.setFieldValue("educationalAwards", handleAwards(data.educationalAwards), false);
        if (data.educationalAwards == 1) {
            this.props.formik.setFieldValue("awardDetails", data.awardDetails, false);
        }
        this.props.formik.setFieldValue("subject", handleUserSubjectsOptions(data.subject, this.props.currentUser.userDetails.userType), false);
        this.props.formik.setFieldValue("userrole", handleUserRoleOptions(data.userrole), false);
        this.props.formik.setFieldValue("parmanentAddress", data.parmanentAddress, false);
        this.props.formik.setFieldValue("localAddress", data.localAddress, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("isUpdate", false, false);
        this.props.formik.setFieldValue("salary", data.salary, false);
        if(data.userrole == 6){
            this.props.formik.setFieldValue("entranceExamType", handleEntranceExamOptions(data.entranceExamType), false);
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withStyles()(AuthenticatedPage()(connect(EditTeacherUI)));