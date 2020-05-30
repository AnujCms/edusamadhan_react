import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button } from '@material-ui/core';
import ActionButtonEditTeacher from '../../components/ActionButtonForAccountAdmin';
import ActionButtomAdminExamHead from '../../components/ActionButtonAdminExamHead';
import ActionButtomFeeAccount from '../../components/ActionButtonAdminFeeAccount';
import { WithAccount } from '../AccountContext';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import AssignClass from './AssignClass';
import Avatar from '@material-ui/core/Avatar';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import Spinner from '@material-ui/core/CircularProgress';
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: { margin: theme.spacing.unit * 2, paddingBottom: theme.spacing.unit * 1, marginTop: theme.spacing.unit * 11, [theme.breakpoints.down('md')]: { margin: 0 } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class TeacherstList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unassignedClass: false, deleteUser: false, deleteSuccess: false, headerText: '', successMessage: '', teacherid: '', deleteTeacher: false, isLoading: false, accountid: null, teachers: [], studentListId: null, assignClass: false, errorMessage: '', isError: false
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
            name: "emailid",
            label: "Email ID",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "adharnumber",
            label: "AAdhar",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "cellnumber",
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
            name: "class",
            label: "Class",
            options: {
                filter: false,
                sort: false,
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
                    if (value.userrole == 3) { return (<ActionButtonEditTeacher classid={value.classid} teacherid={value.userid} onEditTeacher={this.onEditTeacher} onShowStudents={this.onShowStudents} onAssignClass={this.onAssignClass} onDeleteTeacher={this.onDeleteTeacher} onUnAssignClass={this.onUnAssignClass} />) }
                    else if (value.userrole == 4) { return (<ActionButtomAdminExamHead teacherid={value.userid} onEditTeacher={this.onEditTeacher} onDeleteUser={this.onDeleteUser} />) }
                    else if (value.userrole == 5) { return (<ActionButtomFeeAccount teacherid={value.userid} onEditTeacher={this.onEditTeacher} onDeleteUser={this.onDeleteUser} />) }
                }
            }
        },

    ];

    //Edit Teacher
    onEditTeacher = (teacherid) => {
        this.props.history.push('./edit-account/' + teacherid);
    }
    //Delete User
    onDeleteUser = async (teacherid) => {
        this.setState({ deleteUser: true, teacherid: teacherid, headerText: 'Confirmation Message', successMessage: 'Are you sure to delete the User.' })
    }
    handleDeleteUsers = async () => {
        let response = await this.props.authenticatedApiCall('get', '/api/principalservice/deleteusers/' + this.state.teacherid, null)
        if (response.data.status === 1) {
            this.setState({ deleteTeacher: false, deleteSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ deleteTeacher: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    //onUnAssignClass
    onUnAssignClass = (teacherid) => {
        this.setState({ unassignedClass: true, teacherid: teacherid, headerText: 'Confirmation Message', successMessage: 'Are you sure to UnAssigned the class.' })
    }
    handleUnAssignedClass = async () => {
        let response = await this.props.authenticatedApiCall('get', '/api/principalservice/unassignedclass/' + this.state.teacherid, null)
        if (response.data.status === 1) {
            this.setState({ unassignedClass: false, deleteSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ unassignedClass: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    //Delete Teacher
    onDeleteTeacher = async (teacherid) => {
        this.setState({ deleteTeacher: true, teacherid: teacherid, headerText: 'Confirmation Message', successMessage: 'Are you sure to delete the User.' })
    }
    handleDeleteTeacher = async () => {
        let response = await this.props.authenticatedApiCall('get', '/api/principalservice/deleteteacher/' + this.state.teacherid, null)
        if (response.data.status === 1) {
            this.setState({ deleteTeacher: false, deleteSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ deleteTeacher: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }

    //Show Students List
    onShowStudents = (teacherid) => {
        this.props.history.push('./studentslist/' + teacherid);
    }
    //Assign class
    onAssignClass = (teacherid) => {
        this.setState({ assignClass:true, teacherid: teacherid })
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        let accountid = this.props.currentUser.userDetails.accountid;
        if (accountid && accountid.length > 0) {
            let url = '/api/principalservice/teachers';
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.status === 1) {
                response.data.statusDescription.map((item) => {
                    item.action = { userid: item.userid, userrole: item.userrole, classid: item.class }
                    item.name = item.firstname + " " + item.lastname

                    if (item.qualification === 1) { item.qualification = 'B.Sc' }
                    else if (item.qualification === 2) { item.qualification = 'M.Sc' }
                    else if (item.qualification === 3) { item.qualification = 'B.Tech' }
                    else if (item.qualification === 4) { item.qualification = 'M.Tech' }
                    else if (item.qualification === 5) { item.qualification = 'BA' }
                    else if (item.qualification === 6) { item.qualification = 'MA' }
                    else if (item.qualification === 7) { item.qualification = 'B.Com' }
                    else if (item.qualification === 8) { item.qualification = 'M.Com' }
                    else if (item.qualification === 9) { item.qualification = 'MBA' }
                    else if (item.qualification === 10) { item.qualification = 'P.hd' }
                    else if (item.qualification === 11) { item.qualification = 'LLB' }
                    else if (item.qualification === 12) { item.qualification = 'LLM' }
                    else if (item.qualification === 13) { item.qualification = 'BCA' }
                    else if (item.qualification === 14) { item.qualification = 'MCA' }

                    if (item.subject === 1) { item.subject = 'Hindi' }
                    else if (item.subject === 2) { item.subject = 'English' }
                    else if (item.subject === 3) { item.subject = "Mathematics" }
                    else if (item.subject === 4) { item.subject = 'Science' }
                    else if (item.subject === 5) { item.subject = 'Social Science' }
                    else if (item.subject === 6) { item.subject = 'Geography' }
                    else if (item.subject === 7) { item.subject = 'Physics' }
                    else if (item.subject === 8) { item.subject = 'Chemistry' }
                    else if (item.subject === 9) { item.subject = 'Biology' }
                    else if (item.subject === 10) { item.subject = 'Moral Science' }
                    else if (item.subject === 11) { item.subject = 'Drawing' }
                    else if (item.subject === 12) { item.subject = 'Computer' }
                    else if (item.subject === 13) { item.subject = 'evs' }
                    else if (item.subject === 14) { item.subject = 'sanskrat' }

                    if(this.props.currentUser.userDetails.accouttype == 1){
                        if (item.class === 1) { item.class = 'Nursery' }
                        else if (item.class === 2) { item.class = 'LKG' }
                        else if (item.class === 3) { item.class = 'UKG' }
                        else if (item.class === 4) { item.class = '1st' }
                        else if (item.class === 5) { item.class = '2nd' }
                        else if (item.class === 6) { item.class = '3rd' }
                        else if (item.class === 7) { item.class = '4th' }
                        else if (item.class === 8) { item.class = '5th' }
                    }else{
                        if (item.class === 1) { item.class = '6th' }
                        else if (item.class === 2) { item.class = '7th' }
                        else if (item.class === 3) { item.class = '8th' }
                        else if (item.class === 4) { item.class = '9th' }
                        else if (item.class === 5) { item.class = '10th' }
                        else if (item.class === 6) { item.class = '11th' }
                        else if (item.class === 7) { item.class = '12th' }
                        else if (item.class === 0) { item.class = 'Not' }
                    }

                    if (item.section == '1') { item.section = 'A' }
                    else if (item.section == '2') { item.section = 'B' }
                    else if (item.section == '3') { item.section = 'C' }
                    else if (item.section == '4') { item.section = 'D' }
                    else if (item.section == '5') { item.section = 'E' }
                    else if (item.section === 0) { item.section = 'Assigned' }

                    if (item.userrole === 3) { item.userrole = 'Faculty' }
                    else if (item.userrole === 4) { item.userrole = 'Examination Head' }
                    else if (item.userrole === 5) { item.userrole = 'Accountant' }
                    if (item.gender == 1) { item.gender = "Female" }
                    else if (item.gender == 2) { item.gender = "Male" }
                    if (item.userrole === 'Examination Head' || item.userrole === 'Accountant') {
                        item.class = "N / A"
                    } else {
                        item.class = item.class + " " + item.section
                    }
                });

                this.setState({
                    teachers: response.data.statusDescription, isLoading: false
                })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription, isLoading: false })
            }
        }
    };

    dismissDialog = () => {
        this.setState({ assignClass: false });
    }
    displayTeacherDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./teacherdetails/' + this.state.teachers[rowMeta.dataIndex].userid, this.state.teachers[rowMeta.dataIndex])
    }
    backDashboard = () => {
        this.setState({ isError: false, deleteTeacher: false, deleteSuccess: false, deleteUser: false, unassignedClass: false })
    }
    handleDelete = () => {
        this.props.history.push('./teacherlist');
        this.setState({ deleteSuccess: false, deleteUser: false })
    }
    render() {
        const { classes } = this.props;
        let confirmButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleDeleteTeacher}>Yes, Delete</Button>
        ]
        let confirmUnAssigned = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleUnAssignedClass}>UnAssigned</Button>
        ]
        let confirmDeleteUser = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleDeleteUsers}>Yes, Delete</Button>
        ]
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.handleDelete}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Users List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.state.isLoading && <Spinner style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                        <MuiThemeDataTable title={'Users List'} rows={this.state.teachers} columns={this.tableheads1} rowDetailsRedirectFunctionTeacher={this.displayTeacherDetailsForMobileView} tableContent='teachersList' />
                        {(this.state.assignClass ? <AssignClass teacherid={this.state.teacherid} dismiss={this.dismissDialog} /> : "")}
                    </Grid>
                </Grid>
                {(this.state.unassignedClass ? <SuccessDialog successButton={confirmUnAssigned} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}

                {(this.state.deleteUser ? <SuccessDialog successButton={confirmDeleteUser} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.deleteSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.handleDelete} /> : "")}
                {(this.state.deleteTeacher ? <SuccessDialog successButton={confirmButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(TeacherstList)));

