import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { withStyles, InputAdornment, Button, Grid, Typography, Card, CardBody, CardFooter } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import { string, object, ref } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  primaryBtn: {color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, width: "50%", borderRadius: "25px", padding: "10px",
    '&:hover': {backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder }},
  invalidtoken: { color: 'red' },
  LoginHeading: { fontSize: "30px !important", fontWeight: "900 !important", color: "rgba(0, 0, 102, 1) !important" },
  icnColor: { cursor: "pointer" },
  loginSuccess: { fontSize: "18px", fontWeight: "500", marginBottom: "15px" },
  cardFooter: { justifyContent: "flex-end", padding: 0, margin: "30px 0 20px" }
});

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.formikValidation = object().shape({
      password: string().required('This field is required.').min(8, "Password can not be less than 8 charecters.").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, "Password not matching required criteria."),
      cnfpassword: string().required('This field is required.').oneOf([ref('password')], "Password is not matching.")
    });

    this.state = {
      resetPassworSuccess: true,
      invalidToken: "",
      language: this.props.i18n.language,
      password: "password", showPassword: true, confPassword: "password", showCnfPassword: true
    }
  }
  
  handleChange = (name) => event => {
    this.setState({ [name]: event.target.checked, });
  };

  handleSubmit = async (values) => {
    const parsed = queryString.parse(this.props.location.search);

    axios.post('/api/admin/providerauthservChange', {
      token: parsed.reset_token,
      password: values.password,
      cnfpassword: values.cnfpassword
    }).then(response => {
      if (response.data.status === 1) {
        this.setState({ resetPassworSuccess: false })
      } else {
        this.setState({ invalidToken: "Invalid token" })
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

    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Change Password
          </title>
        </Helmet>
        {(this.state.resetPassworSuccess ? <Formik initialValues={{ password: "", cnfpassword: "" }} onSubmit={this.handleSubmit} validationSchema={this.formikValidation}
        >
          {(props) => (
            <Form>
              <Card style={{ boxShadow: "none" , marginBottom:0}}>
                <CardBody>
                  <Typography className={classes.LoginHeading}>Set a new Password</Typography>
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
                  {/* <p>{t('login.P__LOGIN_RULES')} <span style={{ color: "rgba(65, 117, 5, 1)" }}>{t('login.P__LOGIN_EIGHT_CHARACTERS')}</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>{t('login.P__LOGIN_ABC')}</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>123</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>@!$%^*()</span> | <span style={{ color: "rgba(65, 117, 5, 1)" }}>≠ email</span></p> */}
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
                  <div style={{ textAlign: "right" }}>
                    <Button type="submit" className={classes.primaryBtn} size="small" >
                      Confirm
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className={classes.cardFooter} disabled={props.isSubmitting} >
                  <Grid container>
                    <br />
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ paddingLeft: "0" }}>
                      <FontAwesomeIcon icon={faChevronLeft} style={{color:"rgba(34, 98, 191, 1)"}}/>&nbsp; <Link style={{color:"rgba(34, 98, 191, 1)"}} to={"/guest/Login/"}>Back To Login</Link>
                    </Grid>
                  </Grid>

                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik> :
          <Card style={{ boxShadow: "none" }}>
            <CardBody>
              <Typography className={classes.LoginHeading}>Success</Typography><br />
              <Typography variant="h4" color="inherit" className={classes.loginSuccess}>Your Passowrd has been changed successfully.</Typography>
            </CardBody>
            <br />
            <CardFooter className={classes.cardFooter} >
              <Button className={classes.primaryBtn} style={{width:"100%"}} size="small" onClick={this.dismissDialog}>
                Login
              </Button>
            </CardFooter>
          </Card>
          )}
      </div>
    );
  }
}

export default withStyles(styles)(ChangePassword);
