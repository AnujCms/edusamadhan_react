import React from 'react';
import { withStyles, Grid, Avatar, Card, Paper, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";
import AdminImage from '../../../assets/images/admin.png';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(13),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    cardStyle: { marginTop: "30px", height: "350px", width: "99%" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    userroleText: { padding: '5px', textAlign: "justify", color: "green", fontWeight: 900, fontSize: "14px" },
    avatar: { width: 100, height: 100, marginLeft: "38%" },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            achievementValue: "1", achievementDetails: [], isRender: false, acievementTitle: '10th Toppers'
        };
    }

    getUsersMessage = async (classId) => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        axios.get('/api/publiccontent/getAchievement/' + classId + "/" + accountId).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, achievementDetails: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }
    componentDidMount = async () => {
        let classId = 1;
        this.getUsersMessage(classId);
    }
    handleMessageChange = async (event, value) => {
        let title = '10th Toppers';
        if (value == 2) {
            title = '12th Toppers'
        } else if (value == 3) {
            title = 'Pass Out Students'
        }
        this.setState({ achievementValue: value, acievementTitle: title })
        this.getUsersMessage(value);
    }
    render() {
        const { classes } = this.props;
        const { achievementDetails, isRender, acievementTitle, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Helmet> <title>Achievements</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ToggleButtonGroup
                            value={this.state.achievementValue}
                            exclusive
                            onChange={this.handleMessageChange}
                            aria-label="text alignment"
                            className={classes.frequencyGroupWrap}
                        >
                            <ToggleButton value="1" aria-label="bold">10th Toppers</ToggleButton>
                            <ToggleButton value="2" aria-label="bold">12th Toppers</ToggleButton>
                            <ToggleButton value="3" aria-label="bold">Pass Out Students</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <br></br>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.formHeader}>
                        <Typography className={classes.center}>{acievementTitle}</Typography>
                    </Paper>
                </Grid>
                {isRender ? <Grid container className={classes.GridContainer}>
                    {achievementDetails.map((item, index) =>
                        <Grid item lg={4} md={4} sm={12} xs={12} key={'achievement' + index}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{JSON.parse(item.achievementsData).studentName}</Typography>
                                <Typography className={classes.cardTextStyle}>{JSON.parse(item.achievementsData).percentage}%</Typography>
                                <Typography className={classes.userroleText}>{JSON.parse(item.achievementsData).message} </Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(MessageList);