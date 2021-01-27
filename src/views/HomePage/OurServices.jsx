import React from 'react';
import { withStyles, Grid, Typography, Card, Avatar, CardContent } from '@material-ui/core';
import NotificationImage from '../../assets/images/notification.png';
import EventImage from '../../assets/images/event.png';
import TimeTableImage from '../../assets/images/timtble.png';
import AdmininstrationImage from '../../assets/images/admininstration.png';
import AccountantImage from '../../assets/images/account.jpeg';
import ResultsImage from '../../assets/images/results.jpeg';
import ExaminationImage from '../../assets/images/examination.jpeg';
import SeatingArrangementImage from '../../assets/images/seatingarrangement.jpeg';

const styles = theme => ({
    root: {
        backgroundColor: '#DCDCDC',
        [theme.breakpoints.down('md')]: { margin: 0, marginLeft: 0 },
    },
    headerStyle: { height: "50px", backgroundColor: '#800000' },
    cardStyle: { marginTop: "10px", backgroundColor: '#DCDCDC', height: "470px", width: "99%" },
    avatar: { width: 200, height: 200, marginLeft: "28%", [theme.breakpoints.down('md')]: { marginLeft: "23%" } },
    textStyle: { marginTop: "40px", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" }
});

class OurServices extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.headerStyle}>
                    <Typography className={classes.textStyle}><b>OUR SERVICES</b></Typography>
                </div>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={NotificationImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Notification*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>We are providing proper notification among all users. Principal can send notification based on users. Class teacher can also send the notification to their students.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={EventImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Events*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>We are managing the schools events such as any cultural program, annual function, any comption etc. All user will get the information about the Event such as time and date.</Typography>
                                </CardContent>
                            </Card>
                        </Grid> <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={TimeTableImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Time Table*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={AdmininstrationImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Admininstration*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>Heigher authorities of the school keep a eye on the school ectivity without coming to the school everyday. They will be able to see Present/Absend of the staff as well as the students.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={SeatingArrangementImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Seating Arrangement*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>Preparing the seating arrangement of students for the examination is a very headache work. We provides a simple solution for this problem.</Typography>
                                </CardContent>
                            </Card>
                        </Grid> <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={ExaminationImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Online Exaination*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>During the period of Admission taking the exam of student and evaluation the answer sheat is a time consuming process as well as wastes of paper. Here we came with simple solution. We can manage the online entrance exmination. It is very simple and easy.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={AdmininstrationImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Attendance*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>This feature makes the attendance process quite easy and simple. Class teacher can use their mobile phone to record the attendance of the class. We are sending one notification to the parents about the status of thier child.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={ResultsImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Result*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>We are helping the class teacher to prepare the students result. Faculty will enter the students marks, we are genrating the report of the student.</Typography>
                                </CardContent>
                            </Card>
                        </Grid> <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={AccountantImage} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>*Accountant*</Typography>
                                </div>
                                <CardContent>
                                    <Typography>Accountant can submit the students fee and view the fee. He can also make the record of daily expenses. He can genrate the full annual audit reeport of account.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}

export default (withStyles(styles)(OurServices));
