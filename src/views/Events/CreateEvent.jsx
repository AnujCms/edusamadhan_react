import React from 'react';
import { withStyles, Button, Paper, Typography, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import CreateEventsUI from './CreateEventsUI';
import EventsEditUI from './EventsEditUI';
import { formatDate } from '../../components/utilsFunctions';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important", paddingTop: "20px" },
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor }
});

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            eventname: string().required("Event Name is required.").max(100, "Enter less than 100 Characters."),
            eventstartdate: string().required("Event Start Date is required."),
            eventenddate: string().required("Event End Date is required"),
            eventdescription: string().required("Description is required.").max(500, ("Description can not be greater tna 500 Characters.")),
            eventtype: string().required("Event Type is required.")
        });
        this.state = {
            adharNumber: '', updateText: 'Create ', startSpinner: false, eventObject: '', isUpdate: '', isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: "Register"
        }
    }

    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.eventid) {
            this.props.history.push(`../eventslist`);
        } else {
            this.props.history.push(`./eventslist`);
        }
    }
    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dateToSend = {
            eventname: values.eventname,
            eventstartdate: formatDate(values.eventstartdate),
            eventenddate: formatDate(values.eventenddate),
            eventdescription: values.eventdescription
        }
        if (values.eventtype.value === 1) {
            let sportsArray = []
            values.soprtnames.map((item) => {
                sportsArray.push(item.value);
            })
            dateToSend.eventdetails = sportsArray
        } else if (values.eventtype.value === 2) {
            let singingArray = []
            values.singingnames.map((item) => {
                singingArray.push(item.value);
            })
            dateToSend.eventdetails = singingArray
        } else if (values.eventtype.value === 3) {
            let dancingArray = []
            values.dancenames.map((item) => {
                dancingArray.push(item.value);
            })
            dateToSend.eventdetails = dancingArray
        } else {
            dateToSend.eventdetails = []
        }
        dateToSend.eventtype = values.eventtype.value

        if (this.props.eventid) {
            dateToSend.eventid = parseInt(this.props.eventid);
        } 
        let response = await this.props.authenticatedApiCall('post', "/api/eventsservice/eventRegistration", dateToSend)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    componentDidMount = async () => {
        let eventid = this.props.eventid;
        if (eventid == undefined) {
            this.setState({ buttonText: 'Submit' })
        } else {
            this.setState({ updateText: 'Update ' })
            let response = await this.props.authenticatedApiCall('get', '/api/eventsservice/geteventbyid/' + eventid, null);
            if (response.data.status === 1) {
                this.setState({ eventObject: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
            this.setState({ buttonText: 'Update' })
        }
    }
    handleCancel = () => {
        if (this.props.eventid) {
            this.props.history.push('../eventslist')
        } else {
            this.props.history.push('./eventslist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Event</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ eventname: "", eventstartdate: "", eventenddate: "", eventdescription: "", eventtype: "", soprtnames: "", singingnames: "", dancenames: "" }}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>{this.state.updateText}Event/Program </Typography>
                            </Paper>
                            {this.state.isUpdate && <EventsEditUI eventObject={this.state.eventObject} />}
                            {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                            <CreateEventsUI buttonText={this.state.buttonText} startSpinner={this.state.startSpinner} adharNumber={this.state.adharNumber} />
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

export default withStyles(styles)(AuthenticatedPage("Principal")(CreateEvent));