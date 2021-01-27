import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import { withStyles, Button } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faDatabase, faUserEdit, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import TeacherProfile from './TeacherProfile'
import CreateTeacher from '../CreateUser/CreateTeacher';
// import StudentsList from './StudentsList';
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
class TeacherDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile",
            confirmInactivateDialog: false,
            confirmInactivate: false
        }
    }

    handleStudentsList = () => {
        this.setState({ activeComponent: "studentslist" })
    }
    handleUpdateTeacher = () => {
        this.setState({ activeComponent: "updateteacher" })
    }
    handleStudentProfile = () => {
        this.setState({ activeComponent: "profile" })
    }
    handleCreateResult = () => {
        this.setState({ activeComponent: "createresult" })
    }
    handleBack = () => {
        this.setState({ activeComponent: "backtodashboars" })
        // this.props.history.push('../create-user')
    }

    getBodyComponent = (userId) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <TeacherProfile {...this.props} />
        }
        else if (activeComponent === 'updateteacher') {
            return <CreateTeacher teacherId={userId} />
        }
        else if (activeComponent === "backtodashboars") {
            this.props.history.push('../teacherlist')
        }
        // else if (activeComponent === "studentslist") {
        //     return <StudentsList teacherId={userId} />
        // }
    }

    findCssForStatus = (value) => {
        if (value.userId) {
            return (
                <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span><b>{value.firstName}</b></span>
                    <span className={this.props.classes.statusDiv}>
                        <span className={this.props.classes.pendingStatus + " " + this.props.classes.status}>{value.cellNumber}</span>
                    </span>
                </CardBody>
            )
        }
    }

    render() {
        const { classes } = this.props;
        const teacherDetails = this.props.location.state
        let isDisabled = true;
        if(teacherDetails.userrole == 'Faculty'){
            isDisabled = false
        }
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(teacherDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(teacherDetails.userId)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleBack} className={this.state.activeComponent === "backtodashboars" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleStudentProfile} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleUpdateTeacher} className={this.state.activeComponent === "updateteacher" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleStudentsList} disabled={isDisabled} className={this.state.activeComponent === "studentslist" ? classes.addColor : null}><FontAwesomeIcon icon={faDatabase} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(TeacherDetails));