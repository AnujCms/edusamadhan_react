import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { withStyles, withWidth, Typography, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Person, ExitToApp, MonetizationOn, LockOpen, Notifications, EventSeat, Refresh, PanTool, Directions } from '@material-ui/icons';
import Navbar from '../../components/Navbar';
import formReloader from '../../components/formReloader';
import StudentList from './StudentList/StudentsList';
import StudentRegistration from './RegisterStudent/StudentRegistration';
import SessionTimer from '../../TimeOutRenderer';
import CreateResult from './StudentResult/Result';
import CreateAttendance from './MonthlyAttendance/CreateAttendance';
import ViewAttendance from './StudentList/ViewAttendance';
import TeacherProfile from '../UserProfile/Profile';
import StudentDetails from './StudentList/StudentDetails';
import Logbook from '../Logbook/Logbook';
import StudentPayFee from '../Accountant/ManageStudentFee/StudentPayFee';
import TeacherImage from '../../assets/images/admin.png';
import InactivateStudents from './StudentList/InactivateStudents';
import TeacherEvents from '../Events/ViewEvents/EventsList';
import TeacherNotifications from '../Notifications/ViewNotifications/NotificationsList';
import CreateNotification from '../Notifications/CreateNotification/CreateNotification';
import ViewTimeTable from '../TimeTable/TimeTable';
import StudentAttendance from './StudentAttendance/AttendanceHome';
import AttendanceCreate from './StudentAttendance/Attendance';
import ResetPassword from '../ResetPassword/ResetPassword';
import StudentReport from './StudentReport/StudentReportHome';
import ClassWorkDropdown from './ClassWork/ClassWorkDropdown';
import HomeWork from './ClassWork/HomeWork';
import CreateHomeWork from './ClassWork/CreateHomeWork';
import NoticeHome from './Notice/NoticeHome';
import CreateNotice from './Notice/CreateNotice';
import StudentParentDetails from './StudentParentDetails/StudentParentDetails';
import CreateParentDetails from './StudentParentDetails/CreateParentDetails';
import ViewAllFeeDetails from '../Accountant/ViewStaffAndFee/ViewAllFeeDetails';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    avatar: { width: 50, height: 50 },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class TeacherHome extends React.Component {
    state = {
        openPopUp: true, anchorEl: null, isLogout: false, classId:'', sectionId: '', isRender: false
    };
    componentWillMount = async() =>{
        let assignedClass = await this.props.authenticatedApiCall('get', '/api/teacherservice/getAssignedClassAndSection', null);
        if(assignedClass.data.status == 1){
            this.setState({isRender: true, classId: assignedClass.data.statusDescription[0].classId, sectionId: assignedClass.data.statusDescription[0].sectionId})
        }else{
            this.setState({isRender: true}); 
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };
    handleUserGuide = () =>{
        this.setState({ anchorEl: null });
        window.open('https://eduuserguides.s3.ap-south-1.amazonaws.com/TeacherUserGuide.pdf');
    }

    handleLogout = () => {
        this.setState({ isLogout: true })
    }
    render() {
        var isImage = false;
        const { classes, width, match } = this.props;
        const { anchorEl, classId } = this.state;
        if (this.props.currentUser.userDetails.image) {
            isImage = true;
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/studentlist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/studentattendance`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Attendance</NavLink>,
                <NavLink to={`${match.url}/feedetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Full Class Fee</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/homework`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home Work</NavLink>,
                <NavLink to={`${match.url}/inactivatestudents`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Inactivate Students</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Change Password</NavLink>
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
                    <p style={{ marginRight: "15px", color:'green', fontWeight:600 }}>{this.props.currentUser.userDetails.firstName} </p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.currentUser.userDetails.image) : TeacherImage} className={classes.avatar} />
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PanTool className={classes.btnIcon}/><NavLink to={`${match.url}/studentattendance`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Attendance</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/><NavLink to={`${match.url}/inactivatestudents`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Inactivate Students</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOn className={classes.btnIcon}/><NavLink to={`${match.url}/feedetails`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Full Class Fee</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notifications className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EventSeat className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Refresh className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                        <MenuItem onClick={this.handleUserGuide} className={classes.borderBottom+" "+classes.liCommon}><Directions className={classes.btnIcon}/>User Guide</MenuItem>                                                                                                                                                                                                  
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <ClassWorkDropdown match={this.props.match}></ClassWorkDropdown>
            ];
        }

        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentlist'} history={this.props.history} userDetails={this.props.currentUser.userDetails} isLogout={this.state.isLogout} />
               {this.state.isRender&& <Switch>
                    <Route path={`${match.url}/edit-registration/:studentId`} render={(props) => <StudentRegistration studentId={props.match.params.studentId} key={props.match.params.studentId} {...props} />} />
                    <Route path={`${match.url}/logbook/:studentId/:teacherId`} render={(props) => <Logbook teacherId={props.match.params.teacherId} studentId={props.match.params.studentId} key={props.match.params.studentId} {...props} />} />
                    <Route path={`${match.url}/view-attendance`} component={ViewAttendance} />
                    <Route path={`${match.url}/createstudent`} component={StudentRegistration} />
                    <Route path={`${match.url}/studentlist`} component={StudentList} />
                    <Route path={`${match.url}/inactivatestudents`} component={InactivateStudents} />
                    <Route path={`${match.url}/feedetails`} render={(props) => <ViewAllFeeDetails classId={this.state.classId} sectionId={this.state.sectionId}{...props} />} />
                    <Route path={`${match.url}/studentfee`} component={StudentPayFee} />
                    <Route path={`${match.url}/eventslist`} component={TeacherEvents} />
                    <Route path={`${match.url}/edit-notification/:notificationId`} render={(props) => <CreateNotification notificationId={props.match.params.notificationId} {...props} />}/>
                    <Route path={`${match.url}/create-notification`} component={CreateNotification} />
                    <Route path={`${match.url}/notificationslist`} component={TeacherNotifications} />
                    <Route path={`${match.url}/profile`} component={TeacherProfile} />
                    <Route path={`${match.url}/timetable`} component={ViewTimeTable} />
                    <Route path={`${match.url}/studentattendance`} component={StudentAttendance} />
                    <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                    <Route path={`${match.url}/takeattendance`} component={AttendanceCreate} />
                    <Route path={`${match.url}/create-result/:studentId`} render={(props) => <CreateResult studentId={props.match.params.studentId} key={props.match.params.studentId} />} />
                    <Route path={`${match.url}/create-attendance/:studentId`} render={(props) => <CreateAttendance studentId={props.match.params.studentId} key={props.match.params.studentId} />} />
                    <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                    <Route path={`${match.url}/homework`} component={HomeWork} />
                    <Route path={`${match.url}/createhomework`} component={CreateHomeWork} />
                    <Route path={`${match.url}/noticehome/:userId`} component={NoticeHome} />
                    <Route path={`${match.url}/studentparentdetails/:userId`} component={StudentParentDetails} />
                    <Route path={`${match.url}/createparentdetails/:userId`} component={CreateParentDetails} />
                    <Route path={`${match.url}/createparentdetails/:userId/:parentDetailsId`} render={(props) => <CreateParentDetails userId={props.match.params.userId} parentDetailsId={props.match.params.parentDetailsId} key={props.match.params.userId}/>} />
                    <Route path={`${match.url}/createnotice/:userId`} component={CreateNotice} />
                    <Route path={`${match.url}/createnotice/:userId/:noticeId`}  render={(props) => <CreateNotice userId={props.match.params.userId} noticeId={props.match.params.noticeId} key={props.match.params.userId}/>} />
                    <Route path={`${match.url}/edithomework/:homeWorkId`} render={(props) => <CreateHomeWork homeWorkId={props.match.params.homeWorkId} key={props.match.params.homeWorkId} />} />
                    <Route path={`${match.url}/formReloader`} component={formReloader} />
                    <Route path={`${match.url}/studentReport/:studentId`} component={StudentReport} />
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>}
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage()(TeacherHome)));