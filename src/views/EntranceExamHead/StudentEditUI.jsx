import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

class StudentEditUI extends React.Component {
    constructor(props) {
        super(props)
        this.classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
        this.sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]
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
    setSectionObject = (value) => {
        let sectionValue = '';
        this.sectionOptions.forEach((item) => {
            if (item.value == value) {
                sectionValue = item;
            }
        })
        return sectionValue;
    }

    async componentDidMount() {
        let data = this.props.studentObject;
        this.props.formik.setFieldValue("class", this.setClassObject(data.class), false);
        this.props.formik.setFieldValue("section", this.setSectionObject(data.section), false);
        this.props.formik.setFieldValue("firstname", data.firstname, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("dob", new Date(data.dob), false);
        this.props.formik.setFieldValue("cellnumber", data.cellnumber, false);
        this.props.formik.setFieldValue("adharnumber", data.adharnumber, false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage("ExamHead")(connect(StudentEditUI)));