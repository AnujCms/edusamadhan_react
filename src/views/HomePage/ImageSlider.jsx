import React from 'react';
import { withStyles, Grid, Typography, Card, CardContent } from '@material-ui/core';
import a from '../../assets/images/a.jpg';
import b from '../../assets/images/b.jpg';
import c from '../../assets/images/c.jpg';
import d from '../../assets/images/d.jpg';
import e from '../../assets/images/e.jpg';
import f from '../../assets/images/f.jpg';
import g from '../../assets/images/g.jpg';
import i from '../../assets/images/i.jpg';
import j from '../../assets/images/j.jpg';
import h from '../../assets/images/h.jpg';
import k from '../../assets/images/k.jpg';
import l from '../../assets/images/l.jpg';
import m from '../../assets/images/m.jpg';

import BackgroundSlider from 'react-background-slider';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(21),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: theme.spacing(30) },
    },
    cardStyle: {marginLeft:"40%", height: "400px", width: "99%", [theme.breakpoints.down('md')]: { margin: 0, marginTop: "30px", }},
    avatar: { width: 200, height: 200, marginLeft: "140px" },
    heaaderStyle: { height: "92px", width: "300px" },
    cardTop:{height:"70px", background:"#7B1113"},
    typoStyle:{color:'green', fontWeight: 900, fontSize: "16px", textAlign: "justify"},
    textStyle: {textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px",[theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 }},
    cardTextStyle: {paddingTop:"5px", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" }
});

class ImageSlider extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <BackgroundSlider
                    images={[c,b,d,a,e,f,g,h,i,j,k,l,m]}
                    duration={5} transition={2}
                />
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.heaaderStyle}>
                        <Typography className={classes.textStyle}><marquee behavior="alternate">Welcome to Edusamadhan</marquee></Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className={classes.cardStyle}>
                            <div className={classes.cardTop}>
                                <Typography className={classes.cardTextStyle}>Welcome</Typography>
                            </div>
                            <CardContent>
                            <marquee behavior="scroll" direction="up" scrollamount="1">
                            <Typography className={classes.typoStyle}><b>EDUSAMADHAN</b> is an educational based project, mainly designed for up to 12th statndard schools. In this project we are providing various services, such as <b>Administration, Accountant, Online Examination, Attendance, Result, Time Table, Events, Notification.</b> You will get details information about these services in our Home page. The main motive of this project is to reduce the <b>Paper Work</b> and <b>Save the Time as much as possiable.</b> We observed that taking attendance and creating result is the time consuming process and lot of chances of error. We are saving teachers time in taking attendance, making results. If we will save teaachers time then they will get more time to teach in the class room. <b>Edusamadhan</b> will help the class teachers to find out the weak students of his/her class.</Typography><br />
                            </marquee>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                   </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className={classes.cardStyle}>
                            <div className={classes.cardTop}>
                                <Typography className={classes.cardTextStyle}>Announcements</Typography>
                            </div>
                            <CardContent>
                            <marquee behavior="scroll" direction="up" scrolldelay="3" scrollamount="3">
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                <Typography className={classes.typoStyle}>Managing timetable for class is a chalanging task. We made it very simple. Here we can manage the class time table very fast.</Typography>
                                </marquee>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default (withStyles(styles)(ImageSlider));
