import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Avatar, Grid, Button, CircularProgress } from '@material-ui/core';
import ActionButton from './ActionButtonInactivate';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import AdminImage from '../../../assets/images/admin.png';
import { handleGenderLabel, handleReligionLabel, handleMediumLabel, handleCategoryLabel, handleLocalityLabel } from '../../../components/utilsFunctions';

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

class InactivateStudent extends React.Component {
    state = {
        studentId: '', activateStudent: false, isSuccess: false, activateStudent: false, isLoading: false, students: [], anchorEl: null, studentName: '', isError: false, errorMessage: '', successMessage: ''
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
                        {(value == 4) && <p style={{ width: "100px", color: 'brown', fontWeight: 800, fontSize: "14px !important" }}>Inactivated</p>}
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
                        <ActionButton userId={value.userId} handleReactivateUser={this.onClickReactivateUser} />
                    )
                }
            }
        }
    ];


    onClickReactivateUser = (userId) => {
        this.setState({ studentId: userId, activateStudent: true, successMessage: "Are you really want to inactivate the Student?" })
    }

    handleReactivateStudent = async () => {
        let response1 = await this.props.authenticatedApiCall('put', '/api/providerauthservice/reactivateUser/' + this.state.studentId, null);
        if (response1.data.status == 1) {
            this.setState({ activateStudent: false, isSuccess: true, successMessage: response1.data.statusDescription })
        } else {
            this.setState({ activateStudent: false, errorMessage: response1.data.statusDescription, isError: true })
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmyinactivatedstudents', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstName + " " + item.lastName;
                item.Action = {
                    userId: item.userId
                }
                item.locality = handleLocalityLabel(item.locality)
                item.category = handleCategoryLabel(item.category)
                item.gender = handleGenderLabel(item.gender)
                item.religion = handleReligionLabel(item.religion)
                item.mediumType = handleMediumLabel(item.mediumType)
                if (item.busService == 1) { item.busService = "No" }
                else if (item.busService == 2) { item.busService = "Yes" }
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false })
        }
    }

    backDashboard = () => {
        this.props.history.push(`./studentslist`)
        this.setState({ isError: false, activateStudent: false, isSuccess: false })
    }
    handleClose = () => {
        this.setState({ isError: false, activateStudent: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        let confirmActivateStudent = [
            <Button className={classes.OkButton} onClick={this.handleClose}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleReactivateStudent}>Re-Activate</Button>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const confirmText = "Confirm Reactivate Student"
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.state.isLoading && <CircularProgress style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                        <MuiThemeDataTable title={'Inactivate Students List'} rows={this.state.students} columns={this.tableheads1} tableContent="attendanceList" />
                        {(this.state.activateStudent ? <SuccessDialog successButton={confirmActivateStudent} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.handleClose} /> : "")}
                        {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(InactivateStudent));
