import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Link } from 'react-router-dom'
import { withStyles, Grid, Paper } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Dialog, DialogContent, DialogActions, InputAdornment , Typography} from '@material-ui/core';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {formatDate} from '../../components/utilsFunctions';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const styles = theme => ({
    orangeBtn: {
        color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, width: "250px", borderRadius: "25px",
        '&:hover': {
            backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder
        }    
    },  
    icnColor: { cursor: "pointer" },
    cardStyle:{margin:0, padding:"10px"},
    cardHeading: { paddingTop: "10px", textAlign: "center", fontSize: "25px" },
    inputSelect: { width: "360px", marginBottom:"20px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }

});
//123456789994
//9540221342

const yupSchema = object().shape({
    adharnumber: string().required("Adhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")),
    cellnumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
    dob: string().required("Dob is Required"),
    userrole: string().required("User role is Required"),
    password: string().required("This field is required.").min(8, "Password should be atleast 8 character long.").max(16, "Password can not be greater than 16 character long.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password should contain atleast on special symbol, one number, one chatracter."),
});

let userOptions = [{ value: 6, label: 'Student' }, { value: 5, label: 'Accountant' }, { value: 3, label: 'Faculty' }, { value: 4, label: 'Exam Head' }, { value: 2, label: 'Principal' }]


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            successMessage: '',
            isError: false,
            errorMessage:'',
            showPassword:true,
            password:"password"
        }
    }

    handleSubmit = (values) => {
        console.log("hitt")
        axios.post('/api/providerauthservice/forgetPassword', { 
            adharnumber: values.adharnumber,
            cellnumber: values.cellnumber,
            dob:formatDate(values.dob),
            userrole: values.userrole.value,
            password: values.password 
        }
        ).then(result => {
            if (result.data.status === 1) {
                this.setState({ isSuccess: true, successMessage: result.data.statusDescription });
            }
            else if (result.data.status === 0) {
                this.setState({ isError: true, errorMessage: result.data.statusDescription });
            }
        })
    }

    handleClose = () => {
        this.setState({ isError: false });
    };
    backToLogin = () =>{
        this.props.history.push('./teachers')
        this.setState({isSuccess:false})
    }
    handleShowPassword = () => {
        this.setState({ password: "text", showPassword: false })
      }
      handleHidePassword = () => {
        this.setState({ password: "password", showPassword: true })
      }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.handleClose}>Ok</Button>]
        let OkButtonSuccess = [<Button className={classes.OkButton} onClick={this.backToLogin}>Ok</Button>]
        return (
            <Paper className={classes.cardStyle}>
             <Typography className={classes.cardHeading}>Forgot Your Password?</Typography>
                <Formik initialValues={{ adharnumber: "", cellnumber:"", dob:"", userrole:"", password:"" }} onSubmit={this.handleSubmit} validationSchema={yupSchema}
                >
                    {(props) => (
                        <Form>
                                <p>Don't worry, it happens. To reset your password fill the correct information and fill you new password.</p>
                                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="adharnumber"
                                    fullWidth
                                    type="number"
                                    label="AAdhar Number"
                                    component={FormikTextField}
                                    variant="filled"
                                    className={classes.inputSelect + " " + "selectstyle"}
                                />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="cellnumber"
                                    fullWidth
                                    type="number"
                                    label="Cell Number"
                                    component={FormikTextField}
                                    variant="filled"
                                    className={classes.inputSelect + " " + "selectstyle"}
                                />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="dob"
                                    locale={this.dateLanguage}
                                    className={classes.dateComponentAlign}
                                    component={FormikDateField}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={classes.inputSelect}
                                    inputProps={{ style: "width=100%" }}
                                    textFieldProps={{
                                        variant: "filled", label: "Date of Birth", InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CalendarTodayIcon />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="userrole"
                                    options={userOptions}
                                    placeholder={"Select User Role"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="password"
                                    fullWidth
                                    label="New Password"
                                    component={FormikTextField}
                                    variant="filled"
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    InputProps={{
                                        type: this.state.password,
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            {this.state.showPassword ? <VisibilityIcon onClick={this.handleShowPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHidePassword} className={classes.icnColor} />}
                                          </InputAdornment>
                                        )
                                      }}
                                />
                                <Typography>Example:Password@123</Typography>
                                </Grid>
                            <div className={classes.cardFooter} style={{ textAlign: "center", marginTop:"15px" }} >
                                <Button type="submit" className={classes.orangeBtn}  size="small">  Confirm </Button>
                                </div>
                                <Link style={{ textDecoration: "none", color:"rgba(109, 111, 123, 1)", paddingTop:"15px", paddingBottom:"20px" }} to={"/public/Login/"}>Back to Login</Link>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButtonSuccess} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backToLogin} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : "")}
            </Paper>
        )
    }
}

export default withStyles(styles)(ForgetPassword);