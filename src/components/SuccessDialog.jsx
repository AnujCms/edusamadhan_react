import React from 'react';
import { withStyles, Dialog, Divider, DialogContent, DialogActions, Typography } from '@material-ui/core';
import FormHeader from './FormHeader';
import CheckIcon from '@material-ui/icons/Check';
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({
    btnIcon: { textAlign: "center", fontSize: "100px", marginRight: "10px", color: 'green', [theme.breakpoints.down('sm')]: { fontSize: "50px" } },
    textStyle: { fontSize: "25px", color: "green" },
    btnStyle: { padding: "20px" }
});

class SuccessDialog extends React.Component {
    state = { scroll: 'body' };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                scroll="body"
                open={true}
                onClose={this.props.close}
                style={{ overflow: "visible" }}
                aria-labelledby="form-dialog-title">

                <FormHeader headerText={this.props.HeaderText} />
                <DialogContent style={{ textAlign: "center" }}>
                    {this.props.isConfirm ? <HelpIcon className={classes.btnIcon} /> :
                        <CheckIcon className={classes.btnIcon} />}
                    <br></br>
                    <Typography className={classes.textStyle}>{this.props.BodyText}</Typography>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.btnStyle}>
                    {this.props.successButton.map((button, i) =>
                        <div key={i}><div>{button}</div></div>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SuccessDialog);