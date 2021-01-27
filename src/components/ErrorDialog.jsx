import React from 'react';
import { withStyles, Dialog, Divider, DialogContent, Typography } from '@material-ui/core';
import FormHeader from './FormHeader';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    btnIcon: { textAlign: "center", fontSize: "100px", marginRight: "10px", color: 'red', [theme.breakpoints.down('sm')]: { fontSize: "50px" } },
    textStyle: { fontSize: "25px", color: "red" },
    btnStyle: { padding: "20px", textAlign: 'center' }
});
class ErrorDialog extends React.Component {
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

                <FormHeader headerText={"Error"} />
                <DialogContent style={{ textAlign: "center" }}>
                    <CloseIcon className={classes.btnIcon} /><br></br>
                    <Typography className={classes.textStyle}>{this.props.HeaderText}</Typography>
                </DialogContent>
                <Divider />
                <div className={classes.btnStyle}>
                    {this.props.successButton.map((button, i) =>
                        <div key={i}><div>{button}</div></div>
                    )}
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ErrorDialog);