import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { Formik, Form, connect } from 'formik';
import { object, string, number } from 'yup';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import CreateFeeUI from './CreateFeeUI';
import EditFeeUI from './EditFeeUI';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = theme => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } }
})
class CreateFeeStructure extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            mediumType: string().required("This field is required"),
            january: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            february: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            march: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            april: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            may: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            june: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            july: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            august: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            september: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            october: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            november: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
            december: number().required("This field is required").min(1, "Fee can not be less than one.").typeError('This field will accept only number.'),
        })
        this.fieldVariables = { classId: '', mediumType: '', january: '', february: '', march: '', april: '', may: '', june: '', july: '', august: '', september: '', october: '', november: '', december: '' }
        this.state = {
            startSpinner: false, feeData: '', buttonText: '', isSuccess: false, isUpdate: false, isError: false, errorMessage: '', successMessage: ''
        }
    }
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            classId: values.classId.value,
            mediumType: values.mediumType.value,
            january: values.january,
            february: values.february,
            march: values.march,
            april: values.april,
            may: values.may,
            june: values.june,
            july: values.july,
            august: values.august,
            september: values.september,
            october: values.october,
            november: values.november,
            december: values.december
        }
        if (this.props.feeStructureId) {
            dataToSend.feeStructureId = this.props.feeStructureId;
        }
        let response = await this.props.authenticatedApiCall('post', "/api/accountantservice/createfeeforselectedclass", dataToSend)
        if (response.data.status == 1) {
            this.setState({ startSpinner: false, successMessage: response.data.statusDescription, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ startSpinner: false, errorMessage: response.data.statusDescription, isError: true })
        }
    }
    async componentDidMount() {
        let feeStructureId = this.props.match.params.feeStructureId || this.props.feeStructureId;
        let mediumType = this.props.match.params.mediumType || this.props.mediumType
        if (feeStructureId) {
            let response = await this.props.authenticatedApiCall('get', '/api/accountantservice/getfeedetailbyclass/' + feeStructureId + '/' + mediumType, null);
            if (response.data.status === 1) {
                this.setState({ feeData: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            this.setState({ isUpdate: false })
        }
    }

    handleClose = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.feeStructureId) {
            this.props.history.push(`../feedetails`)
        } else {
            this.props.history.push(`./feedetails`)
        }
    }
    render() {
        const { classes } = this.props;
        var okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleClose}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Schedule Monthly Fee`} pageTitle={"Create | Edit Monthly Fee"} />
                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.isUpdate && <EditFeeUI feeData={this.state.feeData} />}
                                {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                                <CreateFeeUI isUpdate={this.state.isUpdate} />
                                <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
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

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(CreateFeeStructure))));