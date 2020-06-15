import React from 'react';
import { withStyles, Button, Paper, Grid, Typography, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import StudentCreatedUI from './CreateAccountUI';
import EditAccount from './EditAccount';
import { string, object, mixed } from 'yup';
import { formatDate } from '../../components/utilsFunctions';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: { marginTop: theme.spacing.unit * 11, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
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
            schoolname: string().required("School Name is required."),
            registration: string().required("Registration number is required."),
            schooladdress: string().required("School Address is required."),
            sessionoptions: string().required("Session is required."),
            firstname: string().required("First Name is required."),
            lastname: string().required("Last Name is required."),
            emailid: string().required("Email Id is required."),
            gender: string().required("Gender is required."),
            adharnumber: string().required("Adhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")),
            cellnumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            configType:string().required('Config Type is required.'),
            feeaccount: mixed().when('configType', { is: "2", then: string().required("This field is required.")}),
            examoption: mixed().when('configType', { is: "2", then: string().required("This field is required.")}),
            // entranceexamination: mixed().when('configType', { is: "2", then: string().required("This field is required.")}),
            accounttype: mixed().when('configType', { is: "2", then: string().required("This field is required.")})
        });

        this.state = {
            emailId:'', adharNumber: '', startSpinner: false, isUpdate: false, updateRegistrationData: ''
        }
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleReligion = value => {
        this.setState({ religion: value })
    }
    handleCategory = value => {
        this.setState({ category: value })
    }
    handleLocality = value => {
        this.setState({ locality: value })
    }

    handleCheckBox = event => {
        if (this.state.checkedValue == true) {
            this.setState({ checkedValue: false, localaddress: "" })
        } else { this.setState({ checkedValue: true, localaddress: this.state.parmanentaddress }) }
    }

    async componentDidMount() {
        if (this.props.accountId) {
            this.setState({ buttonText: 'Update Account' });
            let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/' + this.props.accountId + '/getschooldetails', null);
            if (response.data.status == 1) {
                this.setState({ isUpdate: true, updateRegistrationData: response.data.statusDescription[0], emailId:response.data.statusDescription[0].emailid, adharNumber: response.data.statusDescription[0].adharnumber })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            this.setState({ buttonText: 'Create Account' });
        }
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
            schoolname: values.schoolname,
            registration: values.registration,
            firstname: values.firstname,
            lastname: values.lastname,
            emailid: values.emailid,
            cellnumber: values.cellnumber,
            adharnumber: values.adharnumber,
            gender: values.gender,
            schooladdress: values.schooladdress,
            session: values.sessionoptions.value,
            configType: parseInt(values.configType),
            examination: values.entranceexamination,
            account: values.feeaccount,
            accounttype: values.accounttype,
            examoption: values.examoption,
            dob: formatDate(values.dob),
            images: image
        }
        if (this.props.accountId) {
            let response = await this.props.authenticatedApiCall('put', "/api/superadminservice/" + this.props.accountId, dataToSend);
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false })
            }
        } else {
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
                <Helmet> <title>Create | Edit Account</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ schoolname: '', registration: '', schooladdress: '', sessionoptions: '', configType: '', feeaccount: '', entranceexamination: '', examoption: [], accounttype:'', firstname: "", lastname: "", cellnumber: "", emailid: '', adharnumber: "", dob: '', gender: "", file: '' }}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}></Typography>
                            </Paper>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "100%", left: "45%", zIndex: '99999' }} />}
                            <StudentCreatedUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} emailId={this.state.emailId}/>
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

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(connect(StudentCreate)));