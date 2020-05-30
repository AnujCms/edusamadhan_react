import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import NotificationProfile from '../Notifications/NotificationProfile'
import AuthenticatedPage from "../AuthenticatedPage";

const styles = theme => ({
    pendingStatus: { color: "#00aacb" },
    status: { textAlign: 'center', fontSize: "11px", display: "inline-flex", marginRight: "5px", fontWeight: "bold", whiteSpace: "nowrap" },
    circle: { width: "8px", height: "8px", borderRadius: "50%", display: "inline-flex", marginRight: "5px" },
    statusDiv: { float: "right" },
    fontSize45: { fontSize: '1.2rem !important' },
    iconSize: { fontSize: 35 },
    texeCenter: { textAlign: 'center' },
    actions: { bottom: 0, position: "fixed", marginBottom: 0, left: 0 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    addColor: { color: theme.palette.primary.main }
})
class NotificationDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile"
        }
    }

    handleEventProfile = () => {
        this.setState({ activeComponent: "profile" })
    }

    handleBackEventList = () => {
        this.setState({ activeComponent: "backtoevents" })
    }

    getBodyComponent = () => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <NotificationProfile {...this.props} />
        }
        else if (activeComponent === "backtoevents") {
            this.props.history.push('./notificationslist')
        }
    }

    findCssForStatus = () => {
            return (
                this.state.activeComponent === 'profile'&&<CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{"Notification Details"}</b></span>
                </CardBody>
            )
    }
    render() {
        const { classes } = this.props;
        const notificationDetails = this.props.location.state
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(notificationDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(notificationDetails)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleBackEventList} className={this.state.activeComponent === "backtoevents" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleEventProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount"])(NotificationDetails));