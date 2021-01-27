import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleEventOptions, handleSportsOptions, handleSingingOptions, handleDanceOptions } from '../../../components/utilsFunctions';

class EventsEditUI extends React.Component {
    async componentDidMount() {
        let data = this.props.eventObject;
        this.props.formik.setFieldValue("eventType", handleEventOptions(data.eventType), false);
        if (data.eventType === 1) {
            this.props.formik.setFieldValue("soprtnames", handleSportsOptions(JSON.parse(data.eventData)[0].eventDetails), false);
        }
        if (data.eventType === 2) {
            this.props.formik.setFieldValue("singingnames", handleSingingOptions(JSON.parse(data.eventData)[0].eventDetails), false);
        }
        if (data.eventType === 3) {
            this.props.formik.setFieldValue("dancenames", handleDanceOptions(JSON.parse(data.eventData)[0].eventDetails), false);
        }
        this.props.formik.setFieldValue("eventName", data.eventName, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("eventStartdate", new Date(JSON.parse(data.eventData)[0].eventStartdate), false);
        this.props.formik.setFieldValue("eventEnddate", new Date(JSON.parse(data.eventData)[0].eventEnddate), false);
        this.props.formik.setFieldValue("eventDescription", JSON.parse(data.eventData)[0].eventDescription, false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage()(connect(EventsEditUI)));