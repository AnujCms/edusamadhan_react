import React from 'react';
import {withStyles, Button, Menu, MenuItem} from '@material-ui/core';
import {Edit, Lock, LockOpen, Assignment, DonutLarge} from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom'},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForSuperAdmin extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleEditAccountClick = () => {
        this.setState({ anchorEl: null });
        this.props.handleEditAccountClick(this.props.accountId);
    }
    handleDeactivateAccount = () => {
        this.setState({ anchorEl: null });
        this.props.handleDeactivateAccount(this.props.accountId);
    }
    handleInactivateAccount = () => {
        this.setState({ anchorEl: null });
        this.props.handleInactivateAccount(this.props.accountId);
    }

    handleUnlockDirector = () => {
        this.setState({ anchorEl: null });
        this.props.handleUnlockDirector(this.props.userId, this.props.userrole);
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
        const { classes, accountStatus, status } = this.props;
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
                    <MenuItem onClick={this.handleEditAccountClick} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit Account</MenuItem>
                    {(accountStatus == 1 ? <MenuItem onClick={this.handleInactivateAccount} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Inactivate Account</MenuItem> : "")}
                    {(accountStatus == 2 ? <MenuItem onClick={this.handleDeactivateAccount} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Deactivate Account</MenuItem> : "")}
                    {(status == 4 ? <MenuItem onClick={this.handleUnlockDirector} className={classes.borderBottom+" "+classes.liCommon}><LockOpen className={classes.btnIcon}/>Unlock User</MenuItem> : "")}
                    {(status == 0 ? <MenuItem onClick={this.handleResendWelcomeEmail} className={classes.borderBottom+" "+classes.liCommon}><DonutLarge className={classes.btnIcon}/>ReSend Welcome Email</MenuItem> : "")}
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForSuperAdmin);