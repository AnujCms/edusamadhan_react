import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { withStyles, withWidth, Grid, Button } from '@material-ui/core';
import AdmissionDropDown from './AdmissionDropDown';
import AboutUsDropDown from './AboutUsDropDown';
import AboutSchool from "./AboutUs/InformationOfSchool";
import EducationSystem from './AboutUs/EducationSystem';
import StaffDetails from './AboutUs/StaffDetails';
import ChildSafty from './AboutUs/ChildSafty';
import FeeStructure from './Admission/FeeStructure';
import Prospectus from './Admission/Prospectus';
import Dossier from './Admission/Dossier';
import AchievementsList from './Achievements/AchievementsList';
import MessageList from './Messages/MessageList';
import MediaList from './Media/MediaList';
import Facilities from './AboutUs/Facilities';
import SchoolHome from './SchoolHome';
import OnlineAdmission from './Admission/OnlineAdmission/CreateStudent';
import OfflineAdmission from './Admission/OfflineAdmission';
import HomeNavbar from '../../components/HomeNavebar';
import { NavLink } from 'react-router-dom'

const styles = theme => ({
    pad60: { padding: "30px" },
    navLink: { padding: "20px 30px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    login: { width: "410px", marginLeft: "33%", marginTop: "15%", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } },
    headPop: { padding: "20px 30px", float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },

});

class PublicContentHome extends React.Component {
    state = {
        anchorEl: null, selectedSchoolDetails: ''
    }
    handleClick = () => {
        this.props.history.push('../public/teachers')
    }
    componentWillMount = () => {
        if (this.props.location.state != undefined) {
            this.setState({ selectedSchoolDetails: this.props.location.state })
        }
    }
    render() {
        const { anchorEl } = this.state;
        const { match, width, classes } = this.props;
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/dashboard`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/educationsystem`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Education System</NavLink>,
                <NavLink to={`${match.url}/facilitydetails`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Facility Details</NavLink>,
                <NavLink to={`${match.url}/onlineadmission`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Online Admission</NavLink>,
                <NavLink to={`${match.url}/offlineadmission`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Offline Admission</NavLink>,
                <NavLink to={`${match.url}/feestructure`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Fee Structure</NavLink>,
                <NavLink to={`${match.url}/achievementslist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Achievements</NavLink>,
                <NavLink to={`${match.url}/facultylist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Faculty List</NavLink>,
                <NavLink to={`${match.url}/childsafty`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Child Safty</NavLink>,
                <NavLink to={`${match.url}/prospectus`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Prospectus</NavLink>,
                <NavLink to={`${match.url}/dossier`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Dossier</NavLink>,
                <NavLink to={`${match.url}/messagelist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Messages</NavLink>,
                <NavLink to={`${match.url}/contactuss`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>News/Events</NavLink>,
                <NavLink to={`${match.url}/medialist`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Media</NavLink>
            ];
        } else {
            Nav = [
                <NavLink to={`${match.url}/dashboard`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <AboutUsDropDown match={this.props.match}></AboutUsDropDown>,
                <AdmissionDropDown match={this.props.match}></AdmissionDropDown>,
                <NavLink to={`${match.url}/medialist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Media</NavLink>,
                <NavLink to={`${match.url}/achievementslist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Achievements</NavLink>,
                <NavLink to={`${match.url}/messagelist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Messages</NavLink>,
                <NavLink to={`${match.url}/contactuss`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>News/Events</NavLink>,
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.headPop}
                >Login</Button>
            ];
        }
        return (
            <div key={this.props}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <HomeNavbar Nav={Nav} homeLink={'./studentlist'} />
                        <Switch>
                            <Route path={this.props.match.url + "/schoolhome"} render={(props) => <SchoolHome selectedSchoolDetails={this.state.selectedSchoolDetails} />} />
                            <Route path={this.props.match.url + "/aboutschool"} component={AboutSchool} />
                            <Route path={this.props.match.url + "/onlineadmission"} component={OnlineAdmission} />
                            <Route path={this.props.match.url + "/offlineadmission"} component={OfflineAdmission} />
                            <Route path={this.props.match.url + "/prospectus"} component={Prospectus} />
                            <Route path={this.props.match.url + "/childsafty"} component={ChildSafty} />
                            <Route path={this.props.match.url + "/dossier"} component={Dossier} />
                            <Route path={this.props.match.url + "/educationsystem"} component={EducationSystem} />
                            <Route path={this.props.match.url + "/achievementslist"} component={AchievementsList} />
                            <Route path={this.props.match.url + "/messagelist"} component={MessageList} />
                            <Route path={this.props.match.url + "/medialist"} component={MediaList} />
                            <Route path={this.props.match.url + "/facilitydetails"} component={Facilities} />
                            <Route path={this.props.match.url + "/feestructure"} render={(props) => <FeeStructure selectedSchoolDetails={this.state.selectedSchoolDetails} />} />
                            <Route path={this.props.match.url + "/facultylist"} render={(props) => <StaffDetails selectedSchoolDetails={this.state.selectedSchoolDetails} />} />
                            <Redirect to={this.props.match.url + "/schoolhome"} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(withWidth()(PublicContentHome));
