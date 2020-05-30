import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles, Button, Paper, Grid, Typography } from '@material-ui/core';
import { Formik, Form, connect } from 'formik';
import { object, string, number } from 'yup';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import CreateFeeUI from './CreateFeeUI';
import EditFeeUI from './EditFeeUI';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: { marginTop: theme.spacing.unit * 11, ...theme.mixins.gutters(), paddingTop: theme.spacing.unit * 1, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, padding: 0, marginTop: "5px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

})
class CreateFeeStructure extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            class: string().required("This field is required"),
            january: number().required("This field is required").min(1, "Fee can not be less than one."),
            february: number().required("This field is required").min(1, "Fee can not be less than one."),
            march: number().required("This field is required").min(1, "Fee can not be less than one."),
            april: number().required("This field is required").min(1, "Fee can not be less than one."),
            may: number().required("This field is required").min(1, "Fee can not be less than one."),
            june: number().required("This field is required").min(1, "Fee can not be less than one."),
            july: number().required("This field is required").min(1, "Fee can not be less than one."),
            august: number().required("This field is required").min(1, "Fee can not be less than one."),
            september: number().required("This field is required").min(1, "Fee can not be less than one."),
            october: number().required("This field is required").min(1, "Fee can not be less than one."),
            november: number().required("This field is required").min(1, "Fee can not be less than one."),
            december: number().required("This field is required").min(1, "Fee can not be less than one."),
        })
        this.state = {
            startSpinner: false, feeData: '', buttonText: '', isSuccess: false, isUpdate: false, isError: false, errorMessage: '', successMessage: ''
        }
    }
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let dataToSend = {
            class: values.class.value,
            january: values.january,
            february: values.february,
            march: values.march,
            april: values.april,
            may: values.may,
            june: values.june,
            july: values.july,
            august: values.august,
            september: values.september,
            october: values.october,
            november: values.november,
            december: values.december
        }
        if (this.props.match.params.classs) {
            let response = await this.props.authenticatedApiCall('put', '/api/studentfeeservice/updatefeedetails', dataToSend)
            if (response.data.status == 1) {
                this.setState({ startSpinner: false, successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ startSpinner: false, errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            let response = await this.props.authenticatedApiCall('post', "/api/studentfeeservice/createfeeforselectedclass", dataToSend)
            if (response.data.status == 1) {
                this.setState({ startSpinner: false, successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ startSpinner: false, errorMessage: response.data.statusDescription, isError: true })
            }
        };
    }
    async componentDidMount() {
        let classs = this.props.match.params.classs || this.props.classid;
        if (classs) {
            let response = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getfeedetailbyclass/'+ classs, null);
            if (response.data.status === 1) {
                this.setState({ feeData: response.data.statusDescription[0], isUpdate: true })
            } else if (response.data.status === 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            this.setState({ isUpdate: false })
        }
    }
    handleCancel = () => {
        if (this.props.classid) {
            this.props.history.push('../feedetails')
        } else {
            this.props.history.push('./feedetails')
        }
    }
    handleClose = () => {
        this.setState({ isSuccess: false, isError: false })
        if (this.props.classid) {
            this.props.history.push(`../feedetails`)
        } else {
            this.props.history.push(`./feedetails`)
        }
    }
    render() {
        const { classes } = this.props;
        var okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleClose}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Fee</title></Helmet>
                <Formik initialValues={{ class: '', january: '', february: '', march: '', april: '', may: '', june: '', july: '', august: '', september: '', october: '', november: '', december: '' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {/* <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Schedule Fee</Typography>
                                </Paper> */}
                                {this.state.isUpdate && <EditFeeUI feeData={this.state.feeData} />}
                                {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                                <CreateFeeUI isUpdate={this.state.isUpdate} />
                                <Paper className={classes.btnStyle}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                            <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                            <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isError ? <ErrorDialog successButton={okbutton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : " ")}
                {(this.state.isSuccess ? <SuccessDialog successButton={okbutton} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.handleClose} /> : " ")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(connect(CreateFeeStructure))));