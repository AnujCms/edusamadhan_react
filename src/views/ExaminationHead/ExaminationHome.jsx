import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import StudentList from '../Manager/CreateStudent/StudentList';
import ExamStudentList from './Students/StudentList';
import Navbar from '../../components/Navbar';
import formReloader from '../../components/formReloader';
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import SessionTimer from '../../TimeOutRenderer';
import { withStyles, withWidth, Menu, MenuItem, Button, Typography, Avatar } from '@material-ui/core';
import {EventSeat, Person, Notifications, ExitToApp, Refresh, AccessTime, Directions} from '@material-ui/icons';
import CreateStudent from '../Manager/CreateStudent/CreateStudent';
import CreateQuestion from './Questions/CreateQuestion';
import QuestionList from './Questions/QuestionList';
import TeacherImage from '../../assets/images/admin.png';
import StudentDetails from './Students/StudentDetails';
import ExamHeadProfile from '../UserProfile/Profile';
import ExamHeadNotifications from  '../Notifications/ViewNotifications/NotificationsList';
import QuestionDetails from './Questions/QuestionDetails';
import ExamHeadEvents from '../Events/ViewEvents/EventsList';
import TimeTable from '../TimeTable/TimeTable';
import ResetPassword from '../ResetPassword/ResetPassword';
import SettingArrangementHome from './ManageSettingArrangement/SettingArrangementHome';
import CreateClass from './ManageClassCapacity/CreateClass';
import SettingArrangement from './ManageSettingArrangement/SettingArrangement';
import MixedStudents from './ManageMixedClasses/MixedStudents';

const styles = theme => ({
    navLink: { padding: "20px 15px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    CustomAlgoBtn: { textTransform: "capitalize", padding: "5px 15px" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    simpleMenu: { minWidth: "inherit !important" },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ExaminationHome extends React.Component {
    state = { anchorEl: null, isLogout: false };
    handleLogout = () => {
        this.setState({ isLogout: true })
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handlepopClose = () =>{
        this.setState({anchorEl:null})
    }

    handleUserGuide = () =>{
        this.setState({ anchorEl: null });
        window.open('https://eduuserguides.s3.ap-south-1.amazonaws.com/ExamHead.pdf');
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
                <NavLink to={`${match.url}/create-student`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Admission</NavLink>,
                this.props.currentUser.userDetails.entranceExamType == 1 && <NavLink to={`${match.url}/examstudentlist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Exam Students</NavLink>,
                <NavLink to={`${match.url}/create-question`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create Question</NavLink>,
                <NavLink to={`${match.url}/view-question`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Questions</NavLink>,
                <NavLink to={`${match.url}/notifications`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Change Password</NavLink>
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
                    <p style={{ marginRight: "15px", color:'green', fontWeight:600 }}>{this.props.currentUser.userDetails.firstName} </p>
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notifications className={classes.btnIcon}/><NavLink to={`${match.url}/notifications`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EventSeat className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><AccessTime className={classes.btnIcon}/><NavLink to={`${match.url}/timetable`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Time Table</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Refresh className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                        <MenuItem onClick={this.handleUserGuide} className={classes.borderBottom+" "+classes.liCommon}><Directions className={classes.btnIcon}/>User Guide</MenuItem>                                                                                                                                                                                                  
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/create-student`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Admission</NavLink>,
                this.props.currentUser.userDetails.entranceExamType == 1 && <NavLink to={`${match.url}/examstudentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Exam Students</NavLink>,
                <NavLink to={`${match.url}/view-question`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Questions</NavLink>,
                <NavLink to={`${match.url}/settingplan`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Seating Plan</NavLink>,
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentlist'} isLogout={this.state.isLogout} userDetails={this.props.currentUser.userDetails} />
                <Switch>
                    <Route path={`${match.url}/edit-student/:studentId`} render={(props) => <CreateStudent studentId={props.match.params.studentId} key={props.match.params.studentId} />} />
                    <Route path={`${match.url}/edit-question/:questionId`} render={(props) => <CreateQuestion questionId={props.match.params.questionId} key={props.match.params.questionId} />} />
                    <Route path={`${match.url}/create-student`} component={CreateStudent} {...this.props} />
                    <Route path={`${match.url}/studentlist`} component={StudentList} {...this.props} />
                    <Route path={`${match.url}/examstudentlist`} component={ExamStudentList} {...this.props} />
                    <Route path={`${match.url}/create-question`} component={CreateQuestion} {...this.props} />
                    <Route path={`${match.url}/view-question`} component={QuestionList} {...this.props} />
                    <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                    <Route path={`${match.url}/questiondetails`} component={QuestionDetails} />
                    <Route path={`${match.url}/eventslist`} component={ExamHeadEvents} />
                    <Route path={`${match.url}/notifications`} component={ExamHeadNotifications} />
                    <Route path={`${match.url}/profile`} component={ExamHeadProfile} />
                    <Route path={`${match.url}/timetable`} component={TimeTable} />
                    <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                    <Route path={`${match.url}/settingplan`} component={SettingArrangementHome} />
                    <Route path={`${match.url}/settingarrangement`} component={SettingArrangement} />
                    <Route path={`${match.url}/createclass`} component={CreateClass} />
                    <Route path={`${match.url}/mixedstudents`} component={MixedStudents} />
                    <Route path={`${match.url}/formReloader`} component={formReloader} />
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage()(ExaminationHome)));