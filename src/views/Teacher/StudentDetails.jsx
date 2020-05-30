import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faDatabase , faUserEdit, faAt, faAudioDescription } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import StudentProfile from './StudentProfile'
import StudentRegistration from "./StudentRegistration";
import LogBook from "../Logbook/Logbook"
import AuthenticatedPage from "../AuthenticatedPage";
import CreateResult from './CreateResult';
import CreateAttendance from './CreateAttendance';

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
class StudentDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile",
            confirmInactivateDialog: false,
            confirmInactivate: false
        }
    }

    handleLogbook = () => {
        this.setState({ activeComponent: "logbook" })
    }
    handleUpdateRegistration = () => {
        this.setState({ activeComponent: "updateregistration" })
    }
    handleStudentProfile = () => {
        this.setState({ activeComponent: "profile" })
    }
    handleCreateResult = () => {
        this.setState({ activeComponent: "createresult" })
    }
    handleCreateAttendance = () => {
        this.setState({ activeComponent: "createattendance" })
    }

    getBodyComponent = (studentId) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <StudentProfile {...this.props} />
        }
        else if (activeComponent === 'createresult') {
            return <CreateResult studentid={studentId} />
        }
        else if (activeComponent === "createattendance") {
            return <CreateAttendance studentid={studentId} />
        }
        else if (activeComponent === "updateregistration") {
            return <StudentRegistration studentid={studentId} />
        }
        else if (activeComponent === "logbook") {
            return <LogBook studentid={studentId} teacherid={this.props.currentUser.userDetails.userid} />
        }
    }

    findCssForStatus = (value) => {
        if (value.studentid) {
            return (
                <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{value.firstname}</b></span>
                    <span className={this.props.classes.statusDiv}>
                        <span className={this.props.classes.pendingCircle + " " + this.props.classes.circle}></span>
                        <span className={this.props.classes.pendingStatus + " " + this.props.classes.status}>{value.cellnumber}</span>
                    </span>
                </CardBody>
            )
        }

    }

    render() {
        const { classes } = this.props;
        const studentDetails = this.props.location.state
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(studentDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(studentDetails.userid)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleStudentProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleCreateResult} className={this.state.activeComponent === "createresult" ? classes.addColor : null}><FontAwesomeIcon icon={faAt} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleCreateAttendance} className={this.state.activeComponent === "createattendance" ? classes.addColor : null}><FontAwesomeIcon icon={faAudioDescription} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleUpdateRegistration} className={this.state.activeComponent === "updateregistration" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleLogbook} className={this.state.activeComponent === "logbook" ? classes.addColor : null}><FontAwesomeIcon icon={faDatabase} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Teacher"])(StudentDetails));