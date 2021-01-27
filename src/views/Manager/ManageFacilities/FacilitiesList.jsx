import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Avatar, Card, Typography } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import AdminImage from '../../../assets/images/admin.png';
import WithDashboard from '../../WithDashboard';
import { Edit } from '@material-ui/icons';
import { handleFacilityOption } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    btnIcon: { fontSize: 18, textAlign: "right" },
    cardStyle: { marginTop: "20px", height: "350px", width: "99%" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    userroleText: { padding: '5px', textAlign: "justify", color: "green", fontWeight: 900, fontSize: "14px" },
    avatar: { width: 200, height: 200, marginLeft: "120px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { padding: 0, marginTop: "10px", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", textAlign: "right", padding: "7px 20px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilitiesDetails: [], isRender: false, errorMessage: ''
        };
    }

    componentDidMount = async () => {
        let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getFacilityDetails', null);
        if (response.data.status === 1) {
            this.setState({ isRender: true, facilitiesDetails: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }

    handleCreateFacility = () => {
        this.props.history.push('./createfacility');
    }
    handleEditFacilityDetails = (e, faculityId) => {
        this.props.history.push('./edit-facility/' + faculityId)
    }
    render() {
        const { classes } = this.props;
        const { facilitiesDetails, isRender, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>School facilities Details</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.cstmprotoBtnWrap}>
                        <Button onClick={this.handleCreateFacility} className={classes.primaryBtn}>Create</Button>
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormHeader headerText={"We are providing best facilities."} pageTitle={"Our Facilities"} />
                </Grid>
                {isRender ? <Grid container className={classes.GridContainer}>
                    {facilitiesDetails.map((item) =>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{handleFacilityOption(item.faculityType).label}</Typography>
                                <Typography className={classes.userroleText}>{item.facilityDetails} <Button onClick={(e) => { this.handleEditFacilityDetails(e, item.faculityId) }}><Edit className={classes.btnIcon} /></Button></Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(MessageList))));