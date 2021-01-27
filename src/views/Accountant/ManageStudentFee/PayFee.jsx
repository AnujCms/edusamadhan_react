import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Link, Dialog, CircularProgress } from '@material-ui/core';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { string, object } from "yup";
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import PayFeeUI from './PayFeeUI'
import { connect } from 'formik';
import FormFooter from '../../../components/FormFooter';
import FormHeader from '../../../components/FormHeader';

const styles = theme => ({
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class PayFee extends React.Component {
    constructor() {
        super()
        this.yupSchema = object().shape({
            selectedMonthName: string().required("This field is required."),
            selectedmonthfee: string().required("This field is required."),
            payfeetype: string().required("This field is required.")
        });
        this.fieldVariables = { selectedMonthName: '', selectedmonthfee: '', payfeetype: '1' }
        this.state = {
            feeStructure: '', startSpinner: false, selectedmonthname: "", selectedmonthfee: "", feeObject: '', error: false, success: false
        }
    }

    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            selectedMonthName: values.selectedMonthName,
            studentId: this.props.studentId,
            payfeetype: parseInt(values.payfeetype)
        }
        let response;
        if (values.payfeetype == 1) {
            response = await this.props.authenticatedApiCall('post', '/api/accountantservice/paystudentfee', dataToSend)
            response = await this.props.authenticatedApiCall('post', '/api/accountantservice/paytransportfee', dataToSend)
        } else if (values.payfeetype == 2) {
            response = await this.props.authenticatedApiCall('post', '/api/accountantservice/paystudentfee', dataToSend)
        } else if (values.payfeetype == 3) {
            response = await this.props.authenticatedApiCall('post', '/api/accountantservice/paytransportfee', dataToSend)
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
        if (this.props.busService == 2) {
            this.fieldVariables.payfeetype = '2';
        }
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
                {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                <Dialog className={classes.root} fullWidth={true} maxWidth={'md'} scroll="body" open={true}
                    onClose={this.props.close} style={{ overflow: "visible" }} aria-labelledby="form-dialog-title">
                    <FormHeader headerText={`Pay Fee: ${this.props.name}`} pageTitle={`Pay Fee`} />
                        <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                            {(formikProps) => (
                                <div>
                                    <Form>
                                        <>
                                            <PayFeeUI feeStructure={this.props.studentfeeData} transportFee={this.props.transportFee} busService={this.props.busService} />
                                            <FormFooter handleCancel={this.props.handleClosePayFeeDialog} startSpinner={this.state.startSpinner} />
                                        </>
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

export default withStyles(styles)(AuthenticatedPage()(connect(PayFee)));