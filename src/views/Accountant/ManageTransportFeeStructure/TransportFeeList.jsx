import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import ActionButtonForTranportFee from './ActionButtonForTranportFee';
import { WithAccount } from '../../AccountContext';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Helmet } from "react-helmet";
import { handleVehicleLabel } from '../../../components/utilsFunctions';
import queryString from 'query-string';

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

class TransportFeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeDetails: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }
    tableheads1 = [
        {
            name: "transportFeeId",
            label: "Id",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "route",
            label: "Route",
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
            name: "fee",
            label: "Vehicle Fee",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "vehicleNumber",
            label: "Vehicle Number",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "driverName",
            label: "Driver Name",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },        
        {
            name: "driverNumber",
            label: "Driver Number",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },     
        {
            name: "driverSalary",
            label: "Driver Salary",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "vehicleType",
            label: "Vehicle",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },      
        {
            name: "vehicleColor",
            label: "Vehicle Color",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "vehicleExpense",
            label: "Vehicle Expense",
            options: {
                filter: false,
                sort: false,
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
                    return (<ActionButtonForTranportFee transportFeeId={value.transportFeeId} handleEditTransportFee={this.handleEditTransportFee} handleDeleteTransportFee={this.handleDeleteTransportFee}/>)

                }
            }
        },

    ];

    //Edit Transport Fee Details
    handleEditTransportFee = (transportFeeId) => {
        this.props.history.push('./edit-transport/' + transportFeeId);
    }
    //Delete Transport Fee Details
    handleDeleteTransportFee = async (transportFeeId) =>{
        let response = await this.props.authenticatedApiCall('delete', '/api/accountantservice/deletetransportfee/'+transportFeeId, null)
        if(response.data.status === 1){
            this.setState({isSuccess:true, successMessage: response.data.statusDescription})
        }else{
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }
    }
    async componentDidMount() {
        let url = '/api/accountantservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { transportFeeId: item.transportFeeId }
                item.vehicleType = handleVehicleLabel(item.vehicleType)
            });
            this.setState({ feeDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };

    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'managetransport';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isError: false, isSuccess: false })
    }

    handleCreateFeeStructure = () =>{
        this.props.history.push('./createtransport')
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
            <Helmet><title>Tranport Fee List</title></Helmet>
            <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Transport Fee Details</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateFeeStructure} className={classes.primaryBtn}>Create Transport Fee</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                    <MuiThemeDataTable title={'Route Vehicle List'} rows={this.state.feeDetails} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                    {(this.state.isError ? <ErrorDialog successButton={errorOkButton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(TransportFeeList)));

