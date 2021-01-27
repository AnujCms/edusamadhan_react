import React from 'react';
import { withStyles, Grid, Typography, Card, CardContent } from '@material-ui/core';

const styles = theme => ({
    root: {
        backgroundColor: '#A9A9A9',
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    cardStyle: { height: "100%", width: "100%", backgroundColor: '#A9A9A9', padding: theme.spacing(2) },
    headingStyle: { textAlign: "left", color: "#fff", fontWeight: 900, fontSize: "24px" },
    descriptionStyle: { textAlign: "left", color: "#fff", fontWeight: 900, fontSize: "14px" }
});

class Footer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.cardStyle}>
                    <CardContent>
                        <Grid container>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Typography className={classes.headingStyle}>CONTACT INFORMATION</Typography>
                                <Typography className={classes.descriptionStyle}>9638330892</Typography>
                                <Typography className={classes.descriptionStyle}>8090037787</Typography>
                                <Typography className={classes.descriptionStyle}>https://edusamadhana@agmail.com</Typography>
                                <Typography className={classes.descriptionStyle}>https://facebook.com/edusamadhan</Typography>
                                <Typography className={classes.descriptionStyle}>https://www.instagram.com/edusamadhan</Typography>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Typography className={classes.headingStyle}>OUR QUALITY</Typography>
                                <Typography className={classes.descriptionStyle}>24/7 help</Typography>
                                <Typography className={classes.descriptionStyle}>End to End Encrypited</Typography>
                                <Typography className={classes.descriptionStyle}>User Friendly</Typography>
                                <Typography className={classes.descriptionStyle}>Easy To Learn</Typography>
                                <Typography className={classes.descriptionStyle}>Easy To Addopt</Typography>
                                <Typography className={classes.descriptionStyle}>Min Cost</Typography>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Typography className={classes.headingStyle}>OUR SERVICES</Typography>
                                <Typography className={classes.descriptionStyle}>Result Management</Typography>
                                <Typography className={classes.descriptionStyle}>Attendance Management</Typography>
                                <Typography className={classes.descriptionStyle}>Online Examnation</Typography>
                                <Typography className={classes.descriptionStyle}>Seating Arrangment</Typography>
                                <Typography className={classes.descriptionStyle}>Account Managemnt</Typography>
                                <Typography className={classes.descriptionStyle}>Event Management</Typography>
                                <Typography className={classes.descriptionStyle}>Notification Management</Typography>
                                <Typography className={classes.descriptionStyle}>Time Table Management</Typography>
                                <Typography className={classes.descriptionStyle}>Administration Management</Typography>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Typography className={classes.headingStyle}>ADDRESS</Typography>
                                <Typography className={classes.descriptionStyle}>Plot no-5</Typography>
                                <Typography className={classes.descriptionStyle}>Gola Gokaran Nath</Typography>
                                <Typography className={classes.descriptionStyle}>Lakhimpur Kheri</Typography>
                                <Typography className={classes.descriptionStyle}>Utter Pradesh</Typography>
                                <Typography className={classes.descriptionStyle}>Pin-262802</Typography>
                                <Typography className={classes.descriptionStyle}>India</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default (withStyles(styles)(Footer));
