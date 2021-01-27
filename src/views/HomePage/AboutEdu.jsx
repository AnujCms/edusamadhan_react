import React from 'react';
import { withStyles, Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core';

const styles = theme => ({
    root: {
        // margin: theme.spacing(1),
        marginTop: theme.spacing(7),
        backgroundColor:'#800000',
        [theme.breakpoints.down('md')]: { margin: 0},
    },
    linespacing: {
        marginBottom: "10px",
        textAlign: "justify"
    },
    cardStyle:{padding:"50px", backgroundColor:'#DCDCDC', [theme.breakpoints.down('md')]: { padding: "15px"} },
    cardHeadetStyle: { background: "red", height: "60px" },
    heaaderStyle: { height: "92px", width: "300px" },
    paperStyle: { marginTop: "20px", height: "430px", width: "300px" },
    textStyle: { textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" }
});

class AboutEdu extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.textStyle}><b>MORE ABOUT EDUSAMADHAN</b></Typography>
                <Card className={classes.cardStyle}>
                    <Typography className={classes.linespacing}><b>EDUSAMADHAN</b> is an educational based project, mainly designed for up to 12th statndard schools. In this project we are providing various services, such as <b>Administration, Accountant, Online Examination, Attendance, Result, Time Table, Events, Notification.</b> You will get details information about these services in our Home page. The main motive of this project is to reduce the <b>Paper Work</b> and <b>Save the Time as much as possiable.</b> We observed that taking attendance and creating result is the time consuming process and lot of chances of error. We are saving teachers time in taking attendance, making results. If we will save teaachers time then they will get more time to teach in the class room. <b>Edusamadhan</b> will help the class teachers to find out the weak students of his/her class.</Typography><br />
                    <Typography className={classes.linespacing}><b>EDUSAMADHAN</b> will play a vital role in students growth. We are provides the study material and latest general knowledge in single platform. We are also helping the students in selecting the right path after completion of 12th based on his/her previous record. Here we, us and our means <b>EDUSAMADHAN.</b> If you want to know more about US please read our <a onClick={this.handleTermAndCondition}><b><u>Term&Condition</u></b></a> and <a onClick={this.handlePrivacyPolicy}><b><u>Privacy Policy</u></b></a></Typography>
                </Card>
            </div>
        )
    }
}

export default (withStyles(styles)(AboutEdu));
