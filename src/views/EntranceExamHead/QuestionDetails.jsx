import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles, Button } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faTrashAlt, faFastBackward, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import CreateQuestion from "../EntranceExamHead/CreateQuestion";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import AuthenticatedPage from "../AuthenticatedPage";

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
class QuestionDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "question",
            confirmQuestionDialog: false,
            confirmQuestion: false
        }
    }

    confirmQuestionText = '';
    confirmQuestionButton = '';
    userroleChangedText = ''

    handleEditQuestion = () => {
        this.setState({ activeComponent: "updatequestion" })
    }
    handleShowQuestion = () => {
        this.setState({ activeComponent: "question" })
    }
    handleCreateQuestion = () => {
        this.setState({ activeComponent: "createquestion" })
    }
    handleDeleteQuestion = () => {
        this.confirmQuestionText = 'Do you realy want to delete?'
        this.confirmQuestionButton = [
            <Button className={this.props.classes.successDialogCancel} onClick={this.dismissConfirmDialog}>No</Button>,
            <Button className={this.props.classes.successDialogOK} onClick={this.handleDelete}>Yes</Button>
        ]
        this.setState({ activeComponent: "deletestudent", confirmQuestionDialog: true })
    }

    dismissConfirmDialog = () => {
        this.setState({ activeComponent: "question", confirmQuestionDialog: false });
    }

    handleDelete = async () => {
        let response1 = await this.props.authenticatedApiCall('delete', "/api/entranceexamservice/deletequestion/" + this.props.location.state.qid, null)
        if (response1.data.status == 0) {
            this.confirmQuestionText = 'Question not deleted.'
            this.confirmQuestionButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmQuestion: true })

        } else {
            this.userroleChangedText = response1.data.statusDescription
            this.confirmQuestionText = 'Success.'
            this.confirmQuestionButton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleCloseDialog}>Ok</Button>]
            this.setState({ confirmQuestion: true })
        }
    }
    handleCloseDialog = () => {
        this.setState({ activeComponent: "question", confirmQuestion: false })
        this.props.history.push(`../view-question`);
    }
    handleBackToDashboard = () => {
        this.setState({ activeComponent: "backtodashboard" })
    }

    getBodyComponent = (questionId) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "question") {
        } else if (activeComponent === 'createquestion') {
            return <CreateQuestion />
        } else if (activeComponent === "updatequestion") {
            return <CreateQuestion questionid={questionId} />
        }else if (activeComponent === "backtodashboard") {
            this.props.history.push('../view-question')
        }
        
    }

    render() {
        const { classes } = this.props;
        const questionDetails = this.props.location.state
        return (
            <>
                <div>
                    {(this.state.activeComponent === 'question') && <div>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>Question:</b></span>
                                <span><b>{questionDetails.question}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>{`Option A: `}</b></span>
                                <span><b>{questionDetails.optiona}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>{`Option B: `}</b></span>
                                <span><b>{questionDetails.optionb}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>Option C:</b></span>
                                <span><b>{questionDetails.optionc}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>Option D:</b></span>
                                <span><b>{questionDetails.optiond}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>Option E:</b></span>
                                <span><b>{questionDetails.optione}</b></span>
                            </CardBody>
                        </Card>
                        <Card style={{ marginBottom: 0, marginTop: '10px' }}>
                            <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                                <span><b>Answer:</b></span>
                                <span><b>{questionDetails.answer}</b></span>
                            </CardBody>
                        </Card>
                    </div>}
                    {this.getBodyComponent(questionDetails.qid)}

                    <Card className={classes.actions} >
                        <GridContainer style={{ justifyContent: "space-around" }}>
                            <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleBackToDashboard} className={this.state.activeComponent === "backtodashboard" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                            <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleShowQuestion} className={this.state.activeComponent === "question" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                            <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleDeleteQuestion} className={this.state.activeComponent === "deletestudent" ? classes.addColor : null}><FontAwesomeIcon icon={faTrashAlt} className={classes.iconSize} /></Button></GridItem>
                            <GridItem sm={3} xs={3} className={classes.texeCenter}><Button onClick={this.handleEditQuestion} className={this.state.activeComponent === "updatequestion" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        </GridContainer>
                    </Card>
                </div>
                {(this.state.confirmQuestionDialog ? <ErrorDialog successButton={this.confirmQuestionButton} HeaderText={this.confirmQuestionText} dismiss={this.dismissConfirmDialog} /> : " ")}
                {this.state.confirmQuestion ? <SuccessDialog successButton={this.confirmQuestionButton} HeaderText={this.confirmQuestionText} BodyText={this.userroleChangedText} dismiss={this.dismissConfirmDialog} /> : null}
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["ExamHead"])(QuestionDetails));