import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import CreateClassUI from './CreateClassUI';
import 'date-fns';
import { Formik, Form } from 'formik';
import { string, number, object } from 'yup';
import ClassSeatsView from './ClassSeatsView';
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
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.fieldVariables = {
            classId: '', sectionId: '', totalRows: '', totalColumns: '', totalSeats: '', classSeatId: null
        }
        this.state = { reRender: true, startSpinner: false }
        this.yupSchema = object().shape({
            classId: string().required("Class is required."),
            sectionId: string().required("Section is required."),
            totalRows: number().required("Total Rows is required."),
            totalColumns: number().required("Total Colunns is required."),
            totalSeats: number().required("Total Seats is required.")
        })
    }

    backDashboard = () => {
        this.setState({ reRender: true })
        this.setState({ isError: false, isSuccess: false })
    }
    backCreateClassHome = () => {
        this.setState({ isSuccess: false, reRender: true })
        this.props.history.push(`./createclass`);
    }

    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            classId: values.classId.value,
            sectionId: values.sectionId.value,
            totalRows: values.totalRows,
            totalColumns: values.totalColumns,
            totalSeats: values.totalSeats
        }
        if (values.classSeatId != null) {
            dataToSend.classSeatId = values.classSeatId
        }
        let response = await this.props.authenticatedApiCall('post', "/api/examinationservice/createclassseats", dataToSend);
        if (response.data.status === 1) {
            this.setState({ startSpinner: false, reRender: false, isSuccess: true, successMessage: response.data.statusDescription });
        } else {
            this.setState({ isError: true, successMessage: response.data.statusDescription });
        }
    }

    handleCancel = () => {
        this.setState({ reRender: true })
        this.props.history.push(`./settingplan`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backCreateClassHome}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={`Create Class Seats`} pageTitle={"Manage Class"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                            <CreateClassUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} />
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {this.state.reRender && <ClassSeatsView />}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backCreateClassHome} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(CreateClass)));