import React from 'react';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom: { fontSize: "16px", borderBottom: "1px solid rgba(218, 223, 224, 1)" },
    btnIcon: { fontSize: 18, marginRight: "10px" },
    liCommon: { borderBottom: "1px solid #dadfe0", padding: "12px 15px" }
});
class ActionButtonForManager extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleEditStudent = () => {
        this.props.onClickEditStudent(this.props.studentId)
    }
    handleDeleteStudent = () => {
        this.props.handleDeleteStudent(this.props.studentId)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes, status } = this.props;
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
                    {status == 10 && <div><MenuItem onClick={this.handleEditStudent} className={classes.borderBottom + " " + classes.liCommon}><Edit className={classes.btnIcon} />Edit</MenuItem>
                        <MenuItem onClick={this.handleDeleteStudent} className={classes.borderBottom + " " + classes.liCommon}><Delete className={classes.btnIcon} />Delete</MenuItem></div>}
                    {status == 1 && <MenuItem onClick={this.handleEditStudent} className={classes.borderBottom + " " + classes.liCommon}><Edit className={classes.btnIcon} />Edit</MenuItem>}
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ActionButtonForManager);