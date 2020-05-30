import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonInactivate extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleLogbookClick = () => {
        this.setState({ anchorEl: null });
        this.props.onLogBookClick(this.props.userid, this.props.teacherid);
    }

    //hanlde reactive student
    handleReactivateStudent = () =>{
        this.props.onReactivateStudent(this.props.userid);
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
                    <MenuItem onClick={this.handleLogbookClick} className={classes.borderBottom+" "+classes.liCommon}><AssignmentIcon className={classes.btnIcon}/>Logbook</MenuItem>
                    <MenuItem onClick={this.handleReactivateStudent} className={classes.borderBottom+" "+classes.liCommon}><RefreshIcon className={classes.btnIcon}/>Reactivate</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonInactivate);