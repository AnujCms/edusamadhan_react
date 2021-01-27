import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, CircularProgress } from '@material-ui/core';
import ActionButtonForUser from './ActionButtonForUser';
import { WithAccount } from '../../AccountContext';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import Avatar from '@material-ui/core/Avatar';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import AdminImage from '../../../assets/images/admin.png';
import { Helmet } from "react-helmet";
import queryString from 'query-string';
import { handleQualificationLabel, handleSubjectLabel, handleUserLabel } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: { margin: theme.spacing(1), paddingBottom: theme.spacing(1), marginTop: theme.spacing(10), [theme.breakpoints.down('md')]: { margin: 0 } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    active: { color: "#85ab03", fontSize: "12px !important" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmActionDialog: '', typeOfAction: "", userId: '', headerText: '', isLoading: false, schoolUsers: [], isSuccess: false, successMessage: '', errorMessage: '', isError: false, userrole: ''
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
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (<>
                        {(value == 0) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pending</p>}
                        {(value == 1) && <p style={{ width: "100px", color: 'green', fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
                        {(value == 2) && <p style={{ width: "100px", color: 'red', fontWeight: 800, fontSize: "14px !important" }}>Inactive</p>}
                        {(value == 4) && <p style={{ width: "100px", color: "brown", fontWeight: 800, fontSize: "14px !important" }}>Locked</p>}
                        {(value == 5) && <p style={{ width: "100px", color: 'blue', fontWeight: 800, fontSize: "14px !important" }}>UnLocked</p>}
                    </>)
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "userType",
            label: "User Type",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "emailId",
            label: "Email ID",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "aadharNumber",
            label: "AAdhar",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "cellNumber",
            label: "Cell Number",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "userrole",
            label: "User Role",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "qualification",
            label: "Qualification",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "subject",
            label: "Specilist",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value) => {
                    return <ActionButtonForUser userId={value.userId} userrole={value.userrole} status={value.status} handleClickEdit={this.handleEditUserDetails} handleDeleteUser={this.handleDeleteUser} handleInactivateUser={this.handleInactivateUser} handleReactivateUser={this.handleReactivateUser} handleUnlockUser={this.handleUnlockUser} handleResendWelcomeEmail={this.handleResendWelcomeEmail} />
                }
            }
        },

    ];

    async componentDidMount() {
        this.setState({ isLoading: true })
        let accountId = this.props.currentUser.userDetails.accountId;
        if (accountId) {
            let response = await this.props.authenticatedApiCall('get', '/api/directorservice/getAllUsers', null)
            if (response.data.status === 1) {
                response.data.statusDescription.map((item) => {
                    item.action = { userId: item.userId, userrole: item.userrole, status: item.status }
                    item.name = item.firstName + " " + item.lastName
                    if(item.userType == 1){
                        item.userType = "0 to 5th"
                    }else if(item.userType == 2){
                        item.userType = "6th to 12th"
                    }
                    item.qualification = handleQualificationLabel(item.qualification)
                    item.subject = handleSubjectLabel(item.subject)
                    item.userrole = handleUserLabel(item.userrole)
                });

                this.setState({
                    schoolUsers: response.data.statusDescription, isLoading: false
                })
            } else if (response.data.status === 0) {
                // this.setState({ isError: true, errorMessage: response.data.statusDescription, isLoading: false })
                this.setState({ isLoading: false })
            }
        }
    };

    displayTeacherDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./teacherdetails/' + this.state.schoolUsers[rowMeta.dataIndex].userid, this.state.schoolUsers[rowMeta.dataIndex])
    }

    //Edit Teacher
    handleEditUserDetails = (userId) => {
        this.props.history.push('./edit-user/' + userId);
    }
    //Delete User
    handleDeleteUser = async (userId) => {
        this.setState({ userId: userId, confirmActionDialog: true, typeOfAction: "DeleteUser", successMessage: 'Are you sure to delete the User?' })
    }
    handleInactivateUser = (userId) => {
        this.setState({ userId: userId, confirmActionDialog: true, typeOfAction: "InactivateUser", successMessage: "Do you really want to inactivate user ?" })
    }
    handleReactivateUser = (userId) => {
        this.setState({ userId: userId, confirmActionDialog: true, typeOfAction: "ReactivateUser", successMessage: "Do you really want to reactivate user?" })
    }
    handleUnlockUser = (userId, userrole) => {
        this.setState({ userId: userId, userrole:userrole, confirmActionDialog: true, typeOfAction: "UnlockUser", successMessage: "Do you really want to Reset Password?" })
    }
    handleResendWelcomeEmail = (userId, userrole) => {
        this.setState({ userId: userId, userrole:userrole, confirmActionDialog: true, typeOfAction: "ResendWelcomeEmail", successMessage: "Do you really want to Resend the Welcome Email?" })
    }

    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "InactivateUser") {
            response = await this.props.authenticatedApiCall('put', '/api/providerauthservice/inactivateUser/' + this.state.userId, null)
        } else if (actionType === "ReactivateUser") {
            response = await this.props.authenticatedApiCall('put', '/api/providerauthservice/reactivateUser/' + this.state.userId, null)
        } else if (actionType === "DeleteUser") {
            response = await this.props.authenticatedApiCall('delete', '/api/directorservice/deleteUserDetails/' + this.state.userId, null)
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
        let parsed = {}
        parsed.reloadTo = 'userlist';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ confirmActionDialog: false, isError: false, isSuccess: false })
    }
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
                <Helmet><title>Users List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.state.isLoading && <CircularProgress style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                        <MuiThemeDataTable title={'Users List'} rows={this.state.schoolUsers} columns={this.tableheads1} rowDetailsRedirectFunctionTeacher={this.displayTeacherDetailsForMobileView} tableContent='studentsFeeList' />
                    </Grid>
                </Grid>
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(UserList)));

