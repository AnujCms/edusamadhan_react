import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionEventButton extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleEditEvent = () => {
        this.setState({ anchorEl: null });
        this.props.onEditEvent(this.props.eventid)
    }
    handleDeleteEvent = () => {
        this.setState({ anchorEl: null });
        this.props.onDeleteEvent(this.props.eventid)
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
                    <MenuItem onClick={this.handleEditEvent} className={classes.borderBottom + " " + classes.liCommon}><EditIcon className={classes.btnIcon} />Edit Event</MenuItem>
                    <MenuItem onClick={this.handleDeleteEvent} className={classes.borderBottom + " " + classes.liCommon}><DeleteIcon className={classes.btnIcon} />Delete Event</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionEventButton);