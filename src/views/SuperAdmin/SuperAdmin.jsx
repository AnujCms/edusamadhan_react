import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import {dashboardObj, SuperAdminDashboarContextProvider} from '../Context/SuperAdminDashboardContext';
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { withStyles, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Person, ExitToApp, AccessAlarm} from '@material-ui/icons';
import ManageAccount from "./ManageAccount";
import StudentList from './StudentList';
import Navbar from '../../components/Navbar';
import CreateAccount from './CreateAccount';
import SessionTimer from '../../TimeOutRenderer';
import Logbook from '../Logbook/Logbook';
import TeacherImage from '../../assets/images/admin.png';
import Profile from '../UserProfile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';

const styles = theme => ({
    navLink: { padding: "20px 20px", textDecorationLine: "none", display: "inline-flex", float: "left" },
    CustomAlgoBtn: { textTransform: "capitalize", padding: "5px 15px" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    simpleMenu: { minWidth: "inherit !important" },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});

class SuperAdmin extends React.Component {
    constructor(props){
    super(props)
    this.state = {changeTeacherSelection:this.changeTeacherSelection,
        teacherDetails:dashboardObj, accountid: null, openPopUp: true, checkedDontShow: '', anchorEl: null, isLogout: false
    };
}
    changeTeacherSelection = (userObj) => {
        if(userObj)
        {
        this.setState({ teacherDetails: userObj });
        }
        else{
          this.setState({teacherDetails:dashboardObj});

        }
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
                <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createstudent`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
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
            <Menu className={classes.root}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handlepopClose}
            >
                <div className={classes.simpleMenu}>
                <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><AccessAlarm className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Re-Set Pssword</NavLink></MenuItem>
                <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                </div>
            </Menu>,
            <NavLink to={`${match.url}/studentlist`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/manage-account`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Accounts</NavLink>,
            <NavLink to={`${match.url}/create-account`} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create Account</NavLink>
        ];
    }
        return (
            <div>
                <Navbar Nav={Nav} homeLink={'./studentlist'} history={this.props.history} userDetails={this.props.currentUser.userDetails} isLogout={this.state.isLogout}/>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <div className={classes.pad60}>
                    <SuperAdminDashboarContextProvider value={this.state}>
                    <Switch>
                        <Route path={`${match.url}/editsubaccount/:accountid`} render={(props) => <CreateAccount accountid={props.match.params.accountId} parentAccountId={props.match.params.accountId} {...props} />} />
                        <Route path={`${match.url}/logbook/:studentid/:teacherid`} render={(props) => <Logbook studentid={props.match.params.studentid} teacherid={props.match.params.teacherid} key={props.match.params.studentid} {...props} />} />
                        <Route path={`${match.url}/manage-account`} component={ManageAccount} />
                        <Route path={`${match.url}/create-account`} component={CreateAccount} />
                        <Route path={`${match.url}/edit-account/:accountId`} render={(props) => <CreateAccount accountId={props.match.params.accountId} {...props} />} />
                        <Route path={`${match.url}/studentlist`} component={StudentList} />
                        <Route path={`${match.url}/profile`} component={Profile} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Redirect to={`${match.url}/studentlist`} ></Redirect>
                    </Switch>
                    </SuperAdminDashboarContextProvider>
                </div>
            </div>
        )
    }
}

export default AuthenticatedPage("SuperAdmin")(withStyles(styles)(SuperAdmin));
