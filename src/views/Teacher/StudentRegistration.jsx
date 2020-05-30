import React from 'react';
import { withStyles, Link, Button, Paper, Typography, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import StudentCreatedUI from './StudentRegistrationUI';
import StudentEditRegistrationUI from './StudentEditRegistrationUI';
import { string, number, object, mixed } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

});

class StudentCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            firstname: string().required("First Name is required.").max(100, "First name can not be greater than 100 charecters."),
            lastname: string().required("Last Name is required.").max(100, "Lat name can not be greater than 100 charecters."),
            dob: string().required("Date of Birth is required."),
            mothername: string().required("Mother Name is required.").max(100, "Mother name can not be greater than 100 charecters."),
            fathername: string().required("Father Name is required.").max(100, "Father name can not be greater than 100 charecters."),
            gender: number().required("Gender is required."),
            adharnumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")),
            cellnumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            category: string().required("Category is required."),
            religion: string().required("Religion is required."),
            locality: string().required("Locality is required."),
            parmanentaddress: string().required("Parmanent Address is required.").max(100, ("Address is too big.")),
            localaddress: string().required("Local Address is required.").max(100, ("Address is too big.")),
            busservice: number().required("This field is required."),
            route: mixed().when('busservice', { is: 2, then: string().required("This field is required.") })

        });

        this.state = {
            adharNumber: '', startSpinner: false, isUpdate: false, updateRegistrationData: '', adharnumber: '', studentRegistrationText: 'Student Registration'
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
        let studentid = this.props.studentid;
        if (studentid == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/updateStudentDetails/' + studentid, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateRegistrationData: response.data.statusDescription[0], adharNumber: response.data.statusDescription[0].adharnumber })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', studentRegistrationText: "Update Student Registration" })
        }
    }


    //Handle the form submit event
    handleSubmit = async (values) => {
        console.log(values)
        this.setState({ adharnumber: values.adharnumber, startSpinner: true })
        let studentid = this.props.studentid;
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
            mothername: values.mothername,
            fathername: values.fathername,
            cellnumber: values.cellnumber,
            adharnumber: values.adharnumber,
            dob: formatDate(values.dob),
            gender: parseInt(values.gender),
            religion: values.religion.value,
            category: values.category.value,
            locality: values.locality.value,
            parmanentaddress: values.parmanentaddress,
            localaddress: values.localaddress,
            images: image,
            busservice: parseInt(values.busservice)
        }
        if (values.busservice == 2) {
            dataToSend.route = values.route.value
        }
        if (studentid) {
            dataToSend.studentid = studentid;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentRegistration", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.studentid) {
            this.props.history.push(`../studentlist`)
        } else {
            this.props.history.push(`./studentlist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.studentid) {
            this.props.history.push('../studentlist')
        } else {
            this.props.history.push('./studentlist')
        }
    }
    render() {
        const { classes } = this.props;
        const MyLink = (props) => <RouterLink to={`/studentregistrationprint/${this.state.adharnumber}`} {...props} />
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
                <Helmet> <title>Create | Edit Student</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ firstname: "", lastname: "", dob: "", mothername: "", fathername: "", cellnumber: "", adharnumber: "", gender: "", file: "", religion: "", category: "", locality: "", localaddress: "", parmanentaddress: "", botharesame: '', busservice: '', route: '' }}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>{this.state.studentRegistrationText}</Typography>
                            </Paper>
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <StudentCreatedUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} />
                            {this.state.isUpdate ? <StudentEditRegistrationUI data={this.state.updateRegistrationData} /> : ""}
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
                {(this.state.isSuccess ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(connect(StudentCreate)));