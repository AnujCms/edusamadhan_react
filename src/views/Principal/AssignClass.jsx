import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import AssignClassDialog from './AssignClassDialog';
import { Helmet } from "react-helmet";

const DialogTitle = withStyles(theme => ({
    root: { borderBottom: `1px solid ${theme.palette.divider}`, margin: 0, padding: "25px" },
    closeButton: { position: 'absolute', right: theme.spacing.unit, top: theme.spacing.unit, color: theme.palette.grey[500] }
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class AssignClass extends React.Component {
    state = {
        scroll: 'body', dialogVariable: true
    };

    dismiss = () => {
        this.setState({ dialogVariable: false });
    }
    render() {
        return (
            <div>
                <Helmet> <title>Assign Class</title></Helmet>
                <Dialog
                    onClose={this.props.dismiss}
                    scroll={this.state.scroll}
                    open={this.state.dialogVariable}
                    aria-labelledby="customized-dialog-title"
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                        Assign Class for Teacher
                    </DialogTitle>
                    <DialogContent>
                        <AssignClassDialog teacherid={this.props.teacherid} closeDialog={this.dismiss} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AssignClass;
