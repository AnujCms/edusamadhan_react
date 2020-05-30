import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUserEdit, faFastBackward, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import EventProfile from './EventProfile'
import CreateEvent from '../Events/CreateEvent';
import ErrorDialog from '../../components/ErrorDialog';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';

const styles = theme => ({
    pendingStatus: { color: "#00aacb" },
    status: { textAlign: 'center', fontSize: "11px", display: "inline-flex", marginRight: "5px", fontWeight: "bold", whiteSpace: "nowrap" },
    circle: { width: "8px", height: "8px", borderRadius: "50%", display: "inline-flex", marginRight: "5px" },
    statusDiv: { float: "right" },
    fontSize45: { fontSize: '1.2rem !important' },
    iconSize: { fontSize: 35 },
    texeCenter: { textAlign: 'center' },
    actions: { bottom: 0, position: "fixed", marginBottom: 0, left: 0, zIndex: "10000" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    addColor: { color: theme.palette.primary.main }
})
class EventDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile",
            isDeleteEvent: false,
            errorMessage: "",
            eventid: "",
            isSuccess: false,
            isError: false,
            errorMessage: ''
        }
    }

    handleCreateEvent = () => {
        this.setState({ activeComponent: "createEvent" })
    }
    handleUpdateEvent = () => {
        this.setState({ activeComponent: "updateevent" })
    }
    handleEventProfile = () => {
        this.setState({ activeComponent: "profile" })
    }
    handleDeleteEvent = () => {
        this.setState({ activeComponent: "deleteEvent", eventid: this.state.eventid, isDeleteEvent: true, errorMessage: "Are you really want to delete event?" })
    }
    handleBackEventList = () => {
        this.setState({ activeComponent: "backtoevents" })
    }
    deleteNotification = async () => {
        let eventid = this.state.eventid;
        if (eventid) {
            let response = await this.props.authenticatedApiCall('delete', "/api/eventsservice/deleteevents/" + eventid, null)
            if (response.data.status === 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.statusDescription === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        }
    }
    getBodyComponent = (eventid) => {
        this.setState({ eventid: eventid })
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <EventProfile {...this.props} />
        }
        else if (activeComponent === 'updateevent') {
            return <CreateEvent eventid={eventid} />
        }
        else if (activeComponent === "backtoevents") {
            this.props.history.push('./eventslist')
        }
        else if (activeComponent === "createEvent") {
            return <CreateEvent />
        }
    }

    findCssForStatus = (value) => {
        if (value.userid) {
            return (
                this.state.activeComponent === 'profile' && <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{"Event Details"}</b></span>
                </CardBody>
            )
        }
    }
    backEventDashboard = () => {
        this.setState({ isDeleteEvent: false, isSuccess: false, isError: false })
        this.props.history.push('./eventslist')
    }
    render() {
        const { classes } = this.props;
        const eventDetails = this.props.location.state
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backEventDashboard}>Ok</Button>]
        const OkButton2 = [<Button className={classes.OkButton} onClick={this.deleteNotification}>Ok</Button>]
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(eventDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(eventDetails.eventid)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleBackEventList} className={this.state.activeComponent === "backtoevents" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleEventProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleUpdateEvent} disabled={this.state.activeComponent === 'createEvent'} className={this.state.activeComponent === "updateevent" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleCreateEvent} disabled={this.state.activeComponent === 'updateevent'} className={this.state.activeComponent === "createEvent" ? classes.addColor : null}><FontAwesomeIcon icon={faPlusCircle} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleDeleteEvent} disabled={this.state.activeComponent === 'updateevent' || this.state.activeComponent === 'createEvent'} className={this.state.activeComponent === "deleteEvent" ? classes.addColor : null}><FontAwesomeIcon icon={faTrash} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.backEventDashboard} /> : "")}
                    {(this.state.isDeleteEvent || this.state.isError ? <ErrorDialog successButton={OkButton2} HeaderText={this.state.errorMessage} dismiss={this.backEventDashboard} /> : "")}
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Principal"])(EventDetails));