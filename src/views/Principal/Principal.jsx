import React, { Component } from 'react';
import { AccountContextProvider, WithAccount } from '../AccountContext';
import AuthenticatedPage from "../AuthenticatedPage";
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles, withWidth, Typography } from '@material-ui/core';
import TeachersList from './TeachersList';
import RegisterTeacher from './CreateTeacher';
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import StudentsList from './StudentsList';
import ManageSubjects from './ManageSubjects';
import Logbook from '../Logbook/Logbook';
import AdminMenuItem from './AdminMenuItem';
import TeacherDetails from './TeacherDetails';
import StudentDetails from './StudentDetails';
import PrincipalProfile from './PrincipalProfile';
import EventsList from '../Events/EventsList';
import CreateEvent from '../Events/CreateEvent';
import NotificationsList from '../Notifications/NotificationsList';
import CreateNotification from '../Notifications/CreateNotification';
import NotificationDetails from './NotificationDetails';
import EventDetails from './EventDetails';
import TimeTable from '../TimeTable/TimeTable';
import CreateTimeTable from '../TimeTable/CreateTimeTable';
import CreatePeriod from '../TimeTable/CreatePeriod';
import ViewAllFeeDetails from '../FeeAccount/ViewAllFeeDetails';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    formControl: { margin: theme.spacing.unit, minWidth: 120 },
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

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/principalservice/getAccountByPrincipal', null)
        if (response.data.statusDescription.length === 1) {
            this.setState({
                schoolName: response.data.statusDescription[0].accountname,
                account: { value: response.data.statusDescription[0].accountid, label: response.data.statusDescription[0].accountname },
                selectedAccountId: response.data.statusDescription[0].accountid,
                loading: false
            })
        }
        else if (response.data.statusDescription.length > 1) {
            let labelsArray = response.data.statusDescription.map((item) => {
                return { value: item.accountid, label: item.accountname }
            });
            this.setState({ openPopUp: true, accounts: labelsArray, loading: false })
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
        console.log(this.props.currentUser.userDetails.accouttype)
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
                <NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>View Fee Details</NavLink>,
                <NavLink to={`${match.url}/notificationslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Notifications</NavLink>,
                <NavLink to={`${match.url}/eventslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Events</NavLink>,
                <NavLink to={`${match.url}/profile`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: 'bold', color: "red" }}>Profile</NavLink>
            ];
        } else {
            Nav = [
                <AdminMenuItem userDetails={this.props.currentUser.userDetails} handleLogout={this.handleLogout} match={this.props.match} ></AdminMenuItem>,
                <div className={classes.selectLink + " " + classes.formControl}>
                    <Typography variant="h6">{this.props.currentUser.userDetails.accountname}</Typography>
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
                        <Route path={`${match.url}/logbook/:studentid/:teacherid`} render={(props) => <Logbook studentid={props.match.params.studentid} teacherid={props.match.params.teacherid} key={props.match.params.studentid} {...props} />} />
                        <Route path={`${match.url}/studentslist/:teacherid`} render={(props) => <StudentsList teacherid={props.match.params.teacherid} {...props} />} />
                        <Route path={`${match.url}/manage-subjects`} component={WithAccount(ManageSubjects)} />
                        <Route path={`${match.url}/edit-account/:teacherid`} render={(props) => <RegisterTeacher teacherid={props.match.params.teacherid} {...props} />} />
                        <Route path={`${match.url}/edit-event/:eventid`} render={(props) => <CreateEvent eventid={props.match.params.eventid} {...props} />} />
                        <Route path={`${match.url}/edit-notification/:notificationid`} render={(props) => <CreateNotification notificationid={props.match.params.notificationid} {...props} />} />
                        <Route path={`${match.url}/teacherlist`} component={WithAccount(TeachersList)} />
                        <Route path={`${match.url}/teacherdetails`} component={TeacherDetails} />
                        <Route path={`${match.url}/notificationDetails`} component={NotificationDetails} />
                        <Route path={`${match.url}/eventDetails`} component={EventDetails} />
                        <Route path={`${match.url}/studentdetails`} component={StudentDetails} />
                        <Route path={`${match.url}/create-user`} component={RegisterTeacher} />
                        <Route path={`${match.url}/create-event`} component={CreateEvent} />
                        <Route path={`${match.url}/create-timetable`} component={CreateTimeTable} />
                        <Route path={`${match.url}/eventslist`} component={WithAccount(EventsList)} />
                        <Route path={`${match.url}/timetable`} component={TimeTable} />
                        <Route path={`${match.url}/create-period`} component={CreatePeriod} />
                        <Route path={`${match.url}/viewallfeedetails`} component={ViewAllFeeDetails} />
                        <Route path={`${match.url}/create-notification`} component={CreateNotification} />
                        <Route path={`${match.url}/notificationslist`} component={WithAccount(NotificationsList)} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Route path={`${match.url}/profile`} component={PrincipalProfile} />
                        <Redirect to={`${match.url}/teacherlist`} ></Redirect>
                    </Switch>
                </AccountContextProvider>
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["Principal"])(AccountAdmin)));
