import React from 'react';
import { withStyles, Grid, Avatar, Card, Paper, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";
import AdminImage from '../../../assets/images/admin.png';
import axios from 'axios';
import { handleFacilityOption } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    center: { fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    cardStyle: { marginTop: "20px", height: "350px", width: "99%" },
    textStyle: { marginTop: "40px", textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "20px" },
    userroleText: { padding: '5px', textAlign: "justify", color: "green", fontWeight: 900, fontSize: "14px" },
    avatar: { width: 200, height: 200, marginLeft: "30%",  [theme.breakpoints.down('md')]: { marginLeft: '21%' } },
    GridContainer: { marginTop: "20px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", textAlign: "right", padding: "7px 20px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
});

class Facilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilitiesDetails: [], isRender: false, errorMessage: ''
        };
    }

    componentDidMount = async () => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'

        axios.get('/api/publiccontent/getFacilityDetails/' + accountId).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, facilitiesDetails: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }

    render() {
        const { classes } = this.props;
        const { facilitiesDetails, isRender, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Helmet> <title>Facilities</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Paper className={classes.formHeader}>
                            <marquee behavior="alternate" direction="right" scrollamount="3">
                                <Typography variant="h4" className={classes.center}>School Facilities</Typography>
                            </marquee>
                        </Paper>
                    </Grid>
                </Grid>
                {isRender ? <Grid container className={classes.GridContainer}>
                    {facilitiesDetails.map((item, index) =>
                        <Grid item lg={4} md={4} sm={12} xs={12} key={'facilities' + index}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <Typography className={classes.cardTextStyle}>{handleFacilityOption(item.faculityType).label}</Typography>
                                <Typography className={classes.userroleText}>{item.facilityDetails}</Typography>
                            </Card>
                        </Grid>)}
                </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(Facilities);