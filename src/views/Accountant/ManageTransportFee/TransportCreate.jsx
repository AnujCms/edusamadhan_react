import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Formik, Form, connect } from 'formik';
import { object, string, number } from 'yup';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import TransportFeeUI from './TransportFeeUI';
import TranportEditUI from './TransportEditUI';
import { Helmet } from "react-helmet";
import Spinner from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: { marginTop: theme.spacing.unit * 11, ...theme.mixins.gutters(), paddingTop: theme.spacing.unit * 1, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, padding: 0, marginTop: "5px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },

})

class TransportCreate extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            route: string().required("This field is required"),
            fee: number().required("This field is required").min(1, "Fee can not be less than one."),
            vehiclenumber: string().required("This field is required"),
            drivername: string().required("This field is required"),
            drivernumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            driversalary: number().required('This field is required.'),
            vehicletype: string().required("This field is required"),
            vehiclecolor:  string().required("This field is required"),
            vehicleexpense: number().required('This field is required.')
        })
        this.state = {
            startSpinner: false, feeData: '', buttonText: '', isSuccess: false, isUpdate: false, isError: false, errorMessage: '', successMessage: ''
        }
    }
    handleSubmit = async (values) =>{
        this.setState({startSpinner: true})
        let dataToSend = {
            route: values.route,
            fee: values.fee,
            vehiclenumber: values.vehiclenumber,
            drivername: values.drivername,
            drivernumber: values.drivernumber,
            driversalary: values.driversalary,
            vehicletype: values.vehicletype.value,
            vehiclecolor: values.vehiclecolor,
            vehicleexpense: values.vehicleexpense
        }
        let response = '';
        if(this.props.transportfeeid){
            response = await this.props.authenticatedApiCall('put', "/api/studentfeeservice/updatetransportfee/"+this.props.transportfeeid, dataToSend)
        }else{
            response = await this.props.authenticatedApiCall('post', "/api/studentfeeservice/createtransportfee", dataToSend)
        }
        if(response.data.status === 1){
            this.setState({startSpinner: false, isSuccess:true, successMessage: response.data.statusDescription})
        }else{
            this.setState({startSpinner: false, isError:true, errorMessage: response.data.statusDescription})
        }
    }
    componentDidMount = async () =>{
        if(this.props.transportfeeid){
            let response = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/gettetransportfee/'+ this.props.transportfeeid, null)
            if(response.data.status === 1){
                this.setState({isUpdate: true, feeData:response.data.statusDescription[0]})
            }
        }
    }

    handleClose = () =>{
        if(this.props.transportfeeid){
            this.props.history.push('../managetransport')
        }else{
            this.props.history.push('./managetransport')
        }
        this.setState({isSuccess:false, isError:false})
    }
    render(){
        const { classes } = this.props;
        var okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleClose}>Ok</Button>]
        return(
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Fee</title></Helmet>
                <Formik initialValues={{ route:'', fee:'', vehiclenumber:'', drivername:'', drivernumber:'', driversalary:'', vehicletype:'', vehiclecolor:'' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.isUpdate && <TranportEditUI feeData={this.state.feeData} />}
                                {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "60%", left: "45%", zIndex: '99999' }} />}
                                <TransportFeeUI isUpdate={this.state.isUpdate} />
                                <Paper className={classes.btnStyle}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                            <Button onClick={this.handleClose} className={classes.cancelBtn}>Cancel</Button>
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

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(connect(TransportCreate))));