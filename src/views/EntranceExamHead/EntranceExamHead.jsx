import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import StudentList from './StudentList';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom'
import { Switch, Route, Redirect } from "react-router-dom";
import SessionTimer from '../../TimeOutRenderer';
import { withStyles, withWidth, Menu, Button, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import CreateStudent from './CreateStudent';
import CreateQuestion from './CreateQuestion';
import QuestionList from './QuestionList';
import Avatar from '@material-ui/core/Avatar';
import TeacherImage from '../../assets/images/admin.png';
import StudentDetails from './StudentDetails';
import ExamHeadProfile from './ExamHeadProfile';
import ExamHeadNotifications from './ExamHeadNotifications';
import QuestionDetails from './QuestionDetails';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExamHeadEvents from './ExamHeadEvents';
import EmojiEventsIcon from '@material-ui/icons/EventSeat';
import NotificationDetails from './NotificationDetails';
import EventDetails from './EventDetails';
import TimeTable from '../TimeTable/TimeTable';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    navLink: { padding: "20px 15px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    CustomAlgoBtn: { textTransform: "capitalize", padding: "5px 15px" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    simpleMenu: { minWidth: "inherit !important" },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { margin: theme.spacing.unit, minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class EntranceExamHead extends React.Component {
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
                <NavLink to={`${match.url}/create-student`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/create-question`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create Question</NavLink>,
                <NavLink to={`${match.url}/view-question`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Questions</NavLink>,
                <NavLink to={`${match.url}/notifications`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/resetpassword`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Re-Set Password</NavLink>,
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><NotificationsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/notifications`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EmojiEventsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EmojiEventsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Re-Set Pssword</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PersonIcon className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToAppIcon className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/create-student`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
                <NavLink to={`${match.url}/view-question`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Questions</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentlist'} isLogout={this.state.isLogout} userDetails={this.props.currentUser.userDetails} />
                <Switch>
                    <Route path={`${match.url}/edit-student/:studentid`} render={(props) => <CreateStudent studentid={props.match.params.studentid} key={props.match.params.studentid} />} />
                    <Route path={`${match.url}/edit-question/:questionid`} render={(props) => <CreateQuestion questionid={props.match.params.questionid} key={props.match.params.questionid} />} />
                    <Route path={`${match.url}/create-student`} component={CreateStudent} {...this.props} />
                    <Route path={`${match.url}/studentlist`} component={StudentList} {...this.props} />
                    <Route path={`${match.url}/create-question`} component={CreateQuestion} {...this.props} />
                    <Route path={`${match.url}/view-question`} component={QuestionList} {...this.props} />
                    <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                    <Route path={`${match.url}/questiondetails`} component={QuestionDetails} />
                    <Route path={`${match.url}/eventDetails`} component={EventDetails} />
                    <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                    <Route path={`${match.url}/eventslist`} component={ExamHeadEvents} />
                    <Route path={`${match.url}/notifications`} component={ExamHeadNotifications} />
                    <Route path={`${match.url}/profile`} component={ExamHeadProfile} />
                    <Route path={`${match.url}/timetable`} component={TimeTable} />
                    <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["ExamHead"])(EntranceExamHead)));