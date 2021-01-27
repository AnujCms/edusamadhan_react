import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { Switch, Route, Redirect } from "react-router-dom";
import { studentObj, StudentContextProvider } from '../StudentContext';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import {Person, Notifications, ExitToApp, EventSeat, Refresh, Home, Notes, Details} from '@material-ui/icons';
import { withStyles, withWidth, Button, Menu, MenuItem, Avatar, Typography } from '@material-ui/core';
import TeacherImage from '../../assets/images/admin.png';
import StudentDetails from './StudentDetails';
import StudentLogbook from './StudentLogbook';
import Logbook from '../Logbook/Logbook';
import StudentProfile from '../UserProfile/Profile';
import StudentEvents from '../Events/ViewEvents/EventsList';
import StudentPayFee from '../Accountant/ManageStudentFee/StudentPayFee';
import StudentNotifications from '../Notifications/ViewNotifications/NotificationsList';
import ViewTimeTable from '../TimeTable/TimeTable';
import ResetPassword from '../ResetPassword/ResetPassword';
import StudentReport from '../Teacher/StudentReport/StudentReportHome';
import HomeWork from '../Teacher/ClassWork/HomeWork';
import NoticeHome from '../Teacher/Notice/NoticeHome';
import ParentDetails from '../Teacher/StudentParentDetails/StudentParentDetails';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class StudentHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          patients: [],
            isLogout: false, anchorEl: null, studentDetails: studentObj, changeStudent: this.changeStudent
        };
    }

    changeStudent = (userObj) => {
        if (userObj) {
            this.setState({ studentDetails: userObj })
        } else {
            this.setState({ studentDetails: studentObj })
        }
    }

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
        var studentName = {
            firstname: this.props.currentUser.userDetails.studentname,
            lastname: '',
            image: this.props.currentUser.userDetails.image
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/studentdetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/studentReport`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Report</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/homework`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home Work</NavLink>,
                <NavLink to={`${match.url}/noticehome`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Notice</NavLink>,
                <NavLink to={`${match.url}/parentdetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Parent Details</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Change Password</NavLink>,
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
                    <p style={{ marginRight: "15px" }}>{this.props.currentUser.userDetails.firstName} </p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.currentUser.userDetails.image) : TeacherImage} className={this.props.classes.avatar} />
                </Button>,
                <div className={classes.selectLink + " " + classes.formControl}>
                    <Typography variant="h6">{this.props.currentUser.userDetails.accountName}</Typography>
                </div>,
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handlepopClose}
                >
                    <div className={classes.simpleMenu}>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Home className={classes.btnIcon}/><NavLink to={`${match.url}/homework`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Home Work</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notes className={classes.btnIcon}/><NavLink to={`${match.url}/noticehome`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notice</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Details className={classes.btnIcon}/><NavLink to={`${match.url}/parentdetails`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Parent Details</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notifications className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EventSeat className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Refresh className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentdetails`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/studentReport`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Report</NavLink>,
                <NavLink to={`${match.url}/studentlogbook`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Logbook</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentdetails'} history={this.props.history} userDetails={studentName} isLogout={this.state.isLogout} />
                <StudentContextProvider value={this.state}>
                    <Switch>
                        <Route path={`${match.url}/studentdetails`} component={StudentDetails} /> 
                        <Route path={`${match.url}/profile`} component={StudentProfile} />
                        <Route path={`${match.url}/eventslist`} component={StudentEvents} />
                        <Route path={`${match.url}/notificationslist`} component={StudentNotifications} />
                        <Route path={`${match.url}/timetable`} component={ViewTimeTable} />
                        <Route path={`${match.url}/studentfee`} component={StudentPayFee} /> 
                        <Route path={`${match.url}/homework`} component={HomeWork} />
                        <Route path={`${match.url}/parentdetails`} render={(props) => <ParentDetails studentId={this.props.currentUser.userDetails.userId}  />} />
                        <Route path={`${match.url}/noticehome`} render={(props) => <NoticeHome studentId={this.props.currentUser.userDetails.userId}  />} />
                        <Route path={`${match.url}/studentReport`} render={(props) => <StudentReport studentId={this.props.currentUser.userDetails.userId}  />} />
                        <Route path={`${match.url}/studentlogbook`} render={(props) => <StudentLogbook  {...props} />} />
                        <Route path={`${match.url}/logbook/:studentid/:teacherid`} render={(props) => <Logbook teacherid={props.match.params.teacherid} studentid={props.match.params.studentid} key={props.match.params.studentid} {...props} />} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Redirect to={`${match.url}/studentdetails`} ></Redirect>
                    </Switch>
                </StudentContextProvider>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage('Student')(StudentHome)));
