import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import ActionButtonForTranportFee from './ActionButtonForTranportFee';
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

class TransportFeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeDetails: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
        this.vehicleOptions = [{ value: 1, label: "Bus" }, { value: 2, label: "Van" }, { value: 3, label: "Car" }, { value: 4, label: "Auto" }]
    }
    tableheads1 = [
        {
            name: "transportfeeid",
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
            name: "vehiclenumber",
            label: "Vehicle Number",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "drivername",
            label: "Driver Name",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },        
        {
            name: "drivernumber",
            label: "Driver Number",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },     
        {
            name: "driversalary",
            label: "Driver Salary",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "vehicletype",
            label: "Vehicle",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },      
        {
            name: "vehiclecolor",
            label: "Vehicle Color",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "vehicleexpense",
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
                    return (<ActionButtonForTranportFee transportfeeid={value.transportfeeid} handleEditTransportFee={this.handleEditTransportFee} handleDeleteTransportFee={this.handleDeleteTransportFee}/>)

                }
            }
        },

    ];
    setVehicleOptions = (value) => {
        let vehicleValue = '';
        this.vehicleOptions.forEach((item, index) => {
            if (item.value == value) {
                vehicleValue = item.label;
            }
        })
        return vehicleValue;
    }
    //Edit Transport Fee Details
    handleEditTransportFee = (transportfeeid) => {
        this.props.history.push('./edit-transport/' + transportfeeid);
    }
    //Delete Transport Fee Details
    handleDeleteTransportFee = async (transportfeeid) =>{
        let response = await this.props.authenticatedApiCall('delete', '/api/studentfeeservice/deletetransportfee/'+transportfeeid, null)
        if(response.data.status === 1){
            this.setState({isSuccess:true, successMessage: response.data.statusDescription})
        }else{
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }
    }
    async componentDidMount() {
        let url = '/api/studentfeeservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { transportfeeid: item.transportfeeid }
                item.vehicletype = this.setVehicleOptions(item.vehicletype)
            });
            this.setState({ feeDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };

    backDashboard = () => {
        this.props.history.push(`./managetransport`)
        this.setState({ isError: false, isSuccess: false })
    }

    handleCreateFeeStructure = () =>{
        this.props.history.push('./createtransport')
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
            <Helmet> <title>Fee List</title></Helmet>
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
                    {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(TransportFeeList)));

