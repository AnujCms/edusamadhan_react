import React from 'react';
import { withStyles, InputAdornment, Button, Typography } from "@material-ui/core";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import { Formik, Form, Field } from 'formik';
import { string, object, ref } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import AuthenticatedPage from "../AuthenticatedPage";
import { Helmet } from "react-helmet";
import SuccessDialog from '../../components/SuccessDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    primaryBtn: {
        color: theme.palette.text.textPrimaryColor,
        backgroundColor: theme.palette.primary.main,
        border: "1px solid " + theme.palette.border.primaryBorder,
        width: "50%",
        borderRadius: "25px",
        padding: "10px",
        '&:hover': {
            backgroundColor: theme.palette.hoverPrimaryColor.main,
            color: theme.palette.text.hoverTextPrimaryColor,
            border: "1px solid " + theme.palette.border.hoverPrimaryBorder,
        }
    },
    icnColor: { cursor: "pointer" },
    secondaryBtn: { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.textSecondaryColor, border: "1px solid " + theme.palette.border.secondaryBorder, marginLeft: "5px", marginTop: "10px", borderRadius: "25px", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", "&:hover": { backgroundColor: theme.palette.hoverSecondaryColor.main, color: theme.palette.text.hoverTextSecondaryColor, border: "1px solid " + theme.palette.border.hoverSecondaryBorder } },
    paperHeader: { marginTop: "15px", textAlign: "center" },
    clr_title: { color: theme.palette.text.title, fontSize: "28px" },
    marginTextFeld: { padding: "15px" },
    btnStyle:{ textAlign: "center", marginTop:"20px" }

});

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        const { t } = this.props;
        this.formikValidation = object().shape({
            oldpassword: string().required('This field is required.'),
            newpassword: string().required('This field is required.').min(8, "Password should be atleast 8 chanrecters long.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password should contains 1 Special Charectr, 1 Number, 1 Upper Case."),
            cnfpassword: string().required('This field is required.').oneOf([ref('newpassword')], "Paswword is not matching." )
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
    handleClose = ()=>{
        this.setState({isSuccess: false, isError: false})
    }
    render() {
        const { classes, t } = this.props;
        const successButton = [<Button className={classes.secondaryBtn} onClick={this.handleClose}>Ok</Button>];
        return (
            <div>
                <Helmet>
                    <title>Re-Set Password</title>
                </Helmet>
                <Card className={classes.root}>
                    <Typography className={classes.paperHeader}><b className={classes.clr_title}>Re-Set Password</b></Typography>
                    <Formik initialValues={{ oldpassword: "", newpassword: "", cnfpassword: "" }} onSubmit={this.handleSubmit} validationSchema={this.formikValidation}
                    >
                        {(props) => (
                            <Form>
                                <Card style={{ boxShadow: "none" }}>
                                    <CardBody>
                                        <br />
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={7} lg={7} className={classes.marginTextFeld}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="Old Password"
                                                    name="oldpassword"
                                                    onChange={this.handleChange}
                                                    fullWidth
                                                    variant="filled"
                                                    InputProps={{
                                                        type: this.state.password,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {this.state.showPassword ? <VisibilityIcon onClick={this.handleShowPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHidePassword} className={classes.icnColor} />}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                /><br />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={7} lg={7} className={classes.marginTextFeld}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="New Password"
                                                    name="newpassword"
                                                    onChange={this.handleChange}
                                                    fullWidth
                                                    variant="filled"
                                                    InputProps={{
                                                        type: this.state.newpassword,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {this.state.showNewPassword ? <VisibilityIcon onClick={this.handleShowNewPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHideNewPassword} className={classes.icnColor} />}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <br />
                                            <GridItem xs={12} sm={12} md={7} lg={7} className={classes.marginTextFeld}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="Confirm New Password"
                                                    onPasteCapture={this.handlePaste}
                                                    fullWidth
                                                    name="cnfpassword"
                                                    onChange={this.handleChange}
                                                    variant="filled"
                                                    InputProps={{
                                                        type: this.state.confPassword,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {this.state.showCnfPassword ? <VisibilityIcon onClick={this.handleShowConfPassword} className={classes.icnColor} /> : <VisibilityOffIcon onClick={this.handleHideConfPassword} className={classes.icnColor} />}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                                <br />
                                                <div className={classes.btnStyle}>
                                                    <Button type="submit" className={classes.primaryBtn} size="small" >Submit</Button>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Card>
                {this.state.isError &&<SuccessDialog successButton={successButton} HeaderText="Error While Re-Setting the Password" BodyText={this.state.errorMessage} dismiss={this.handleClose} /> }
                {this.state.isSuccess && <SuccessDialog successButton={successButton} HeaderText="Success" BodyText={this.state.successMessage} dismiss={this.handleClose} />}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(ResetPassword));
