import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleClassObject, handleSectionObject, handleSelectedMediumType } from '../../../components/utilsFunctions';

class CreateStudentEdit extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("firstName", data.firstName, false);
        this.props.formik.setFieldValue("lastName", data.lastName, false);
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellNumber", data.cellNumber, false);
        this.props.formik.setFieldValue("aadharNumber", data.aadharNumber, false);
        this.props.formik.setFieldValue("classId", handleClassObject(data.classId, this.props.currentUser.userDetails.userType), false);
        this.props.formik.setFieldValue("sectionId", handleSectionObject(data.sectionId), false);
        this.props.formik.setFieldValue("mediumType", handleSelectedMediumType(data.mediumType), false);
    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(CreateStudentEdit)));