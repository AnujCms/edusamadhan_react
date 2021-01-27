import React from 'react';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = theme => ({
    card1: { padding: 20, borderBottom: "2px solid #f3f4f5", fontWeight: 600, backgroundColor:"#DBDEDF" },
    fntSize: { fontSize: 17 },
    fontWeight: { color: "rgba(74, 74, 74, 1)", fontWeight: 800 },
    checkWrp: { width: "30px", height: "30px", display: "inline-block", padding: "4px 11px", background: "rgba(238, 242, 243, 1)", marginRight: "20px", borderRadius: "50%" },
    check: { color: "rgba(75, 122, 226, 1)", fontSize: "15px !important", fontWeight: 600, lineHeight: "21px" },
});

class FormHeading extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.card1}><Typography component="h5" className={classes.fntSize + " " + classes.fontWeight}><span className={classes.checkWrp}><span className={classes.check}> {this.props.formHeadingNumber} </span></span>{this.props.formHeadingText}</Typography></div>
        )
    }
}

export default withStyles(styles)(FormHeading);