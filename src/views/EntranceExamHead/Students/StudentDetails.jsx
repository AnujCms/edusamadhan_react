import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import { withStyles, Button } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CreateStudent from "../Students/CreateStudent";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import AuthenticatedPage from "../../AuthenticatedPage";
import StudentProfile from './StudentProfile'
import { faStepForward } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    successDialogOK: {
        color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder }
    },
    successDialogCancel: {
        color: theme.palette.text.textThirdColor, backgroundColor: theme.palette.thirdColor.main, border: "1px solid " + theme.palette.border.thirdBorder, borderRadius: "20px", padding: "7px 15px", '&:hover': { color: theme.palette.text.hoverTextThirdColor, backgroundColor: theme.palette.hoverThirdColor.main, border: "1px solid " + theme.palette.border.hoverThirdBorder }
    },
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
            confirmReExamDialog: false,
            confirmREExam: false
        }
    }

confirmReExamText = '';
    confirmReExamButton = [];
    userroleChangedText = ''
    handlePromoteStudent = () => {
        this.confirmReExamText = 'Do you realy want to Promote?'
        this.confirmReExamButton = [
            <Button className={this.props.classes.successDialogCancel} onClick={this.dismissConfirmDialogReExam}>No</Button>,
            <Button className={this.props.classes.successDialogOK} onClick={this.handlePromote}>Yes</Button>
        ]
        this.setState({ activeComponent: "promoteStudent", confirmReExamDialog: true })
    }
    onEditStudentRegistration = () => {
        this.setState({ activeComponent: "updatestudentregistration" })
    }

    onProfileClick = () => {
        this.setState({ activeComponent: "profile" })
    }
    handleDeleteStudent = () => {
        this.confirmReExamText = 'Do you realy want to delete?'
        this.confirmReExamButton = [
            <Button className={this.props.classes.successDialogCancel} onClick={this.dismissConfirmDialogReExam}>No</Button>,
            <Button className={this.props.classes.successDialogOK} onClick={this.handleDelete}>Yes</Button>
        ]
        this.setState({ activeComponent: "deletestudent", confirmReExamDialog: true })
    }
    handleStudentReExam = () => {
        this.confirmReExamText = 'Do you realy want to do the re-exam?'
        this.confirmReExamButton = [
            <Button className={this.props.classes.successDialogCancel} onClick={this.dismissConfirmDialogReExam}>No</Button>,
            <Button className={this.props.classes.successDialogOK} onClick={this.handleReExam}>Yes</Button>
        ]
        this.setState({ activeComponent: "reexamSelection", confirmReExamDialog: true })
    }

    dismissConfirmDialogReExam = () => {
        this.setState({ activeComponent: "profile", confirmReExamDialog: false });
    }

    handleReExam = async () => {
        let studentid = this.props.location.state.studentid;
        let response1 = await this.props.authenticatedApiCall('put', '/api/entranceexamservice/reexamentrance', { studentid })
        if (response1.data.status == 0) {
            this.confirmReExamText = 'Student not able to Re Exam'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })

        } else {
            this.userroleChangedText = response1.data.statusDescription
            this.confirmReExamText = 'Re-Exam is success.'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })
        }
    }
    handlePromote = async () => {
        let response1 = await this.props.authenticatedApiCall('put', "/api/entranceexamservice/pramotestudent/" + this.props.location.state.studentid + "/" + this.props.location.state.class, null)
        if (response1.data.status == 0) {
            this.confirmReExamText = 'Student not able to Promote'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })

        } else {
            this.userroleChangedText = response1.data.statusDescription
            this.confirmReExamText = 'Re-Exam is success.'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })
        }
    }
    handleDelete = async () => {
        let response1 = await this.props.authenticatedApiCall('delete', "/api/entranceexamservice/deletestudent/"+ this.props.location.state.studentid, null)
        if (response1.data.status == 0) {
            this.confirmReExamText = 'Student not deleted.'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })

        } else {
            this.userroleChangedText = response1.data.statusDescription
            this.confirmReExamText = 'Deletion is success.'
            this.confirmReExamButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmREExam: true })
        }
    }
    handleCloseDialog = () => {
        this.setState({ activeComponent: "profile", confirmREExam: false })
        this.props.history.push(`../studentlist`);
    }

    getBodyComponent = (studentId) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "profile") {
            return <StudentProfile {...this.props} />
        }
        else if (activeComponent === "updatestudentregistration") {
            return <CreateStudent studentid={studentId}/>
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
                    <div>
                        <Card style={{ marginBottom: 0 }}>
                            {this.findCssForStatus(studentDetails)}
                        </Card>
                    </div>
                    {this.getBodyComponent(studentDetails.studentid)}

                    <Card className={classes.actions} >
                        <GridContainer style={{ justifyContent: "space-around" }}>
                            <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.onProfileClick} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                            {(this.props.currentUser.userDetails.permissionlevel != 1) ? <>
                                <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleDeleteStudent} className={this.state.activeComponent === "deletestudent" ? classes.addColor : null}><FontAwesomeIcon icon={faTrashAlt} className={classes.iconSize} /></Button></GridItem>
                                <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleStudentReExam} className={this.state.activeComponent === "reexamSelection" ? classes.addColor : null}><FontAwesomeIcon icon={faRedoAlt} className={classes.iconSize} /></Button></GridItem>
                                <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.onEditStudentRegistration} className={this.state.activeComponent === "updatestudentregistration" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem></> : null}
                            <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handlePromoteStudent} className={this.state.activeComponent === "promoteStudent" ? classes.addColor : null}><FontAwesomeIcon icon={faStepForward} className={classes.iconSize} /></Button></GridItem>
                        </GridContainer>
                    </Card>
                </div>
                {(this.state.confirmReExamDialog ? <ErrorDialog successButton={this.confirmReExamButton} HeaderText={this.confirmReExamText} dismiss={this.dismissConfirmDialogReExam} /> : " ")}
                {this.state.confirmREExam ? <SuccessDialog successButton={this.confirmReExamButton} HeaderText={this.confirmReExamText} BodyText={this.userroleChangedText} dismiss={this.dismissConfirmDialogReExam} /> : null}
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Teacher", "ExamHead"])(StudentDetails));