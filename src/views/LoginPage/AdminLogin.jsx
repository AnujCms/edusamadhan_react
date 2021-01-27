import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { withStyles, InputAdornment, Button, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import WithUser from "./WithUser";
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import ErrorDialog from '../../components/ErrorDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import queryString from 'query-string';
import Spinner from '@material-ui/core/CircularProgress';

const styles = theme => ({
  // submitButton: { color: "#fff", background: "orange", width: "250px", borderRadius: "25px" },
  submitButton: {
    color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, width: "250px", borderRadius: "25px",
    '&:hover': {
      backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder
    }
  },
  loginBtnStyle:{textAlign:"center"},
  inputItem: { width: "100%", marginBottom: "15px" },
  icnColor: { cursor: "pointer" },
  OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonBackground } },
  loginCard: { width: "400px", height: "250px" },
  cardHeading: { paddingTop: "10px", textAlign: "center", fontSize: "20px" }
});
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.yupSchema = object().shape({
      username: string().required("Username is required."),
      password: string().required("Password can not be blank.")
    });

    this.state = { isLoginBtnDisabled: false, isLoginCompleted: false, renderto: '', forceRedirect: false, loginSucess: false, userError: '', lockAccount: false, blockedMessage: "", password: "password", showPassword: true }
  }

  handleSubmit = (values, { setSubmitting }) => {
    this.setState({ isLoginCompleted: true, isLoginBtnDisabled: true })
    axios.post('/api/providerauthservice/login', {
      username: values.username,
      password: values.password

    }).then(response => {
      let { redirectTo } = queryString.parse(this.props.location.search);
      if (response.data.status === 1) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        if (response.data.userrole === 'FirstTime') {
          this.setState({ isLoginBtnDisabled: false, renderto: '/firsttimelogin/' + this.props.currentUser.userDetails.role, forceRedirect: true });
        } else {
          this.setState({ isLoginBtnDisabled: false })
          if (redirectTo) {
            this.setState({ renderto: redirectTo });
          }
          else if (response.data.userrole === 'SuperAdmin') {
            this.setState({ renderto: '/superadmin' })
          }
          else if (response.data.userrole === 'Director') {
            this.setState({ renderto: '/director' })
          }
          else if (response.data.userrole === 'Principal') {
            this.setState({ renderto: '/principal' })
          }
          else if (response.data.userrole === 'Manager') {
            this.setState({ renderto: '/manager' })
          }
          else if (response.data.userrole === 'Teacher') {
            this.setState({ renderto: '/teacher' })
          }
          else if (response.data.userrole === 'ExamHead') {
            this.setState({ renderto: '/entranceexamehead' })
          }
          else if (response.data.userrole === 'FeeAccount') {
            this.setState({ renderto: '/feeaccount' })
          }
          else if (response.data.userrole === 'Student') {
            this.setState({ renderto: '/student' })
          }
          else if (response.data.userrole === 'EntranceStudent') {
            this.setState({ renderto: '/entrance' })
          } else if (response.data.userrole === 'EntranceCompleted') {
            this.setState({ renderto: '/entrancecompleted' })
          }
        }
        this.setState({ loginSucess: true, isLoginCompleted: true });
        this.props.currentUser.changeUser({
          name: 'abcd',
          isAuthenticated: true,
          role: response.data.userrole,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userId: response.data.userId,
          aadharNumber: response.data.aadharNumber,
          studentName: response.data.studentName,
          accountId: response.data.accountId,
          configData: response.data.configData,
          accountName: response.data.accountName,
          userType: response.data.userType,
          image: response.data.image,
          entranceExamType: response.data.entranceExamType,
          mediumType: response.data.mediumType
        });

      }
      else if (response.data.status === 0) {
        this.setState({
          isLoginBtnDisabled: false, isLoginCompleted: false,
          userError: response.data.warningmessage
        })
      }
      else if (response.data.status === 2 || response.data.status === 3 || response.data.status === 4) {
        this.setState({
          lockAccount: true, isLoginBtnDisabled: false, isLoginCompleted: false,
          blockedMessage: response.data.warningmessage
        })
      } else {
        this.setState({ isLoginBtnDisabled: false, isLoginCompleted: false })
      }
    })
      .catch(function (error) {
      });
  }
  async componentDidMount() {
      if (localStorage.getItem("refreshToken")) {
        let result = await axios({
            method: 'post',
            url: '/api/providerauthservice/accessTokenByRefershToken',
            data: { refreshToken: localStorage.getItem("refreshToken") }
        });
        if (result.status === 200) {
          localStorage.setItem("accessToken", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken)
          if (result.data.userrole === 'SuperAdmin') {
              this.props.history.push(`/superadmin`);
          }
          else if (result.data.userrole === 'Principal' ) {
              this.props.history.push(`/principal`);
          }
          else if (result.data.userrole === 'Teacher') {
              this.props.history.push(`/teacher`);
          }
          else if (result.data.userrole === 'ExamHead') {
              this.props.history.push(`/entranceexamehead`);
          }
          else if (result.data.userrole === 'FeeAccount') {
            this.props.history.push(`/feeaccount`);
        }
        else if (result.data.userrole === 'Student') {
          this.props.history.push(`/student`);
      }
          else if (result.data.userrole === 'EntranceStudent') {
              this.props.history.push(`/entrance`);
          }
          else if (result.data.userrole === 'FirstTime') {
            this.props.history.push(`/firsttimelogin`);
        }
      }
    }
  }
  backLogin = () => {
    this.setState({ lockAccount: false })
    this.props.history.push(`/public`)
  }
  handleShowPassword = () => {
    this.setState({ password: "text", showPassword: false })
  }
  handleHidePassword = () => {
    this.setState({ password: "password", showPassword: true })
  }
  handleForgetPassword = () => {
    this.props.history.push(`/ForgetPassword`)
  }
  render() {
    const { classes } = this.props;
    const OkButton = [<Button className={classes.OkButton} onClick={this.backLogin}>Ok</Button>]
    const HeaderText = this.state.blockedMessage;
    const loginCompleted = this.props.currentUser.userDetails.isAuthenticated && this.state.loginSucess || this.state.forceRedirect;
    return (
      <div>
        {this.state.isLoginCompleted && <Spinner style={{ position: "absolute", top: "0%", left: "45%" }} />}
        {loginCompleted ? (
          <Redirect to={this.state.renderto} />) : (
            <Formik initialValues={{ username: "", password: "" }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}
            >
              {(props) => (
                <Form>
                  <Typography className={classes.cardHeading}>User Login</Typography>
                  <Field
                    component={FormikTextField}
                    label="Username"
                    id="username"
                    name="username"
                    fullWidth
                    variant="filled"
                    className={classes.inputItem + " " + "selectstyle"}
                    InputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Field
                    component={FormikTextField}
                    label="Password"
                    id="password"
                    fullWidth
                    className={classes.inputItem + " " + "selectstyle"}
                    name="password"
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
                  <p style={{ color: "red" }} >{this.state.userError}</p>
                  <Link style={{ textDecoration: "none", color: "blue", marginBottom: "10px", fontSize:"18px" }} to={"/homepage/dashboard"}>Back To Home</Link>
                  <Link style={{ textDecoration: "none", color: "blue", marginBottom: "10px",  fontSize:"18px", float: "right" }} to={"/public/ForgetPassword"}>Forgot Password</Link>
                  <div className={classes.loginBtnStyle} disabled={props.isSubmitting} >
                    <Button type="submit" disabled={this.state.isLoginBtnDisabled} className={classes.submitButton}>Login</Button>
                  </div>
                </Form>
                )}
            </Formik>
              )}
              {(this.state.lockAccount ? <ErrorDialog successButton={OkButton} HeaderText={HeaderText} dismiss={this.backLogin} /> : "")}
      </div>
          );
      }
    }
    
    export default withStyles(styles)(WithUser(LoginPage));
