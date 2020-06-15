import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button } from '@material-ui/core';
import ActionButton from './ActionEventButton';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right" },
    pad0:{padding:0},
    evenetsTitle:{fontWeight:500, marginLeft:"5px", marginTop:"15px"},
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});
const eventOptions = [{ value: 1, label: "Sports" }, { value: 2, label: "Singing" }, { value: 3, label: "Dancing" }, { value: 4, label: "Essay Writing" }, { value: 5, label: "Drawing" }, { value: 6, label: "Speaking" }]
const sportsOptions = [{ value: 1, label: "Cricket" }, { value: 2, label: "Football" }, { value: 3, label: "Volleyball" }, { value: 4, label: "Badminton" }, { value: 5, label: "Race" }, { value: 6, label: "Long Jump" }, { value: 7, label: "Kabaddi" }, { value: 8, label: "Kho-Kho" }]
const singingOptions = [{ value: 1, label: "Single Singing" }, { value: 2, label: 'Group Singing' }]
const danceOptions = [{ value: 1, label: "Solo Dance" }, { value: 2, label: 'Group Dance' }]

class AccountantEvents extends React.Component {
    state = {
       successMessage:'', isSuccess:false, students: [], studentName: '', anchorEl: null, errorMessage: '', isError: false
    };

    tableheads1 = [
        {
            name: "eventname",
            label: "Event Name",
            options: {
                filter: true,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "eventtype",
            label: "Event Type",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventdata",
            label: "Event Details",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventstartdate",
            label: "Start Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventenddate",
            label: "End date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventdescription",
            label: "Event Description",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        }
    ];
    handleEditEvent = async (eventid) =>{
        this.props.history.push('./edit-event/' + eventid);
    }
    handleDeleteEvent = async(eventid) => {
        if(eventid){
            let response = await this.props.authenticatedApiCall('delete', "/api/eventsservice/deleteevents/"+eventid, null)
            if(response.data.status === 1){
                this.setState({successMessage:response.data.statusDescription, isSuccess: true})
            }else if(response.data.statusDescription === 0){
                this.setState({errorMessage:response.data.statusDescription, isError: true})
            }
        }
    }

    setEventType = (eventType) =>{
        let eventtype= '';
        eventOptions.map((item)=>{
            if(item.value === eventType){
                eventtype = item.label;
            }
        })
        return eventtype;
    }
    setSportsName = (sports) =>{
        let eventsArray = [];
        sports.forEach(eventObj => {
            sportsOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj.label)
                }
            })
        })
        return eventsArray;
    }
    setSingingName = (song) =>{
        let eventsArray = [];
        song.forEach(eventObj => {
            singingOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj.label)
                }
            })
        })
        return eventsArray;
    }
    setDancingName = (dance) =>{
        let eventsArray = [];
        dance.forEach(eventObj => {
            danceOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj.label)
                }
            })
        })
        return eventsArray;
    }
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/eventsservice/getschooleventsforstudent', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item)=>{
            let data = JSON.parse(item.eventData)
            item.eventdescription = data[0].eventdescription
                item.action = {eventid:item.eventid}
                item.eventstartdate = data[0].eventstartdate
                item.eventenddate = data[0].eventenddate
                if(item.eventtype === 1){
                if(data[0].eventdetails.length>0){
                    item.eventdata =  this.setSportsName(data[0].eventdetails)
                    }
                }else if(item.eventtype === 2){
                    if(data[0].eventdetails.length>0){
                        item.eventdata =  this.setSingingName(data[0].eventdetails)
                    } 
                }else if(item.eventtype === 3){
                    if(data[0].eventdetails.length>0){
                        item.eventdata =  this.setDancingName(data[0].eventdetails)
                    } 
                }else{
                    item.eventdata = 'N/A'
                }
                item.eventtype = this.setEventType(item.eventtype)
            })
            this.setState({
                students: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    displayEventDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./eventDetails', this.state.students[rowMeta.dataIndex])
    }
    handleCreateEvent = () => {
        this.props.history.push(`./create-event`);
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess:false })
        // this.props.history.push(`./eventslist`);
    }
    backEventDashboard = () => {
        this.props.history.push(`./eventslist`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backEventDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Events List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Events Lists'} rows={this.state.students} columns={this.tableheads1} rowEventDetailsRedirectFunction={this.displayEventDetailsForMobileView} tableContent="eventsList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backEventDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(AccountantEvents)));