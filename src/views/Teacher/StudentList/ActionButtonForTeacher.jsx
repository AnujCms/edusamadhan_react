import React from 'react';
import { withStyles, Menu, MenuItem, Button } from '@material-ui/core';
import {Assignment, MonetizationOn, AddCircle, Edit, Lock, LockOpen, LocalLibrary, Notes, Details} from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForTeacher extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleLogbook = () => {
        this.setState({ anchorEl: null });
        this.props.handleLogbook(this.props.userId, this.props.teacherId);
    }

    handleInactivateStudent = () => {
        this.setState({ anchorEl: null });
        this.props.handleInactivateStudent(this.props.userId)
    };
    handleDeactivateUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleDeactivateUser(this.props.userId)
    }

    handleEditRegistration = () => {
        this.setState({ anchorEl: null });
        this.props.handleEditRegistration(this.props.userId)
    }
    handleCreateResult = () => {
        this.setState({ anchorEl: null });
        this.props.handleCreateResult(this.props.userId)
    }
    handleCreateAttendance = () => {
        this.setState({ anchorEl: null });
        this.props.createAttendance(this.props.userId)
    }
    handleStudentFeeDetails = () => {
        this.setState({ anchorEl: null });
        this.props.handleStudentFeeDetails(this.props.userId, this.props.mediumType)
    }
    handleSendNotification = () =>{
        this.setState({ anchorEl: null });
        this.props.sendNotification(this.props.adharnumber)   
    }
    handleStudentReport = () =>{
        this.setState({ anchorEl: null });
        this.props.handleStudentReport(this.props.userId)
    }
    handleUnlockUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleUnlockUser(this.props.userId, this.props.userrole)
    }
    handleStudentNotice = () =>{
        this.setState({ anchorEl: null });
        this.props.handleStudentNotice(this.props.userId, this.props.studentName);
    }
    handleStudentDetails = () =>{
        this.setState({ anchorEl: null });
        this.props.handleStudentDetails(this.props.userId);
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, status, currentUser } = this.props;

        return (
            <div className={classes.root}>
                <Button
                    variant="outlined" color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{ borderRadius: "50px" }}
                >
                    Action
        </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {(status == 13 || status == 1)&&(currentUser === 'Teacher') &&<MenuItem onClick={this.handleEditRegistration} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit Registration</MenuItem>}
                    {(status == 2) && (currentUser === 'Teacher') && <MenuItem onClick={this.handleDeactivateUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Deactivate User</MenuItem>}  
                    {(status == 4) &&(currentUser === 'Teacher') && <MenuItem onClick={this.handleUnlockUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Unlock</MenuItem>}                                                                                                                                                                                                    
                    {status == 1&&<div><MenuItem onClick={this.handleLogbook} className={classes.borderBottom+" "+classes.liCommon}><Assignment className={classes.btnIcon}/>Logbook</MenuItem>
                    <MenuItem onClick={this.handleStudentFeeDetails} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOn className={classes.btnIcon}/>Fee Deatails</MenuItem>
                    {(currentUser === 'Teacher') &&<MenuItem onClick={this.handleCreateResult} className={classes.borderBottom+" "+classes.liCommon}><AddCircle className={classes.btnIcon}/>Create Result</MenuItem>}
                    {(currentUser === 'Teacher') &&<MenuItem onClick={this.handleCreateAttendance} className={classes.borderBottom+" "+classes.liCommon}><AddCircle className={classes.btnIcon}/>Create Attendance</MenuItem>}
                    <MenuItem onClick={this.handleStudentReport} className={classes.borderBottom+" "+classes.liCommon}><LocalLibrary className={classes.btnIcon}/>Student Report</MenuItem> 
                    <MenuItem onClick={this.handleStudentNotice} className={classes.borderBottom+" "+classes.liCommon}><Notes className={classes.btnIcon}/>Notice</MenuItem> 
                    <MenuItem onClick={this.handleStudentDetails} className={classes.borderBottom+" "+classes.liCommon}><Details className={classes.btnIcon}/>Parents Details</MenuItem> 
                    {(currentUser === 'Teacher') &&<MenuItem onClick={this.handleInactivateStudent} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Inactivate</MenuItem>}
                    </div>}             
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForTeacher);