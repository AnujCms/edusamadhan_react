import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from "./AdminLogin";
import ForgetPassword from "../ResetPassword/ForgotPassword";
import BGimage from '../../assets/images/bglogo.png';
import logo from '../../assets/images/logo.jpg';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles } from '@material-ui/core/styles';
import ResetPassword from './ResetPassword'; 

const styles = theme => ({
    navLink: { padding: "5px 15px",  textDecorationLine: "none", display: "inline-flex", float: "right" },
    pad60: { padding: "30px" },
    login:{width:"410px", marginLeft:"33%", marginTop:"15%", [theme.breakpoints.down('md')]: { marginLeft:0,  paddingTop: '15px' } }
});

class PublicPage extends React.Component {
    render() {
        const { match, classes } = this.props;
        return (
            <div key={this.props}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} lg={12} className={classes.login}>
                      <div>
                            <Switch>
                                <Route path={this.props.match.url + "/ResetPassword"} component={ResetPassword} />
                                <Route path={this.props.match.url + "/ForgetPassword"} component={ForgetPassword} />
                                <Route path={this.props.match.url + "/teachers"} component={Login} />
                                <Redirect to={this.props.match.url + "/teachers"} />
                            </Switch>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(PublicPage));
