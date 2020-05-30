import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography } from '@material-ui/core';
import ActionButton from './ActionNotificationButton';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class NotificationsList extends React.Component {
    state = {
        successMessage: '', isSuccess: false, students: [], isDeleteNotification: false, notificationid: '', errorMessage: '', isError: false
    };

    tableheads1 = [
        {
            name: "notificationuser",
            label: "User",
            options: {
                filter: true,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "notificationsubject",
            label: "Notification Subject",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationcreateddate",
            label: "Created Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationdescription",
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
                        <ActionButton notificationid={value.notificationid} onEditNotification={this.handleEditNotification} onDeleteNotification={this.handleDeleteNotification} />
                    )
                }
            }
        }
    ];
    handleEditNotification = async (notificationid) => {
        this.props.history.push('./edit-notification/' + notificationid);
    }
    handleDeleteNotification = (notificationid) => {
        this.setState({ notificationid: notificationid, isDeleteNotification: true, errorMessage: "Are you really want to delete notification?" })
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

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/notificationservice/getschoolnotifications', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { notificationid: item.notificationid }
                if (item.notificationuser === 6) { item.notificationuser = 'Student' }
                else if (item.notificationuser === 3) { item.notificationuser = 'Faculty' }
                else if (item.notificationuser === 5) { item.notificationuser = 'Accountant' }
                else if (item.notificationuser === 4) { item.notificationuser = 'Exam Head' }
                else if (item.notificationuser === 10) { item.notificationuser = 'All Users' }
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
        this.props.history.push(`./create-notification`);
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false, isDeleteNotification: false })
    }
    backEventDashboard = () => {
        this.props.history.push(`./notificationslist`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton2 = [<Button className={classes.OkButton} onClick={this.deleteNotification}>Ok</Button>]
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backEventDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Notifications List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>School Notifications</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateNotification} className={classes.primaryBtn}>Create Notification</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Notifications Lists'} rows={this.state.students} columns={this.tableheads1} rowNotificationDetailsRedirectFunction={this.displayNotificationDetailsForMobileView} tableContent="notificationsList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backEventDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isDeleteNotification ? <ErrorDialog successButton={OkButton2} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}

            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(NotificationsList)));