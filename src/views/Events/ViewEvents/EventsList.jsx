import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Typography } from '@material-ui/core';
import ActionButton from './ActionEventButton';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    cstmprotoBtnWrap: {
        margin: "10px 0",
        textAlign: "right",
        [theme.breakpoints.down('md')]: { textAlign: "left" }
    },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});
const eventOptions = [{ value: 1, label: "Sports" }, { value: 2, label: "Singing" }, { value: 3, label: "Dancing" }, { value: 4, label: "Essay Writing" }, { value: 5, label: "Drawing" }, { value: 6, label: "Speaking" }]
const sportsOptions = [{ value: 1, label: "Cricket" }, { value: 2, label: "Football" }, { value: 3, label: "Volleyball" }, { value: 4, label: "Badminton" }, { value: 5, label: "Race" }, { value: 6, label: "Long Jump" }, { value: 7, label: "Kabaddi" }, { value: 8, label: "Kho-Kho" }]
const singingOptions = [{ value: 1, label: "Single Singing" }, { value: 2, label: 'Group Singing' }]
const danceOptions = [{ value: 1, label: "Solo Dance" }, { value: 2, label: 'Group Dance' }]

class EventsList extends React.Component {
    state = {
        successMessage: '', isSuccess: false, isDeleteEvent: false, eventList: [], eventId: '', errorMessage: '', isError: false
    };

    tableheads1 = [
        {
            name: "eventName",
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
            name: "eventType",
            label: "Event Type",
            options: {
                filter: true,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventStartdate",
            label: "Start Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventEnddate",
            label: "End date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "eventDescription",
            label: "Event Description",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                       {(value.userId === this.props.currentUser.userDetails.userId) && <ActionButton eventId={value.eventId} onEditEvent={this.handleEditEvent} onDeleteEvent={this.handleDeleteEvent} />}
                   </>
                    )
                }
            }
        }
    ];
    handleEditEvent = async (eventId) => {
        this.props.history.push('./edit-event/' + eventId);
    }
    handleDeleteEvent = (eventId) => {
        this.setState({ eventId: eventId, isDeleteEvent: true, errorMessage: "Are you really want to delete event?" })
    }
    deleteEvent = async () => {
        let eventId = this.state.eventId;
        if (eventId) {
            let response = await this.props.authenticatedApiCall('delete', "/api/eventsservice/deleteevents/" + eventId, null)
            if (response.data.status === 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.statusDescription === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        }
    }

    setEventType = (eventType) => {
        let eventtype = '';
        eventOptions.map((item) => {
            if (item.value === eventType) {
                eventtype = item.label;
            }
        })
        return eventtype;
    }
    setSportsName = (sports) => {
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
    setSingingName = (song) => {
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
    setDancingName = (dance) => {
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
        let response = await this.props.authenticatedApiCall('get', '/api/eventsservice/getschoolevents', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                let data = JSON.parse(item.eventData)
                item.eventDescription = data[0].eventDescription
                item.action = { eventId: item.eventId, userId: item.userId }
                item.eventStartdate = data[0].eventStartdate
                item.eventEnddate = data[0].eventEnddate
                if (item.eventType === 1) {
                    if (data[0].eventDetails.length > 0) {
                        item.eventdata = this.setSportsName(data[0].eventDetails)
                    }
                } else if (item.eventType === 2) {
                    if (data[0].eventDetails.length > 0) {
                        item.eventdata = this.setSingingName(data[0].eventDetails)
                    }
                } else if (item.eventType === 3) {
                    if (data[0].eventDetails.length > 0) {
                        item.eventdata = this.setDancingName(data[0].eventDetails)
                    }
                } else {
                    item.eventdata = 'N/A'
                }
                item.eventType = this.setEventType(item.eventType)
            })
            this.setState({
                eventList: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    displayEventDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./eventDetails', this.state.eventList[rowMeta.dataIndex])
    }
    handleCreateEvent = () => {
        this.props.history.push(`./create-event`);
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false, isDeleteEvent: false })
    }
    backEventDashboard = () => {
        this.props.history.push(`./eventslist`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton2 = [<Button className={classes.OkButton} onClick={this.deleteEvent}>Ok</Button>]
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backEventDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Events List</title></Helmet>
                <Grid container>
                {(this.props.currentUser.userDetails.role == "Principal")&& <><Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>School Events</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateEvent} className={classes.primaryBtn}>Create Event</Button>
                        </div>
                    </Grid></>}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Events Lists'} rows={this.state.eventList} columns={this.tableheads1} rowEventDetailsRedirectFunction={this.displayEventDetailsForMobileView} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backEventDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isDeleteEvent ? <ErrorDialog successButton={OkButton2} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(EventsList)));