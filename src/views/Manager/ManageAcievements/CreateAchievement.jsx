import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateAchievementUI from './CreateAchievementUI';
import CreateAchievementEdit from './CreateAchievementEdit';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateAchievement extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This feild is required."),
            studentName: string().required("Student name is required.").min(3, "Student name can not be less than 3 characters.").max(100, "Student Name can not be greater than 100 charecters."),
            percentage: string().required("Percentage is required."),
            userMessage: string().required("Message is required.").min(5, "Message can not be less than 5 characters.").max(500, "Message can not be greater than 500 charecters."),
            file: string().required("Image is required.")
        });
        this.fieldVariables = {classId:'', studentName:'', percentage:'', userMessage:'', file: "", achievementId:''}
        this.state = {
            startSpinner: false, isUpdate: false, updateAchievementData: '', aadharNumber: '', achievementCreationText: 'Create Achievement'
        }
    }
  
    async componentDidMount() {
        let achievementId = this.props.achievementId;
        if (achievementId == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getAchievementById/' + achievementId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateAchievementData: response.data.statusDescription[0]})
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', achievementCreationText: "Update Student Registration" })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let image ;
        if (values.file.base64Rep) {
            image = values.file.base64Rep
        }else{
            image = values.file
        }
        let dataToSend = {
            classId: values.classId.value,
            studentName: values.studentName,
            percentage: values.percentage,
            userMessage: values.userMessage,
            images: image
        }

        if (values.achievementId) {
            dataToSend.achievementId = parseInt(this.props.achievementId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/managerservice/createAcievement", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.achievementId) {
            this.props.history.push(`../manageachievement`)
        } else {
            this.props.history.push(`./manageachievement`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.achievementId) {
            this.props.history.push('../manageachievement')
        } else {
            this.props.history.push('./manageachievement')
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.achievementCreationText} pageTitle={"Create | Edit Achievement"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateAchievementUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate ? <CreateAchievementEdit data={this.state.updateAchievementData} /> : ""}
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

export default withStyles(styles)(AuthenticatedPage()(connect(CreateAchievement)));