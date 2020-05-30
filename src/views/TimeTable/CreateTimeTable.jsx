import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import { Formik, Form } from 'formik';
import TimeTableUI from './TimeTableUI';
import { object, string } from 'yup';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    paddingBottom: { padding: "10px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        this.fieldVariables = {
            class: '', section:'', dayName:'', periodName:'', subject:'', teacherName:''
        }
        this.state = {
            successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
        };
        this.yupSchema = object().shape({
            class: string().required("This field is required"),
            section: string().required("This field is required"),
            dayName: string().required("This field is required"),
            periodName: string().required("This field is required"),
            subject: string().required("This field is required"),
            teacherName: string().required("This field is required"),
        });
    }

    handleSubmit = async (values) =>{
        let dataToSend = {
            class:values.class.value,
            section: values.section.value,
            dayName: values.dayName.label,
            dayname: values.dayName.value,
            periodId: values.periodName.value,
            subjectName: values.subject.label,
            teacherName: values.teacherName.label
        }
        let response = await this.props.authenticatedApiCall('post', "/api/timetableservice/savetimetable", dataToSend);
        if(response.data.status === 1){
            this.setState({isSuccess:true, successMessage:response.data.statusDescription})
        }else{
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }

    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    backTimeTableDashboard = () => {
        this.setState({isSuccess:false})
        this.props.history.push(`./create-timetable`);
    }
    handleCancel = () =>{
        this.props.history.push(`./timetable`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backTimeTableDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Time Table </title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            <Paper className={classes.formHeader}>
                                <Typography className={classes.center}>Create Time Table</Typography>
                            </Paper>
                            <TimeTableUI />
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
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backTimeTableDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(TimeTable)));