import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import StudentFee from './StudentFee';
import StudentPayFee from './StudentPayFee';
import ManageFee from './CreateFeeStructure';
import FeeDetails from './FeeDetails';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom'
import { Switch, Route, Redirect } from "react-router-dom";
import SessionTimer from '../../TimeOutRenderer';
import { Menu, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, withWidth, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import TeacherImage from '../../assets/images/admin.png';
import FeeAccountProfile from './FeeAccountProfile';
import FeeAccountNotifications from './FeeAccountNotifications';
import FeeDetailsMobile from './FeeDetailsMobile';
import FullClassFeeDetails from './FullClassFeeDetails';
import ClassFeeDetails from './ClassFeeDetails';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountantEvents from './AccountantEvents';
import EmojiEventsIcon from '@material-ui/icons/EventSeat';
import NotificationDetails from './NotificationDetails';
import EventDetails from './EventDetails';
import TimeTable from '../TimeTable/TimeTable';
import StudentList from './StudentList';
import ViewAllFeeDetails from './ViewAllFeeDetails';
import TransportFeeList from './TransportFeeList';
import TransportCreate from './TransportCreate';
import ExpenseList from './ExpenseList';
import ExpenseCreate from './ExpenseCreate';
import StaffSalaryView from './StaffSalaryView';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    simpleMenu: { minWidth: "inherit !important" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    avatar: { width: 50, height: 50 },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { margin: theme.spacing.unit, minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class FeeAccount extends React.Component {
    state = { anchorEl: null, isLogout: false };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleLogout = () => {
        this.setState({ isLogout: true })
    }
    handlepopClose = () => {
        this.setState({ anchorEl: false })
    }
    render() {
        var isImage = false;
        const { classes, match, width } = this.props;
        const { anchorEl } = this.state;
        if (this.props.currentUser.userDetails.image) {
            isImage = true;
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/studentfee`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/feedetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Fee Details</NavLink>,
                <NavLink to={`${match.url}/managetransport`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Transport</NavLink>,
                <NavLink to={`${match.url}/manageexpense`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Other Expenses</NavLink>,
                <NavLink to={`${match.url}/staffsalary`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>View Staff Salary</NavLink>,
                <NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>View Fee Details</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/notifications`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile+" "+classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>
            ];
        } else {
            var Nav = [
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.headPop}
                >
             <p style={{ marginRight: "15px" }}>{this.props.currentUser.userDetails.firstname} </p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.currentUser.userDetails.image) : TeacherImage} className={this.props.classes.avatar} />
                </Button>,
                <div className={classes.selectLink + " " + classes.formControl}>
                    <Typography variant="h6">{this.props.currentUser.userDetails.accountname}</Typography>
                </div>,
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handlepopClose}
                >
                    <div className={classes.simpleMenu}>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PersonIcon className={classes.btnIcon}/><NavLink to={`${match.url}/staffsalary`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Staff Salary</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOnIcon className={classes.btnIcon}/><NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>View Full Fee</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EmojiEventsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/timetable`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Time Table</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><NotificationsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/notifications`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><AccessAlarmIcon className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><AccessAlarmIcon className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Re-Set Pssword</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PersonIcon className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToAppIcon className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentslist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/feedetails`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Fee</NavLink>,
                <NavLink to={`${match.url}/managetransport`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Transport</NavLink>,
                <NavLink to={`${match.url}/manageexpense`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Other Expenses</NavLink>,
                <NavLink to={`${match.url}/paystudentfee`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Pay Fee</NavLink>
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentslist'} isLogout={this.state.isLogout} userDetails={this.props.currentUser.userDetails} />
                <Switch>
                   <Route path={`${match.url}/paystudentfee`} render={(props) => <StudentFee classs={props.match.params.classs} {...props} />} />
                    <Route path={`${match.url}/studentfee`} render={(props) => <StudentPayFee classs={props.match.params.classs} {...props} />} />
                    <Route path={`${match.url}/studentslist`} render={(props) => <StudentList classs={props.match.params.classs} {...props} />} />
                    <Route path={`${match.url}/createfee`} render={(props) => <ManageFee />} />
                    <Route path={`${match.url}/edit-feedetails/:classs`} render={(props) => <ManageFee classs={props.match.params.classs} {...props} />} />
                    <Route path={`${match.url}/edit-transport/:transportfeeid`} render={(props) => <TransportCreate transportfeeid={props.match.params.transportfeeid} {...props} />} />
                    <Route path={`${match.url}/edit-expense/:expensedetailsid`} render={(props) => <ExpenseCreate expensedetailsid={props.match.params.expensedetailsid} {...props} />} />
                    <Route path={`${match.url}/feedetails`} component={FeeDetails} {...this.props} />
                    <Route path={`${match.url}/notifications`} component={FeeAccountNotifications} />
                    <Route path={`${match.url}/profile`} component={FeeAccountProfile} />
                    <Route path={`${match.url}/eventDetails`} component={EventDetails} />
                    <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                    <Route path={`${match.url}/eventslist`} component={AccountantEvents} />
                    <Route path={`${match.url}/studentfeedetails`} component={FeeDetailsMobile} />
                    <Route path={`${match.url}/fullclassfeedetails`} component={FullClassFeeDetails} />
                    <Route path={`${match.url}/viewallfeedetails`} component={ViewAllFeeDetails} />
                    <Route path={`${match.url}/classfeedetails`} component={ClassFeeDetails} />
                    <Route path={`${match.url}/timetable`} component={TimeTable} />
                    <Route path={`${match.url}/managetransport`} component={TransportFeeList} />
                    <Route path={`${match.url}/manageexpense`} component={ExpenseList} />
                    <Route path={`${match.url}/createtransport`} component={TransportCreate} />
                    <Route path={`${match.url}/createexpense`} component={ExpenseCreate} />
                    <Route path={`${match.url}/staffsalary`} component={StaffSalaryView} />
                    <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                    <Redirect to={`${match.url}/studentslist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["FeeAccount"])(FeeAccount)));