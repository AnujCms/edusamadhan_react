import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateFacilityUI from './CreateFacilityUI';
import CreateFacilityEdit from './CreateFacilityEdit';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateFacility extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            faculityType: string().required("This feild is required."),
            facilityDetails: string().required("Details is required.").min(5, "Student Name can not be less than 5 characters.").max(100, "Student Name can not be greater than 2000 charecters."),
            file: string().required("Image is required.")
        });
        this.fieldVariables = { faculityType: '', facilityDetails: '', file: "", faculityId: '' }
        this.state = {
            startSpinner: false, isUpdate: false, updateFacilityData: '', aadharNumber: '', facilityCreationText: 'Create Facility'
        }
    }

    async componentDidMount() {
        let faculityId = this.props.faculityId;
        if (faculityId == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getFacilityDetailsById/' + faculityId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateFacilityData: response.data.statusDescription[0] })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', facilityCreationText: "Update Student Registration" })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let image;
        if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        let dataToSend = {
            faculityType: values.faculityType.value,
            facilityDetails: values.facilityDetails,
            images: image
        }

        if (values.faculityId) {
            dataToSend.faculityId = parseInt(this.props.faculityId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/managerservice/createFacilityDetails", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.faculityId) {
            this.props.history.push(`../facilities`)
        } else {
            this.props.history.push(`./facilities`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.faculityId) {
            this.props.history.push('../facilities')
        } else {
            this.props.history.push('./facilities')
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.facilityCreationText} pageTitle={"Create | Edit Facility"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateFacilityUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} aadharNumber={this.state.aadharNumber} />
                            {this.state.isUpdate ? <CreateFacilityEdit data={this.state.updateFacilityData} /> : ""}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateFacility)));