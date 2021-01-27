import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import SettingArrangementUI from './SettingArrangementUI';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(11),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    container: { display: 'flex', flexWrap: 'wrap' },
    paddingBottom: { padding: "10px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class SettingArrangement extends React.Component {
    constructor(props) {
        super(props);
        this.fieldVariables = {
            class: '', section: '', totalRows: '', totalColumns: '', totalSeats: '', classSeatId: null, mixedType: ''
        }
        this.yupSchema = object().shape({
            class: string().required("Class is required."),
            section: string().required("Section is required."),
            mixedType: string().required("This field is required."),
            usedStudentsList: string().required("Student List is required."),
            unUsedStudentsList: string()
        })
        this.state = { startSpinner: false, isError: false, errorMessage: '', isSuccess: false, successMessage: '' }
    }

    handleCancel = () => {
        this.props.history.push(`./settingplan`);
    }
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            classId: values.class.value,
            section: values.section.value,
            mixedType: values.mixedType.value,
            totalColumns: values.totalColumns,
            totalRows: values.totalRows,
            totalSeats: values.totalSeats,
            usedStudentsList: values.usedStudentsList,
            unUsedStudentsList: values.unUsedStudentsList
        }
        let response = await this.props.authenticatedApiCall('post', "/api/examinationservice/saveseatingarrangement", dataToSend);
        if (response.data.status == 1) {
            this.setState({ startSpinner: false, isSuccess: true, successMessage: response.data.statusDescription })
        } else {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    handleDialogClose = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.handleDialogClose}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={"Setting Arrangement"} pageTitle={"Setting Arrangement"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            <SettingArrangementUI />
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.handleDialogClose} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleDialogClose} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(SettingArrangement)));