import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Formik, Form, connect } from 'formik';
import { object, string, number } from 'yup';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import ExpenseUI from './ExpenseUI';
import ExpenseEditUI from './ExpenseEditUI';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import { formatDate } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } }
})

class ExpenseCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            expenseName: string().required("This field is required"),
            expenseAmount: number().required("This field is required"),
            expenseDate: string().required('This field is required.')
        })
        this.fieldVariables = { expense: '', expenseAmount: '', expenseDate: '' }
        this.state = {
            startSpinner: false, feeData: '', buttonText: '', isSuccess: false, isUpdate: false, isError: false, errorMessage: '', successMessage: ''
        }
    }
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            expenseName: values.expenseName,
            expenseAmount: values.expenseAmount,
            expenseDate: formatDate(values.expenseDate)
        }
        if (this.props.expenseId) {
            dataToSend.expenseId = parseInt(this.props.expenseId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/accountantservice/createexpense", dataToSend);
        if (response.data.status === 1) {
            this.setState({ startSpinner: false, isSuccess: true, successMessage: response.data.statusDescription })
        } else {
            this.setState({ startSpinner: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    componentDidMount = async () => {
        if (this.props.expenseId) {
            let response = await this.props.authenticatedApiCall('get', '/api/accountantservice/getentrance/' + this.props.expenseId, null)
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, feeData: response.data.statusDescription[0] })
            }
        }
    }
    handleCancel = () => {
        if (this.props.expenseId) {
            this.props.history.push('../manageexpense')
        } else {
            this.props.history.push('./manageexpense')
        }
    }
    handleClose = () => {
        if (this.props.expenseId) {
            this.props.history.push('../manageexpense')
        } else {
            this.props.history.push('./manageexpense')
        }
        this.setState({ isSuccess: false, isError: false })
    }

    render() {
        const { classes } = this.props;
        const okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleClose}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Create Daily Expense`} pageTitle={"Create | Edit Daily Expense"} />
                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.isUpdate && <ExpenseEditUI feeData={this.state.feeData} />}
                                {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                                <ExpenseUI isUpdate={this.state.isUpdate} />
                                <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isError ? <ErrorDialog successButton={okbutton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : " ")}
                {(this.state.isSuccess ? <SuccessDialog successButton={okbutton} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.handleClose} /> : " ")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(ExpenseCreate))));