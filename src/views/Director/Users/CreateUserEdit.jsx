import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleQualificationOptions, handleSubjectOptions, handleUserOptions, handleWorkExperience, handleAwards } from '../../../components/utilsFunctions';

class EditTeacherUI extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("firstName", data.firstName, false);
        this.props.formik.setFieldValue("lastName", data.lastName, false);
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellNumber", data.cellNumber, false);
        this.props.formik.setFieldValue("emailId", data.emailId, false);
        this.props.formik.setFieldValue("aadharNumber", data.aadharNumber, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("qualification", handleQualificationOptions(data.qualification), false);
        this.props.formik.setFieldValue("workExperience", handleWorkExperience(data.workExperience), false);
        this.props.formik.setFieldValue("educationalAwards", handleAwards(data.educationalAwards), false);
        if (data.educationalAwards == 1) {
            this.props.formik.setFieldValue("awardDetails", data.awardDetails, false);
        }
        this.props.formik.setFieldValue("subject", handleSubjectOptions(data.subject), false);
        this.props.formik.setFieldValue("userrole", handleUserOptions(data.userrole), false);
        this.props.formik.setFieldValue("parmanentAddress", data.parmanentAddress, false);
        this.props.formik.setFieldValue("localAddress", data.localAddress, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("isUpdate", false, false);
        this.props.formik.setFieldValue("salary", data.salary, false);
        this.props.formik.setFieldValue("userType", data.userType.toString(), false);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withStyles()(AuthenticatedPage()(connect(EditTeacherUI)));