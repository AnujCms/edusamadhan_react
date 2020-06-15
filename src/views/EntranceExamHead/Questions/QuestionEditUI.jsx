import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';

class QuestionEditUI extends React.Component {
    constructor(props) {
        super(props)
        this.classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
        this.subjectOptions = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
        this.answerOptions = [{ value: 1, label: "Option A" }, { value: 2, label: "Option B" }, { value: 3, label: "Option C" }, { value: 4, label: "Option D" }, { value: 5, label: "Non of These" }];
        this.optioneOptions = [{ value: 5, label: "None of These" }]
    }
    setClassObject = (value) => {
        let classValue = '';
        this.classOptions.forEach((item) => {
            if (item.value == value) {
                classValue = item;
            }
        })
        return classValue;
    }
    setSubjectOptions = (value) => {
        let subjectValue = '';
        this.subjectOptions.forEach((item) => {
            if (item.value == value) {
                subjectValue = item;
            }
        })
        return subjectValue;
    }
    setOptioneOptions = (value) => {
        let optioneValue = '';
        this.optioneOptions.forEach((item) => {
            if (item.value == value) {
                optioneValue = item;
            }
        })
        return optioneValue;
    }
    setAnswerOptions = (value) => {
        let answerValue = '';
        this.answerOptions.forEach((item) => {
            if (item.value == value) {
                answerValue = item;
            }
        })
        return answerValue;
    }
    async componentDidMount() {
        let data = this.props.questionObject;
        this.props.formik.setFieldValue("class", this.setClassObject(data.class), false);
        this.props.formik.setFieldValue("subject", this.setSubjectOptions(data.subject), false);
        this.props.formik.setFieldValue("question", data.question, false);
        this.props.formik.setFieldValue("optiona", data.optiona, false);
        this.props.formik.setFieldValue("optionb", data.optionb, false);
        this.props.formik.setFieldValue("optionc", data.optionc, false);
        this.props.formik.setFieldValue("optiond", data.optiond, false);
        this.props.formik.setFieldValue("optione", this.setOptioneOptions(data.optione), false);
        this.props.formik.setFieldValue("answer", this.setAnswerOptions(data.answer), false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage("ExamHead")(connect(QuestionEditUI)));