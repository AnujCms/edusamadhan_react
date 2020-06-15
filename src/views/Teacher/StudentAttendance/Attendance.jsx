import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Button, Paper } from '@material-ui/core';
import Card from "../../../components/Card/Card.jsx";
import Typography from '@material-ui/core/Typography';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import AttendanceSchema from './AttendanceSchema';
import AttendanceUI from './AttendanceUI';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";
import { formatDate } from '../../../components/utilsFunctions';
import AttendanceDate from './AttendanceDate';
import deepEqual from "deep-equal";
import queryString from 'query-string';

const styles = theme => ({
    root: { margin: theme.spacing.unit * 12, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },

    mainCardTitle: { fontSize: "20px !important", fontWeight: 500, color: "#003244" },
    submitDiv: { display: "flex", position: "relative", padding: "10px", justifyContent: "flex-end", backgroundColor: "#fff", }
})

class Attendance extends React.Component {
    constructor() {
        super()
        this.fieldVariables = {isUpdate:false, errorMessage:'', attendanceDate: new Date(), backUpAttendance:[], studentAttendanceArray: [] }
        this.yupSchema = AttendanceSchema();
        this.state = {
            isRender: false, isSuccess: false, successMessage: "", isError: false, errorMessage: ""
        }
    }

    componentWillMount = async () => {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        if (response.data.status == 1) {
            let studentList = []
            response.data.statusDescription.map((item) => {
                let studentObject = {
                    studentId: item.userid,
                    studentname: item.firstname + " " + item.lastname,
                    images: item.images,
                    attendance: ""
                }
                studentList.push(studentObject);
            })
            this.fieldVariables.backUpAttendance = studentList;
            this.fieldVariables.studentAttendanceArray = studentList;
            this.setState({ isRender: true })
        }
    }

    handleSubmit = async (values) => {
        console.log('values',values)
        let dataToSend = [];
        values.studentAttendanceArray.map((item) => {
            let attendanceObj = {
                studentId: item.studentId,
                teacherId: this.props.currentUser.userDetails.userid,
                attendance: item.attendance.value,
                attendanceDate:formatDate(values.attendanceDate)
            }
            dataToSend.push(attendanceObj)
        })
        if(values.isUpdate){
            let updatedData = []
            values.studentAttendanceArray.map((item, index) => {
                if(!deepEqual(item, values.backUpAttendance[index])){
                    let attendanceObj = {
                        studentId: item.studentId,
                        teacherId: this.props.currentUser.userDetails.userid,
                        attendance: item.attendance.value,
                        attendanceDate:formatDate(values.attendanceDate)
                    }
                    updatedData.push(attendanceObj)
                }
            })
            dataToSend = updatedData;
        }
        if(dataToSend.length>0){
            let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/savestudentAttendance', {attendanceArray:dataToSend});
            if (response.data.status === 1) {
                this.setState({isSuccess:true, successMessage: response.data.statusDescription})
            } else {
                this.setState({isError:true, errorMessage: response.data.statusDescription})
            }
        }else{
            this.setState({isError:true, errorMessage:"No changes found"})
        }
    }
    backToHome = () => {
        this.props.history.push('./studentlist')
    }
    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'studentattendance';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Attendance</title></Helmet>
                {this.state.isRender && <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                    {(formikProps) => (
                        <Form>
                            <>
                                <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Create Attendance</Typography>
                                </Paper>
                                <AttendanceDate />
                                <Card className={classes.backgroundColor}>
                                    <AttendanceUI props={this.props} />
                                </Card>
                            </>
                            <div className={classes.submitDiv}>
                                <Button className={classes.cancelBtn} onClick={this.backToHome}>Cancel</Button>
                                <Button type="submit" className={classes.createUser}>Submit</Button>
                            </div>
                        </Form>
                    )}
                </Formik>}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        )
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(Attendance))))