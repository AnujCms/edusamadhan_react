import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionButtonForClassSeats extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleEditClassSeats = () => {
        this.setState({ anchorEl: null });
        this.props.handleEditClassSeats(this.props.classSeatId)
    }
    handleDeleteClassSeats = () => {
        this.setState({ anchorEl: null });
        this.props.handleDeleteClassSeats(this.props.classSeatId)
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
                    <MenuItem onClick={this.handleDeleteClassSeats} className={classes.borderBottom + " " + classes.liCommon}><AddCircle className={classes.btnIcon} />Delete</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForClassSeats);