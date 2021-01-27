import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import CreateEventsUI from './CreateEventsUI';
import EventsEditUI from './EventsEditUI';
import { formatDate } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            eventName: string().required("Event Name is required.").max(100, "Enter less than 100 Characters."),
            eventStartdate: string().required("Event Start Date is required."),
            eventEnddate: string().required("Event End Date is required"),
            eventDescription: string().required("Description is required.").max(500, ("Description can not be greater tna 500 Characters.")),
            eventType: string().required("Event Type is required.")
        });
        this.fieldVariables = { eventName: "", eventStartdate: "", eventEnddate: "", eventDescription: "", eventType: "", soprtnames: "", singingnames: "", dancenames: "" }
        this.state = {
            updateText: 'Create ', startSpinner: false, eventObject: '', isUpdate: '', isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: "Register"
        }
    }

    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.eventId) {
            this.props.history.push(`../eventslist`);
        } else {
            this.props.history.push(`./eventslist`);
        }
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dateToSend = {
            eventName: values.eventName,
            eventStartdate: formatDate(values.eventStartdate),
            eventEnddate: formatDate(values.eventEnddate),
            eventDescription: values.eventDescription
        }
        if (values.eventType.value === 1) {
            let sportsArray = []
            values.soprtnames.map((item) => {
                sportsArray.push(item.value);
            })
            dateToSend.eventDetails = sportsArray
        } else if (values.eventType.value === 2) {
            let singingArray = []
            values.singingnames.map((item) => {
                singingArray.push(item.value);
            })
            dateToSend.eventDetails = singingArray
        } else if (values.eventType.value === 3) {
            let dancingArray = []
            values.dancenames.map((item) => {
                dancingArray.push(item.value);
            })
            dateToSend.eventDetails = dancingArray
        } else {
            dateToSend.eventDetails = []
        }
        dateToSend.eventType = values.eventType.value

        if (this.props.eventId) {
            dateToSend.eventId = parseInt(this.props.eventId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/eventsservice/eventRegistration", dateToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    componentDidMount = async () => {
        let eventId = this.props.eventId;
        if (eventId == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ updateText: 'Update ' })
            let response = await this.props.authenticatedApiCall('get', '/api/eventsservice/geteventbyid/' + eventId, null);
            if (response.data.status === 1) {
                this.setState({ eventObject: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
            this.setState({ buttonText: 'Update' })
        }
    }
    handleCancel = () => {
        if (this.props.eventId) {
            this.props.history.push('../eventslist')
        } else {
            this.props.history.push('./eventslist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={`${this.state.updateText} Event/Program`} pageTitle={"Create | Edit Event"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.isUpdate && <EventsEditUI eventObject={this.state.eventObject} />}
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                            <CreateEventsUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(CreateEvent));