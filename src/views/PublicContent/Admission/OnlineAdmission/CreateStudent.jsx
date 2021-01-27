import React from 'react';
import { withStyles, Link, Button, Paper, Typography, Grid } from '@material-ui/core';
import SuccessDialog from '../../../../components/SuccessDialog';
import ErrorDialog from '../../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateStudentUI from './CreateStudentUI';
import CreateStudentEdit from './CreateStudentEdit';
import { string, number, object, mixed } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

});

class CreateStudents extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This feild is required."),
            sectionId: string().required("This feild is required."),
            firstName: string().required("First Name is required.").max(100, "First name can not be greater than 100 charecters."),
            lastName: string().required("Last Name is required.").max(100, "Lat name can not be greater than 100 charecters."),
            dob: string().required("Date of Birth is required."),
            aadharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")),
            cellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            mediumType: string().required("Medium is required.")
        });
        this.fieldVariables = { classId: '', sectionId: '', firstName: "", lastName: "", dob: "", cellNumber: "", aadharNumber: "", mediumType: '' }
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
            dataToSend.studentId = this.props.studentId;
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
                <Helmet> <title>Create | Edit Student</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>Online Admission Portal</Typography>
                            </Paper>
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateStudentUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate ? <CreateStudentEdit data={this.state.updateRegistrationData} /> : ""}
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

export default withStyles(styles)(connect(CreateStudents));