import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import {handleAchievementUser, handleClassObject, handleSectionObject, handleSelectedMediumType } from '../../../components/utilsFunctions';

class CreateAchievementEdit extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("classId", handleAchievementUser(data.classId), false);
        this.props.formik.setFieldValue("studentName", JSON.parse(data.achievementsData).studentName, false);
        this.props.formik.setFieldValue("percentage", JSON.parse(data.achievementsData).percentage, false);
        this.props.formik.setFieldValue("userMessage", JSON.parse(data.achievementsData).message, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("achievementId", data.achievementId, false);

    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(CreateAchievementEdit)));