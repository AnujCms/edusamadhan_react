import React from 'react';
import { withStyles, Button, Grid, Typography, Card, Avatar, CardContent, CardActions } from '@material-ui/core';
import NotificationImage from '../../assets/images/notification.png';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const styles = theme => ({
    root: {
        // margin: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        // marginTop: theme.spacing(4),
        backgroundColor: '#DCDCDC',
        [theme.breakpoints.down('md')]: { margin: 0, marginLeft: 0 },
    },
    headerStyle: { height: "50px", backgroundColor: '#800000' },
    btnStyle: { width: '100%', marginTop: "17px", marginBottom: "10px", marginLeft: "20%", [theme.breakpoints.down('md')]: { marginLeft: '32%' } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    cardStyle: { marginTop: "10px", backgroundColor: '#DCDCDC', height: "470px", width: "99%" },
    avatar: { width: 200, height: 200, marginLeft: "28%", [theme.breakpoints.down('md')]: { marginLeft: "23%" } },
    cardText: { textAlign: "center", color: "green", fontWeight: 900, fontSize: "24px" },
    textStyle: { marginTop: "40px", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" }
});

class OurClients extends React.Component {
    state = {
        accountsList: [], isRedirect: false, renderto: '', selectedSchoolDetails: ''
    }
    componentDidMount = async () => {
        axios.get('/api/publiccontent/getAllSchoolsName').then(response => {
            if (response.data.status == 1) {
                this.setState({ accountsList: response.data.statusDescription })
            }
        })
    }
    handleViewSchoolDetails = (data) => {
        this.setState({ isRedirect: true, selectedSchoolDetails: data, renderto: '/publiccontent' })
    }

    render() {
        const { classes } = this.props;
        const { accountsList } = this.state;
        return (
            <>
                <div className={classes.headerStyle}>
                    <Typography className={classes.textStyle}><b>OUR CLIENTS</b></Typography>
                </div>
                <div className={classes.root}>
                    {this.state.isRedirect && <>
                        <Redirect to={{
                            pathname: this.state.renderto,
                            state: this.state.selectedSchoolDetails
                        }}
                        />
                    </>}
                    <Grid container>
                        {accountsList.map((item, index) =>
                            <Grid item lg={4} md={4} sm={12} xs={12} key={'accountname' + index}>
                                <Card className={classes.cardStyle}>
                                    <Avatar alt="No Images" src={NotificationImage} className={classes.avatar} />
                                    <div>
                                        <Typography className={classes.cardTextStyle}>{item.accountName}</Typography>
                                    </div>
                                    <CardContent>
                                        <Typography className={classes.cardText}><b>Address:</b> {item.accountAddress}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.btnStyle}>
                                            <Button onClick={(e) => { this.handleViewSchoolDetails(item, e) }} className={classes.createUser}>View Details</Button>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(OurClients);
