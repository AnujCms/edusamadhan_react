import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateHomeWorkUI from './CreateHomeWorkUI';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import { formatDate } from '../../../components/utilsFunctions';
import CreateHomeWorkEdit from './CreateHomeWorkEdit';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(11), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateHomeWork extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This feild is required."),
            sectionId: string().required("This feild is required."),
            mediumType: string().required("Medium is required."),
            subjectId: string().required("subject is required."),
            homeWorkDetails: string().required("Home Work is required.").min(5, "Home Work can not be less than 5 characters.").max(500, "Home Work can not be greater than 500 charecters.")
        });
        this.fieldVariables = {classId:'', sectionId:'', mediumType:'', subjectId: '', homeWorkDetails: ""}
        this.state = {
            startSpinner: false, isUpdate: false, updateHomeWorkData: '', aadharNumber: '', studentRegistrationText: 'Create Home Work'
        }
    }

    async componentDidMount() {
        let homeWorkId = this.props.homeWorkId;
        if (homeWorkId) {
            this.setState({studentRegistrationText: "Update Home Work" })
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getHomeWorktDetailsForUpdate/' + homeWorkId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateHomeWorkData: response.data.statusDescription[0] })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            classId: values.classId.value,
            sectionId: values.sectionId.value,
            mediumType: values.mediumType.value,
            subjectId: values.subjectId.value,
            homeWorkDate: formatDate(new Date()),
            homeWorkDetails: values.homeWorkDetails
        }
    
        if (this.props.homeWorkId) {
            dataToSend.homeWorkId = parseInt(this.props.homeWorkId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/createClassHomeWork", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.homeWorkId) {
            this.props.history.push(`../homework`)
        } else {
            this.props.history.push(`./homework`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.homeWorkId) {
            this.props.history.push('../homework')
        } else {
            this.props.history.push('./homework')
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.studentRegistrationText} pageTitle={"Create | Edit Home Work"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateHomeWorkUI startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate && <CreateHomeWorkEdit data={this.state.updateHomeWorkData} />}
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

export default withStyles(styles)(AuthenticatedPage()(connect(CreateHomeWork)));