import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import CreateTeacherUI from './CreateTeacherUI';
import EditTeacherUI from './CreateTeacherEdit';
import { Formik, Form } from 'formik';
import { string, object, mixed } from 'yup';
import { formatDate } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(22),
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateProvider extends React.Component {
    constructor(props) {
        super(props)
        this.yupSchema = object().shape({
            firstName: string().min(3, 'First Name can not be less than 3 Charecters.').max(25, 'First Name can not be greater than 25 Charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("First Name is required."),
            lastName: string().min(3, 'Last Name can not be less than 3 Charecters.').max(25, 'Lat Name can not be greater than 25 Charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("Last Name is required."),
            emailId: string().required("Email id is required.").email('Enter proper Email Id'),
            aadharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).trim().matches(/^[0-9]+$/, 'This field accepts only number.'),
            cellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).trim().matches(/^[0-9]+$/, 'This field accepts only number.'),
            dob: string().required("Date of birth is required."),
            gender: string().required("Gender is required."),
            qualification: string().required("Qualification is required."),
            subject: string().required("Subject is required."),
            userrole: string().required("User role is required."),
            parmanentAddress: string().min(3, 'Parmanent Address can not be less than 3 charecters.').max(200, 'Parmanent Address can not be greater than 200 charecters.').required("Parmanent address is required."),
            localAddress: string().min(3, 'Local Address can not be less than 3 charecters.').max(200, 'Local Address can not be greater than 200 charecters.').required("Local address is required."),
            entranceExamType: mixed().when(['userrole'], (userrole) => {
                if (userrole && userrole.value== 6) {
                    return string().required("This field is required.")
                }
                else{
                    return string()
                }
            }),
            workExperience: string().required("This field is required."),
            educationalAwards: string().required("This field is required."),
            awardDetails: string().min(3, 'Award Details can not be less than 3 Charecters.').max(200, 'Award Details can not be greater than 200 charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.'),
            salary: string().min(0, 'Salary can not be less than 0').trim().matches(/^[0-9]+$/, 'This field accepts only alphabets.')
        });
        this.fieldVariables = { firstName: "", lastName: "", emailId: '', cellNumber: "", dob: "", gender: "", qualification: "", subject: "", userrole: "", parmanentAddress: "", localAddress: '', botharesame: '', file: '', aadharNumber: '', isUpdate: true, salary: '', entranceExamTyAe: "", workExperience: '', educationalAwards: '', awardDetails: '' }
        this.state = {
            emailId: '', aadharNumber: '', startSpinner: false, userRegistrationText: 'User Registration',
             updateTeacherData: "", isUpdateUser: false,
            feeAccount: false, createteacher: false, teacherupdated: false,
            isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }

    async  componentDidMount() {
        if (this.props.teacherId) {
            this.setState({ buttonText: 'Update User' })
            let response = await this.props.authenticatedApiCall('get', '/api/principalservice/getteacherdetailforupdate/' + this.props.teacherId, null);
            if (response.data.status == 1) {
                this.setState({ updateTeacherData: response.data.statusDescription, isUpdateUser: true, emailId: response.data.statusDescription.emailId, aadharNumber: response.data.statusDescription.adharNumber })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }

        } else { this.setState({ buttonText: 'Create User' }) }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        var image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        let dataToSend = {
            firstName: values.firstName,
            lastName: values.lastName,
            emailId: values.emailId,
            cellNumber: values.cellNumber,
            dob: formatDate(values.dob),
            gender: values.gender,
            qualification: values.qualification.value,
            aadharNumber: values.aadharNumber,
            subject: values.subject.value,
            userrole: values.userrole.value,
            entranceExamType: values.userrole.value == 6 ? values.entranceExamType.value:2,
            parmanentAddress: values.parmanentAddress,
            localAddress: values.localAddress,
            images: image,
            salary: parseInt(values.salary),
            workExperience: values.workExperience.value,
            educationalAwards: values.educationalAwards.value
        }
        if (values.educationalAwards.value == 1) {
            dataToSend.awardDetails = values.awardDetails
        }       
        if (this.props.teacherId) {
            this.setState({ userRegistrationText: "Update User" })
            dataToSend.teacherId = this.props.teacherId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/principalservice/createstaff", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false, })
        }
    };

    backDashboard = () => {
        if (this.props.teacherId) {
            this.props.history.push(`../teacherlist`)
        } else {
            this.props.history.push(`./teacherlist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.teacherId) {
            this.props.history.push(`../teacherlist`)
        } else {
            this.props.history.push(`./teacherlist`)
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.userRegistrationText} pageTitle={"Create | Edit User"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateTeacherUI buttonText={this.state.buttonText} teacherId={this.props.teacherId} startSpinner={this.state.startSpinner} aadharNumber={this.state.adharNumber} emailId={this.state.emailId}  />
                            {this.state.isUpdateUser ? <EditTeacherUI userDetails={this.state.updateTeacherData} /> : ""}
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
export default withStyles(styles)(AuthenticatedPage()(WithAccount((CreateProvider))));