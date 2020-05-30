import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

const userOptions = [{ value: 6, label: "Student" }, { value: 3, label: "Faculty" },{ value: 4, label: "Exam Head" }, { value: 5, label: "Accountant" }, { value: 10, label: "All Users" }]
const userOptionsStudent = [{ value: 6, label: "Student" }]

class NotificationEditUI extends React.Component {

    setUserObject = (value) => {
        let userRole = '';
        let options = this.props.currentUser.userDetails === 'Teacher'?userOptionsStudent:userOptions
        options.forEach((item) => {
            if (item.value == value) {
                userRole = item;
            }
        })
        return userRole;
    }
    async componentDidMount() {
        let data = this.props.notificationObject;
        this.props.formik.setFieldValue("notificationuser", this.setUserObject(data.notificationuser), false);
        this.props.formik.setFieldValue("notificationsubject", data.notificationsubject, false);
        this.props.formik.setFieldValue("notificationcreateddate", new Date(data.notificationcreateddate), false);
        this.props.formik.setFieldValue("notificationdescription", data.notificationdescription, false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage("Principal")(connect(NotificationEditUI)));