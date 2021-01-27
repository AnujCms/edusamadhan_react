import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { AccountContextProvider, WithAccount } from '../AccountContext';
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { withStyles, withWidth, Typography, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Person, ExitToApp, Refresh } from '@material-ui/icons';
import Navbar from '../../components/Navbar';
import formReloader from '../../components/formReloader';
import UserList from './Users/UserList';
import CreateUser from './Users/CreateUser';
import SessionTimer from '../../TimeOutRenderer';
import ResetPassword from '../ResetPassword/ResetPassword';
import AdminImage from '../../assets/images/admin.png';
import DirecterProfile from '../UserProfile/Profile';

const styles = theme => ({
    simpleMenu: { minWidth: "30px" },
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    avatar: { width: 50, height: 50 },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
    formControl: { minWidth: 120 },
    selectLink: { float: "right", color: "#001C61", fontWeight: "bold !important", lineHeight: 600, margin: "30px 100px" },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class DirectorHome extends React.Component {
    state = {
        openPopUp: true, anchorEl: null, isLogout: false
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
                <NavLink to={`${match.url}/userlist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createuser`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create User</NavLink>,
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
                    <p style={{ marginRight: "15px", color: 'green', fontWeight: 600 }}>{this.props.currentUser.userDetails.firstName} </p>
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
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom + " " + classes.liCommon}><Person className={classes.btnIcon} /><NavLink to={`${match.url}/profile`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose} className={classes.borderBottom + " " + classes.liCommon}><Refresh className={classes.btnIcon} /><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                        <MenuItem onClick={this.handleLogout} className={classes.borderBottom + " " + classes.liCommon}><ExitToApp className={classes.btnIcon} />Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/userlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/createuser`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create User</NavLink>
            ];
        }

        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./userlist'} history={this.props.history} userDetails={this.props.currentUser.userDetails} isLogout={this.state.isLogout} />
                <AccountContextProvider value={this.props.currentUser.userDetails.accountId}>

                    <Switch>
                        <Route path={`${match.url}/userlist`} component={UserList} />
                        <Route path={`${match.url}/createuser`} component={CreateUser} />
                        <Route path={`${match.url}/edit-user/:userId`} render={(props) => <CreateUser userId={props.match.params.userId} {...props} />} />
                        <Route path={`${match.url}/resetpassword`} component={ResetPassword} />
                        <Route path={`${match.url}/formReloader`} component={formReloader} />
                        <Route path={`${match.url}/profile`} component={DirecterProfile} />
                        <Redirect to={`${match.url}/userlist`} ></Redirect>
                    </Switch>
                </AccountContextProvider>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage()(DirectorHome)));