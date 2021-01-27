import React from 'react';
import { withStyles } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleNotificationUser } from '../../../components/utilsFunctions';

class NotificationEditUI extends React.Component {

    async componentDidMount() {
        let data = this.props.notificationObject;
        this.props.formik.setFieldValue("notificationUser", handleNotificationUser(data.notificationUser, this.props.currentUser.userDetails.role), false);
        this.props.formik.setFieldValue("notificationSubject", data.notificationSubject, false);
        this.props.formik.setFieldValue("notificationCreatedDate", new Date(data.notificationCreatedDate), false);
        this.props.formik.setFieldValue("notificationDescription", data.notificationDescription, false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage()(connect(NotificationEditUI)));