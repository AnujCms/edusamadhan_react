import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Fab, Avatar, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ActionButton from './ActionButtonForProvider';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import Spinner from '@material-ui/core/CircularProgress';
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    avatar: { width: 60, height: 60 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class StudentList extends React.Component {
    state = {
        studentid: '', inactivateSuccess: false, inactivateStudent: false, isLoading: false, students: [], anchorEl: null, studentName: '', isError: false, errorMessage: '', successMessage: ''
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
                        <Avatar alt="No Images" src={value === null?AdminImage:"data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
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
                    return <p><b>{value}</b></p>
                }
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
            name: "mothername",
            label: "Mother",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "fathername",
            label: "Father",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "cellnumber",
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
            name: "gender",
            label: "Gender",
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
            name: "busservice",
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
                        <ActionButton status={value.status} adharnumber={value.adharnumber} userid={value.userid} teacherid={this.props.currentUser.userDetails.userid} studentName={value.studentName} onLogBookClick={this.onLogBookClick} onInactivateStudent={this.inactivateStudent} onEditRegistration={this.onEditRegistration} createResult={this.createResult} createAttendance={this.createAttendance} getFeeDetails={this.getFeeDetails} sendNotification={this.handleSendNotiifcation} />
                    )
                }
            }
        }
    ];

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onLogBookClick = (userid, teacherid) => {
        this.props.history.push('./logbook/' + userid + '/' + teacherid)
    }
    onEditRegistration = (userid) => {
        this.props.history.push('./edit-registration/' + userid);
    }
    getFeeDetails = (adharnumber) => {
        this.props.history.push('./studentfee/' + adharnumber);
    }
    createResult = (userid) => {
        this.props.history.push('./create-result/' + userid)
    }
    createAttendance = (userid) => {
        this.props.history.push('./create-attendance/' + userid)
    }
    // Inactivate The Student
    inactivateStudent = (userid) => {
        this.setState({ studentid: userid, inactivateStudent: true, successMessage: "Are you really want to inactivate the Student?" })
    }
    handleInactivateStudent = async () => {
        let response1 = await this.props.authenticatedApiCall('post', '/api/teacherservice/inactivatestudent', {
            studentid: this.state.studentid
        })
        if (response1.data.status == 1) {
            this.setState({ inactivateStudent: false, inactivateSuccess: true, successMessage: response1.data.statusDescription })
        } else {
            this.setState({ inactivateStudent: false, inactivateSuccess: true, errorMessage: response1.data.statusDescription, isError: true })
        }
    }
    //send notification to student
    handleSendNotiifcation = (adharnumber) => {

    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    userid: item.userid, studentName: item.name, adharnumber: item.adharnumber, status: item.status
                }
                if (item.religion === 1) { item.religion = 'Hindu' }
                else if (item.religion === 2) { item.religion = 'Muslim' }
                else if (item.religion === 3) { item.religion = 'Shikh' }
                else if (item.religion === 4) { item.religion = 'Jain' }

                if (item.category === 1) { item.category = 'Genral' }
                else if (item.category === 2) { item.category = 'OBC' }
                if (item.category === 3) { item.category = 'ST/SC' }

                if (item.locality === 1) { item.locality = 'Urban' }
                else if (item.locality === 2) { item.locality = 'Rural' }

                if (item.gender == 1) { item.gender = "Female" }
                else if (item.gender == 2) { item.gender = "Male" }

                if(item.busservice == 1){ item.busservice = "No"}
                else if(item.busservice == 2){ item.busservice = "Yes"}
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false })
        }
    }

    backDashboard = () => {
        this.props.history.push(`./inactivatestudents`)
        this.setState({ isError: false, inactivateStudent: false, inactivateSuccess: false })
    }

    displayStudentDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./studentdetails/' + this.state.students[rowMeta.dataIndex].userid, this.state.students[rowMeta.dataIndex])
    }

    redirectToPrescribe = () => {
        this.props.history.push(`./createstudent`);
    }
    render() {
        const { classes } = this.props;
        let confirmInactivateStudent = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleInactivateStudent}>Inactivate</Button>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const confirmText = "Confirm Inactivate Student"
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.state.isLoading && <Spinner style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                        <MuiThemeDataTable title={'Students List'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="studentsList" />
                        {(this.state.inactivateStudent ? <SuccessDialog successButton={confirmInactivateStudent} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.inactivateSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["Teacher"])(StudentList));
