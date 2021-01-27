import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Avatar, Grid, CircularProgress } from '@material-ui/core';
import ActionButton from './ActionButtonForTeacher';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import AdminImage from '../../../assets/images/admin.png';
import { Helmet } from "react-helmet";
import queryString from 'query-string';
import { handleClassLabel, handleSectionLabel, handleGenderLabel, handleReligionLabel, handleMediumLabel, handleCategoryLabel, handleLocalityLabel } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    avatar: { width: 60, height: 60 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});


class StudentList extends React.Component {
    state = {
        confirmActionDialog: '', typeOfAction: "", userId: '', headerText: '', isLoading: false, isSuccess: false, successMessage: '', errorMessage: '', isError: false, userrole: '', openClassDialog: false,
        classAndSection: "", studentId: '', students: [], studentName: ''
    };

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
                        {(value == 13) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pramoted</p>}
                        {(value == 1) && <p style={{ width: "100px", color: 'green', fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
                        {(value == 4) && <p style={{ width: "100px", color: 'red', fontWeight: 800, fontSize: "14px !important" }}>Locked</p>}
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
                    return <p><b>{value}</b></p>
                }
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
            name: "motherName",
            label: "Mother",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "fatherName",
            label: "Father",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "cellNumber",
            label: "Mobile",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "dob",
            label: "Birth Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "mediumType",
            label: "Medium",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "religion",
            label: "Religion",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "locality",
            label: "Locality",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "busService",
            label: "Bus",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton studentName={value.studentName} currentUser={this.props.currentUser.userDetails.role} userrole={value.userrole} mediumType={value.mediumType} status={value.status} userId={value.userId} teacherId={this.props.currentUser.userDetails.userId} studentName={value.studentName} handleLogbook={this.handleLogbook} handleInactivateStudent={this.handleInactivateStudent} handleDeactivateUser={this.handleDeactivateUser} handleEditRegistration={this.handleEditRegistration} handleCreateResult={this.handleCreateResult} createAttendance={this.createAttendance} handleStudentFeeDetails={this.handleStudentFeeDetails} sendNotification={this.handleSendNotiifcation} handleStudentReport={this.handleStudentReport} handleUnlockUser={this.handleUnlockUser} handleStudentNotice={this.handleStudentNotice} handleStudentDetails={this.handleStudentDetails} />
                    )
                }
            }
        }
    ];

    async componentDidMount() {
        this.setState({ isLoading: true })
        let mystudents, assignedClass;
        if (this.props.currentUser.userDetails.role === 'Principal') {
            if (this.props.teacherId) {
                mystudents = this.props.authenticatedApiCall('get', '/api/principalservice/students/' + this.props.teacherId, null);
                assignedClass = this.props.authenticatedApiCall('get', '/api/principalservice/getAssignedClassAndSection/' + this.props.teacherId, null);
            }
        } else if (this.props.currentUser.userDetails.role === 'Teacher') {
            mystudents = this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
            assignedClass = this.props.authenticatedApiCall('get', '/api/teacherservice/getAssignedClassAndSection', null);
        }
        let [response, classAndSection] = await Promise.all([mystudents, assignedClass]);
        if (classAndSection.data.status == 1) {
            if (classAndSection.data.statusDescription[0].classId == 0) {
                this.setState({ classAndSection: "Class Not Assigned" });
            } else {
                this.setState({ classAndSection: handleClassLabel(classAndSection.data.statusDescription[0].classId, this.props.currentUser.userDetails.userType) + " " + handleSectionLabel(classAndSection.data.statusDescription[0].sectionId) });
            }
        } else {
            this.setState({ classAndSection: "Class Not Assigned" });
        }
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item, index) => {
                item.name = item.firstName + " " + item.lastName;
                item.Action = {
                    userId: item.userId, userrole: item.userrole, studentName: item.name, status: item.status, mediumType: item.mediumType
                }
                item.locality = handleLocalityLabel(item.locality)
                item.category = handleCategoryLabel(item.category)
                item.gender = handleGenderLabel(item.gender)
                item.religion = handleReligionLabel(item.religion)
                item.mediumType = handleMediumLabel(item.mediumType)
                if (item.busService == 2) { item.busService = "No" }
                else if (item.busService == 1) { item.busService = "Yes" }
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false })
        }
    }

    handleLogbook = (userId, teacherId) => {
        this.props.history.push('./logbook/' + userId + '/' + teacherId)
    }
    handleEditRegistration = (userId) => {
        this.props.history.push('./edit-registration/' + userId);
    }
    handleStudentNotice = (userId, studentName) => {
        if (this.props.currentUser.userDetails.role === 'Principal') {
            this.props.history.push('../noticehome/' + userId, {studentName})
        } else {
            this.props.history.push('./noticehome/' + userId, {studentName})
        }
    }
    handleStudentFeeDetails = (userId, mediumType) => {
        let studentObj = {
            userId: userId,
            mediumType: mediumType
        }
        if (this.props.currentUser.userDetails.role === 'Principal') {
            this.props.history.push('../studentfee', studentObj);
        } else {
            this.props.history.push('./studentfee', studentObj);
        }
    }
    handleCreateResult = (userId) => {
        this.props.history.push('./create-result/' + userId)
    }
    createAttendance = (userId) => {
        this.props.history.push('./create-attendance/' + userId)
    }
    handleStudentReport = (studentId) => {
        if (this.props.currentUser.userDetails.role === 'Principal') {
            this.props.history.push('../studentreport/' + studentId)
        } else {
            this.props.history.push('./studentreport/' + studentId)
        }
    }
    handleStudentDetails = (studentId) => {
        if (this.props.currentUser.userDetails.role === 'Principal') {
            this.props.history.push('../studentparentdetails/' + studentId)
        } else {
            this.props.history.push('./studentparentdetails/' + studentId)
        }
    }
    handleInactivateStudent = (userId) => {
        this.setState({ userId: userId, confirmActionDialog: true, typeOfAction: "InactivateUser", successMessage: "Do you really want to inactivate user ?" })
    }
    handleDeactivateUser = (userId) => {
        this.setState({ userId: userId, confirmActionDialog: true, typeOfAction: "DeactivateUser", successMessage: "Do you really want to deactivate user?" })
    }
    handleUnlockUser = (userId, userrole) => {
        this.setState({ userId: userId, userrole: userrole, confirmActionDialog: true, typeOfAction: "UnlockUser", successMessage: "Do you really want to Unlock the user?" })
    }

    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "InactivateUser") {
            response = await this.props.authenticatedApiCall('put', '/api/providerauthservice/inactivateUser/' + this.state.userId, null)
        } else if (actionType === "DeactivateUser") {
            response = await this.props.authenticatedApiCall('put', '/api/providerauthservice/reactivateUser/' + this.state.userId, null)
        } else if (actionType === "DeleteUser") {
            response = await this.props.authenticatedApiCall('get', '/api/principalservice/deleteusers/' + this.state.userId, null)
        } else if (actionType === "UnlockUser") {
            let dataToSend = {
                userId: this.state.userId,
                userrole: this.state.userrole
            }
            response = await this.props.authenticatedApiCall('post', '/api/providerauthservice/unlockRequestToStudent', dataToSend)
        }
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'teacherlist';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ confirmActionDialog: false, isError: false, isSuccess: false })
    }

    displayStudentDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./studentdetails/' + this.state.students[rowMeta.dataIndex].userId, this.state.students[rowMeta.dataIndex])
    }

    render() {
        const { classes } = this.props;
        const confirmText = "Confirm Message";
        let confirmActionButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={(e) => this.handleAllActions(e, this.state.typeOfAction)}>Yes</Button>
        ];
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>];
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.state.isLoading && <CircularProgress style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                        <MuiThemeDataTable title={`Students List (${this.state.classAndSection})`} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="attendanceList" />
                    </Grid>
                </Grid>
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(StudentList));
