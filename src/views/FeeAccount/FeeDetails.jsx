import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import ActionButtonForEditFeeDetails from './ActionButtonForEditFeeDetails';
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

class FeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeDetails: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }
    tableheads1 = [
        {
            name: "class",
            label: "Class",
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
            name: "january",
            label: "Jan",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "february",
            label: "Feb",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "march",
            label: "Mar",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "april",
            label: "Apr",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "may",
            label: "May",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "june",
            label: "Jun",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "july",
            label: "jul",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "august",
            label: "Aug",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "september",
            label: "Sep",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "october",
            label: "Oct",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "november",
            label: "Nov",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "december",
            label: "Dec",
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
                    return (<ActionButtonForEditFeeDetails classs={value.class} onEditDetails={this.onEditDetails} />)

                }
            }
        },

    ];
    //Edit Fee Details
    onEditDetails = (classs) => {
        this.props.history.push('./edit-feedetails/' + classs);
    }

    async componentDidMount() {
        let url = '/api/studentfeeservice/getfeedetails';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                item.action = { class: item.class }
                
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

            });
            this.setState({ feeDetails: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    };

    backDashboard = () => {
        this.props.history.push(`./createfee`)
        this.setState({ isError: false, isSuccess: false })
    }
    displayFeeDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./studentfeedetails/' + this.state.feeDetails[rowMeta.dataIndex].action.class, this.state.feeDetails[rowMeta.dataIndex])
    }

    handleCreateFeeStructure = () =>{
        this.props.history.push('./createfee')
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
                        <Typography variant="h4" className={classes.evenetsTitle}>Class Fee Details</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateFeeStructure} className={classes.primaryBtn}>Create Fee</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                    <MuiThemeDataTable title={'Class Fee List'} rows={this.state.feeDetails} columns={this.tableheads1} rowFeeDetailsRedirectFunction={this.displayFeeDetailsForMobileView} tableContent="studentsfeedetails" />
                    </Grid>
                </Grid>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                    {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(FeeDetails)));

