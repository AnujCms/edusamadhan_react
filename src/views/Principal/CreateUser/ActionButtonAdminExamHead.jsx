import React from 'react';
import { withStyles, Menu, MenuItem, Button } from '@material-ui/core';
import {Edit, Delete, Lock, LockOpen, DonutLarge } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    paper: { marginRight: theme.spacing(2), backgroundColor: "#fff" },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForAccountAdmin extends React.Component {
    state = {
        anchorEl: null,
        providerid: ''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    //handle edit provider
    handleEditExamHead = () => {
        this.setState({ anchorEl: null });
        this.props.handleEditUser(this.props.userId);
    }
    //handle delete User
    handleDeleteUser = () =>{
        this.setState({ anchorEl: null });
        this.props.onDeleteUser(this.props.userId)
    }
    handleInactivateUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleInactivateUser(this.props.userId)
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
        const { classes } = this.props;
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
                    <MenuItem onClick={this.handleEditExamHead} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit ExamHead</MenuItem>
                    {this.props.status == 0 && <MenuItem onClick={this.handleResendWelcomeEmail} className={classes.borderBottom+" "+classes.liCommon}><DonutLarge className={classes.btnIcon}/>Resend Email</MenuItem>}
                    {this.props.status == 1 && <MenuItem onClick={this.handleInactivateUser} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Inactivate ExamHead</MenuItem>}
                    {this.props.status == 2 && <MenuItem onClick={this.handleReactivateUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Reactivate ExamHead</MenuItem>}  
                    {this.props.status == 4 && <MenuItem onClick={this.handleUnlockUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Unlock ExamHead</MenuItem>}                                                                                                                                                                                                    
                    <MenuItem onClick={this.handleDeleteUser} className={classes.borderBottom+" "+classes.liCommon}><Delete className={classes.btnIcon}/>Delete ExamHead</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForAccountAdmin);