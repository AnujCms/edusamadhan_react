import React, { Component } from 'react';
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Link } from 'react-router-dom'
import { withStyles, Button, InputAdornment, Typography } from '@material-ui/core';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import axios from 'axios';
import { Formik, Form, Field,connect } from 'formik';
import { string, object } from 'yup';
import { withTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    root:{width:322},
    passwordTitle: {
        fontSize: "31px !important",
        fontWeight: "900 !important",
        color: "rgba(0, 0, 102, 1) !important"
    },
    fontSize16: { fontSize: "18px !important", color:"rgba(109, 111, 123, 1)" },
    padTop0: { padding: 0 },
    rememberText: { fontSize: "16px !important", textAlign: "center" },
    invalidUser: {
        color: 'red'
    },
    LoginHeading: { fontSize: "30px !important", fontWeight: "900 !important", color: "rgba(0, 0, 102, 1) !important" },
    loginSuccess: { fontSize: "18px", marginBottom: "15px",color: "rgba(109, 111, 123, 1)" },
    cardFooter: {  paddingLeft: 15 },
    primaryBtn: { width: "43%", color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    secondryBtn: { width: "100%", color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "6px 17px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    rememberMe:{fontSize:"16px !important", textAlign: "center", fontWeight:450},
    font15:{paddingRight:"15px", fontSize:"15px !important", paddingTop:16},
    font18:{color:"rgba(34, 98, 191, 1)",fontSize: "18px !important"}
});

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        const { t } = props;
        this.yupSchema = object().shape({
            email: string().required("This field is required.").email("Enter proper emailid.")
        })
        this.state = {
            resetpasswordmsg: false, popUpMsg: '', emailRegistered: "",emailid:""
        }
    }

    handleSubmit = (values, { setSubmitting }) => {
        axios.post('/api/providerauthservice/forgotPassword', { emailid: values.email }
        ).then(result => {
            if (result.data.status === 1) {
                this.setState({ resetpasswordmsg: true, emailid: values.email });
                setSubmitting(false);
            }
            else if (result.data.status === 0) {
                this.setState({
                    emailRegistered: result.data.statusDescription,
                });
                setSubmitting(false);
            }
        })
    }

    handleResetPassword = () => {
        this.setState({ resetpasswordmsg: false });
    }
    dismissDialog = () => {
        this.props.history.push(`../login`)
    }
    render() {
        const { classes, t } = this.props;
        return (
            <div >
                <Helmet>
                    <title>Forgot Password</title>
                </Helmet>
                {(!this.state.resetpasswordmsg ? <Formik initialValues={{ email: "" }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}
                >
                    {(props) => (
                        <Form className={classes.root}>
                            <Typography className={classes.passwordTitle}>Forgot your password?</Typography>
                            <p className={classes.fontSize16}>Don't worry, it happens to the best of us. To reset your password, enter the email address you use to sign in to EDUSAMADHAN</p>
                            <Field
                                name="email"
                                fullWidth
                                label="Email Id"
                                placeholder="Enter your Email Id"
                                variant="filled"
                                InputProps={{
                                    type: "email"
                                }}
                                component={FormikTextField}
                                
                            />
                            <div className={classes.invalidUser}>{this.state.emailRegistered}</div>
                            <CardFooter style={{ display: "block" }} className={classes.padTop0}>
                            <br /><br/>
                                <Button type="submit" className={classes.secondryBtn} disabled={props.isSubmitting} size="small">Conform</Button>
                                <br />
                                <p className={classes.rememberMe}> <FontAwesomeIcon icon={faChevronLeft} style={{color:"rgba(34, 98, 191, 1)"}}/>&nbsp; <Link style={{ textDecoration: "none", color:"rgba(34, 98, 191, 1)" }} to={"/public/teachers/"}>Back</Link> Remembered your password?</p>
                            </CardFooter>
                        </Form>
                    )}
                </Formik> : <Card style={{ boxShadow: "none", width:343 }}>
                        <CardBody>
                            <Typography className={classes.LoginHeading}>Recover password</Typography><br />
                            <Typography variant="h4" color="inherit" className={classes.loginSuccess}>Your password reset instructions have been sent to <span className={classes.font18}>{this.state.emailid}</span></Typography><br/>
                            <Typography variant="h4" color="inherit" className={classes.loginSuccess}>Please follow the instructions in the email to regain access to your account.</Typography><br/>
                        </CardBody>
                        <CardFooter className={classes.cardFooter} >
                            <Typography className={classes.font15}>Didn’t receive our email?</Typography>
                            <Button className={classes.primaryBtn} size="small" onClick={this.dismissDialog}>LOGIN </Button>
                        </CardFooter>
                    </Card>)}
            </div>
        )
    }
}

export default withTranslation()(withStyles(styles)(connect(ForgetPassword)));