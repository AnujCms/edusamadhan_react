import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import CreateQuestionUI from './CreateQuestionUI';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import QuestionEditUI from './QuestionEditUI';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateStudent extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required."),
            subjectId: string().required("This field is required."),
            question: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            optiona: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            optionb: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            optionc: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            optiond: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            optione: string().required("This field is required.").max(100, "Enter less than 100 Characters."),
            answer: string().required("This field is required.").max(100, "Enter less than 100 Characters.")
        });
        this.state = { createUpdateQuestionText: "Create Question", startSpinner: false, questionObject: '', isUpdate: false, buttonText: "", isError: false, errorMessage: '', isSuccess: false, successMessage: '' }
    }

    async componentDidMount() {
        let questionId = this.props.questionId;
        if (questionId == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ createUpdateQuestionText: "Update Question" })
            let response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getQuestionForEdit/' + questionId, null);
            if (response.data.status === 1) {
                this.setState({ questionObject: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
            this.setState({ buttonText: 'Update' })
        }
    }

    //Handle the form submit 
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            question: values.question,
            optiona: values.optiona,
            optionb: values.optionb,
            optionc: values.optionc,
            optiond: values.optiond,
            optione: (values.optione.value).toString(),
            answer: parseInt(values.answer.value),
            classId: parseInt(values.classId.value),
            subjectId: parseInt(values.subjectId.value)
        }
        if (this.props.questionId) {
            dataToSend.questionId = this.props.questionId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/examinationservice/createEntranceQuestion", dataToSend)
        if (response.data.status == 1) {
            this.setState({ startSpinner: false, successMessage: response.data.statusDescription, isSuccess: true });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.questionId) {
            this.props.history.push('../view-question')
        } else {
            this.props.history.push('./view-question')
        }
    }
    handleCancel = () => {
        if (this.props.questionId) {
            this.props.history.push('../view-question')
        } else {
            this.props.history.push('./view-question')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.createUpdateQuestionText} pageTitle={"Create | Edit Question"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ class: "", subject: "", question: "", optiona: "", optionb: "", optionc: "", optiond: '', optione: '', answer: '' }}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                            {this.state.isUpdate && <QuestionEditUI questionObject={this.state.questionObject} />}
                            <CreateQuestionUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
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

export default withStyles(styles)(AuthenticatedPage()(CreateStudent));