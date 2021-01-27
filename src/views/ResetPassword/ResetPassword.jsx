import React from 'react';
import { withStyles, InputAdornment, Button, Grid } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import { string, object, ref } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FormHeader from '../../components/FormHeader';
import FormHeading from '../../components/FormHeading';
import FormFooter from '../../components/FormFooter';

const styles = theme => ({
    root: { marginTop: theme.spacing(11), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" },
    icnColor: { cursor: "pointer" },
    secondaryBtn: { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.textSecondaryColor, border: "1px solid " + theme.palette.border.secondaryBorder, marginLeft: "5px", marginTop: "10px", borderRadius: "25px", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", "&:hover": { backgroundColor: theme.palette.hoverSecondaryColor.main, color: theme.palette.text.hoverTextSecondaryColor, border: "1px solid " + theme.palette.border.hoverSecondaryBorder } },
    marginTextFeld: { padding: "15px", marginBottom:"15px" }
});

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.formikValidation = object().shape({
            oldpassword: string().required('This field is required.').min(8, "Password should be atleast 8 chanrecters long.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password should contains 1 Special Charectr, 1 Number, 1 Upper Case."),
            newpassword: string().required('This field is required.').min(8, "Password should be atleast 8 chanrecters long.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password should contains 1 Special Charectr, 1 Number, 1 Upper Case."),
            cnfpassword: string().required('This field is required.').oneOf([ref('newpassword')], "Paswword is not matching.")
        });

        this.state = {
            isSuccess: false,
            successMessage: "",
            isError: false,
            errorMessage: "",
            password: "password", showPassword: true, newpassword: "password", showNewPassword: true, confPassword: "password", showCnfPassword: true
        }
    }

    handleSubmit = async (values) => {
        let dataToSend = {
            oldPassword: values.oldpassword,
            newPassword: values.newpassword
        }
        let response = await this.props.authenticatedApiCall('post', '/api/providerauthservice/changePasswordByUser', dataToSend)
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription })
        } else if (response.data.status === 0 || response.data.status === 2 || response.data.status === 3) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }

    handleShowPassword = () => {
        this.setState({ password: "text", showPassword: false })
    }
    handleHidePassword = () => {
        this.setState({ password: "password", showPassword: true })
    }
    handleShowNewPassword = () => {
        this.setState({ newpassword: "text", showNewPassword: false })
    }
    handleHideNewPassword = () => {
        this.setState({ newpassword: "password", showNewPassword: true })
    }
    handleShowConfPassword = () => {
        this.setState({ confPassword: "text", showCnfPassword: false })
    }
    handleHideConfPassword = () => {
        this.setState({ confPassword: "password", showCnfPassword: true })
    }
    handlePaste = (e) => {
        e.preventDefault();
    }
    handleClose = () => {
        this.setState({ isSuccess: false, isError: false })
    }
    handleCancel = () => {
        this.props.history.push('./studentlist')
    }
    render() {
        const { classes, t } = this.props;
        const successButton = [<Button className={classes.secondaryBtn} onClick={this.handleClose}>Ok</Button>];
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Change your Password`} pageTitle={"Change Password"} />
                <FormHeading formHeadingNumber={1} formHeadingText={'If you want to change password, here is the option to change.'} />
                <Formik initialValues={{ oldpassword: "", newpassword: "", cnfpassword: "" }} onSubmit={this.handleSubmit} validationSchema={this.formikValidation}
                >
                    {(props) => (
                        <Form>
                            <Grid container className={classes.backgroundColor}>
                            <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.marginTextFeld}>
                                    <Field
                                        component={FormikTextField}
                                        onPasteCapture={this.handlePaste}
                                        label="Old Password"
                                        name="oldpassword"
                                        onChange={this.handleChange}
                                        fullWidth
                                        variant="filled"
                                        InputProps={{
                                            type: this.state.password,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {this.state.showPassword ? <Visibility onClick={this.handleShowPassword} className={classes.icnColor} /> : <VisibilityOff onClick={this.handleHidePassword} className={classes.icnColor} />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.marginTextFeld}>
                                    <Field
                                        component={FormikTextField}
                                        onPasteCapture={this.handlePaste}
                                        label="New Password"
                                        name="newpassword"
                                        onChange={this.handleChange}
                                        fullWidth
                                        variant="filled"
                                        InputProps={{
                                            type: this.state.newpassword,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {this.state.showNewPassword ? <Visibility onClick={this.handleShowNewPassword} className={classes.icnColor} /> : <VisibilityOff onClick={this.handleHideNewPassword} className={classes.icnColor} />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.marginTextFeld}>
                                    <Field
                                        component={FormikTextField}
                                        onPasteCapture={this.handlePaste} s
                                        label="Confirm New Password"
                                        fullWidth
                                        name="cnfpassword"
                                        onChange={this.handleChange}
                                        variant="filled"
                                        InputProps={{
                                            type: this.state.confPassword,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {this.state.showCnfPassword ? <Visibility onClick={this.handleShowConfPassword} className={classes.icnColor} /> : <VisibilityOff onClick={this.handleHideConfPassword} className={classes.icnColor} />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {this.state.isError && <SuccessDialog successButton={successButton} HeaderText="Error While Re-Setting the Password" BodyText={this.state.errorMessage} dismiss={this.handleClose} />}
                {this.state.isSuccess && <SuccessDialog successButton={successButton} HeaderText="Success" BodyText={this.state.successMessage} dismiss={this.handleClose} />}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(ResetPassword));
