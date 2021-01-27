import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateNoticeUI from './CreateNoticeUI';
import CreateNoticeEdit from './CreateNoticeEdit';
import { string, object } from 'yup';
import { formatDate } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateNotice extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            noticeDate: string().required("This feild is required."),
            studentNotice: string().min(5, 'Notice can not be less than 5 Charecters.').max(1000, 'Notice can not be greater than 1000 Charecters.').trim().required("This field is required.")
        });
        this.fieldVariables = { noticeDate: '', studentNotice: '' }
        this.state = {
            studentId: '', startSpinner: false, isUpdate: false, createNoticeText: 'Create Notice', noticeDataForUpdate: ''
        }
    }

    async componentDidMount() {
        if (this.props.history.location.state) {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getNoticeForUpdate/' + this.props.history.location.state.studentId + '/' + this.props.history.location.state.noticeId, null);
            if (response.data.status === 1) {
                this.setState({ studentId: this.props.history.location.state.studentId, noticeId: this.props.history.location.state.noticeId, isUpdate: true, noticeDataForUpdate: response.data.statusDescription[0] })
            } else if (response.data.status === 0) {
                this.setState({ studentId: this.props.history.location.state.studentId, noticeId: this.props.history.location.state.noticeId, isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update ', createNoticeText: "Update Notice" })
        } else {
            this.setState({ buttonText: 'Create', studentId: this.props.match.params.userId })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            noticeDate: formatDate(values.noticeDate),
            studentNotice: values.studentNotice,
            studentId: parseInt(this.state.studentId)
        }
        if (this.state.noticeId) {
            dataToSend.noticeId = parseInt(this.state.noticeId)
        }
        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/createNotice", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.state.isUpdate) {
            this.props.history.push(`../../noticehome/` + this.state.studentId)
        } else if (this.state.studentId) {
            this.props.history.push(`../noticehome/` + this.state.studentId)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.history.location.state) {
            this.props.history.push('../../noticehome/' + this.props.history.location.state.studentId)
        } else if (this.props.match.params.userId) {
            this.props.history.push('../noticehome/' + this.props.match.params.userId)
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.createNoticeText} pageTitle={"Create | Edit Notice"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateNoticeUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
                            {this.state.isUpdate && <CreateNoticeEdit noticeData={this.state.noticeDataForUpdate} />}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateNotice)));