import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles, Button, withWidth, Avatar, Menu, MenuItem, Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import EntranceCompletedUI from './EntranceCompletedUI';
import TeacherImage from '../../assets/images/admin.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    navLink: { padding: "20px 20px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    CustomAlgoBtn: { textTransform: "capitalize", padding: "5px 15px" },
    headPop: { float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    simpleMenu: { minWidth: "inherit !important" },
    formControl: { margin: theme.spacing.unit, minWidth: 120 },
    selectLink:{ float:"right", color:"#001C61", fontWeight: "bold !important", lineHeight:600, margin:"30px 100px"},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"}
});
class EntranceCompleted extends React.Component {
    state = { isLogout: false, accounts: [], accountid: null, providers: [], providerid: null, patients: [], openPopUp: true, checkedDontShow: '', anchorEl: null };

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
        var studentName = {
            firstname: this.props.currentUser.userDetails.studentname,
            lastname: '',
            image: this.props.currentUser.userDetails.image
        }
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/entrancecompleted`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
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
                        <MenuItem onClick={this.handleLogout}  className={classes.borderBottom}><ExitToAppIcon className={classes.btnIcon}/>Logout</MenuItem>
                    </div>
                </Menu>,
                <NavLink to={`${match.url}/entrancecompleted`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            ];
        }

        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} homeLink={'./entrancecompleted'} history={this.props.history} userDetails={studentName} isLogout={this.state.isLogout} />
                <Switch>
                    <Route path={`${match.url}/entrancecompleted`} component={EntranceCompletedUI} />
                    <Redirect to={`${match.url}/entrancecompleted`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["EntranceCompleted"])(EntranceCompleted)));