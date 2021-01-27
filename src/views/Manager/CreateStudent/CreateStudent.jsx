import React from 'react';
import { withStyles, Link, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateStudentUI from './CreateStudentUI';
import CreateStudentEdit from './CreateStudentEdit';
import { string, object } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class StudentCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This feild is required."),
            sectionId: string().required("This feild is required."),
            firstName: string().min(2, 'First Name can not be less than 2 Charecters.').max(100, 'First Name can not be greater than 100 Charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("First Name is required."),
            lastName: string().min(2, 'Last Name can not be less than 2 Charecters.').max(100, 'Lat Name can not be greater than 100 Charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("Last Name is required."),
            dob: string().required("Date of Birth is required."),
            aadharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
            cellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
            mediumType: string().required("Medium is required.")
        });
        this.fieldVariables = {classId:'', sectionId:'', firstName: "", lastName: "", dob: "", cellNumber: "", aadharNumber: "", mediumType:''}
        this.state = {
            aadharNumber: '', startSpinner: false, isUpdate: false, updateRegistrationData: '', aadharNumber: '', studentRegistrationText: 'Student Registration'
        }
    }

    async componentDidMount() {
        let studentId = this.props.studentId;
        if (studentId == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getStudentDetailsForUpdate/' + studentId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateRegistrationData: response.data.statusDescription[0], aadharNumber: response.data.statusDescription[0].aadharNumber })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', studentRegistrationText: "Update Student Registration" })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ aadharNumber: values.aadharNumber, startSpinner: true })
        let dataToSend = {
            classId: values.classId.value,
            sectionId: values.sectionId.value,
            firstName: values.firstName,
            lastName: values.lastName,
            cellNumber: values.cellNumber,
            aadharNumber: values.aadharNumber,
            dob: formatDate(values.dob),
            busservice: parseInt(values.busservice),
            mediumType: values.mediumType.value
        }
    
        if (this.props.studentId) {
            dataToSend.studentId = parseInt(this.props.studentId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/managerservice/createStudent", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.studentId) {
            this.props.history.push(`../studentlist`)
        } else {
            this.props.history.push(`./studentlist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.studentId) {
            this.props.history.push('../studentlist')
        } else {
            this.props.history.push('./studentlist')
        }
    }
    render() {
        const { classes } = this.props;
        const MyLink = (props) => <RouterLink to={`/studentregistrationprint/${this.state.aadharNumber}`} {...props} />
        let successButton = ''
        if (this.props.studentid === undefined) {
            successButton = [
                <Button className={classes.OkButton} onClick={this.backDashboard}>No Print</Button>,
                <Link
                    variant="body2"
                    component={MyLink}
                    target="_blank"
                    rel="noopener"
                    style={{ textDecoration: "none" }}
                ><Button className={classes.OkButton} onClick={this.backDashboard}>Print</Button></Link>
            ]
        } else {
            successButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        }
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.studentRegistrationText} pageTitle={"Create | Edit Admission"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateStudentUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate ? <CreateStudentEdit data={this.state.updateRegistrationData} /> : ""}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(StudentCreate)));