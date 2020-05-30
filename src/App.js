import React, { Suspense } from 'react';
import { defaultUserObj, UserLoggedInContextProvider } from "./views/LoggedInContext";
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import themeCalculator from './ThemeFile';
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Spinner from '@material-ui/core/CircularProgress';
import PublicPage from './views/LoginPage/PublicPage';
import countDownTimer from './views/timeout';
import UnableToLogin from './views/LoginPage/UnableToLogin';
import refreshTokens from "./views/RefreshTokens";
import { Helmet } from "react-helmet";

const SuperAdmin = React.lazy(() => import('./views/SuperAdmin/SuperAdmin'));
const Teacher = React.lazy(() => import('./views/Teacher/Teacher'));
const Principal = React.lazy(() => import('./views/Principal/Principal'));
const StudentHomePage = React.lazy(() => import('./views/Student/StudentHomePage'));
const Parent = React.lazy(() => import('./views/Parent/Parent'));
const TestHomePage = React.lazy(() => import('./views/ExaminationNew/ExamHome'));
const EntranceExamHead = React.lazy(() => import( './views/EntranceExamHead/EntranceExamHead'));
const FeeAccount = React.lazy(() => import('./views/FeeAccount/FeeAccount'));
const FirstTimeLogin = React.lazy(()=> import ('./views/LoginPage/FirstTimeLogin'));
const TermAndCondition = React.lazy(()=> import ('./views/LoginPage/TermAndCondition'));
const PrivacyPolicy = React.lazy(()=> import ('./views/LoginPage/PrivacyPolicy'));
const EntranceCompleted = React.lazy(()=> import ('./views/EntranceCompleted/EntranceCompleted'));
const PrintFeeReciept = React.lazy(()=> import ('./views/FeeAccount/PrintFeeReciept'));
const StudentRegistrationPrint = React.lazy(()=> import ('./views/Teacher/StudentRegistrationPrint'));
const HomePage = React.lazy(()=> import ('./views/HomePage/HomePage'));

class App extends React.Component {

  constructor(props) {
    super(props);

    let lsUserAuth = localStorage.getItem('UserAuth');
    try {
      lsUserAuth = JSON.parse(lsUserAuth);
    }
    catch (error) {
      lsUserAuth = null;
    }
    this.state = {
      userDetails: lsUserAuth ? lsUserAuth : defaultUserObj,
      changeUser: this.changeUser,
      userTimer: countDownTimer(),
      refreshTokens:refreshTokens()
    }
  };


  changeUser = (userObj) => {
    if (userObj) {
      localStorage.setItem('UserAuth', JSON.stringify(userObj));
      this.setState({ userDetails: userObj });
    }
    else {
      localStorage.setItem('UserAuth', JSON.stringify(defaultUserObj));
      this.setState({ userDetails: defaultUserObj });

    }
  };

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>EDU SAMADHAN</title>
          {/* <link rel="icon" type="image/png" href={process.env.PUBLIC_URL + "/favicons/" + this.props._config.favicon} /> */}
        </Helmet>
        <MuiThemeProvider theme={themeCalculator(this.props._config)}>
          <CssBaseline />
          <UserLoggedInContextProvider value={this.state}>
            <Suspense fallback={<Spinner style={{ position: "absolute", top: "50%", left: "50%" }} />}>
              <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                  <Route path={`/studentregistrationprint/:studentid`} component={StudentRegistrationPrint}/>
                  <Route path={`/printfeereciept/:studentid`} component={PrintFeeReciept}/>
                  <Route path='/firsttimelogin/:role' render={(props) =><FirstTimeLogin role={props.match.params.userrole}{...props}/>} />
                  <Route path='/termAndCondition' render={(props) =><TermAndCondition role={props.match.params.userrole}{...props}/>} />
                  <Route path='/privacyPolicy' render={(props) =><PrivacyPolicy role={props.match.params.userrole}{...props}/>} />
                  <Route path='/superadmin' component={SuperAdmin} />
                  <Route path='/principal' component={Principal} />
                  <Route path='/teacher' component={Teacher} />
                  <Route path='/entranceexamehead' component={EntranceExamHead} />
                  <Route path='/feeaccount' component={FeeAccount} />
                  <Route path='/student' component={StudentHomePage} />
                  <Route path='/entrance' component={TestHomePage} />
                  <Route path='/entrancecompleted' component={EntranceCompleted} />
                  <Route path='/public' component={PublicPage} />
                  <Route path='/homepage' component={HomePage} />
                  <Route path='/abcd' component={UnableToLogin} />
                  <Redirect to='/homepage' />
                </Switch>
              </Router>
            </Suspense>
          </UserLoggedInContextProvider>
        </MuiThemeProvider>
      </div>
    )
  };
}
export default App;



// import React from 'react';
// import { defaultUserObj, UserLoggedInContextProvider } from "./views/LoggedInContext"
// import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Spinner from '@material-ui/core/CircularProgress';
// import PublicPage from './views/LoginPage/PublicPage';
// import countDownTimer from './views/timeout';
// import UnableToLogin from './views/LoginPage/UnableToLogin';