import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForStudent extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePramoteStudent = () => {
        this.setState({anchorEl:null})
        this.props.pramoteStudent(this.props.studentid, this.props.section)
    }

    handleDeleteStudent = () => {
        this.setState({anchorEl:null})
        this.props.deleteStudent(this.props.studentid)
    }
    handleReExamStudent = () =>{
        this.setState({anchorEl:null})
        this.props.reExam(this.props.studentid)
    }
    handleEditStudent = () =>{
        this.setState({anchorEl:null})
        this.props.editRegistration(this.props.studentid)
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
                    {this.props.userrole ===9&&<MenuItem onClick={this.handleReExamStudent} className={classes.borderBottom +" "+classes.liCommon}><RefreshIcon className={classes.btnIcon}/>Re Exam</MenuItem> }
                    {this.props.userrole ===9&&<MenuItem onClick={this.handlePramoteStudent} className={classes.borderBottom+" "+classes.liCommon}><QueuePlayNextIcon className={classes.btnIcon}/>Promote</MenuItem>}
                    <MenuItem onClick={this.handleEditStudent} className={classes.borderBottom+" "+classes.liCommon}><QueuePlayNextIcon className={classes.btnIcon}/>Edit</MenuItem>
                    <MenuItem onClick={this.handleDeleteStudent} className={classes.borderBottom+" "+classes.liCommon}><DeleteIcon className={classes.btnIcon}/>Delete</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForStudent);