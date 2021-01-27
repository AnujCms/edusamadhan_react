import React from 'react';
import { withStyles, Grid, Typography, Card, Avatar, CardContent } from '@material-ui/core';
import ContactUsImage from '../../assets/images/contactus.jpeg';
import ContactUsForm from './ContactUsForm';

const styles = theme => ({
    root: {
        // margin: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        // marginTop: theme.spacing(4),
        backgroundColor: '#DCDCDC',
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    headerStyle: { height: "50px", backgroundColor: '#800000' },
    cardStyle: { height: "100%", width: "100%" },
    avatar: { width: 200, height: 200, marginLeft: "35%", [theme.breakpoints.down('md')]: { marginLeft: "23%" } },
    textStyle: { marginTop: "40px", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" },
    cardText: { textAlign: "center", color: "green", fontWeight: 900, fontSize: "24px" }
});

class ContactUs extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.headerStyle}>
                    <Typography className={classes.textStyle}><b>CONTACT US</b></Typography>
                </div>
                <div className={classes.root}>
                    <Card className={classes.cardStyle}>
                        <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <CardContent>
                                    <Typography className={classes.cardText}>Mob. No: 9648340892</Typography>
                                    <Typography className={classes.cardText}>EmailId: edusamadhana@agmail.com</Typography>
                                </CardContent>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <ContactUsForm />

                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </>
        )
    }
}

export default (withStyles(styles)(ContactUs));
