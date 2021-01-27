import React from 'react';
import { withStyles, Grid, Avatar, Card, Paper, Typography, Button } from '@material-ui/core';
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
    cardStyle: { marginTop: "10px", height: "300px", width: "99%" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    avatar: { width: 250, height: 250, marginLeft: "14%" },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaValue: "1", mediaDetails: [], isRender: false, mediaTitle: "Function Photoes"
        };
    }

    getUsersMessage = async (mediaId) => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        axios.get('/api/publiccontent/getMediaDetails/' + mediaId + "/" + accountId).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, mediaDetails: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }
    componentDidMount = async () => {
        let mediaId = 1;
        this.getUsersMessage(mediaId);
    }
    handleMediaChange = async (event, value) => {
        let title = 'Function Photoes'
        if (value == 2) {
            title = 'Science Fair'
        } else if (value == 3) {
            title = 'Tour Photoes'
        }
        this.setState({ mediaValue: value, mediaTitle: title })
        this.getUsersMessage(value);
    }

    render() {
        const { classes } = this.props;
        const { mediaDetails, isRender, mediaTitle, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Helmet> <title>Media</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ToggleButtonGroup
                            value={this.state.mediaValue}
                            exclusive
                            onChange={this.handleMediaChange}
                            aria-label="text alignment"
                            className={classes.frequencyGroupWrap}
                        >
                            <ToggleButton value="1" aria-label="bold">Function Photoes</ToggleButton>
                            <ToggleButton value="2" aria-label="bold">Science Fair</ToggleButton>
                            <ToggleButton value="3" aria-label="bold">Tour Photoes</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <br></br>
                </Grid>
                {isRender && <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.formHeader}>
                        <Typography className={classes.center}>{mediaTitle}</Typography>
                    </Paper>
                </Grid>}
                {isRender ? <Grid container className={classes.GridContainer}>
                    {mediaDetails.map((item, index) =>
                        <Grid item lg={3} md={3} sm={6} xs={12} key={'media' + index}>
                            <Card className={classes.cardStyle}>
                                <Avatar variant="square" alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{item.mediaTitle} </Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(MessageList);