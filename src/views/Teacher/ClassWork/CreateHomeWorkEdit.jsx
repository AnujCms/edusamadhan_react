import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleClassObject, handleSectionObject, handleSelectedMediumType, handleUserSubjectsOptions } from '../../../components/utilsFunctions';

class CreateHomeWorkEdit extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue('classId', handleClassObject(data.classId, this.props.currentUser.userDetails.userType), false );
        this.props.formik.setFieldValue('sectionId', handleSectionObject(data.sectionId), false );
        this.props.formik.setFieldValue('mediumType', handleSelectedMediumType(data.mediumType), false );
        this.props.formik.setFieldValue('subjectId', handleUserSubjectsOptions(data.subjectId, this.props.currentUser.userDetails.userType), false );
        this.props.formik.setFieldValue('homeWorkDetails', data.homeWorkDetails, false );
    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(CreateHomeWorkEdit)));