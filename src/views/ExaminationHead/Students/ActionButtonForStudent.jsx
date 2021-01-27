import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { Forward, Refresh  } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionButtonForStudent extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePromoteStudent = () => {
        this.setState({ anchorEl: null })
        this.props.handlePromoteStudent(this.props.studentId, this.props.sectionId)
    }

    handleReExamination = () => {
        this.setState({ anchorEl: null })
        this.props.handleReExamination(this.props.studentId)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, status, resultStatus } = this.props;
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
                    {(status === 12 && resultStatus == "Failed") && <MenuItem onClick={this.handleReExamination} className={classes.borderBottom + " " + classes.liCommon}><Refresh className={classes.btnIcon} />Re Exam</MenuItem>}
                    {(status === 12 && resultStatus == "Passed") && <MenuItem onClick={this.handlePromoteStudent} className={classes.borderBottom + " " + classes.liCommon}><Forward className={classes.btnIcon} />Promote</MenuItem>}
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForStudent);