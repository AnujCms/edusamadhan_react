import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateParentDetailsUI from './CreateParentDetailsUI';
import CreateParentDetailsEdit from './CreateParentDetailsEdit';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';
import ParentYupSchema from './ParentYupSchema';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateDetails extends React.Component {
    constructor(props) {
        super(props);
        this.fieldVariables = {
            motherFirstName: '', motherLastName: '', motherCellNumber: '', motherAAdharNumber: '', motherOccupation: '', motherQualification: '',
            fatherFirstName: '', fatherLastName: '', fatherCellNumber: '', fatherAAdharNumber: '', fatherOccupation: '', fatherQualification: '',
            localGuardianFirstName: '', localGuardianLastName: '', localGuardianCellNumber: '', localGuardianAAdharNumber: '', localGuardianQualification: '', localGuardianOccupation: '',
            siblings: '1', siblingsArray: [{ siblingFirstName: '', siblingLastname: '', siblingClassId: '' }], physicalDisability: '1', physicalDisabilityDetails: '', currentTreatment: '1', currentTreatmentDetails: '',
            isStaffChild: '1', studentBloodGroup: '', isWeekInSubject: [], motherImage: null, fatherImage: null, localGuardianImage: null
        }
        this.state = {
            studentId: '', startSpinner: false, isUpdate: false, createParentText: 'Create Parent Details', parentDetailForUpdate: ''
        }
    }

    async componentDidMount() {
        if (this.props.history.location.state) {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getParentDetailOfStudent/' + parseInt(this.props.history.location.state.studentId) + '/' + this.props.history.location.state.parentDetailsId, null);
            if (response.data.status === 1) {
                this.setState({ studentId: this.props.history.location.state.studentId, parentDetailsId: this.props.history.location.state.parentDetailsId, isUpdate: true, parentDetailForUpdate: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ studentId: this.props.history.location.state.studentId, parentDetailsId: this.props.history.location.state.parentDetailsId, isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update ', createNoticeText: "Update Notice" })
        } else {
            this.setState({ buttonText: 'Create', studentId: this.props.match.params.userId })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            motherFirstName: values.motherFirstName,
            motherLastName: values.motherLastName,
            motherCellNumber: values.motherCellNumber,
            motherAAdharNumber: values.motherAAdharNumber,
            motherOccupation: values.motherOccupation,
            motherQualification: values.motherQualification,
            fatherFirstName: values.fatherFirstName,
            fatherLastName: values.fatherLastName,
            fatherCellNumber: values.fatherCellNumber,
            fatherAAdharNumber: values.fatherAAdharNumber,
            fatherOccupation: values.fatherOccupation,
            fatherQualification: values.fatherQualification,
            localGuardianFirstName: values.localGuardianFirstName,
            localGuardianLastName: values.localGuardianLastName,
            localGuardianCellNumber: values.localGuardianCellNumber,
            localGuardianAAdharNumber: values.localGuardianAAdharNumber,
            localGuardianQualification: values.localGuardianQualification,
            localGuardianOccupation: values.localGuardianOccupation,
            siblings: parseInt(values.siblings),
            siblingsDetails: values.siblingsArray,
            physicalDisability: parseInt(values.physicalDisability),
            physicalDisabilityDetails: values.physicalDisabilityDetails,
            currentTreatment: parseInt(values.currentTreatment),
            currentTreatmentDetails: values.currentTreatmentDetails,
            isStaffChild: parseInt(values.isStaffChild),
            studentBloodGroup: parseInt(values.studentBloodGroup.value),
            isWeekInSubject: values.isWeekInSubject,
            studentId: parseInt(this.state.studentId)
        }

        if (values.motherImage != null) {
            dataToSend.motherImage = values.motherImage.base64Rep
        }
        if (values.fatherImage != null) {
            dataToSend.fatherImage = values.fatherImage.base64Rep
        }
        if (values.localGuardianImage != null) {
            dataToSend.localGuardianImage = values.localGuardianImage.base64Rep
        }
        if (values.addressProof != null) {
            dataToSend.addressProof = values.addressProof.base64Rep
        }
        if (this.state.parentDetailsId) {
            dataToSend.parentDetailsId = parseInt(this.state.parentDetailsId)
        }

        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/createParentDetails", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.state.isUpdate) {
            this.props.history.push(`../../studentparentdetails/` + this.state.studentId)
        } else if (this.state.studentId) {
            this.props.history.push(`../studentparentdetails/` + this.state.studentId)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.history.location.state) {
            this.props.history.push('../../studentparentdetails/' + this.props.history.location.state.studentId)
        } else if (this.props.match.params.userId) {
            this.props.history.push('../studentparentdetails/' + this.props.match.params.userId)
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.createParentText} pageTitle={"Create | Edit Parent Details"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={ParentYupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateParentDetailsUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
                            {this.state.isUpdate && <CreateParentDetailsEdit parentData={this.state.parentDetailForUpdate} />}
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateDetails)));