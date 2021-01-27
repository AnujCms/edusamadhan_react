import React from 'react';
import { withStyles, Button, Paper, Typography, Grid } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

});

class OfflineAdmission extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Offline Admission</title></Helmet>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.formHeader}>
                        <Paper className={classes.formHeader}>
                            <Typography className={classes.center}>Offline Admission Portal</Typography>
                        </Paper>
                    </Grid>
                    <Paper >

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                        </Grid>
                    </Paper>
                </Grid>
            </div >
        );
    }
}

export default withStyles(styles)(OfflineAdmission);