import React from 'react';
import { withStyles, CircularProgress, Button } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import CreateMediaUI from './CreateMediaUI';
import CreateMediaEdit from './CreateMediaEdit';
import { string, object } from 'yup';
import FormHeader from '../../../components/FormHeader';
import FormFooter from '../../../components/FormFooter';

const styles = (theme) => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateMedia extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            mediaType: string().required("This feild is required."),
            mediaTitle: string().required("Message is required.").min(3, "Student Name can not be less than 3 characters.").max(50, "Student Name can not be greater than 50 charecters."),
            file: string().required("Image is required.")
        });
        this.fieldVariables = {mediaType:'', mediaTitle:'', file: "", mediaId:''}
        this.state = {
            startSpinner: false, isUpdate: false, updateMediaData: '', mediaCreationText: 'Compose Message'
        }
    }
  
    async componentDidMount() {
        let mediaId = this.props.mediaId;
        if (mediaId == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getMediaDetailsById/' + mediaId, null);
            if (response.data.status === 1) {
                this.setState({ isUpdate: true, updateMediaData: response.data.statusDescription[0]})
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
            this.setState({ buttonText: 'Update Student', mediaCreationText: "Update Student Registration" })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let image ;
        if (values.file.base64Rep) {
            image = values.file.base64Rep
        }else{
            image = values.file
        }
        let dataToSend = {
            mediaType: values.mediaType.value,
            mediaTitle: values.mediaTitle,
            images: image
        }
        if (values.mediaId) {
            dataToSend.mediaId = parseInt(this.props.mediaId);
        }
        let response = await this.props.authenticatedApiCall('post', "/api/managerservice/createGalaryImage", dataToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };
    backDashboard = () => {
        if (this.props.mediaId) {
            this.props.history.push(`../medialist`)
        } else {
            this.props.history.push(`./medialist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        if (this.props.mediaId) {
            this.props.history.push('../medialist')
        } else {
            this.props.history.push('./medialist')
        }
    }
    render() {
        const { classes } = this.props;
        let OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={this.state.mediaCreationText} pageTitle={"Create | Edit Media"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                            <CreateMediaUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} />
                            {this.state.isUpdate ? <CreateMediaEdit data={this.state.updateMediaData} /> : ""}
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

export default withStyles(styles)(AuthenticatedPage()(connect(CreateMedia)));