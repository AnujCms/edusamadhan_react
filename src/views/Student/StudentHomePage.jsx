import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles, withWidth, Button, Menu, MenuItem, Avatar, Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import { studentObj, StudentContextProvider } from '../StudentContext';
import StudentDetails from './StudentDetails';
import StudentLogbook from './StudentLogbook';
import Logbook from '../Logbook/Logbook';
import TeacherImage from '../../assets/images/admin.png';
import StudentProfile from './StudentProfile';
import StudentEvents from './StudentsEvents';
import StudentNotifications from './StudentNotifications';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiEventsIcon from '@material-ui/icons/EventSeat';
import NotificationDetails from './NotificationDetails';
import EventDetails from './EventDetails';
import ViewTimeTable from '../TimeTable/TimeTable';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { margin: theme.spacing.unit, minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class StudentHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: [], accountid: null, providers: [], providerid: null, patients: [],
            isLogout: false, openPopUp: true, checkedDontShow: '', anchorEl: null, studentDetails: studentObj, changeStudent: this.changeStudent
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
                <NavLink to={`${match.url}/studentsdetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/studentlogbook`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Logbook</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>
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
                    <p style={{ marginRight: "15px" }}>{this.props.currentUser.userDetails.studentname} </p>
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EmojiEventsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><NotificationsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PersonIcon className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToAppIcon className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentsdetails`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/studentlogbook`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Logbook</NavLink>,
                <NavLink to={`${match.url}/timetable`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Time Table</NavLink>
            ];
        }
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentsdetails'} history={this.props.history} userDetails={studentName} isLogout={this.state.isLogout} />
                <StudentContextProvider value={this.state}>
                    <Switch>
                        <Route path={`${match.url}/studentsdetails`} render={(props) => <StudentDetails adharnumber={this.props.currentUser.userDetails.adharnumber} key={this.props.currentUser.userDetails.adharnumber} {...props} />} />
                        <Route path={`${match.url}/profile`} component={StudentProfile} />
                        <Route path={`${match.url}/eventDetails`} component={EventDetails} />
                        <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                        <Route path={`${match.url}/eventslist`} component={StudentEvents} />
                        <Route path={`${match.url}/notificationslist`} component={StudentNotifications} />
                        <Route path={`${match.url}/timetable`} component={ViewTimeTable} />
                        <Route path={`${match.url}/studentlogbook`} render={(props) => <StudentLogbook  {...props} />} />
                        <Route path={`${match.url}/logbook/:studentid/:teacherid`} render={(props) => <Logbook teacherid={props.match.params.teacherid} studentid={props.match.params.studentid} key={props.match.params.studentid} {...props} />} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Redirect to={`${match.url}/studentsdetails`} ></Redirect>
                    </Switch>
                </StudentContextProvider>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(['Student'])(StudentHomePage)));
