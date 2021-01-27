import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { withStyles, InputAdornment, Button, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Formik, Form, Field } from 'formik';
import { string, object, boolean, ref } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
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
  passwordTitle: {
    color: "#00C0F1",
    fontSize: "16px"
  },
  invalidtoken: {
    color: 'red'
  },
  resetPasswordDialog: {
    backgroundColor: "#db6336",
    borderRadius: "25px",
    fontSize: "12px",
    color: "#fff",
    padding: "10px",
    width: "80px"
  },
  LoginHeading: { fontSize: "30px !important", fontWeight: "900 !important", color: "rgba(0, 0, 102, 1) !important" },
  icnColor: { cursor: "pointer" },
  loginSuccess: { fontSize: "18px", fontWeight: "500", marginBottom: "15px" },
  cardFooter: { justifyContent: "flex-end", padding: 0, margin: "30px 0 20px" },

});

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.formikValidation = object().shape({
      password: string().required("This field is required.").min(8, "Password shuold be atleast 8 characters long.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password is not correct."),
      cnfpassword: string().required("This field is required.").oneOf([ref('password')], "Password must be equal."),
      acceptTerms: boolean().required('').oneOf([true], '')
    });

    this.state = {
        successMessage: "",
      resetPassworSuccess: true,
      invalidToken: "",
      password: "password", showPassword: true, confPassword: "password", showCnfPassword: true
    }
  }
  
  handleChange = (name) => event => {
    this.setState({ [name]: event.target.checked, });
  };

  handleSubmit = async (values) => {
    const parsed = queryString.parse(this.props.location.search);
    axios.post('/api/providerauthservice/resetPassword', {
      token: parsed.reset_token,
      password: values.password,
      cnfpassword: values.cnfpassword
    }).then(response => {
      if (response.data.status === 1) {
        this.setState({ resetPassworSuccess: false, successMessage:response.data.statusDescription })
      } else if(response.data.status === 0) {
        this.setState({ invalidToken: "Token has been expired." })
      }
    })
      .catch(function (error) {
      });
  }
  //handle dismissDialog
  dismissDialog = () => {
    this.setState({ resetPassworSuccess: true });
    this.props.history.replace(`../login`)
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
  handlePaste = (e) => {
    e.preventDefault();
}
  render() {

    const { classes, t } = this.props;
    return (
      <div>
        <Helmet>
          <title>Change Password </title>
        </Helmet>
        {(this.state.resetPassworSuccess ? <Formik initialValues={{ password: "", cnfpassword: "", acceptTerms: false }} onSubmit={this.handleSubmit} validationSchema={this.formikValidation}
        >
          {(props) => (
            <Form>
              <Card style={{ boxShadow: "none" }}>
                <CardBody>
                  <Typography className={classes.LoginHeading}>Set New Password</Typography>
                  <br />
                  <Field
                    component={FormikTextField}
                    label="New Password"
                    name="password"
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
                  />
                  <p>Rules: <span style={{ color: "rgba(65, 117, 5, 1)" }}>8 characters</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>abc</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>123</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>@!$%^*()</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>≠ email</span></p>
                  <br/>
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
                  <div className={classes.invalidtoken}>{this.state.invalidToken}</div>
                  <br/>
                  <div style={{ textAlign: "center" }}>
                    <Button type="submit" className={classes.primaryBtn} size="small" > Confirm </Button>
                  </div>
                </CardBody>
                <CardFooter className={classes.cardFooter} disabled={props.isSubmitting} >
                  <GridContainer>

                    <br />
                    <GridItem xs={12} sm={12} md={12} lg={12} style={{ paddingLeft: "0" }}>
                      <FontAwesomeIcon icon={faChevronLeft} style={{color:"rgba(34, 98, 191, 1)"}}/>&nbsp; <Link style={{color:"rgba(34, 98, 191, 1)"}} to={"/public/teachers/"}>Back</Link>
                    </GridItem>
                  </GridContainer>

                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik> :
          <Card style={{ boxShadow: "none" }}>
            <CardBody>
              <Typography className={classes.LoginHeading}>Success</Typography><br />
              <Typography variant="h4" color="inherit" className={classes.loginSuccess}>{this.state.successMessage}</Typography>
            </CardBody>
            <br />
            <CardFooter className={classes.cardFooter} >
              <Button className={classes.primaryBtn} style={{width:"100%"}} size="small" onClick={this.dismissDialog}>Continue </Button>
            </CardFooter>
          </Card>)}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResetPassword);
