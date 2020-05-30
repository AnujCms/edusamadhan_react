import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import StudentCreatedUI from './StudentCreatedUI';
import UpdateRegistrationUI from './UpdateRegistrationUI';
import { string, object } from 'yup';

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: {
            margin: 0,
            paddingTop: '5px'
        },
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class StudentCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
          firstname: string().required("First Name is required."),
          lastname: string().required("Last Name is required."),
          mothername: string().required("Mother Name is required."),
          fathername: string().required("Father Name is required."),
          gender: string().required("Gender is required."),
          adharnumber: string().required("Adhar Number is required.").min(4, ("Please enter valid adhar number.")),
          cellnumber: string().required("Cell Number is required.").min(10, ("Please enter valid cell number.")),
          category: string().required("Category is required."),
          religion: string().required("Religion is required."),
          locality: string().required("Locality is required."),
          parmanentaddress: string().required("Parmanent Address is required."),
          localaddress: string().required("Local Address is required.")
        });
    
        this.state = {
            isUpdate: false, updateRegistrationData:''
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
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/updateStudentDetails/'+studentid, null);
            if (response.data.status == 1) {
                this.setState({isUpdate:true, updateRegistrationData:response.data.statusDescription[0]})
            } else if (response.data.status == 0) {
            }
            this.setState({ buttonText: 'Update Student' })
        }
    }

    formatDate(d) {
        //get the month
        var month = d.getMonth();
        //get the day
        var day = d.getDate();
        //get the year
        var year = d.getFullYear();

        //pull the last two digits of the year
        // year = year.toString().substr(2, 2);

        //increment month by 1 since it is 0 indexed
        month = month + 1;
        //converts month to a string
        month = month + "";

        //if month is 1-9 pad right with a 0 for two digits
        if (month.length == 1) {
            month = "0" + month;
        }

        //convert day to string
        day = day + "";

        //if day is between 1-9 pad right with a 0 for two digits
        if (day.length == 1) {
            day = "0" + day;
        }

        //return the string "MMddyy"
        return year + '-' + month + '-' + day;
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        let studentid = this.props.studentid;
        var image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        if (studentid) {
            let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/updateStudent', {
                studentid: studentid,
                fname: values.firstname,
                lname: values.lastname,
                mothername: values.mothername,
                fathername: values.fathername,
                cellnumber: values.cellnumber,
                adharnumber: values.adharnumber,
                dob: this.formatDate(values.dob),
                gender: values.gender,
                religion: values.religion.value,
                category: values.category.value,
                locality: values.locality.value,
                paraddress: values.parmanentaddress,
                locaddress: values.localaddress,
                images: image
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentRegistration", {
                fname: values.firstname,
                lname: values.lastname,
                mothername: values.mothername,
                fathername: values.fathername,
                cellnumber: values.cellnumber,
                adharcard: values.adharnumber,
                dob: this.formatDate(values.dob),
                gender: values.gender,
                religion: values.religion.value,
                category: values.category.value,
                locality: values.locality.value,
                paraddress: values.parmanentaddress,
                locaddress: values.localaddress,
                images: image
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true });
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true });
            }
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

    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ firstname: "", lastname: "", dob: "", mothername: "", fathername: "", cellnumber: "", adharnumber: "", gender: "", file: "", religion: "", category: "", locality: "", localaddress: "", parmanentaddress: "" }}>
                    {(props) => (
                        <Form>
                            <StudentCreatedUI buttonText={this.state.buttonText}/>
                            {this.state.isUpdate?<UpdateRegistrationUI data={this.state.updateRegistrationData}/>:""}
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}

            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(connect(StudentCreate)));