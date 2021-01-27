import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import { withStyles, Button } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faDatabase, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import StudentProfile from './StudentProfile'
import LogBook from "../../Logbook/Logbook"
import AuthenticatedPage from "../../AuthenticatedPage";

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
    handleBack = () => {
        this.setState({ activeComponent: "backtodashboard" })
    }

    getBodyComponent = (studentId) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <StudentProfile {...this.props} />
        }
        else if (activeComponent === "logbook") {
            return <LogBook studentId={studentId} teacherId={this.props.location.state.teacherId} />
        } else if (activeComponent === "backtodashboard") {
            this.props.history.push('../teacherlist')
        }
    }

    findCssForStatus = (value) => {
        if (value.studentId) {
            return (
                <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{value.firstName}{` (student)`}</b></span>
                    <span className={this.props.classes.statusDiv}>
                        <span className={this.props.classes.pendingCircle + " " + this.props.classes.circle}></span>
                        <span className={this.props.classes.pendingStatus + " " + this.props.classes.status}>{value.cellNumber}</span>
                    </span>
                </CardBody>
            )
        }
    }

    render() {
        const { classes } = this.props;
        const studentDetails = this.props.location.state.studentData
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(studentDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(studentDetails.studentId)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={4} xs={4} className={classes.texeCenter}><Button onClick={this.handleBack} className={this.state.activeComponent === "backtodashboard" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={4} xs={4} className={classes.texeCenter}><Button onClick={this.handleStudentProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={4} xs={4} className={classes.texeCenter}><Button onClick={this.handleLogbook} className={this.state.activeComponent === "logbook" ? classes.addColor : null}><FontAwesomeIcon icon={faDatabase} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(StudentDetails));