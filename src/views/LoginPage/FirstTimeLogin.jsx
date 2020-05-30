import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, InputAdornment, Button, Typography } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Formik, Form, Field } from 'formik';
import { string, object, boolean, ref } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import { withTranslation } from 'react-i18next';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { Helmet } from "react-helmet";
import ErrorDialog from '../../components/ErrorDialog';
import FormikCheckBox from '../../components/FormikValidatedComponents/CheckBox';

const styles = theme => ({
    primaryBtn: {
        color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, width: "50%", borderRadius: "25px", padding: "10px", marginTop: "-35px",
        '&:hover': {
            backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder
        }
    },
    errorBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    TermsCondition: { color: "#1a8eeb", textDecoration: "underline", backgroundColor: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: "16px", padding: "1px 10px" },
    fntSz_16: { fontSize: "16px" },
    loginSuccess: { fontSize: "18px", fontWeight: "500", marginBottom: "15px" },
    login: { width: "410px", marginLeft: "37%", marginTop: "11%", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } },
    padTop: { padding: "0 40px", paddingTop: "40%", color: "#fff" },
    clrWhite: { color: "#fff !important", },
    fntSze20: { fontSize: "18px !important" },
    LoginHeading: { fontSize: "30px !important", fontWeight: "900 !important", color: "rgba(0, 0, 102, 1) !important" },
    LoginSubHeading: { fontSize: "18px !important", color: "rgba(109, 111, 123, 1)  !important", textAlign: "left", lineHeight: "24px  !important" },
    cardFooter: { justifyContent: "flex-end", padding: 0, margin: "30px 0 20px" },
    icnColor: { cursor: "pointer" },
    inputItem: { width: "100%", marginBottom: "15px", [theme.breakpoints.down('md')]: { width: "90%" } },
    cardHeading: { paddingBottom: "10px", textAlign: "center", fontSize: "25px", color: "green" }


});

class FirstTimeLogin extends React.Component {
    constructor(props) {
        super(props)
        const { t } = this.props;
        this.formikValidation = object().shape({
            password: string().required("This fiels is required.").min(8, "Password must be 8 character log.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Passqord condition."),
            cnfpassword: string().required("This fiels is required.").oneOf([ref('password')], "Confirm password is not matching."),
        });
        this.state = {
            resetPassworSuccess: true, language: this.props.i18n.language, unauthenticated: false,
            password: "password", showPassword: true, confPassword: "password", showCnfPassword: true
        }
    }

