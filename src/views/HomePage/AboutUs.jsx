import React from 'react';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, Card, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 0.5,
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
    linespacing:{
        marginBottom:"10px",
        textAlign: "justify"
    },
    navLink: { padding: "5px 15px", textDecorationLine: "none", display: "inline-flex", float: "right" },
    pad60: { padding: "30px" },
    cardWidthHeoght:{marginTop:"25px", padding:"10px", paddingTop:"60px", textAlign:"center", width:"310px", height:"135px"},
    login: { width: "100%", marginTop:"50px", cursor:"pointer", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } }
});

class AboutUs extends React.Component {
    handleTermAndCondition = () =>{
        window.open('../termAndCondition');
    }
    handlePrivacyPolicy = () =>{
        window.open('../privacyPolicy');
    }
    render() {
        const { match, classes } = this.props;
        return (
            <div className={classes.root}>
            <Helmet> <title>ABOUT EDUSAMADHAN</title></Helmet>
                <GridContainer>
                    <GridItem lg={12} md={12} xs={12} sm={12} className={classes.login}>
                        <Typography className={classes.linespacing} variant="h4"><b>MORE ABOUT EDUSAMADHAN()</b></Typography><br />
                        <Typography className={classes.linespacing}><b>EDUSAMADHAN</b> is an educational based project, mainly designed for up to 12th statndard schools. In this project we are providing various services, such as <b>Administration, Accountant, Online Examination, Attendance, Result, Time Table, Events, Notification.</b> You will get details information about these services in our Home page. The main motive of this project is to reduce the <b>Paper Work</b> and <b>Save the Time as much as possiable.</b> We observed that taking attendance and creating result is the time consuming process and lot of chances of error. We are saving teachers time in taking attendance, making results. If we will save teaachers time then they will get more time to teach in the class room. <b>Edusamadhan</b> will help the class teachers to find out the weak students of his/her class.</Typography><br />
                        <Typography className={classes.linespacing}><b>EDUSAMADHAN</b> will play a vital role in students growth. We are provides the study material and latest general knowledge in single platform. We are also helping the students in selecting the right path after completion of 12th based on his/her previous record. Here we, us and our means <b>EDUSAMADHAN.</b> If you want to know more about US please read our <a onClick={this.handleTermAndCondition}><b><u>Term&Condition</u></b></a> and <a onClick={this.handlePrivacyPolicy}><b><u>Privacy Policy</u></b></a></Typography>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(AboutUs));
