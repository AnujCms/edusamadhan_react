import React from 'react';
import { withStyles, Button, Paper, Typography, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import CreateNotificationUI from './CreateNotificationUI';
import EditNotificationUI from './EditNotificationUI';
import { formatDate } from '../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important", paddingTop: "20px" },
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    btnStyle:{margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" }},
    formHeader:{margin: "0px", height: "70px", width: "100%", background:theme.palette.formcolor.backgroundHeader, color:theme.palette.formcolor.textColor}
});

class CreateNotification extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            notificationuser: string().required("Notification user is required."),
            notificationsubject: string().required("Notification Name is required.").max(100, "Enter less than 100 Characters."),
            notificationcreateddate: string().required("Notification created date is required."),
            notificationdescription: string().required("Description is required.").max(1000, ("Description can not be greater tna 1000 Characters.")),
        });
        this.state = {
            adharNumber: '', updateText: 'Create ', startSpinner: false, notificationObject: '', isUpdate: '', isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: "Register"
        }
    }

    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if(this.props.isEditNotification){
            this.props.history.push('./notificationslist')
        }else if(this.props.notificationid){
            this.props.history.push('../notificationslist')
        }else{
            this.props.history.push('./notificationslist')
        }
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dateToSend = {
            notificationuser: values.notificationuser.value,
            notificationsubject: values.notificationsubject,
            notificationcreateddate: formatDate(values.notificationcreateddate),
            notificationdescription: values.notificationdescription
        }
        if (this.props.notificationid ) {
            dateToSend.notificationid = this.props.notificationid;
        }
           let response = await this.props.authenticatedApiCall('post', "/api/notificationservice/notificationRegistration", dateToSend)
        
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    componentDidMount = async () => {
        let notificationid = this.props.notificationid;
        if (notificationid == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ updateText: 'Update ' })
            let response = await this.props.authenticatedApiCall('get', '/api/notificationservice/getnotificationtbyid/' + notificationid, null);
            if (response.data.status === 1) {
                this.setState({ notificationObject: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
            this.setState({ buttonText: 'Update' })
        }
    }
    handleCancel = () => {
        if(this.props.isEditNotification){
            this.props.history.push('./notificationslist')
        }else if(this.props.notificationid){
            this.props.history.push('../notificationslist')
        }else{
            this.props.history.push('./notificationslist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
            <Helmet> <title>Create | Edit Notification</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ notificationsubject: "", notificationcreateddate: "", notificationdescription: "", notificationuser: "" }}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>{this.state.updateText}Notification</Typography>
                            </Paper>
                            {this.state.isUpdate && <EditNotificationUI notificationObject={this.state.notificationObject} />}
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                            <CreateNotificationUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} />
                            <Paper className={classes.btnStyle}>
                                <Grid container>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                        <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                        <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>{this.state.buttonText}</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(CreateNotification));