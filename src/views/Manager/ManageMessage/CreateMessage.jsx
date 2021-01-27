import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateMessageUI from './CreateMessageUI';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateMessage extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            messageUser: string().required("This feild is required."),
            userMessage: string().required("Message is required.").min(5, "Message can not be less than 5 characters.").max(2000, "Message can not be greater than 2000 charecters."),
            file: string().required("Image is required.")
        });
        this.fieldVariables = { messageUser: '', userMessage: '', file: "", msgId: '' }
        this.state = {
            startSpinner: false, isUpdate: false, updateRegistrationData: '', aadharNumber: '', messageCreationText: 'Compose Message'
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let image;
        if (values.file.base64Rep) {
            image = values.file.base64Rep
        }
        let dataToSend = {
            messageUser: values.messageUser.value,
            userMessage: values.userMessage,
            images: image
        }
        if (values.msgId) {
            dataToSend.msgId = this.props.msgId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/managerservice/createUserMessage", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.studentId) {
            this.props.history.push(`../managemessage`)
        } else {
            this.props.history.push(`./managemessage`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.studentId) {
            this.props.history.push('../managemessage')
        } else {
            this.props.history.push('./managemessage')
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.messageCreationText} pageTitle={"Create | Edit Message"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateMessageUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateMessage)));