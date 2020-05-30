import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, withWidth, Menu, Button } from '@material-ui/core';
import Accountant from "./Accountant";
import Faculty from "./Faculty";
import Principal from "./Principal";
import Student from "./Student";
import Examination from "./Examination";
import HomeDashboard from './HomeDashboard';
import Events from './Events';
import Notifications from './Notifications';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import TimeTable from './TimeTable';
import OurGoal from './OurGoal';
import HomeNavbar from '../../components/HomeNavebar';
import { NavLink } from 'react-router-dom'

const styles = theme => ({
    pad60: { padding: "30px" },
    navLink: { padding: "20px 30px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    login: { width: "410px", marginLeft: "33%", marginTop: "15%", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } },
    headPop: {padding: "20px 30px", float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },

});

class HomePage extends React.Component {
    state = {
        anchorEl: null
    }
    handleClick = () =>{
        this.props.history.push('../public/teachers')
    }
    render() {
        const { anchorEl } = this.state;
        const { match, width, classes } = this.props;
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/Home`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/aboutus`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>About Us</NavLink>,
                <NavLink to={`${match.url}/contactus`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Contact Us</NavLink>,
            ];
        } else {
        Nav = [
            <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.headPop}
            >Login</Button>,
            <NavLink to={`${match.url}/dashboard`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/aboutus`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>About Us</NavLink>,
            <NavLink to={`${match.url}/contactus`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Contact Us</NavLink>
        ];
    }
        return (
            <div key={this.props}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <div>
                            <HomeNavbar Nav={Nav} homeLink={'./studentlist'} />
                            <Switch>
                                <Route path={this.props.match.url + "/dashboard"} component={HomeDashboard} />
                                <Route path={this.props.match.url + "/principal"} component={Principal} />
                                <Route path={this.props.match.url + "/accountant"} component={Accountant} />
                                <Route path={this.props.match.url + "/faculty"} component={Faculty} />
                                <Route path={this.props.match.url + "/examination"} component={Examination} />
                                <Route path={this.props.match.url + "/student"} component={Student} />
                                <Route path={this.props.match.url + "/timetable"} component={TimeTable} />
                                <Route path={this.props.match.url + "/events"} component={Events} />
                                <Route path={this.props.match.url + "/ourgoal"} component={OurGoal} />
                                <Route path={this.props.match.url + "/notifications"} component={Notifications} />
                                <Route path={this.props.match.url + "/aboutus"} component={AboutUs} />
                                <Route path={this.props.match.url + "/contactus"} component={ContactUs} />
                                <Redirect to={this.props.match.url + "/dashboard"} />
                            </Switch>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(withWidth()(HomePage)));
