import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { Edit, ArrowForward, Check } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionButtonForExamHead extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleAllowExam = () => {
        this.setState({ anchorEl: null })
        this.props.handleAllowExam(this.props.studentId);
    }
    handleEditStudent = () => {
        this.props.onClickEditStudent(this.props.studentId)
    }
    handlePromoteStudent = () => {
        this.setState({ anchorEl: null })
        this.props.handlePromoteStudent(this.props.studentId, this.props.sectionId)
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, entranceExamType, status } = this.props;
        return (
            <div className={classes.root}>
                {status == 10 && <div><Button
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
                        {entranceExamType == 1 ? <div>
                            <MenuItem onClick={this.handleEditStudent} className={classes.borderBottom + " " + classes.liCommon}><Edit className={classes.btnIcon} />Edit</MenuItem>
                            <MenuItem onClick={this.handleAllowExam} className={classes.borderBottom + " " + classes.liCommon}><Check className={classes.btnIcon} />Allow For Exam</MenuItem></div> :
                            <MenuItem onClick={this.handlePromoteStudent} className={classes.borderBottom + " " + classes.liCommon}><ArrowForward className={classes.btnIcon} />Promote</MenuItem>}
                    </Menu></div>}
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForExamHead);