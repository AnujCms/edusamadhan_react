import React from 'react';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = theme => ({
    formHeader: { margin: "0px", height: "70px", textTransform: "uppercase", width: "100%", background: 'rgba(75, 123, 227, 1)', color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" }
});

class FormHeader extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
            <Helmet> <title>{this.props.pageTitle}</title></Helmet>
            <Paper style={{ margin: "0px", height: "70px", width: "100%" }}>
                <Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12} className={classes.formHeader}>
                        <Typography className={classes.center}>{this.props.headerText}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            </>
        )
    }
}

export default withStyles(styles)(FormHeader);