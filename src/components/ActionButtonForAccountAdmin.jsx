import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    paper: { marginRight: theme.spacing.unit * 2, backgroundColor: "#fff" },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForAccountAdmin extends React.Component {
    state = { anchorEl: null, providerid: ''};

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    //handle student List
    handleStudentList = () =>{
        this.setState({ anchorEl: null });
        this.props.onShowStudents(this.props.teacherid);
    }

    //handle class
     handleAssignClass = () =>{
        this.setState({ anchorEl: null });
         this.props.onAssignClass(this.props.teacherid)
     }
     //handle UnAssigned class
     handleUnAssignClass = () =>{
        this.setState({ anchorEl: null });
        this.props.onUnAssignClass(this.props.teacherid)   
     }
    //handle edit provider
    handleEditTeacher = () => {
        this.setState({ anchorEl: null });
        this.props.onEditTeacher(this.props.teacherid);
    }
    //handle delete teacher
    handleDeleteTeacher = () =>{
        this.setState({ anchorEl: null });
        this.props.onDeleteTeacher(this.props.teacherid)
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
                    {(this.props.classid!== 0)&&<MenuItem onClick={this.handleStudentList} className={classes.borderBottom+" "+classes.liCommon}><GroupIcon className={classes.btnIcon} />Students</MenuItem>}

                    {(this.props.classid == 0)?<MenuItem onClick={this.handleAssignClass} className={classes.borderBottom+" "+classes.liCommon}><AssignmentTurnedInIcon className={classes.btnIcon} />Assign class</MenuItem>:                    
                    <MenuItem onClick={this.handleUnAssignClass} className={classes.borderBottom+" "+classes.liCommon}><AssignmentTurnedInIcon className={classes.btnIcon} />UnAssign class</MenuItem>}

                    <MenuItem onClick={this.handleEditTeacher} className={classes.borderBottom+" "+classes.liCommon}><EditIcon className={classes.btnIcon}/>Edit Teacher</MenuItem>
                    <MenuItem onClick={this.handleDeleteTeacher} className={classes.borderBottom+" "+classes.liCommon}><DeleteIcon className={classes.btnIcon}/>Delete Teacher</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForAccountAdmin);