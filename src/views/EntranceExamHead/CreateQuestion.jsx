import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import CreateQuestionUI from './CreateQuestionUI';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import QuestionEditUI from './QuestionEditUI';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important", paddingTop: "20px" },
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

});

class CreateStudent extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            class: string().required("This field is required."),
            subject: string().required("This field is required."),
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
        let questionid = this.props.questionid;
        if (questionid == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ createUpdateQuestionText: "Update Question" })
            let response = await this.props.authenticatedApiCall('get', '/api/entranceexamservice/getquestionforedit/' + questionid, null);
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
            class: parseInt(values.class.value),
            subject: parseInt(values.subject.value)
        }
        if (this.props.questionid) {
            dataToSend.questionId = this.props.questionid;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/entranceexamservice/entranceQuestion", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.questionid) {
            this.props.history.push('../view-question')
        } else {
            this.props.history.push('./view-question')
        }
    }
    handleCancel = () => {
        if (this.props.questionid) {
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
                <Helmet> <title>Create | Edit Question</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ class: "", subject: "", question: "", optiona: "", optionb: "", optionc: "", optiond: '', optione: '', answer: '' }}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>{this.state.createUpdateQuestionText}</Typography>
                            </Paper>
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                            {this.state.isUpdate && <QuestionEditUI questionObject={this.state.questionObject} />}
                            <CreateQuestionUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
                            <Paper className={classes.btnStyle}>
                                <Grid container>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                        <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                        <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("ExamHead")(CreateStudent));