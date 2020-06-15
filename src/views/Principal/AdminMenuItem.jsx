import React, { Component } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withTranslation } from 'react-i18next';
import { withStyles, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import AdminImage from '../../assets/images/admin.png';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmojiEventsIcon from '@material-ui/icons/EventSeat';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

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
    handleTermsAndConditions = async () => {
        this.setState({ anchorEl: null });
        window.open('/StaticContent/getTermCondition');
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
                    <p style={{marginRight:"15px"}}>{this.props.userDetails.firstname}</p>
                    <Avatar alt="No Images" src={isImage ? ("data:image/jpeg;base64," + this.props.userDetails.image) : AdminImage} className={classes.avatar} />
                </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handlepopClose}
                >
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOnIcon className={classes.btnIcon}/><NavLink to={`${match.url}/viewallfeedetails`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>View Full Fee</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><NotificationsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/notificationslist`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Notifications</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><EmojiEventsIcon className={classes.btnIcon}/><NavLink to={`${match.url}/eventslist`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Events</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><PersonIcon className={classes.btnIcon}/><NavLink to={`${match.url}/profile`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Profile</NavLink></MenuItem>
                    <MenuItem onClick={this.handlepopClose} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOnIcon className={classes.btnIcon}/><NavLink to={`${match.url}/resetpassword`} className={classes.navLink} activeClassName="active"  activeStyle={{ fontWeight: "bold", color: "blue" }} style={{ padding: "0", width: "100%" }}>Reset Password</NavLink></MenuItem>
                    <MenuItem onClick={this.handleLogout} className={classes.borderBottom+" "+classes.liCommon}><ExitToAppIcon className={classes.btnIcon}/>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withTranslation()(AuthenticatedPage(["Principal"])(withStyles(styles)(AdminMenuItem)));