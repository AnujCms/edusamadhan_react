import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles, Button, Paper, Typography, Grid } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import CreateTeacherUI from './CreateTeacherUI';
import EditTeacherUI from './EditTeacherUI';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { formatDate } from '../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 22,
        marginTop: theme.spacing.unit * 12,
        paddingBottom: theme.spacing.unit * 1,
        [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } }
});

class CreateProvider extends React.Component {
    constructor(props) {
        super(props)
        this.yupSchema = object().shape({
            firstname: string().required("First Name is required.").max(100, 'First Name can not be greater than 100 Charecters.'),
            lastname: string().required("Last Name is required.").max(100, 'Lat Name can not be greater than 100 Charecters.'),
            emailid: string().required("Email id is required.").email('Enter proper Email Id'),
            cellnumber: string().required("Cellnumber is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            adharnumber: string().required("AAdhar number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")),
            dob: string().required("Date of birth is required."),
            gender: string().required("Gender is required."),
            qualification: string().required("Qualification is required."),
            subject: string().required("Subject is required."),
            userrole: string().required("User role is required."),
            parmanentaddress: string().required("Parmanent address is required.").max(200, 'Parmanent Address can not be greater than 100 Charecters.'),
            localaddress: string().required("Local address is required.").max(200, 'Local Address can not be greater than 100 Charecters.')
        });
        this.state = {
            emailId: '', adharNumber: '', startSpinner: false, userRegistrationText: 'User Registration',
            userRoleOption: "", updateTeacherData: "", isUpdate: false,
            feeAccount: false, createteacher: false, teacherupdated: false,
            isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }

    async  componentDidMount() {
        let accountid = this.props.currentUser.userDetails.accountid;
        if (accountid) {
            let response = await this.props.authenticatedApiCall('get', '/api/principalservice/configDetails', null);
            if (response.data.status == 1) {
                if (JSON.parse(response.data.statusDescription[0].configdata)) {
                    if(this.props.currentUser.userDetails.accouttype == 1){
                        this.setState({ userRoleOption: [{ value: 3, label: "Faculty" }, { value: 5, label: "Accountant" }] });
                    }else{
                        this.setState({ userRoleOption: [{ value: 3, label: "Faculty" }, { value: 4, label: "Examination Head" }, { value: 5, label: "Accountant" }] });
                    }
                } else {
                    this.setState({ userRoleOption: [{ value: 3, label: "Faculty" }] });
                }
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }

        }
        if (this.props.teacherid) {
            this.setState({ buttonText: 'Update User' })
            let response = await this.props.authenticatedApiCall('get', '/api/principalservice/getteacherdetailforupdate/' + this.props.teacherid, null);
            if (response.data.status == 1) {
                this.setState({ updateTeacherData: response.data.statusDescription, isUpdate: true, emailId: response.data.statusDescription.emailid, adharNumber: response.data.statusDescription.adharnumber })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }

        } else { this.setState({ buttonText: 'Create User' }) }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let accountid = this.props.currentAccountId;
        var image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        let dataToSend = {
            firstname: values.firstname,
            lastname: values.lastname,
            emailid: values.emailid,
            cellnumber: values.cellnumber,
            dob: formatDate(values.dob),
            gender: values.gender,
            qualification: values.qualification.value,
            adharnumber: values.adharnumber,
            subject: values.subject.value,
            userrole: values.userrole.value,
            parmanentaddress: values.parmanentaddress,
            localaddress: values.localaddress,
            images: image,
            salary: values.salary
        }
        if (this.props.teacherid) {
            this.setState({ userRegistrationText: "Update User" })
            dataToSend.teacherid = this.props.teacherid;
        } 
           let response = await this.props.authenticatedApiCall('post', "/api/principalservice/createstaff", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false, })
        }
    };

    backDashboard = () => {
        if (this.props.teacherid) {
            this.props.history.push(`../teacherlist`)
        } else {
            this.props.history.push(`./teacherlist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.teacherid) {
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
                <Helmet> <title>Create | Edit User</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ firstname: "", lastname: "", emailid: '', cellnumber: "", dob: "", gender: "", qualification: "", subject: "", userrole: "", parmanentaddress: "", localaddress: '', botharesame: '', file: '', adharnumber: '', isUpdate: true, salary: null }}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            {this.state.userRoleOption.length && <><Paper className={classes.formHeader}>
                                <Typography className={classes.center}>{this.state.userRegistrationText}</Typography>
                            </Paper>
                                <CreateTeacherUI buttonText={this.state.buttonText} teacherid={this.props.teacherid} userRoleOption={this.state.userRoleOption} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} emailId={this.state.emailId} /></>}
                            {this.state.isUpdate ? <EditTeacherUI isUpdate={this.state.isUpdate} data={this.state.updateTeacherData} /> : ""}
                            {this.state.userRoleOption.length && <><Paper className={classes.btnStyle}>
                                <Grid container>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                        <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                        <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </Paper></>}
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount((CreateProvider))));