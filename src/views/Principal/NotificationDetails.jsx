import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUserEdit, faFastBackward, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import NotificationProfile from './NotificationProfile'
import CreateNotification from '../Notifications/CreateNotification'
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
    actions: { bottom: 0, position: "fixed", marginBottom: 0, left: 0, zIndex: '10000' },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    addColor: { color: theme.palette.primary.main }
})
class NotificationDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile",
            isDeleteNotification: false,
            errorMessage: "",
            notificationid: "",
            isSuccess: false,
            isError: false,
            errorMessage: ''
        }
    }

    handleCreateNotification = () => {
        this.setState({ activeComponent: "createNotification" })
    }
    handleUpdateNotification = () => {
        this.setState({ activeComponent: "updatenotification" })
    }
    handleNotificationProfile = () => {
        this.setState({ activeComponent: "profile" })
    }
    handleDeleteNotification = () => {
        this.setState({ activeComponent: "deleteNotification", notificationid: this.state.notificationid, isDeleteNotification: true, errorMessage: "Are you really want to delete notification?" })
    }
    handleBackNotificationList = () => {
        this.setState({ activeComponent: "backtonotificationms" })
    }
    deleteNotification = async () => {
        let notificationid = this.state.notificationid;
        if (notificationid) {
            let response = await this.props.authenticatedApiCall('delete', "/api/notificationservice/deletenotifications/" + notificationid, null)
            if (response.data.status === 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.statusDescription === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        }
    }
    getBodyComponent = (notificationid) => {
        this.setState({ notificationid: notificationid })
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <NotificationProfile {...this.props} />
        }
        else if (activeComponent === 'updatenotification') {
            return <CreateNotification notificationid={notificationid} isEditNotification={true} />
        }
        else if (activeComponent === "backtonotificationms") {
            this.props.history.push('./notificationslist')
        }
        else if (activeComponent === "createNotification") {
            return <CreateNotification />
        }
    }

    findCssForStatus = (value) => {
        if (value.userid) {
            return (
                this.state.activeComponent === 'profile' && <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{"Notification Details"}</b></span>
                </CardBody>
            )
        }
    }
    backNofificationDashboard = () => {
        this.setState({ isDeleteNotification: false, isSuccess: false, isError: false })
        this.props.history.push('./notificationslist')
    }
    render() {
        const { classes } = this.props;
        const notificationDetails = this.props.location.state
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backNofificationDashboard}>Ok</Button>]
        const OkButton2 = [<Button className={classes.OkButton} onClick={this.deleteNotification}>Ok</Button>]
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(notificationDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(notificationDetails.notificationid)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleBackNotificationList} className={this.state.activeComponent === "backtonotificationms" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleNotificationProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleUpdateNotification} disabled={this.state.activeComponent === 'createNotification'} className={this.state.activeComponent === "updatenotification" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleCreateNotification} disabled={this.state.activeComponent === 'updatenotification'} className={this.state.activeComponent === "createNotification" ? classes.addColor : null}><FontAwesomeIcon icon={faPlusCircle} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleDeleteNotification} disabled={this.state.activeComponent === 'updatenotification' || this.state.activeComponent === 'createNotification'} className={this.state.activeComponent === "deleteNotification" ? classes.addColor : null}><FontAwesomeIcon icon={faTrash} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.backNofificationDashboard} /> : "")}
                    {(this.state.isDeleteNotification || this.state.isError ? <ErrorDialog successButton={OkButton2} HeaderText={this.state.errorMessage} dismiss={this.backNofificationDashboard} /> : "")}
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Principal"])(NotificationDetails));