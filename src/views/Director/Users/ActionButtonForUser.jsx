import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import {Edit, Delete, Lock, LockOpen, DonutLarge } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForUser extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleEditUser = () => {
        this.setState({ anchorEl: null });
        this.props.handleClickEdit(this.props.userId)
    }
    handleDeleteUser = () =>{
        this.setState({ anchorEl: null });
        this.props.handleDeleteUser(this.props.userId)
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
                    <MenuItem onClick={this.handleEditUser} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit User</MenuItem>   
                    {this.props.status == 0 && <div><MenuItem onClick={this.handleDeleteUser} className={classes.borderBottom+" "+classes.liCommon}><Delete className={classes.btnIcon}/>Delete User</MenuItem>  <MenuItem onClick={this.handleResendWelcomeEmail} className={classes.borderBottom+" "+classes.liCommon}><DonutLarge className={classes.btnIcon}/>Resend Email</MenuItem></div>}    
                    {this.props.status == 1 && <MenuItem onClick={this.handleInactivateUser} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Inactivate User</MenuItem>}
                    {this.props.status == 2 && <MenuItem onClick={this.handleReactivateUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Reactivate User</MenuItem>}  
                    {this.props.status == 4 &&<MenuItem onClick={this.handleUnlockUser} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Unlock</MenuItem>}                                                                                                    
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForUser);