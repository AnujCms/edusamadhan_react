import React from 'react';
import { withStyles, Grid, Paper, Button } from '@material-ui/core';
import { connect } from 'formik';

const styles = theme => ({
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } }
});

class FormFooter extends React.Component {
    handleCancel = () =>{
        this.props.handleCancel();
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.btnStyle}>
            <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                    <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                    <Button type="submit" disabled={this.props.startSpinner} className={classes.createUser}>Submit</Button>
                </Grid>
            </Grid>
        </Paper>
        )
    }
}

export default withStyles(styles)(connect(FormFooter));