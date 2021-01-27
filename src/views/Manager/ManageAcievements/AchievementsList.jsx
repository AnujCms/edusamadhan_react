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
    cardStyle: { marginTop: "20px", height: "350px", width: "99%" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    userroleText: { padding: '5px', textAlign: "justify", color: "green", fontWeight: 900, fontSize: "14px" },
    avatar: { width: 100, height: 100, marginLeft: "180px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", textAlign: "right", padding: "7px 20px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            achievementValue: "1", achievementDetails: [], isRender: false, acievementTitle: '10th Toppers'
        };
    }

    getUsersMessage = async (classId) => {
        let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getAchievement/' + classId, null);
        if (response.data.status === 1) {
            this.setState({ isRender: true, achievementDetails: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    componentDidMount = async () => {
        let classId = 1;
        this.getUsersMessage(classId);
    }
    handleAchievementChange = async (event, value) => {
        let title = '10th Toppers';
        if (value == 2) {
            title = '12th Toppers'
        } else if (value == 3) {
            title = 'Pass Out Students'
        }
        this.setState({ achievementValue: value, acievementTitle: title })
        this.getUsersMessage(value);
    }
    handleCreateAchievement = () => {
        this.props.history.push('./createacievement');
    }
    handleEditAchievement = (e, achievementId) => {
        this.props.history.push('./edit-acievement/' + achievementId)
    }
    render() {
        const { classes } = this.props;
        const { achievementDetails, isRender, acievementTitle, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ToggleButtonGroup
                            value={this.state.achievementValue}
                            exclusive
                            onChange={this.handleAchievementChange}
                            aria-label="text alignment"
                            className={classes.frequencyGroupWrap}
                        >
                            <ToggleButton value="1" aria-label="bold">10th Toppers</ToggleButton>
                            <ToggleButton value="2" aria-label="bold">12th Toppers</ToggleButton>
                            <ToggleButton value="3" aria-label="bold">Pass Out Students</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.cstmprotoBtnWrap}>
                        <Button onClick={this.handleCreateAchievement} className={classes.primaryBtn}>Create</Button>
                    </Grid>
                    <br></br>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormHeader headerText={acievementTitle} pageTitle={"Achievements"} />
                </Grid>
                {isRender ? <Grid container className={classes.GridContainer}>
                    {achievementDetails.map((item) =>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{JSON.parse(item.achievementsData).studentName}</Typography>
                                <Typography className={classes.cardTextStyle}>{JSON.parse(item.achievementsData).percentage}%</Typography>
                                <Typography className={classes.userroleText}>{JSON.parse(item.achievementsData).message} <Button onClick={(e) => { this.handleEditAchievement(e, item.achievementId) }}><Edit className={classes.btnIcon} /></Button></Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(MessageList))));