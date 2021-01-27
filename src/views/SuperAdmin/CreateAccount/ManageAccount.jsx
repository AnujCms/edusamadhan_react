import React from 'react';
import { withStyles, Button, Avatar } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import ActionButton from './ActionButtonForSuperAdmin';
import queryString from 'query-string';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import AdminImage from '../../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class ManageAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmActionDialog: '', typeOfAction: "", userId: '', headerText: '', isLoading: false, schoolUsers: [], isSuccess: false, successMessage: '', errorMessage: '', isError: false, userrole: '', openClassDialog: false,
            accountId: '', rows: []
        };
    }

    tableheads1 = [
        {
            name: "images",
            label: "Photo",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <Avatar alt="No Images" src={value === null ? AdminImage : "data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
                    )
                }
            }
        },
        {
            name: "accountStatus",
            label: "Account Status",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (<>
                        {(value == 2) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Inactive</p>}
                        {(value == 1) && <p style={{ width: "100px", color: 'green', fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
                    </>)
                }
            }
        },
        {
            name: "status",
            label: "User Status",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (<>
                        {(value == 0) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pending</p>}
                        {(value == 1) && <p style={{ width: "100px", color: 'green', fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
                        {(value == 2) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Inactive</p>}
                        {(value == 4) && <p style={{ width: "100px", color: 'brown', fontWeight: 800, fontSize: "14px !important" }}>Locked</p>}
                        {(value == 5) && <p style={{ width: "100px", color: 'blue', fontWeight: 800, fontSize: "14px !important" }}>UnLocked</p>}
                    </>)
                }
            }
        },
        {
            name: "accountName",
            label: "School Name",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },

        {
            name: "accountRefNumber",
            label: "Registration No.",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "name",
            label: "Director",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },
        {
            name: "emailId",
            label: "Email Id",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "aadharNumber",
            label: "AAdhar Number",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },
        {
            name: "cellNumber",
            label: "Contact no.",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton accountId={value.accountId} userId={value.userId} userrole={value.userrole} status={value.status} accountStatus={value.accountStatus} handleUnlockDirector={this.handleUnlockDirector} handleInactivateAccount={this.handleInactivateAccount} handleDeactivateAccount={this.handleDeactivateAccount} handleEditAccountClick={this.onHandleEditAccount} handleResendWelcomeEmail={this.handleResendWelcomeEmail} />
                    )
                }
            }
        },

    ];

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/getallschooladmin', null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstName + " " + item.lastName;
                item.Action = { accountId: item.accountId, accountStatus: item.accountStatus, userId: item.userId, status: item.status, userrole: item.userrole }
            });
            this.setState({ rows: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }

    onHandleEditAccount = (accountId) => {
        this.props.history.push('./edit-account/' + accountId);
    }

    handleInactivateAccount = (accountId) => {
        this.setState({ accountId: accountId, confirmActionDialog: true, typeOfAction: "InactivateAccount", successMessage: "Do you really want to inactivate Account ?" })
    }
    handleDeactivateAccount = (accountId) => {
        this.setState({ accountId: accountId, confirmActionDialog: true, typeOfAction: "DeactivateAccount", successMessage: "Do you really want to deactivate Account?" })
    }
    handleUnlockDirector = (userId, userrole) => {
        this.setState({ userId: userId, userrole: userrole, confirmActionDialog: true, typeOfAction: "UnlockUser", successMessage: "Do you really want to Unlock the user?" })
    }
    handleResendWelcomeEmail = (userId, userrole) => {
        this.setState({ userId: userId, userrole: userrole, confirmActionDialog: true, typeOfAction: "ResendWelcomeEmail", successMessage: "Do you really want to Resend the Welcome Email?" })
    }
    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "InactivateAccount") {
            response = await this.props.authenticatedApiCall('put', '/api/superadminservice/lockaccount/' + this.state.accountId, null);
        } else if (actionType === "DeactivateAccount") {
            response = await this.props.authenticatedApiCall('put', '/api/superadminservice/unlockaccount/' + this.state.accountId, null);
        } else if (actionType === "UnlockUser") {
            let dataToSend = {
                userId: this.state.userId,
                userrole: this.state.userrole
            }
            response = await this.props.authenticatedApiCall('post', '/api/providerauthservice/unlockRequestToUser', dataToSend)
        } else if (actionType === "ResendWelcomeEmail") {
            let dataToSend = {
                userId: this.state.userId,
                userrole: this.state.userrole
            }
            response = await this.props.authenticatedApiCall('post', '/api/providerauthservice/resendWelcomeEmail', dataToSend)
        }
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }

    backDashboard = () => {
        this.setState({ confirmActionDialog: false, isError: false, isSuccess: false })
    }
    // backDashboard = () => {
    //     let parsed = {}
    //     parsed.reloadTo = 'manage-account';
    //     parsed.timeOut = '100';
    //     const stringified = queryString.stringify(parsed);
    //     this.props.history.push({
    //         pathname: `./formReloader`,
    //         search: "?" + stringified
    //     });
    //     this.setState({ isError: false, isSuccess: false })
    // }
  
    render() {
        const { classes } = this.props;
        const confirmText = "Confirm Message"
        let confirmActionButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={(e) => this.handleAllActions(e, this.state.typeOfAction)}>Yes</Button>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]

        return (
            <div className={classes.root}>
                <Helmet> <title>Accounts List</title></Helmet>
                <MuiThemeDataTable title={'Schools List'} rows={this.state.rows} columns={this.tableheads1} />
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(ManageAccount));
