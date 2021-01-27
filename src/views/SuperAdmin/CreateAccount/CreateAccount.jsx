import React from 'react';
import { withStyles, Button, Paper, Grid, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import StudentCreatedUI from './CreateAccountUI';
import EditAccount from './EditAccount';
import { string, object, mixed } from 'yup';
import { formatDate, examOptions } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(11), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class StudentCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            dob: string().required("Dob is Required"),
            schoolName: string().min(3, 'School Name can not be less than 3 charecters').max(100, 'School Name can not be greater than 100 charecters.').required("School Name is required."),
            registration: string().min(3, 'Registration can not be less than 3 charecters').max(50, 'Registration can not be greater than 100 charecters.').required("Registration number is required."),
            schoolAddress: string().min(3, 'Parmanent Address can not be less than 3 Charecters.').max(200, 'Parmanent Address can not be greater than 200 Charecters.').required("School address is required."),
            phoneNumber: string().min(10, ("Please enter valid 10 digit mobile number.")).max(10, ("Please enter valid 10 digit mobile number.")).required("Phone Number is required.").matches(/^[0-9]+$/, 'This field accepts only number.'),
            sessionoptions: string().required("Session is required."),
            firstName: string().min(3, 'First Name can not be less than 3 charecters.').max(25, 'First Name can not be greater than 25 charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("First Name is required."),
            lastName: string().min(3, 'Last Name can not be less than 3 Charecters.').max(25, 'Lat Name can not be greater than 25 Charecters.').trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.').required("Last Name is required."),
            emailId: string().required("Email Id is required.").email('Enter proper Email Id').max(50),
            gender: string().required("Gender is required."),
            aadharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
            cellNumber: string().required("Mobile Number is required.").min(10, ("Please enter valid 10 digit mobile number.")).max(10, ("Please enter valid 10 digit mobile number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
            configType: string().required('Config Type is required.'),
            feeAccount: mixed().when('configType', { is: "2", then: string().required("This field is required.") }),
            examOption: mixed().when('configType', { is: "2", then: string().required("This field is required.") }),
            entranceExamination: mixed().when('configType', { is: "2", then: string().required("This field is required.") }),
            examinationType: mixed().when('configType', { is: "2", then: string().required("This field is required.") })
        });
        this.fieldVariables = { schoolName: '', registration: '', phoneNumber:'', schoolAddress: '', sessionoptions: '', configType: '', feeAccount: '', entranceExamination: '', examOption: [], examinationType:'', firstName: "", lastName: "", cellNumber: "", emailId: '', aadharNumber: "", dob: '', gender: "", file: '', schoolLogo:'' }
        this.state = {
            emailId: '', aadharNumber: '', startSpinner: false, isUpdate: false, updateRegistrationData: ''
        }
    }

    handleCheckBox = event => {
        if (this.state.checkedValue == true) {
            this.setState({ checkedValue: false, localaddress: "" })
        } else { this.setState({ checkedValue: true, localaddress: this.state.parmanentaddress }) }
    }

    async componentDidMount() {
        if (this.props.accountId) {
            this.setState({ buttonText: 'Update Account' });
            let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/getschooldetails/' + this.props.accountId, null);
            if (response.data.status == 1) {
                this.setState({ isUpdate: true, updateRegistrationData: response.data.statusDescription[0], emailId: response.data.statusDescription[0].emailId, aadharNumber: response.data.statusDescription[0].aadharNumber })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            this.setState({ buttonText: 'Create Account' });
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        console.log(values)
        this.setState({ startSpinner: true })
        let image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        let logo;
        if (values.schoolLogo == null) {
            logo = values.schoolLogo
        } else if (values.schoolLogo.base64Rep) {
            logo = values.schoolLogo.base64Rep
        } else {
            logo = values.schoolLogo
        }
        let examOptions = [];
        if(values.configType == 2){
            values.examOption.map((item)=>{
                examOptions.push(item.value);
            })
        }
        let dataToSend = {
            schoolName: values.schoolName,
            registration: values.registration,
            phoneNumber: values.phoneNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            emailId: values.emailId,
            cellNumber: values.cellNumber,
            aadharNumber: values.aadharNumber,
            gender: values.gender,
            schoolAddress: values.schoolAddress,
            sessionId: values.sessionoptions.value,
            configType: parseInt(values.configType),
            examination: values.entranceExamination,
            accountant: values.feeAccount,
            examOption: values.examOptions,
            examinationType: values.examinationType,
            dob: formatDate(values.dob),
            images: image,
            schoolLogo: logo
        }
        if (this.props.accountId) {
            dataToSend.accountId = this.props.accountId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/superadminservice/createschooladmin", dataToSend);
        if (response.status === 200) {
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false })
            }
        } else if (response.data === 404) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false })
        } else {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false })
        }
    }
    backDashboard = () => {
        if (this.props.accountId) {
            this.props.history.push(`../manage-account`)
        } else {
            this.props.history.push(`./manage-account`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.accountId) {
            this.props.history.push(`../manage-account`)
        } else {
            this.props.history.push(`./manage-account`)
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Register School`} pageTitle={"Create | Edit Account"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "100%", left: "45%", zIndex: '99999' }} />}
                            <StudentCreatedUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} emailId={this.state.emailId} />
                            {this.state.isUpdate ? <EditAccount data={this.state.updateRegistrationData} /> : ""}
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

            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(StudentCreate)));