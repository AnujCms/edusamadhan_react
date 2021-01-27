import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Formik, Form, connect } from 'formik';
import { object, string, number } from 'yup';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import TransportFeeUI from './TransportFeeUI';
import TranportEditUI from './TransportEditUI';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = theme => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } }
})

class TransportCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            route: string().required("This field is required"),
            fee: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            vehicleNumber: string().required("This field is required"),
            driverName: string().required("This field is required"),
            driverNumber: string().required("Mobile Number is required.").min(10, ("Please enter valid 10 digit mobile number.")).max(10, ("Please enter valid 10 digit mobile number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
            driverSalary: number().required('This field is required.').min(1, "Salary can not be less than one.").typeError('This field will accept only number.'),
            vehicleType: string().required("This field is required"),
            vehicleColor: string().required("This field is required"),
            vehicleExpense: number().required('This field is required.').min(1, "Expense can not be less than one.").typeError('This field will accept only number.')
        })
        this.fieldVariables = { route: '', fee: '', vehicleNumber: '', driverName: '', driverNumber: '', driverSalary: '', vehicleType: '', vehicleColor: '', vehicleExpense: '' }
        this.state = {
            startSpinner: false, feeData: '', buttonText: '', isSuccess: false, isUpdate: false, isError: false, errorMessage: '', successMessage: ''
        }
    }
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            route: values.route,
            fee: values.fee,
            vehicleNumber: values.vehicleNumber,
            driverName: values.driverName,
            driverNumber: values.driverNumber,
            driverSalary: values.driverSalary,
            vehicleType: values.vehicleType.value,
            vehicleColor: values.vehicleColor,
            vehicleExpense: values.vehicleExpense
        }
        if (this.props.transportFeeId) {
            dataToSend.transportFeeId = this.props.transportFeeId;
        }

        let response = await this.props.authenticatedApiCall('post', "/api/accountantservice/createtransportfee", dataToSend)
        if (response.data.status === 1) {
            this.setState({ startSpinner: false, isSuccess: true, successMessage: response.data.statusDescription })
        } else {
            this.setState({ startSpinner: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    componentDidMount = async () => {
        if (this.props.transportFeeId) {
            let response = await this.props.authenticatedApiCall('get', '/api/accountantservice/gettetransportfee/' + this.props.transportFeeId, null)
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, feeData: response.data.statusDescription[0] })
            }
        }
    }

    handleCancel = () => {
        if (this.props.transportFeeId) {
            this.props.history.push('../managetransport')
        } else {
            this.props.history.push('./managetransport')
        }
        this.setState({ isSuccess: false, isError: false })
    }
    render() {
        const { classes } = this.props;
        const okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleCancel}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Schedule Tranport Fee`} pageTitle={"Create | Edit Tranport Fee"} />
                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.isUpdate && <TranportEditUI feeData={this.state.feeData} />}
                                {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                                <TransportFeeUI isUpdate={this.state.isUpdate} />
                                <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isError ? <ErrorDialog successButton={okbutton} HeaderText={this.state.errorMessage} dismiss={this.handleCancel} /> : " ")}
                {(this.state.isSuccess ? <SuccessDialog successButton={okbutton} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.handleCancel} /> : " ")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(TransportCreate))));