import React from 'react';
import {withStyles, Button, Menu, MenuItem} from '@material-ui/core';
import {Edit, Lock, Assignment} from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom'},
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForSuperAdmin extends React.Component {
    state = {
        anchorEl: null, accountid: ''
    };

    handleClick = event => {
        this.setState({ accountid: this.props.accountid })
        this.setState({ anchorEl: event.currentTarget });
    };
    handleUnlockAccountClick = () => {
        this.setState({ anchorEl: null });
        this.props.handleUnlockAccount(this.props.accountid);
    }
    handleLockAccountClick = () => {
        this.setState({ anchorEl: null });
        this.props.handleLockAccount(this.props.accountid);
    }
    handleEditAccountClick = () => {
        this.setState({ anchorEl: null });
        console.log('this.props.accountid',this.props.accountid)
        this.props.handleEditAccountClick(this.props.accountid);
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
                    <MenuItem onClick={this.handleEditAccountClick} className={classes.borderBottom+" "+classes.liCommon}><Edit className={classes.btnIcon}/>Edit Account</MenuItem>
                    {(this.props.status == 1 ? <MenuItem onClick={this.handleLockAccountClick} className={classes.borderBottom+" "+classes.liCommon}><Lock className={classes.btnIcon}/>Lock Account</MenuItem> : "")}
                    {(this.props.status == 2 ? <MenuItem onClick={this.handleUnlockAccountClick} className={classes.borderBottom+" "+classes.liCommon}><Assignment className={classes.btnIcon}/>Unlock Account</MenuItem> : "")}

                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForSuperAdmin);