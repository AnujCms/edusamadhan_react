import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import ActionButtonForExpense from './ActionButtonForExpense';
import { WithAccount } from '../AccountContext';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 9,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },

    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "5px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class StaffSalaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeDetails: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }
    tableheads1 = [
        {
            name: "name",
            label: "Staff Name",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
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
            name: "cellnumber",
            label: "Cellnumber",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "adharnumber",
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
                sort: false,
                searchable: false
            }
        },
        {
            name: "userrole",
            label: "Role",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "salary",
            label: "Salary",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        }
    ];

    //Edit Expense Details
    handleEditExpense = (expensedetailsid) => {
        this.props.history.push('./edit-expense/' + expensedetailsid);
    }
    //Delete ExpenseDetails
    handleDeleteExpense = async (expensedetailsid) => {
        let response = await this.props.authenticatedApiCall('delete', '/api/studentfeeservice/deleteexpense/' + expensedetailsid, null)
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription })
        } else {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    async componentDidMount() {
        let url = '/api/studentfeeservice/getstaffsalary';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { expensedetailsid: item.expensedetailsid }
                item.name = item.firstname + " " + item.lastname
                if (item.salary === null) {
                    item.salary = '--'
                }
                if (item.userrole === 3) { item.userrole = 'Faculty' }
                else if (item.userrole === 4) { item.userrole = 'Examination Head' }
                else if (item.userrole === 5) { item.userrole = 'Accountant' }
                if (item.gender == 1) { item.gender = "Female" }
                else if (item.gender == 2) { item.gender = "Male" }
            });
            this.setState({ feeDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };

    backDashboard = () => {
        this.props.history.push(`./manageexpense`)
        this.setState({ isError: false, isSuccess: false })
    }

    handleCreateFeeStructure = () => {
        this.props.history.push('./createexpense')
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Expense List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Staff Salary Details</Typography>
                    </Grid>
                    {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateFeeStructure} className={classes.primaryBtn}>Create Expense</Button>
                        </div>
                    </Grid> */}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Staff Salary'} rows={this.state.feeDetails} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(StaffSalaryView)));

