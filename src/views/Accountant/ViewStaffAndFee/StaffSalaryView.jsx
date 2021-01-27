import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Grid, Avatar } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import ErrorDialog from '../../../components/ErrorDialog';
import { Helmet } from "react-helmet";
import { handleUserRoleLabel, handleGenderLabel } from '../../../components/utilsFunctions';
import AdminImage from '../../../assets/images/admin.png';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "5px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class StaffSalaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffSalaryDetails: [], isError: false, errorMessage: ''
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
            label: "Staff Name",
            options: {
                filter: false,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
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
            name: "cellNumber",
            label: "CellNumber",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "aadharNumber",
            label: "AAdhar Number",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "userrole",
            label: "Role",
            options: {
                filter: true,
                sort: true,
                searchable: false
            }
        },
        {
            name: "salary",
            label: "Salary",
            options: {
                filter: false,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        }
    ];

    async componentDidMount() {
        let url = '/api/accountantservice/getstaffsalary';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { expensedetailsid: item.expensedetailsid }
                item.name = item.firstName + " " + item.lastName
                if (item.salary === null) {
                    item.salary = '--'
                }
                item.userrole = handleUserRoleLabel(item.userrole)
                item.gender = handleGenderLabel(item.gender);
            });
            this.setState({ staffSalaryDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };

    backDashboard = () => {
        this.setState({ isError: false })
    }

    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Staff Salary</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Staff Salary Details'} rows={this.state.staffSalaryDetails} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(StaffSalaryView)));

