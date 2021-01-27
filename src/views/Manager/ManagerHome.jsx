import React, { Component } from 'react';
import { AccountContextProvider, WithAccount } from '../AccountContext';
import AuthenticatedPage from "../AuthenticatedPage";
import formReloader from '../../components/formReloader';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles,withWidth, Typography, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import ManageMessage from './ManageMessage/MassageList';
import CreateMessage from './ManageMessage/CreateMessage';
import ManageAcievements from './ManageAcievements/AchievementsList';
import CreateAchievement from './ManageAcievements/CreateAchievement';
import MediaList from './ManageMedia/MediaList';
import CreateMedia from './ManageMedia/CreateMedia';
import FacilitiesList from './ManageFacilities/FacilitiesList';
import CreateFacility from './ManageFacilities/CreateFacility';
import CreateStudent from './CreateStudent/CreateStudent';
import StudentList from './CreateStudent/StudentList';
import AdminImage from '../../assets/images/admin.png';
import {Collections, Person, ExitToApp, Theaters, Refresh} from '@material-ui/icons';
import ManagerProfile from '../UserProfile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    formControl: { minWidth: 120 },
    selectLink: { float: "right", color: "#001C61", fontWeight: "bold !important", lineHeight: 600, margin: "30px 100px" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    avatar: { width: 50, height: 50 },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}

});

class ManagerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: '', isLogout: false, anchorEl: null, openPopUp: false, loading: true, account: "", accounts: [], selectedAccountId: "", age: '', name: 'hai', labelWidth: 0
        }
    }

    async componentDidMount() {
        
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
    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
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
                <NavLink to={`${match.url}/studentslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Admission</NavLink>,
                <NavLink to={`${match.url}/managemessage`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Messages</NavLink>,
                <NavLink to={`${match.url}/manageachievement`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Achievement</NavLink>,
                <NavLink to={`${match.url}/facilities`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Facilities</NavLink>,
                <NavLink to={`${match.url}/medialist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Media</NavLink>,
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
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.currentUser.userDetails.image) : AdminImage} className={classes.avatar} />
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Collections className={classes.btnIcon}/><NavLink to={`${match.url}/facilities`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Manage Facilities</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Theaters className={classes.btnIcon}/><NavLink to={`${match.url}/medialist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Manage Media</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Refresh className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/studentslist`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Admission</NavLink>,
                <NavLink to={`${match.url}/managemessage`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Message</NavLink>,
                <NavLink to={`${match.url}/manageachievement`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Achievements</NavLink>
            ];
        }

        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./studentslist'} isLogout={this.state.isLogout} userDetails={this.props.currentUser.userDetails} />
                <AccountContextProvider value={this.props.currentUser.userDetails.accountid}>
                    <Switch>
                        <Route path={`${match.url}/studentslist`} component={StudentList} />
                        <Route path={`${match.url}/createstudent`} component={CreateStudent} />
                        <Route path={`${match.url}/managemessage`} component={ManageMessage} />
                        <Route path={`${match.url}/createmessage`} component={CreateMessage} />
                        <Route path={`${match.url}/manageachievement`} component={ManageAcievements} />
                        <Route path={`${match.url}/createacievement`} component={CreateAchievement} />
                        <Route path={`${match.url}/edit-acievement/:achievementId`}  render={(props) => <CreateAchievement achievementId={props.match.params.achievementId} {...props} />} />
                        <Route path={`${match.url}/medialist`} component={MediaList} />
                        <Route path={`${match.url}/createmedia`} component={CreateMedia} />
                        <Route path={`${match.url}/edit-media/:mediaId`}  render={(props) => <CreateMedia mediaId={props.match.params.mediaId} {...props} />} />
                        <Route path={`${match.url}/facilities`} component={FacilitiesList} />
                        <Route path={`${match.url}/createfacility`} component={CreateFacility} />
                        <Route path={`${match.url}/edit-facility/:faculityId`}  render={(props) => <CreateFacility faculityId={props.match.params.faculityId} {...props} />} />
                        <Route path={`${match.url}/edit-student/:studentId`}  render={(props) => <CreateStudent studentId={props.match.params.studentId} {...props} />} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Route path={`${match.url}/formReloader`} component={formReloader} />
                        <Route path={`${match.url}/profile`} component={ManagerProfile} />
                        <Redirect to={`${match.url}/studentslist`} ></Redirect>
                    </Switch>
                </AccountContextProvider>
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage()(ManagerHome)));
