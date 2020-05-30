import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForProvider extends React.Component {
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

    //Inactivate the Student
    handleInactivateStudent = event => {
        this.setState({ anchorEl: null });
        this.props.onInactivateStudent(this.props.userid)
    };

    handleEditRegistration = () => {
        this.setState({ anchorEl: null });
        this.props.onEditRegistration(this.props.userid)
    }
    handleCreateResult = () => {
        this.setState({ anchorEl: null });
        this.props.createResult(this.props.userid)
    }
    handleCreateAttendance = () => {
        this.setState({ anchorEl: null });
        this.props.createAttendance(this.props.userid)
    }
    handleFeeDetailsClick = () => {
        this.setState({ anchorEl: null });
        this.props.getFeeDetails(this.props.adharnumber)
    }
    handleSendNotification = () =>{
        this.setState({ anchorEl: null });
        this.props.sendNotification(this.props.adharnumber)   
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
                    <MenuItem onClick={this.handleFeeDetailsClick} className={classes.borderBottom+" "+classes.liCommon}><MonetizationOnIcon className={classes.btnIcon}/>Fee Deatails</MenuItem>
                    <MenuItem onClick={this.handleCreateResult} className={classes.borderBottom+" "+classes.liCommon}><AddCircleIcon className={classes.btnIcon}/>Create Result</MenuItem>
                    <MenuItem onClick={this.handleCreateAttendance} className={classes.borderBottom+" "+classes.liCommon}><AddCircleIcon className={classes.btnIcon}/>Create Attendance</MenuItem>
                    <MenuItem onClick={this.handleEditRegistration} className={classes.borderBottom+" "+classes.liCommon}><EditIcon className={classes.btnIcon}/>Edit Registration</MenuItem>
                    {/* <MenuItem onClick={this.handleSendNotification} className={classes.borderBottom+" "+classes.liCommon}><EditIcon className={classes.btnIcon}/>Send Notification</MenuItem> */}
                    <MenuItem onClick={this.handleInactivateStudent} className={classes.borderBottom+" "+classes.liCommon}><LockIcon className={classes.btnIcon}/>Inactivate</MenuItem>                 
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForProvider);