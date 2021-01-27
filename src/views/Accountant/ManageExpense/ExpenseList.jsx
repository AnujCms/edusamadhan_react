import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import ActionButtonForExpense from './ActionButtonForExpense';
import { WithAccount } from '../../AccountContext';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Helmet } from "react-helmet";
import queryString from 'query-string';
import { formatDate } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(9),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "5px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class ExpenseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeDetails: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }
    tableheads1 = [
        {
            name: "expenseId",
            label: "Id",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "expenseName",
            label: "Expense",
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
            name: "expenseAmount",
            label: "Expense Amount",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "expenseDate",
            label: "Expense Date",
            options: {
                filter: false,
                sort: true,
                searchable: false
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
                    return (<ActionButtonForExpense expenseId={value.expenseId} handleEditExpense={this.handleEditExpense} handleDeleteExpense={this.handleDeleteExpense}/>)

                }
            }
        },

    ];

    //Edit Expense Details
    handleEditExpense = (expenseId) => {
        this.props.history.push('./edit-expense/' + expenseId);
    }
    //Delete ExpenseDetails
    handleDeleteExpense = async (expenseId) =>{
        let response = await this.props.authenticatedApiCall('delete', '/api/accountantservice/deleteexpense/'+expenseId, null)
        if(response.data.status === 1){
            this.setState({isSuccess:true, successMessage: response.data.statusDescription})
        }else{
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }
    }
    async componentDidMount() {
        let url = '/api/accountantservice/getexpense';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { expenseId: item.expenseId }
               item.expenseDate = formatDate(new Date(item.expenseDate));
            });
            this.setState({ feeDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };
    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'manageexpense';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isError: false, isSuccess: false })
    }

    handleCreateFeeStructure = () =>{
        this.props.history.push('./createexpense')
    }
    handleClose = () =>{
        this.setState({isError:false})
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const errorOkButton = [<Button className={classes.OkButton} onClick={this.handleClose}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
            <Helmet> <title>Expense List</title></Helmet>
            <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Expense Details</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateFeeStructure} className={classes.primaryBtn}>Create Expense</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                    <MuiThemeDataTable title={'Expenses List'} rows={this.state.feeDetails} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                    {(this.state.isError ? <ErrorDialog successButton={errorOkButton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(ExpenseList)));

