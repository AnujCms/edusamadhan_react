import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button } from '@material-ui/core';
import ActionButton from '../../components/ActionAdminLogbook';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { WithAccount } from '../AccountContext';
import Avatar from '@material-ui/core/Avatar';
import ErrorDialog from '../../components/ErrorDialog';
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class StudentsList extends React.Component {
    state = {
        students: [], studentName: '', anchorEl: null, errorMessage: '', isError: false
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
                    console.log(value)
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
            name: "adharnumber",
            label: "Adhar Number",
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
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton studentid={value.studentid} teacherid={this.props.teacherid} studentName={value.studentName} onLogBookClick={this.onLogBookClick} />
                    )
                }
            }
        }
    ];
    onLogBookClick = (studentid, teacherid) => {
        this.props.history.push('../logbook/' + studentid + '/' + teacherid)
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/principalservice/students/' + this.props.teacherid, null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.action = {
                    studentid: item.studentid, studentName: item.name
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
            });

            this.setState({
                students: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    displayStudentDetailsForMobileView = (rowData, rowMeta) => {
        let data = {
            studentData: this.state.students[rowMeta.dataIndex],
            teacherid: this.props.teacherid
        }
        this.props.history.push('../studentdetails/' + this.state.students[rowMeta.dataIndex].studentid, data)
    }
    backDashboard = () => {
        this.setState({ isError: false })
        this.props.history.push('../teacherlist');
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Students List of Selected Teacher'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="studentsList" />
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(StudentsList)));