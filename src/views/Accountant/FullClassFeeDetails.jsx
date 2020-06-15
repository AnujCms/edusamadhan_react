import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Paper, Button, Grid } from '@material-ui/core';
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorDialog from '../../components/ErrorDialog';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';

const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 5,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        [theme.breakpoints.down('md')]: { marginTop: "10px" }
    },
    widthSelect:{width:350,[theme.breakpoints.down('md')]: { width: 250 }},
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class FullClassFeeDetails extends React.Component {
    state = {
        classid: '', section: '', studentFeeDetails:'', displayTable:false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
    };
    handleClassChange = (value) => {
        this.setState({ classid: value,displayTable:false,section:'' })
    }
    handleSectionChange = async(value) =>{
        this.setState({ section: value })
        if(this.state.classid.value&&value.value){
        let url = "/api/studentfeeservice/getclassfeedetails/" + this.state.classid.value + "/" + value.value ;
        let response = await this.props.authenticatedApiCall('get', url, null)
        if(response.data.status === 1){
            this.setState({displayTable:true, studentFeeDetails:response.data.studentFeeDetails})
        }else if(response.data.status === 0){
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }
    }else{
        this.setState({isError:true, errorMessage:"First select class."}) 
    }
    }
    tableheads1 = [
        {
            name: "name",
            label: "Student",
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
            name: "adharnumber",
            label: "AAdhar",
            options: {
                filter: false,
                sort: false,
                searchable: false
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
            name: "totalFee",
            label: "Total",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "paidfee",
            label: "Paid",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "remainingfee",
            label: "Left",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        }
    ];
    backDashboard = () => {
        this.props.history.push(`./fullclassfeedetails`)
        this.setState({ isError: false,displayTable:false})
    }
    displayFeeDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./classfeedetails', this.state.studentFeeDetails[rowMeta.dataIndex])
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                <Grid container className={classes.GridContainer}>
                <Grid item md={12}>
                        <Paper className={classes.root} elevation={1}>
                            <div className={this.props.classes.selectItemWrapper}>
                                <InputLabel>Class : </InputLabel>
                                <FormControl className={classes.widthSelect} >
                                    <Select
                                        value={this.state.accountid}
                                        onChange={this.handleClassChange}
                                        options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                        placeholder='Select Class...'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={this.props.classes.selectItemWrapper}>
                                <InputLabel>Section :</InputLabel>
                                <FormControl className={classes.widthSelect} >
                                    <Select
                                        value={this.state.providerid}
                                        onChange={this.handleSectionChange}
                                        options={sectionOptions}
                                        placeholder='Select Section...'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >
                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                        {this.state.displayTable&&<MuiThemeDataTable title={'Students Fee Details'} rows={this.state.studentFeeDetails} columns={this.tableheads1}  rowDetailsRedirectFunctionStudentFee={this.displayFeeDetailsForMobileView} tableContent="classfeedetails"/>}
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(FullClassFeeDetails));