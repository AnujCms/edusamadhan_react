import React from 'react';
import { withStyles, Link, Button } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import StudentRegistrationUI from './StudentRegistrationUI';
import StudentEditRegistrationUI from './StudentEditRegistrationUI';
import SetClassAndSection from './SetClassAndSection';
import { string, number, object, mixed } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(11), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class StudentCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            firstName: string().required("First Name is required.").min(2, 'First Name can not be less than 2 charecters.').max(20, "First name can not be greater than 20 charecters.").trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.'),
            lastName: string().required("Last Name is required.").min(2, 'Last Name can not be less than 2 charecters.').max(20, "Lat name can not be greater than 20 charecters.").trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.'),
            dob: string().required("Date of Birth is required."),
            motherName: string().required("Mother Name is required.").min(2, 'Mother Name can not be less than 2 charecters.').max(40, "Mother name can not be greater than 40 charecters.").trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.'),
            fatherName: string().required("Father Name is required.").min(2, 'Father Name can not be less than 2 charecters.').max(40, "Father name can not be greater than 40 charecters.").trim().matches(/^[A-Za-z ]+$/, 'This field accepts only alphabets.'),
            gender: number().required("Gender is required."),
            aadharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).trim().matches(/^[0-9]+$/, 'This field accepts only number.'),
            cellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).trim().matches(/^[0-9]+$/, 'This field accepts only number.'),
            category: string().required("Category is required."),
            religion: string().required("Religion is required."),
            locality: string().required("Locality is required."),
            mediumType: string().required("Medium is required."),
            parmanentAddress: string().required("Parmanent Address is required.").min(3, 'Parmanent Address can not be less than 3 charecters.').max(200, ("Parmanent Address can not be greater than 200 charecters.")),
            localAddress: string().required("Local Address is required.").min(3, 'Local Address can not be less than 3 charecters.').max(200, ("Parmanent Address can not be greater than 200 charecters.")),
            busService: number().required("This field is required."),
            route: mixed().when('busService', { is: 1, then: string().required("This field is required.") })
        });
        this.feildVariables = { firstName: "", lastName: "", dob: "", motherName: "", fatherName: "", cellNumber: "", aadharNumber: "", gender: "", file: "", religion: "", category: "", locality: "", mediumType: "", localAddress: "", parmanentAddress: "", botharesame: '', busService: '', route: '', classId: "", section: "", status: "" }
        this.state = {
            aadharNumber: '', startSpinner: false, isUpdate: false, updateRegistrationData: '', aadharNumber: '', studentRegistrationText: 'Student Registration', isClassAndSection: false, classSectionDetails: ''
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
            this.setState({ checkedValue: false, localAddress: "" })
        } else { this.setState({ checkedValue: true, localAddress: this.state.parmanentAddress }) }
    }

    async componentDidMount() {
        let studentId = this.props.studentId;
        if (studentId == undefined) {
            let teacherClassSection = await this.props.authenticatedApiCall('get', '/api/teacherservice/getTeacherClassAndSection', null);
            if (teacherClassSection.data.status == 1) {
                this.setState({ buttonText: 'Registration', classSectionDetails: teacherClassSection.data.statusDescription, isClassAndSection: true })
            }
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getStudentDetailsForUpdate/' + studentId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, isClassAndSection: false, updateRegistrationData: response.data.statusDescription[0], aadharNumber: response.data.statusDescription[0].aadharNumber })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', studentRegistrationText: "Update Student Registration" })
        }
    }


    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ aadharNumber: values.aadharNumber, startSpinner: true })
        let studentId = this.props.studentId;
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
            motherName: values.motherName,
            fatherName: values.fatherName,
            cellNumber: values.cellNumber,
            aadharNumber: values.aadharNumber,
            dob: formatDate(values.dob),
            gender: parseInt(values.gender),
            religion: values.religion.value,
            category: values.category.value,
            locality: values.locality.value,
            mediumType: values.mediumType.value,
            parmanentAddress: values.parmanentAddress,
            localAddress: values.localAddress,
            images: image,
            busService: parseInt(values.busService),
            classId: values.classId,
            sectionId: values.sectionId,
            status: values.status
        }
        if (values.busService == 1) {
            dataToSend.route = values.route.value
        }
        if (studentId) {
            dataToSend.studentId = studentId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentRegistration", dataToSend)
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
        if (this.props.studentId === undefined) {
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
                <FormHeader headerText={this.state.studentRegistrationText} pageTitle={"Create | Edit Student"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.feildVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <StudentRegistrationUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate ? <StudentEditRegistrationUI data={this.state.updateRegistrationData} /> : ""}
                            {this.state.isClassAndSection && <SetClassAndSection clasAndSection={this.state.classSectionDetails} />}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
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