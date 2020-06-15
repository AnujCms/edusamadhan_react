import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { withStyles, withWidth, Typography, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import {Visibility, Person, ExitToApp, MonetizationOn, LockOpen, Notifications, EventSeat, AccessAlarm} from '@material-ui/icons';
import Navbar from '../../components/Navbar';
import formReloader from '../../components/formReloader';
import StudentList from './Students/StudentsList';
import StudentRegistration from './RegisterStudent/StudentRegistration';
import SessionTimer from '../../TimeOutRenderer';
import CreateResult from './StudentResult/Result';
import CreateAttendance from './MonthlyAttendance/CreateAttendance';
import ViewAttendance from './Students/ViewAttendance';
import TeacherProfile from '../UserProfile/Profile';
import StudentDetails from './StudentDetails';
import Logbook from '../Logbook/Logbook';
import StudentPayFee from '../Accountant/ManageStudentFee/StudentPayFee';
import AllStudentsFeeDetails from './Students/AllStudentsFeeList';
import TeacherImage from '../../assets/images/admin.png';
import InactivateStudents from './Students/InactivateStudents';
import TeacherEvents from './TeacherEvents';
import TeacherNotifications from './TeacherNotifications';
import NotificationDetails from './NotificationDetails';
import EventDetails from './EventDetails';
import CreateNotification from '../Notifications/CreateNotification';
import ViewTimeTable from '../TimeTable/TimeTable';
import StudentAttendance from './StudentAttendance/AttendanceHome';
import AttendanceCreate from './StudentAttendance/Attendance';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
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
class Teacher extends React.Component {
    state = {
        accountid: null, openPopUp: true, checkedDontShow: '', anchorEl: null, isLogout: false
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClose = () => {
        this.setState({
            openPopUp: false
        })
        localStorage.setItem("__warningPopUpShown", this.state.checkedDontShow);
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLogout = () => {
        this.setState({ isLogout: true })
    }
    render() {
        var isImage = false;
        const { classes, width, match } = this.props;
        const { anchorEl } = this.state;
        if (this.props.currentUser.userDetails.image) {
            isImage = true;
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/studentlist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/studentattendance`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Attendance</NavLink>,
                <NavLink to={`${match.url}/feedetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Fee Details</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/inactivatestudents`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Inactivate Students</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Re-Set Password</NavLink>
            ];
        } else {
             Nav = [
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.headPop}
                >
                    <p style={{ marginRight: "15px" }}>{this.props.currentUser.userDetails.firstname} </p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.currentUser.userDetails.image) : TeacherImage} className={classes.avatar} />
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/><NavLink to={`${match.url}/inactivatestudents`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Inactivate Students</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOn className={classes.btnIcon}/><NavLink to={`${match.url}/feedetails`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Fee Details</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Visibility className={classes.btnIcon}/><NavLink to={`${match.url}/view-attendance`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>View Attendance</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notifications className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EventSeat className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><AccessAlarm className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Re-Set Pssword</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/studentattendance`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Attendance</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>
            ];
        }

        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentlist'} history={this.props.history} userDetails={this.props.currentUser.userDetails} isLogout={this.state.isLogout} />
                <Switch>
                    <Route path={`${match.url}/edit-registration/:studentid`} render={(props) => <StudentRegistration studentid={props.match.params.studentid} key={props.match.params.studentid} {...props} />} />
                    <Route path={`${match.url}/logbook/:studentid/:teacherid`} render={(props) => <Logbook teacherid={props.match.params.teacherid} studentid={props.match.params.studentid} key={props.match.params.studentid} {...props} />} />
                    <Route path={`${match.url}/view-attendance`} component={ViewAttendance} />
                    <Route path={`${match.url}/createstudent`} component={StudentRegistration} />
                    <Route path={`${match.url}/studentlist`} component={StudentList} />
                    <Route path={`${match.url}/inactivatestudents`} component={InactivateStudents} />
                    <Route path={`${match.url}/feedetails`} component={AllStudentsFeeDetails} />
                    <Route path={`${match.url}/studentfee`} render={(props) => <StudentPayFee adharnumber={props.match.params.adharnumber} key={props.match.params.adharnumber} {...props} />} />
                    <Route path={`${match.url}/eventslist`} component={TeacherEvents} />
                    <Route path={`${match.url}/eventDetails`} component={EventDetails} />
                    <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                    <Route path={`${match.url}/edit-notification/:notificationid`} render={(props) => <CreateNotification notificationid={props.match.params.notificationid} {...props} />}/>
                    <Route path={`${match.url}/createNotification`} component={CreateNotification} />
                    <Route path={`${match.url}/notificationslist`} component={TeacherNotifications} />
                    <Route path={`${match.url}/profile`} component={TeacherProfile} />
                    <Route path={`${match.url}/timetable`} component={ViewTimeTable} />
                    <Route path={`${match.url}/studentattendance`} component={StudentAttendance} />
                    <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                    <Route path={`${match.url}/takeattendance`} component={AttendanceCreate} />
                    <Route path={`${match.url}/create-result/:studentid`} render={(props) => <CreateResult studentid={props.match.params.studentid} key={props.match.params.studentid} />} />
                    <Route path={`${match.url}/create-attendance/:studentid`} render={(props) => <CreateAttendance studentid={props.match.params.studentid} key={props.match.params.studentid} />} />
                    <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                    <Route path={`${match.url}/formReloader`} component={formReloader} />
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["Teacher"])(Teacher)));