import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Grid, Button, Card, CircularProgress } from '@material-ui/core';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import ManageSubjectsUI from './ManageSubjectsUI';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import { classOptions6to12, classOptions0to5, subjectOptions6to12, subjectOptions0to5 } from '../../../components/utilsFunctions';
import MultiSelectCheckBox from '../../../CommonComponents/MultiSelectCheckBox';
import SelectWithFunction from '../../../CommonComponents/SelectWithFunction';
import FormHeading from '../../../components/FormHeading';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(22),
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center", padding: "20px" },
});
class ManageSubjects extends React.Component {
    constructor() {
        super()
        this.yupSchema = object().shape({
            selectedClass: string().required("This field is required."),
            selectedSubjects: string().required("This field is required."),
        });
        this.fieldVariables = { selectedClass: "", selectedSubjects: "" }
        this.state = {
            startSpinner: false, isUpdate: false, subjectsData: [], subjectOptions1: [], createSubject: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }

    //handle class
    handleClass = async (selectedClass) => {
        this.setState({ selectedClass: selectedClass.value, subjectOptions1: '', isUpdate: false, subjectsData: [] })
        let response = await this.props.authenticatedApiCall('get', "/api/principalservice/getsubjectsofselectedclass/" + selectedClass.value);
        if (response.data.status == 1) {
            this.setState({ isUpdate: true, subjectsData: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ isUpdate: true, errorMessage: response.data.statusDescription, subjectsData: [], isError: true })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let subjects = [];
        for (var i = 0; i < values.selectedSubjects.length; i++) {
            subjects.push(values.selectedSubjects[i].value)
        }
        let response = await this.props.authenticatedApiCall('post', "/api/principalservice/assignsubjectstoselectedclass", {
            subjectOptions: subjects,
            selectedClass: values.selectedClass.value
        })
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false, })
        }
    };

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false });
    }

    handleCancel = () => {
        this.props.history.push('./teacherlist')
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={"Assign Subjects To Class"} pageTitle={"Create | Edit Subjects"} />
                <FormHeading formHeadingNumber={1} formHeadingText={'Selected subjects will be display to the users.'} />
                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                                {(this.state.isUpdate) && <ManageSubjectsUI subjectsData={this.state.subjectsData} />}
                                <Card className={classes.backgroundColor}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <SelectWithFunction fieldLabel={'Select Class'} fieldName={'selectedClass'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} handleChangeOption={this.handleClass} />
                                        </Grid>
                                        <Grid item lg={5} md={5} sm={12} xs={12} style={{display:'flex'}}>
                                            <MultiSelectCheckBox fieldLabel={'Select Subject'} fieldName={'selectedSubjects'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? subjectOptions0to5 : subjectOptions6to12} />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount((ManageSubjects)))); 
