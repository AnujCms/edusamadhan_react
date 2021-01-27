import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionNotificationButton extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleEditNotification = () => {
        this.setState({ anchorEl: null });
        this.props.onEditNotification(this.props.notificationId)
    }
    handleDeleteNotification = () => {
        this.setState({ anchorEl: null });
        this.props.onDeleteNotification(this.props.notificationId)
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
                    disabled={this.props.role === 'Teacher' && this.props.createdby === 2}
                >
                    Action
        </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleEditNotification} className={classes.borderBottom + " " + classes.liCommon}><Edit className={classes.btnIcon} />Edit Notification</MenuItem>
                    <MenuItem onClick={this.handleDeleteNotification} className={classes.borderBottom + " " + classes.liCommon}><Delete className={classes.btnIcon} />Delete Notification</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionNotificationButton);