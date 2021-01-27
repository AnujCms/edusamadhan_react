import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Typography, Grid, Paper } from '@material-ui/core';
import { Helmet } from "react-helmet";
import FormHeader from '../../../components/FormHeader';
import { Edit, Delete } from '@material-ui/icons';
import { formatDate } from '../../../components/utilsFunctions';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';

const styles = theme => ({
    root: { marginTop: theme.spacing(10), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    pad0: { padding: 0 },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    paperStyle: { padding: "20px", width: "1050px", marginBottom: "5px", marginTop: "5px" },
    noticeText: { textAlign: "justify", fontSize: "20px" },
    evenetsTitle: { fontWeight: 900, marginLeft: "5px", marginTop: "15px", color:'green' },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class NoticeHome extends React.Component {
    state = {
       noticeData: [], studentId: "", isSuccess: false, successMessage: '', isError: false, errorMessage: '', noticeId: '', confirmActionDialog: false
    };

    async componentDidMount() {
        let studentId = this.props.match.params.userId || this.props.studentId;
        if (studentId) {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getAllNoticeOfStudent/' + studentId, null);
            if (response.data.status === 1) {
                this.setState({ studentId: studentId, isUpdate: true, noticeData: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        }
    }
    handleClose = () => {
        this.setState({ isError: false, isSuccess: false, confirmActionDialog: false })
    }
    handleSuccessDialog = () => {
        this.props.history.push('../studentlist')
        this.setState({ isError: false, isSuccess: false, confirmActionDialog: false })
    }
    handleCreateNotice = () => {
        if (this.props.match.params.userId) {
            this.props.history.push('../createnotice/' + this.props.match.params.userId)
        }
    }
    handleEditNotice = (e, noticeId) => {
        let userObj = {
            studentId: this.state.studentId,
            noticeId: noticeId
        }
        this.props.history.push('../createnotice/' + this.state.studentId + '/' + noticeId, userObj)
    }
    handleDeleteConfirmation = (e, noticeId) => {
        this.setState({ noticeId: noticeId, confirmActionDialog: true, typeOfAction: "DeleteNotice", successMessage: "Do you really want to DELETE the Notice?" })
    }
    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "DeleteNotice") {
            response = await this.props.authenticatedApiCall('delete', '/api/teacherservice/deleteStudentNotice/' + this.state.studentId + '/' + this.state.noticeId, null)
        }
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    render() {
        const { classes } = this.props;
        const { noticeData } = this.state;
        const confirmText = "Confirm Message"
        let confirmActionButton = [
            <Button className={classes.OkButton} onClick={this.handleClose}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={(e) => this.handleAllActions(e, this.state.typeOfAction)}>Yes</Button>
        ];
        let OkButtonSuccess = [<Button className={classes.OkButton} onClick={this.handleSuccessDialog}>Ok</Button>]
        let OkButton = [<Button className={classes.OkButton} onClick={this.handleClose}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    {(this.props.currentUser.userDetails.role == "Teacher") &&
                        <> <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                            <Typography variant="h4" className={classes.evenetsTitle}>Notice List</Typography>
                        </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <div className={classes.cstmprotoBtnWrap}>
                                    <Button onClick={this.handleCreateNotice} className={classes.primaryBtn}>Create Notice</Button>
                                </div>
                            </Grid></>}
                    {noticeData.length > 0 ? <FormHeader headerText={"Notice Board"} pageTitle={"Create | Edit Notice"} /> : <FormHeader headerText={"No Record Found"} pageTitle={"Create | Edit Notice"} />}
                    {noticeData.map((item, index) =>
                        <Paper className={classes.paperStyle} key={'notice' + index}>
                            <Typography variant="h4">{formatDate(new Date(item.noticeDate))}</Typography>
                            <Typography className={classes.noticeText}>{item.studentNotice}</Typography>
                            {(this.props.currentUser.userDetails.role == "Teacher") && <>
                                <Typography> <Button onClick={(e) => { this.handleEditNotice(e, item.noticeId) }}><Edit className={classes.btnIcon} /></Button></Typography>
                                <Typography> <Button onClick={(e) => { this.handleDeleteConfirmation(e, item.noticeId) }}><Delete className={classes.btnIcon} /></Button></Typography>
                            </>}
                        </Paper>)}
                </Grid>
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.handleClose} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButtonSuccess} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.handleSuccessDialog} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(NoticeHome));
