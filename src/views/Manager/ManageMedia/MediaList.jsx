import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Avatar, Card, Typography } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import AdminImage from '../../../assets/images/admin.png';
import WithDashboard from '../../WithDashboard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Edit } from '@material-ui/icons';
import FormHeader from '../../../components/FormHeader';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(13),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    btnIcon: { fontSize: 18, textAlign: "right" },
    cardStyle: { marginTop: "10px", height: "300px", width: "99%" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    avatar: { width: 250, height: 250, marginLeft: "48px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", textAlign: "right", padding: "7px 20px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaValue: "1", mediaDetails: [], isRender: false, mediaTitle: "Function Photoes"
        };
    }

    getUsersMessage = async (mediaId) => {
        let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getMediaDetails/' + mediaId, null);
        if (response.data.status === 1) {
            this.setState({ isRender: true, mediaDetails: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
        }
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
    handleCreateMedia = () => {
        this.props.history.push('./createmedia');
    }
    handleEditMedia = (e, mediaId) => {
        this.props.history.push('./edit-media/' + mediaId)
    }
    render() {
        const { classes } = this.props;
        const { mediaDetails, isRender, mediaTitle, errorMessage } = this.state;
        return (
            <div className={classes.root}>
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
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.cstmprotoBtnWrap}>
                        <Button onClick={this.handleCreateMedia} className={classes.primaryBtn}>Create</Button>
                    </Grid>
                    <br></br>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormHeader headerText={mediaTitle} pageTitle={"Media"} />
                </Grid>
                {isRender ? <Grid container className={classes.GridContainer}>
                    {mediaDetails.map((item) =>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar variant="square" alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{item.mediaTitle} <Button onClick={(e) => { this.handleEditMedia(e, item.mediaId) }}><Edit className={classes.btnIcon} /></Button></Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(MessageList))));