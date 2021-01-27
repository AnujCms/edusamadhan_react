import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import CreateNotificationUI from './CreateNotificationUI';
import EditNotificationUI from './EditNotificationUI';
import { formatDate } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateNotification extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            notificationUser: string().required("Notification user is required."),
            notificationSubject: string().required("Notification Name is required.").max(100, "Enter less than 100 Characters."),
            notificationCreatedDate: string().required("Notification created date is required."),
            notificationDescription: string().required("Description is required.").max(1000, ("Description can not be greater tna 1000 CharDcters.")),
        });
        this.fieldVariables = { notificationSubject: "", notificationCreatedDate: "", notificationDescription: "", notificationUser: "" }
        this.state = {
            adharNumber: '', updateText: 'Create ', startSpinner: false, notificationObject: '', isUpdate: '', isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: "Register"
        }
    }

    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.isEditNotification) {
            this.props.history.push('./notificationslist')
        } else if (this.props.notificationId) {
            this.props.history.push('../notificationslist')
        } else {
            this.props.history.push('./notificationslist')
        }
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dateToSend = {
            notificationUser: values.notificationUser.value,
            notificationSubject: values.notificationSubject,
            notificationCreatedDate: formatDate(values.notificationCreatedDate),
            notificationDescription: values.notificationDescription
        }
        if (this.props.notificationId) {
            dateToSend.notificationId = this.props.notificationId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/notificationservice/notificationRegistration", dateToSend)

        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    componentDidMount = async () => {
        let notificationId = this.props.notificationId;
        if (notificationId == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ updateText: 'Update ' })
            let response = await this.props.authenticatedApiCall('get', '/api/notificationservice/getnotificationtbyid/' + notificationId, null);
            if (response.data.status === 1) {
                this.setState({ notificationObject: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
            this.setState({ buttonText: 'Update' })
        }
    }
    handleCancel = () => {
        if (this.props.isEditNotification) {
            this.props.history.push('./notificationslist')
        } else if (this.props.notificationId) {
            this.props.history.push('../notificationslist')
        } else {
            this.props.history.push('./notificationslist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={`${this.state.updateText} Notification`} pageTitle={"Create | Edit Notification"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.isUpdate && <EditNotificationUI notificationObject={this.state.notificationObject} />}
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                            <CreateNotificationUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} />
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

export default withStyles(styles)(AuthenticatedPage()(CreateNotification));