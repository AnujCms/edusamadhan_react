import React, { Component } from 'react';
import { AccountContextProvider, WithAccount } from '../AccountContext';
import AuthenticatedPage from "../AuthenticatedPage";
import formReloader from '../../components/formReloader';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles, withWidth, Typography } from '@material-ui/core';
import TeachersList from './CreateUser/TeachersList';
import RegisterTeacher from './CreateUser/CreateTeacher';
import StudentsList from '../Teacher/StudentList/StudentsList';
import ManageSubjects from './ManageSubject/ManageSubjects';
import Logbook from '../Logbook/Logbook';
import AdminMenuItem from './AdminMenuItem';
import TeacherDetails from './TeacherForMobile/TeacherDetails';
import StudentDetails from './TeacherForMobile/StudentDetails';
import PrincipalProfile from '../UserProfile/Profile';
import EventsList from '../Events/ViewEvents/EventsList';
import CreateEvent from '../Events/CreateEvent/CreateEvent';
import NotificationsList from '../Notifications/ViewNotifications/NotificationsList';
import CreateNotification from '../Notifications/CreateNotification/CreateNotification';
import NotificationDetails from '../Notifications/NotificationDetails';
import TimeTable from '../TimeTable/TimeTable';
import CreateTimeTable from '../TimeTable/CreateTimeTable';
import CreatePeriod from '../TimeTable/CreatePeriod';
import ViewAllFeeDetails from '../Accountant/ViewStaffAndFee/ViewAllFeeDetails';
import ResetPassword from '../ResetPassword/ResetPassword';
import HomeWork from '../Teacher/ClassWork/HomeWork';
import StaffAttendance from '../Teacher/StudentAttendance/AttendanceHome';
import AttendanceCreate from '../Teacher/StudentAttendance/Attendance';
import NoticeHome from '../Teacher/Notice/NoticeHome';
import StudentReport from '../Teacher/StudentReport/StudentReportHome';
import StudentParentDetails from '../Teacher/StudentParentDetails/StudentParentDetails';
import StudentPayFee from '../Accountant/ManageStudentFee/StudentPayFee';
import ClassAttendance from '../Teacher/StudentAttendance/AttendanceHome';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    formControl: { minWidth: 120 },
    selectLink: { float: "right", color: "#001C61", fontWeight: "bold !important", lineHeight: 600, margin: "30px 100px" },
    avatar: { width: 50, height: 50 },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } }
});

class AccountAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: '', isLogout: false, anchorEl: null, openPopUp: false, loading: true, account: "", accounts: [], selectedAccountId: "", age: '', name: 'hai', labelWidth: 0
        }
    }

    handleClose = async () => {
        this.getEmergencyDetails();
        this.setState({ openPopUp: false, selectedAccountId: this.state.account.value });
    };
    handleAccountChange = (selectedValue) => {
        this.setState({
            account: selectedValue,
            selectedAccountId: selectedValue.value,
        })
    }
    handleLogout = () => {
        this.setState({ isLogout: true })
    }

    render() {
        var isImage = false;
        const { classes, width, match } = this.props;
        if (this.props.currentUser.userDetails.image) {
            isImage = true;
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/teacherlist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/create-user`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create User</NavLink>,
                <NavLink to={`${match.url}/manage-subjects`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Subject</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/homework`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Home Work</NavLink>,
                <NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Full Class Fee</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Change Password</NavLink>
            ];
        } else {
            Nav = [
                <AdminMenuItem userDetails={this.props.currentUser.userDetails} handleLogout={this.handleLogout} match={this.props.match} ></AdminMenuItem>,
                <div className={classes.selectLink + " " + classes.formControl}>
                    <Typography variant="h6">{this.props.currentUser.userDetails.accountName}</Typography>
                </div>,
                <NavLink to={`${match.url}/teacherlist`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/create-user`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create User</NavLink>,
                <NavLink to={`${match.url}/manage-subjects`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Subjects</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage TimeTable</NavLink>,
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./teacherlist'} isLogout={this.state.isLogout} userDetails={this.props.currentUser.userDetails} />
                <AccountContextProvider value={this.props.currentUser.userDetails.accountid}>
                    <Switch>
                        <Route path={`${match.url}/logbook/:studentid/:teacherId`} render={(props) => <Logbook studentId={props.match.params.studentId} teacherId={props.match.params.teacherId} key={props.match.params.studentid} {...props} />} />
                        <Route path={`${match.url}/studentslist/:teacherId`} render={(props) => <StudentsList teacherId={props.match.params.teacherId} {...props} />} />
                        <Route path={`${match.url}/manage-subjects`} component={WithAccount(ManageSubjects)} />
                        <Route path={`${match.url}/edit-account/:teacherId`} render={(props) => <RegisterTeacher teacherId={props.match.params.teacherId} {...props} />} />
                        <Route path={`${match.url}/edit-event/:eventId`} render={(props) => <CreateEvent eventId={props.match.params.eventId} {...props} />} />
                        <Route path={`${match.url}/edit-notification/:notificationId`} render={(props) => <CreateNotification notificationId={props.match.params.notificationId} {...props} />} />
                        <Route path={`${match.url}/teacherlist`} component={WithAccount(TeachersList)} />
                        <Route path={`${match.url}/teacherdetails`} component={TeacherDetails} />
                        <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                        <Route path={`${match.url}/homework`} component={HomeWork} />
                        <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                        <Route path={`${match.url}/create-user`} component={RegisterTeacher} />
                        <Route path={`${match.url}/create-event`} component={CreateEvent} />
                        <Route path={`${match.url}/create-timetable`} component={CreateTimeTable} />
                        <Route path={`${match.url}/eventslist`} component={WithAccount(EventsList)} />
                        <Route path={`${match.url}/timetable`} component={TimeTable} />
                        <Route path={`${match.url}/staffattendance`} component={StaffAttendance} />
                        <Route path={`${match.url}/takeattendance`} component={AttendanceCreate} />
                        <Route path={`${match.url}/create-period`} component={CreatePeriod} />
                        <Route path={`${match.url}/viewallfeedetails`} component={ViewAllFeeDetails} />
                        <Route path={`${match.url}/create-notification`} component={CreateNotification} />
                        <Route path={`${match.url}/notificationslist`} component={WithAccount(NotificationsList)} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Route path={`${match.url}/noticehome/:userId`} component={NoticeHome} />
                        <Route path={`${match.url}/studentReport/:studentId`} component={StudentReport} />
                        <Route path={`${match.url}/studentfee`} component={StudentPayFee} />
                        <Route path={`${match.url}/classattendance/:teacherId`} render={(props) => <ClassAttendance teacherId={props.match.params.teacherId} {...props} />} />
                        <Route path={`${match.url}/studentparentdetails/:userId`} component={StudentParentDetails} />
                        <Route path={`${match.url}/profile`} component={PrincipalProfile} />
                        <Route path={`${match.url}/formReloader`} component={formReloader} />
                        <Redirect to={`${match.url}/teacherlist`} ></Redirect>
                    </Switch>
                </AccountContextProvider>
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage()(AccountAdmin)));
