import React, { Component } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { MonetizationOn, Person, Notifications, ExitToApp, EventSeat, Refresh, Home, PanTool, Directions } from '@material-ui/icons';
import { withStyles, Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import AdminImage from '../../assets/images/admin.png';

const styles = theme => ({
    navLink: { padding: "20px 20px", textDecorationLine: "none", display: "inline-flex", float: "left" },
    settingLink: { float: "right", color:"#001C61", margin:"0 10px",'&:hover':{background:"transparent"}},
    avatar:{ width: 50, height: 50 },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});

class AdminMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: null }
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };
  
    handleUserGuide = () =>{
        this.setState({ anchorEl: null });
        window.open('https://eduuserguides.s3.ap-south-1.amazonaws.com/PrincipalUserGuide.pdf');
    }
    handleLogout = () =>{
        this.props.handleLogout();
    }
    render() {
        let isImage = false;
        const { anchorEl } = this.state;
        const { t, classes, match } = this.props;
        if (this.props.userDetails.image) {
            isImage = true;
        }
        return (
            <div>
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.settingLink}
                >
                    <p style={{marginRight:"15px", color:'green', fontWeight:600}}>{this.props.userDetails.firstName}</p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.userDetails.image) : AdminImage} className={classes.avatar} />
                </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handlepopClose}
                >
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Home className={classes.btnIcon}/><NavLink to={`${match.url}/homework`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Home Work</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PanTool className={classes.btnIcon}/><NavLink to={`${match.url}/staffattendance`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Attendance</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOn className={classes.btnIcon}/><NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Full Class Fee</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Notifications className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EventSeat className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Person className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><Refresh className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Change Password</NavLink></MenuItem>
                    <MenuItem onClick={this.handleUserGuide} className={classes.borderBottom+" "+classes.liCommon}><Directions className={classes.btnIcon}/>User Guide</MenuItem>                                                                                                                                                                                                  
                    <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToApp className={classes.btnIcon}/>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default AuthenticatedPage()(withStyles(styles)(AdminMenuItem));