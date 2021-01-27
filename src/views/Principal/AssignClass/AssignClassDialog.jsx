import React from "react";
import AuthenticatedPage from "../../AuthenticatedPage";
import { Formik, Form, connect } from "formik";
import { withStyles, Grid, Dialog, Card, CircularProgress, Button } from "@material-ui/core";
import { string, object } from "yup";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import FormHeader from '../../../components/FormHeader';
import { classOptions6to12, classOptions0to5, sectionOptions } from '../../../components/utilsFunctions';
import FormFooter from '../../../components/FormFooter';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import FormHeading from '../../../components/FormHeading';

const styles = theme => ({
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    buttonProgress: { color: theme.palette.primary.main, position: 'absolute', right: '50%' },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "20px", padding: "20px" }
});

class AssignClassDialog extends React.Component {
    constructor() {
        super()
        this.yupSchema = object().shape({
            classId: string().required("This field is required."),
            sectionId: string().required("This field is required."),
        });
        this.fieldVariables = { classId: "", sectionId: "" }
        this.state = {
            startSpinner: false, selectedClass: null, selectedSection: null, sessionOptions: null, assignClassSuccess: false
        };
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true });
        let response = await this.props.authenticatedApiCall('post', "/api/principalservice/assignclasstofaculty", {
            selectedClass: values.classId.value,
            selectedSection: values.sectionId.value,
            teacherId: this.props.teacherId
        })
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };

    backDashboard = () => {
        this.props.history.push('./teacherlist');
        this.props.handleClose()
        this.setState({ isError: false, isSuccess: false })
    }

    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                scroll="body"
                open={true}
                onClose={this.props.close}
                style={{ overflow: "visible" }}
                aria-labelledby="form-dialog-title">
                <FormHeader headerText={"Assign Class to Teacher"} pageTitle={"Assign Class"} />
                <FormHeading formHeadingNumber={1} formHeadingText={'Once you will assign the class to Teacher, will become the Class teacher.'} />
                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                <Card className={classes.backgroundColor}>
                                    {this.state.startSpinner && <CircularProgress className={classes.buttonProgress} />}
                                    <Grid container className={classes.questionContainer}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <SelectWithLabel fieldLabel={'Select Class'} fieldName={'classId'} selectOptions={this.props.userType == 1 ? classOptions0to5 : classOptions6to12} />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <SelectWithLabel fieldLabel={'Select Section'} fieldName={'sectionId'} selectOptions={sectionOptions} />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <FormFooter handleCancel={this.props.handleClose} startSpinner={this.state.startSpinner} />
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </Dialog>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(connect(AssignClassDialog)));

