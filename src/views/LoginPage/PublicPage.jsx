import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from "./AdminLogin";
import ForgetPassword from "../ResetPassword/ForgotPassword";
import BGimage from '../../assets/images/bglogo.png';
import logo from '../../assets/images/logo.jpg';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, Card } from '@material-ui/core';
import ResetPassword from './ResetPassword'; 
import l from '../../assets/images/l.jpg';

const styles = theme => ({
    main:{
        width: '100%',
        backgroundImage:`url(${l})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:'cover',
        backgroundPosition:'center',
        height:'720px'
      },
    navLink: { padding: "5px 15px",  textDecorationLine: "none", display: "inline-flex", float: "right" },
    pad60: { padding: "30px" },
    login:{ padding:"20px", backgroundColor:"#DCDCDC", width:"410px", marginLeft:"36%", marginTop:"12%", [theme.breakpoints.down('md')]: { marginLeft:0,  paddingTop: '15px' } }
});

class PublicPage extends React.Component {
    render() {
        const { match, classes } = this.props;
        return (
            <div key={this.props}  className={classes.main}>
                <GridContainer>
                    <Card xs={12} sm={12} md={12} lg={12} className={classes.login}>
                      <div>
                            <Switch>
                                <Route path={this.props.match.url + "/ResetPassword"} component={ResetPassword} />
                                <Route path={this.props.match.url + "/ForgetPassword"} component={ForgetPassword} />
                                <Route path={this.props.match.url + "/teachers"} component={Login} />
                                <Redirect to={this.props.match.url + "/teachers"} />
                            </Switch>
                        </div>
                    </Card>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(PublicPage));
