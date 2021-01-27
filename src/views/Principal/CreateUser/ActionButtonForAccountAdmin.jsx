import React from 'react';
import { withStyles, Menu, MenuItem, Button} from '@material-ui/core';
import {Edit, Delete, AssignmentTurnedIn, Group, Lock, LockOpen, DonutLarge, PanTool } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    paper: { marginRight: theme.spacing(2), backgroundColor: "#fff" },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForAccountAdmin extends React.Component {
    state = { anchorEl: null };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    //handle student List
    handleShowStudents = () =>{
        this.setState({ anchorEl: null });
        this.props.handleShowStudents(this.props.userId);
    }

    //handle class
     handleAssignClass = () =>{
        this.setState({ anchorEl: null });
         this.props.handleAssignClass(this.props.userId)
     }
     //handle UnAssigned class
     handleUnAssignClass = () =>{
        this.setState({ anchorEl: null });
        this.props.handleUnassignClass(this.props.userId)   
     }
    //handle edit provider
    handleEditTeacher = () => {
        this.setState({ anchorEl: null });
        this.props.handleEditUser(this.props.userId);
    }
    //handle delete teacher
    handleDeleteUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleDeleteUser(this.props.userId)
    }
    handleInactivateUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleInactivateUser(this.props.userId)
    }
    handleShowClassAttendance = () =>{
        this.setState({ anchorEl: null });
        this.props.handleShowClassAttendance(this.props.userId)
    }
    handleReactivateUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleReactivateUser(this.props.userId)
    }
    handleUnlockUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleUnlockUser(this.props.userId, this.props.userrole)
    }
    handleResendWelcomeEmail = () =>{
        this.setState({ anchorEl: null });
        this.props.handleResendWelcomeEmail(this.props.userId, this.props.userrole)
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, status } = this.props;
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
                    {(this.props.classId!== 0)&&<div>
                    <MenuItem onClick={this.handleShowStudents} className={classes.borderBottom+" "+classes.liCommon}><Group className={classes.btnIcon} />Students</MenuItem>
                    <MenuItem onClick={this.handleShowClassAttendance} className={classes.borderBottom+" "+classes.liCommon}><PanTool className={classes.btnIcon} />Class Attendance</MenuItem>
                    </div>}

                    {(this.props.classId == 0)?<MenuItem onClick={this.handleAssignClass} className={classes.borderBottom+" "+classes.liCommon}><AssignmentTurnedIn className={classes.btnIcon} />Assign class</MenuItem>:                    
                    <MenuItem onClick={this.handleUnAssignClass} className={classes.borderBottom+" "+classes.liCommon}><AssignmentTurnedIn className={classes.btnIcon} />UnAssign class</MenuItem>}
                    <MenuItem onClick={this.handleEditTeacher} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit Teacher</MenuItem>
                    {status == 0 && <MenuItem onClick={this.handleResendWelcomeEmail} className={classes.borderBottom+" "+classes.liCommon}><DonutLarge className={classes.btnIcon}/>Resend Email</MenuItem>}
                    {status == 1 && <MenuItem onClick={this.handleInactivateUser} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Inactivate User</MenuItem>}
                    {status == 2 && <MenuItem onClick={this.handleReactivateUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Reactivate User</MenuItem>}  
                    {status == 4 && <MenuItem onClick={this.handleUnlockUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Unlock</MenuItem>}                                                                                                                                                                                                    
                    <MenuItem onClick={this.handleDeleteUser} className={classes.borderBottom+" "+classes.liCommon}><Delete className={classes.btnIcon}/>Delete Teacher</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForAccountAdmin);