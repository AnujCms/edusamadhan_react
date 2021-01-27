import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleClassObject, handleSubjectOptions, handleOptioneOptions, handleAnswerOptions } from '../../../components/utilsFunctions';

class QuestionEditUI extends React.Component {
    async componentDidMount() {
        let data = this.props.questionObject;
        this.props.formik.setFieldValue("classId", handleClassObject(data.classId, this.props.currentUser.userDetails.userType), false);
        this.props.formik.setFieldValue("subjectId", handleSubjectOptions(data.subjectId), false);
        this.props.formik.setFieldValue("question", data.question, false);
        this.props.formik.setFieldValue("optiona", data.optiona, false);
        this.props.formik.setFieldValue("optionb", data.optionb, false);
        this.props.formik.setFieldValue("optionc", data.optionc, false);
        this.props.formik.setFieldValue("optiond", data.optiond, false);
        this.props.formik.setFieldValue("optione", handleOptioneOptions(data.optione), false);
        this.props.formik.setFieldValue("answer", handleAnswerOptions(data.answer), false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage()(connect(QuestionEditUI)));