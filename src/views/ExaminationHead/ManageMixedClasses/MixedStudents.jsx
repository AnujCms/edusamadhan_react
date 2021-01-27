import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Formik, Form } from 'formik';
import { string, number, object } from 'yup';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import ViewMixedClasses from './ViewMixedClasses';
import MixedStudentsUI from './MixedStudentsUI';
import queryString from 'query-string';
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
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class MixedStudents extends React.Component {
    constructor(props) {
        super(props);
        this.fieldVariables = {
            selectedClass: '', mixedOptions: '', mixedClassStudentId: ''
        }
        this.yupSchema = object().shape({
            selectedClass: string().required("This filed is required."),
            mixedOptions: string().required('This field is required.'),
            mixedClassStudentId: number()
        })
        this.state = { startSpinner: false, isError: false, errorMessage: '', isSuccess: false, successMessage: '' }
    }

    handleSubmit = async (values) => {
        if (values.selectedClass.length >= 2 && values.selectedClass.length < 4) {
            this.setState({ startSpinner: true })
            let classArray = []
            values.selectedClass.map((item) => {
                classArray.push(item.value)
            })
            let dataToSend = {
                classArray: classArray,
                mixedOptions: values.mixedOptions.value
            }
            if (values.mixedClassStudentId) {
                dataToSend.mixedClassStudentId = values.mixedClassStudentId
            }
            let response = await this.props.authenticatedApiCall('post', "/api/examinationservice/savemixedstudents", dataToSend);
            if (response.data.status === 1) {
                this.setState({ startSpinner: false, reRender: false, isSuccess: true, successMessage: response.data.statusDescription });
            } else {
                this.setState({ isError: true, errorMessage: response.data.statusDescription });
            }
        } else {
            this.setState({ isError: true, errorMessage: "You can mix min 2 and max 3 classes." });
        }
    }
    handleDialogClose = () => {
        let parsed = {}
        parsed.reloadTo = 'mixedstudents';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        this.props.history.push(`./settingplan`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.handleDialogClose}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={"Select Classes To Mix"} pageTitle={"Mixed Students"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            <MixedStudentsUI />
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                <ViewMixedClasses />
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.handleDialogClose} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.handleDialogClose} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(MixedStudents)));