    componentDidMount() {
        if ((localStorage.getItem("accessToken") == null) || (localStorage.getItem("refreshToken") == null)) {
            this.props.history.push(`../login`)
        }
    }
    handleSubmit = async (values, { setSubmitting }) => {
        await this.props.authenticatedApiCall('post', '/api/providerauthservice/changePassword', {
            password: values.password,
            cnfpassword: values.cnfpassword
        }).then(response => {
            console.log("response", response)
            setSubmitting(false);
            if (response.data.status === 1) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken")
                this.setState({ resetPassworSuccess: false })
            } else if (response.data.status === 0) {
                this.setState({ unauthenticated: true })
            }
        }).catch((error) => {
            this.setState({ unauthenticated: true })
            setSubmitting(false);
            console.log(error);
        });
    }
    //handle dismissDialog
    dismissDialog = () => {
        this.setState({ resetPassworSuccess: true });
        this.props.history.replace(`../login`)
    }
    logout = async () => {
        localStorage.removeItem("__warningPopShownForSession")
        localStorage.removeItem("getAccountId")
        localStorage.removeItem("UserAuth")
        localStorage.removeItem("UserObject")

        await this.props.authenticatedApiCall('get', '/api/providerauthservice/signout', null).then(response => {
            if (response.status == 200) {
                this.props.history.push('/public');
            }
        })
    }
    handleFirstTimeLogin = () => {
        this.setState({ unauthenticated: false });
        this.props.history.push('./guest')
    }
    handleShowPassword = () => {
        this.setState({ password: "text", showPassword: false })
    }
    handleHidePassword = () => {
        this.setState({ password: "password", showPassword: true })
    }
    handleShowConfPassword = () => {
        this.setState({ confPassword: "text", showCnfPassword: false })
    }
    handleHideConfPassword = () => {
        this.setState({ confPassword: "password", showCnfPassword: true })
    }
    //handle Term And Condition
    handleTermCondition = async () => {
        window.open('../termAndCondition');
    }

    //handle Privacy Policy 
    handlePrivacyPolicy = () => {
        window.open('../privacyPolicy');
    }

    render() {
        const { classes, t } = this.props;
        var firstTimeLoginButton = [<Button className={classes.errorBtn} onClick={this.handleFirstTimeLogin}>ok</Button>]
        var HeaderText = "Unauthentication";
        return (
            <div>
                <Helmet>
                    <title>
                        FirstTimeLogin
                    </title>
                </Helmet>
                <div key={this.props.i18n.language}>
                    <GridContainer style={{ backgroundColor: "#fff", marginBottom: "25px" }}>
                        <GridItem lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.login}>
                                {(this.state.resetPassworSuccess ? <Formik initialValues={{ password: "", cnfpassword: "", acceptTerms: false, termCondition: false, acceptTerms:false }} onSubmit={this.handleSubmit} validationSchema={this.formikValidation}
                                >
                                    {(props) => (
                                        <Form>
                                            <Typography className={classes.cardHeading}>First Time Reset Password.</Typography>
                                            <Field
                                                component={FormikTextField}
                                                label="Enter your New Password."
                                                onChange={this.handleChange}
                                                name="password"
                                                fullWidth
                                                variant="filled"
                                                className={classes.inputItem + " " + "selectstyle"}
                                                InputProps={{
                                                    type: this.state.password,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {this.state.showPassword ? <VisibilityIcon onClick={this.handleShowPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHidePassword} className={classes.icnColor} />}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <p>Password rules <span style={{ color: "rgba(65, 117, 5, 1)" }}>Password must be 8 character long.</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}></span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>123</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>@!$%^*()</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>≠ email</span></p>
                                            <Field
                                                component={FormikTextField}
                                                label="Confirm your password."
                                                fullWidth
                                                name="cnfpassword"
                                                variant="filled"
                                                className={classes.inputItem + " " + "selectstyle"}
                                                InputProps={{
                                                    type: this.state.confPassword,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {this.state.showCnfPassword ? <VisibilityIcon onClick={this.handleShowConfPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHideConfPassword} className={classes.icnColor} />}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <div>
                                            </div>
                                            <Field
                                                name="acceptTerms"
                                                component={FormikCheckBox}
                                                checkboxProps={{ color: "secondary" }}
                                                className="firstLoginCheck"
                                                label={<div><span className={classes.fntSz_16}>Accept the</span><button type="button" className={classes.TermsCondition} onClick={this.handleTermCondition}>{"Term&Condition"}</button>And
                                                <button type="button" className={classes.TermsCondition} onClick={this.handlePrivacyPolicy}>Policy Policy</button>
                                                </div>}
                                            />
                                            <div>
                                                <div style={{ textAlign: "center", marginBottom: "30px" }}> <br /><br />
                                                    <Button disabled={!props.values.acceptTerms } type="submit" className={classes.primaryBtn} size="small" > Confirm </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}

                                </Formik> : <Card style={{ boxShadow: "none" }}>
                                        <CardBody>
                                            <Typography className={classes.LoginHeading}>Successfull.</Typography><br />
                                            <Typography variant="h4" color="inherit" className={classes.loginSuccess}>Your password has been updated successfully.</Typography>
                                        </CardBody>
                                        <br />
                                        <CardFooter className={classes.cardFooter} >
                                            <Button className={classes.primaryBtn} size="small" onClick={this.dismissDialog}>
                                                Login
                                            </Button>
                                        </CardFooter>
                                    </Card>)}
                            </div>
                        </GridItem>

                    </GridContainer>
                </div>
                {(this.state.unauthenticated ? <ErrorDialog successButton={firstTimeLoginButton} HeaderText={HeaderText} dismiss={this.handleFirstTimeLogin} /> : "")}
            </div>
        );
    }
}

export default withTranslation()(AuthenticatedPage()(withStyles(styles, { withTheme: true })(FirstTimeLogin)));
