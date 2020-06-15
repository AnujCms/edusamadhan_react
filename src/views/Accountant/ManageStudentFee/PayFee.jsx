import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Typography, Button, CardActions, Link, Grid, Paper, Card, Dialog, DialogTitle, DialogActions, DialogContent, CircularProgress } from '@material-ui/core';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Link as RouterLink } from 'react-router-dom';
import Spinner from '@material-ui/core/CircularProgress';
import FormikSelectWithCheckBox from '../../../components/FormikValidatedComponents/SelectFieldWithCheckBox';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import PayFeeUI from './PayFeeUI'
import { connect, FieldArray } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    inputItem: { width: 350 },
    selectContainer: { width: 350 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }, [theme.breakpoints.down('md')]: { marginLeft: "0px", width:"100px" } },
    pad_15: { float: "right" },
    paddingBottom: { marginLeft: "0px", marginTop: "20px", marginBottom: "20px", [theme.breakpoints.down('md')]: { marginLeft: "0px" } },
    inputSelect: { width: "300px", [theme.breakpoints.down('sm')]: { width: "300px" } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    dialogueTitle: {marginTop:"20px", height:"50px", boxShadow: "0 14px 16px -15px rgba(218, 218, 218, 0.5)", color: "#4a4a4a", borderBottom: "2px solid #f3f4f5", '& h2': { fontSize: 24, fontWeight: 800 } },
    closeButton: { position: "absolute", right: theme.spacing(1), top: theme.spacing(1), color: theme.palette.grey[500], fontSize: "14px" },
    cancelBtnDialogue: { width: "100%", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", fontWeight: "500 !important", [theme.breakpoints.down("sm")]: { width: "100%", marginLeft: 0 } },

});

const monthOptions = [{ value: "january", label: "January" }, { value: "february", label: "February" }, { value: "march", label: "March" }, { value: "april", label: "April" }, { value: "may", label: "May" }, { value: "june", label: "June" }, { value: "july", label: "July" }, { value: "august", label: "August" }, { value: "september", label: "September" }, { value: "october", label: "October" }, { value: "november", label: "November" }, { value: "december", label: "December" }];

class PayFee extends React.Component {
    constructor() {
        super()
        this.fieldVariables = { selectedMonthName: '', selectedmonthfee: '', payfeetype: '1' }
        this.state = {
            feeStructure: '', startSpinner: false, selectedmonthname: "", selectedmonthfee: "", feeObject: '', error: false, success: false
        }
    }

    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            selectedMonthName: values.selectedMonthName,
            adharnumber: this.props.adharnumber,
            payfeetype: values.payfeetype
        }
        let response;
        if(values.payfeetype == 1){
            response = await this.props.authenticatedApiCall('post', '/api/studentfeeservice/paystudentfee', dataToSend)
            response = await this.props.authenticatedApiCall('post', '/api/studentfeeservice/paytransportfee', dataToSend)  
        }else if(values.payfeetype == 2){
            response = await this.props.authenticatedApiCall('post', '/api/studentfeeservice/paystudentfee', dataToSend)
        }else if(values.payfeetype == 3){
            response = await this.props.authenticatedApiCall('post', '/api/studentfeeservice/paytransportfee', dataToSend)  
        }
        if (response.data.status == 1) {
            this.setState({ startSpinner: false, successMessage: response.data.statusDescription, isSuccess: true });
        } else if (response.data.status == 0) {
            this.setState({ startSpinner: false, errorMessage: response.data.statusDescription, isError: true });
        }
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        window.location.reload();
    }
    componentDidMount = async () => {
        if(this.props.busservice == 1){
            this.fieldVariables.payfeetype =  '2';
        }
        // let response = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getfeestructure/' + this.props.adharnumber, null);
        // if (response.data.status == 1) {
        //     console.log('response.data.statusDescription',response.data.statusDescription)
        //     this.setState({ feeStructure: response.data.statusDescription })
        // }
    }
    render() {
        const { classes } = this.props;
        const MyLink = (props) => <RouterLink to={`/printfeereciept/${this.props.adharnumber}`} {...props} />
        const successButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>No Print</Button>,
            <Link
                variant="body2"
                component={MyLink}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none" }}
            ><Button className={classes.OkButton} onClick={this.backDashboard}>Print</Button></Link>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <>
                {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                <Dialog className={classes.root} fullWidth={true} maxWidth={'md'} scroll="body" open={true}
                    onClose={this.props.close} style={{ overflow: "visible" }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" className={classes.dialogueTitle}>Pay Fee: {this.props.name}
                        <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.handleClosePayFeeDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                        {(formikProps) => (
                            <div>
                                <Form>
                                    <>
                                        <DialogContent style={{ minHeight: "300px", overflow: "visible" }}>
                                            <PayFeeUI feeStructure={this.props.studentfeeData} transportFee={this.props.transportFee} busservice={this.props.busservice} />
                                        </DialogContent>
                                        <hr style={{ width: "100%" }} />
                                        <DialogActions style={{ position: "relative", padding: "20px 0" }}>
                                            <GridContainer>
                                                <GridItem md={3} sm={6} xs={6} align="left">
                                                    <Button onClick={this.props.handleClosePayFeeDialog} className={classes.cancelBtnDialogue}>Cancel</Button>
                                                </GridItem>
                                                <GridItem md={3} sm={6} xs={6} align="left">
                                                    <Button type="submit" className={classes.primaryButton}>Submit</Button>
                                                </GridItem>
                                            </GridContainer>
                                        </DialogActions></>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </Dialog>
                {(this.state.isSuccess ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount", "Teacher"])(connect(PayFee)));