import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { ValidatorForm } from 'react-material-ui-form-validator-vivek';
import { withStyles, Grid, Button, Paper, Card, CardContent, CardActions, CircularProgress } from '@material-ui/core';
import PayFee from './PayFee';
import ErrorDialog from '../../../components/ErrorDialog';
import StudentDetails from '../../../components/StudentDetails';
import StudentFeeDetails from '../../../components/StudentFeeDetails';
import FormHeader from '../../../components/FormHeader';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(10),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: { margin: 0, padding: 0, paddingBottom: '10px', marginTop: '5px' }
    },
    GridContainer: { marginTop: "20px" },
    primaryButton: {
        color: "#fff",
        background: "#f5bc53",
        width: "150px",
        borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }
    },
    pad_15: { float: "right" },
});
class StudentPayFee extends React.Component {
    state = {
        studentData: '', feeStructure: '', submittedFee: '', transportSubmittedFee: '',
        routeName: '', isRender: false, transportFee: '', disablePayBtn: true, studentfeeData: '', startSpinner: false, payfee: false, isError: false, errorMessage: ""
    }

    async componentDidMount() {
        let routeOptions = []
        let url = '/api/accountantservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            response.data.statusDescription.map((item) => {
                let routeObj = { label: item.route, value: item.transportFeeId }
                routeOptions.push(routeObj)
            })
        }
        if (this.props.location.state.userId && this.props.location.state.mediumType) {
            this.setState({ startSpinner: true, userId: this.props.location.state.userId })
            let url = '/api/accountantservice/feedetails/' + this.props.location.state.userId + "/" + this.props.location.state.mediumType;
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.status === 1) {
                this.setState({ studentfeeData: response.data.studentFeeStructure })
                let student = response.data.studentfeeData;
                let studentFeeDetails = response.data.studentFeeDetails;
                let structureData = response.data.studentFeeStructure;
                let transportSubmittedFeeDetails = response.data.transportFeeDetails;
                this.setState({ startSpinner: false })
                if (response.data.studentfeeData) {
                    if (student.busService == 1) {
                        let transportFee = await this.props.authenticatedApiCall('get', '/api/accountantservice/getstudenttransportfee/' + this.props.location.state.userId, null)
                        if (transportFee.data.status === 1) {
                            this.setState({ transportFee: transportFee.data.statusDescription[0].fee })
                        }
                        if (response.data.studentTransportRoute) {
                            this.setState({ routeName: response.data.studentTransportRoute })
                        }
                    }
                    if (response.data.studentFeeStructure != undefined) {
                        this.setState({ disablePayBtn: false })
                    }
                    this.setState({ route: routeOptions.filter((item) => { return item.value == student.route }), studentData: student })
                }
                if (response.data.studentFeeStructure) {
                    this.setState({ feeStructure: structureData })
                }
                if (response.data.studentFeeDetails) {
                    this.setState({ submittedFee: studentFeeDetails })
                }
                if (response.data.transportFeeDetails) {
                    this.setState({ transportSubmittedFee: transportSubmittedFeeDetails })
                }
                this.setState({ submited: false, isRender: true })

            } else if (response.data.status === 0) {
                this.setState({ startSpinner: false, isError: true, errorMessage: response.data.statusDescription })
            } else {
                this.setState({ startSpinner: false, isError: true, errorMessage: "Something went wrong. Try again some time." })
            }
        }
    }

    handlePayFeeDuialog = () => {
        this.setState({ payfee: true })
    }
    handleClosePayFeeDialog = () => {
        this.setState({ payfee: false })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    backDashboard = () => {
        this.setState({ isError: false })
    }

    render() {
        const { classes } = this.props;
        const { studentData, feeStructure, submittedFee, transportSubmittedFee, transportFee } = this.state;
        const OkButton = [<Button style={{ backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" }} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                {this.state.isRender ? <>
                    <FormHeader headerText={`Student Fee Details`} pageTitle={"Student Fee Details"} />
                    <Grid container className={classes.GridContainer}>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <Paper style={{ padding: "10px" }}>
                                <StudentDetails studentRecord={studentData} routeName={this.state.routeName} />
                            </Paper>
                            {this.props.currentUser.userDetails.role == 'FeeAccount' && <ValidatorForm onSubmit={this.handlePayFeeDuialog}>
                                <Card>
                                    <CardContent>
                                        {this.state.payfee ? <div>{this.props.location.state ? <PayFee studentId={this.props.location.state.userId} busService={this.state.studentData.busService} transportFee={this.state.transportFee} name={studentData.name} handleClosePayFeeDialog={this.handleClosePayFeeDialog} studentfeeData={this.state.studentfeeData} /> : <PayFee adharnumber={this.props.location.state} busservice={this.state.studentData.busService} transportFee={this.state.transportFee} name={studentData.name} handleClosePayFeeDialog={this.handleClosePayFeeDialog} studentfeeData={this.state.studentfeeData} />}</div> :
                                            <Grid container>
                                                <Grid item>
                                                    <CardActions className={classes.pad_15}>
                                                        <Button type="submit" disabled={this.state.disablePayBtn} className={classes.primaryButton}>Pay fee</Button>
                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        }
                                    </CardContent>
                                </Card>
                            </ValidatorForm>}
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12}>
                            <Paper style={{ padding: "10px" }}>
                                <StudentFeeDetails feeStructure={feeStructure} studentData={studentData} submittedFee={submittedFee} transportSubmittedFee={transportSubmittedFee} transportFee={transportFee} />
                            </Paper>
                        </Grid>
                    </Grid></> : <CircularProgress style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(StudentPayFee));
