import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Typography } from '@material-ui/core';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import ActionButton from './ActionNotificationButton';
import { Helmet } from "react-helmet";
import { handleNotificationUserLabel } from '../../../components/utilsFunctions';

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
class NotificationsList extends React.Component {
    state = {
        students: [], errorMessage: '', isError: false, isDeleteNotification: false
    };

    tableheads1 = [
        {
            name: "userrole",
            label: "Created By",
            options: {
                filter: true,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: "green", fontWeight: 600 }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "notificationUser",
            label: "Notification User",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationSubject",
            label: "Notification Subject",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationCreatedDate",
            label: "Created Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationDescription",
            label: "Notification Details",
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
                            {(value.createdBy === this.props.currentUser.userDetails.userId) && <ActionButton notificationId={value.notificationId} createdBy={value.createdBy} role={this.props.currentUser.userDetails.role} onEditNotification={this.handleEditNotification} onDeleteNotification={this.handleDeleteNotification} />}
                        </>
                    )
                }
            }
        }
    ];
    handleEditNotification = async (notificationId) => {
        this.props.history.push('./edit-notification/' + notificationId);
    }
    handleDeleteNotification = (notificationId) => {
        this.setState({ notificationId: notificationId, isDeleteNotification: true, errorMessage: "Are you really want to delete notification?" })
    }
    deleteNotification = async () => {
        let notificationId = this.state.notificationId;
        if (notificationId) {
            let response = await this.props.authenticatedApiCall('delete', "/api/notificationservice/deletenotifications/" + notificationId, null)
            if (response.data.status === 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.statusDescription === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        }
    }
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/notificationservice/getschoolnotificationsbyuserrole', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { notificationId: item.notificationId, createdBy: item.createdBy }

                if (item.userrole == 3) { item.userrole = "Principal" }
                if (item.userrole == 5) { item.userrole = "Teacher" }
                if (item.createdBy === this.props.currentUser.userDetails.userId) { item.userrole = "Created By Me" }
                item.notificationUser = handleNotificationUserLabel(item.notificationUser)
            })
            this.setState({
                students: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    displayNotificationDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./notificationDetails', this.state.students[rowMeta.dataIndex])
    }

    handleCreateNotification = () => {
        this.props.history.push('./create-notification')
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false, isDeleteNotification: false })
    }
    backEventDashboard = () => {
        this.setState({ isError: false, isSuccess: false, isDeleteNotification: false })
        this.props.history.push(`./notificationslist`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        let confirmActionButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={(e) => this.handleAllActions(e, this.state.typeOfAction)}>Yes</Button>
        ]
        const OkButton2 = [<Button className={classes.OkButton} onClick={this.deleteNotification}>Ok</Button>]
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backEventDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Notifications List</title></Helmet>
                <Grid container>
                    {(this.props.currentUser.userDetails.role == "Principal" || this.props.currentUser.userDetails.role == "Teacher") && 
                    <> <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Notifications</Typography>
                    </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.cstmprotoBtnWrap}>
                                <Button onClick={this.handleCreateNotification} className={classes.primaryBtn}>Create Notification</Button>
                            </div>
                        </Grid></>}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Notifications Lists'} rows={this.state.students} columns={this.tableheads1} rowNotificationDetailsRedirectFunction={this.displayNotificationDetailsForMobileView} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backEventDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isDeleteNotification ? <SuccessDialog successButton={confirmActionButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(NotificationsList)));