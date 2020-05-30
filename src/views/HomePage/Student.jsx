import React from 'react';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, Card, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 15,
        maxWidth: '1200px',
        margin: '5px auto',
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            maxWidth: '100%',
            marginBottom: '55px'
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * .1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: '0px',
        paddingRight: '0px'
    },
    navLink: { padding: "5px 15px", textDecorationLine: "none", display: "inline-flex", float: "right" },
    pad60: { padding: "30px" },
    cardWidthHeoght:{marginTop:"25px", padding:"10px", paddingTop:"60px", textAlign:"center", width:"310px", height:"135px"},
    login: { width: "30%", marginTop:"50px", cursor:"pointer", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } }
});

class Student extends React.Component {
    render() {
        const { match, classes } = this.props;
        return (
            <div className={classes.root}>
                <GridContainer>
                <GridItem lg={12} md={12} xs={12} sm={12}>
                        <Typography variant="h3"><b>STUDENTS WORKS</b></Typography>
                        <br/>
                        <Typography variant="h5"><b>1. </b>Student can view the <b>Attendance</b>.</Typography><br/>
                        <Typography variant="h5"><b>2. </b>Student can view the <b>Result</b>.</Typography><br/>
                        <Typography variant="h5"><b>3. </b>Student can view the <b>Fees details</b>.</Typography><br/>
                        <Typography variant="h5"><b>4. </b>Student can view the scheduled parameters and Time table set by the authorities.</Typography><br/>
                        <Typography variant="h5"><b>5. </b>They can view their Progress report of Test and Exams.</Typography><br/>
                        <Typography variant="h5"><b>6. </b>They can view all Events details set by the Management.</Typography><br/>
                        <Typography variant="h5"><b>7. </b>Students can read the notification which is related to them only.</Typography>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(Student));
