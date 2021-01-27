import React from 'react';
import { withStyles, Grid, Button, Avatar, Card, Paper, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";
import AdminImage from '../../../assets/images/admin.png';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';

const styles = theme => ({
    root: {
        margin: theme.spacing(15),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(13),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    messageUserNameStyle: { padding: "20px", textAlign: "center", color: "brown", fontWeight: 900, fontSize: "26px" },
    messageSchoolStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    messageTextStyle: { padding: "50px", textAlign: "justify", color: "green", fontWeight: 900, fontSize: "16px" },
    avatar: { width: 200, height: 200, marginLeft: "28%" },
    frequencySingle: { border: "1px solid #b4e800 !important", borderRadius: "4px !important", marginRight: 10, maxWidth: 149, whiteSpace: "inherit", height: "inherit", textAlign: "left", display: "inline-block", color: "#536c70", paddingTop: 10, paddingBottom: 10 },
    inputSelect: { width: "400px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: "2", messageDetails: '', isRender: false, messageTitle: 'Director Message'
        };
    }

    getUsersMessage = async (userRole) => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        axios.get('/api/publiccontent/getUsersMessage/' + userRole + "/" + accountId).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, messageDetails: response.data.statusDescription[0] })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }
    componentDidMount = async () => {
        let userRole = 2;
        this.getUsersMessage(userRole);
    }
    handleMessageChange = async (event, value) => {
        let title = 'Director Message';
        if (value == 3) {
            title = 'Manager Message'
        } else if (value == 4) {
            title = 'Principal Message'
        }
        this.setState({ messageValue: value, messageTitle: title })
        this.getUsersMessage(value);
    }
   
    render() {
        const { classes } = this.props;
        const { messageDetails, isRender, messageTitle, errorMessage } = this.state;
        let messageUser = '';
        if (messageDetails.messageUser == 2) {
            messageUser = "Director"
        } else if (messageDetails.messageUser == 3) {
            messageUser = "Manager"
        } else if (messageDetails.messageUser == 4) {
            messageUser = "Principal"
        }
        return (
            <div className={classes.root}>
                <Helmet> <title>Messages</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ToggleButtonGroup
                            value={this.state.messageValue}
                            exclusive
                            onChange={this.handleMessageChange}
                            aria-label="text alignment"
                            className={classes.frequencyGroupWrap}
                        >
                            <ToggleButton value="2" aria-label="bold">Director Message</ToggleButton>
                            <ToggleButton value="3" aria-label="bold">Manager Message</ToggleButton>
                            <ToggleButton value="4" aria-label="bold">Principal Message</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <br></br>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.formHeader}>
                        <Typography className={classes.center}>{messageTitle}</Typography>
                    </Paper>
                </Grid>
                {isRender ? <Card style={{ marginTop: "20px" }}>
                    <Grid container>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Avatar alt="No Images" src={messageDetails.images === null ? AdminImage : "data:image/jpeg;base64," + messageDetails.images} className={classes.avatar} />
                            <Typography className={classes.messageUserNameStyle}>{JSON.parse(messageDetails.userMessage).userName}</Typography>
                            <Typography className={classes.messageSchoolStyle}>{messageUser}, {JSON.parse(messageDetails.userMessage).accountName}</Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={12} xs={12} className={classes.messageTextStyle}>
                            <Typography>"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham." </Typography>
                            <Typography style={{ textAlign: 'right' }}>by {JSON.parse(messageDetails.userMessage).userName}</Typography>
                        </Grid>
                    </Grid>
                </Card> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(MessageList);