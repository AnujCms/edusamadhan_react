import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Fab, Avatar, Grid  } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ActionButton from './ActionButtonInactivate';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import Spinner from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    avatar:{ width: 60, height: 60 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class InactivateStudent extends React.Component {
    state = {
        studentid:'', activateSuccess:false, activateStudent:false, isLoading:false, students: [], anchorEl: null, studentName: '',  isError: false, errorMessage: '',  successMessage: ''
    };

    tableheads1 = [
        {
            name:"images",
            label: "Photo",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return(
                        <Avatar alt="No Images" src={"data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
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
                searchable: true
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
            label: "locality",
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
                customBodyRender: (value) => {
                    return (
                        <ActionButton status={value.status} adharnumber={value.adharnumber} userid={value.userid} teacherid={this.props.currentUser.userDetails.userid} studentName={value.studentName} onLogBookClick={this.onLogBookClick} onReactivateStudent={this.reactiveStudent} />
                    )
                }
            }
        }
    ];

    onLogBookClick = (userid, teacherid) => {
        this.props.history.push('./logbook/' + userid + '/' + teacherid)
    }

    handleReactivateStudent = async() =>{
        let response1 = await this.props.authenticatedApiCall('post', '/api/teacherservice/reactivatestudent', {
            studentid: this.state.studentid
        })
        if (response1.data.status == 1) {
            this.setState({activateStudent:false, activateSuccess:true, successMessage: response1.data.statusDescription })
        } else {
            this.setState({activateStudent:false, errorMessage: response1.data.statusDescription, isError: true })
        }
    }
    // Activate The Patient
    reactiveStudent = async (userid) => {
        this.setState({studentid:userid, activateStudent:true, successMessage:"Are you really want to activate the Student?"})
    }

    async componentDidMount() {
        this.setState({isLoading:true})
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmyinactivatedstudents', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    userid: item.userid, studentName: item.name, adharnumber: item.adharnumber, status:item.status
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

                if(item.gender == 1){item.gender = "Female"}
                else if(item.gender == 2){item.gender = "Male"}
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        } else if (response.data.status == 0) {
            this.setState({isLoading:false})
        }
    }

    backDashboard = () => {
        this.props.history.push(`./studentlist`)
        this.setState({ isError: false, activateStudent:false, activateSuccess:false})
    }

    redirectToPrescribe = () => {
        this.props.history.push(`./createstudent`);
    }
    render() {
        const { classes } = this.props;
        let confirmActivateStudent = [
            <Button className={classes.OkButton} onClick = {this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleReactivateStudent}>Activate</Button>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const confirmText = "Confirm Inactivate Student"
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    {this.state.isLoading&&<Spinner style={{ position: "absolute", top: "30%", left: "45%", zIndex:'99999' }}/>}
                        <MuiThemeDataTable title={'Inactivate Students List'} rows={this.state.students} columns={this.tableheads1} tableContent="attendanceList" />
                        {(this.state.activateStudent ? <SuccessDialog successButton={confirmActivateStudent} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.activateSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["Teacher"])(InactivateStudent));
