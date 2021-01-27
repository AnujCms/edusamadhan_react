import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Button, Card, CircularProgress } from '@material-ui/core';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import AttendanceSchema from './AttendanceSchema';
import AttendanceUI from './AttendanceUI';
import { formatDate } from '../../../components/utilsFunctions';
import AttendanceDate from './AttendanceDate';
import deepEqual from "deep-equal";
import queryString from 'query-string';
import FormHeader from '../../../components/FormHeader';
import FormHeading from '../../../components/FormHeading';
import FormFooter from '../../../components/FormFooter';

const styles = theme => ({
    root: { margin: theme.spacing(11), paddingBottom: theme.spacing(1), [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
})

class Attendance extends React.Component {
    constructor() {
        super()
        this.fieldVariables = { isUpdate: false, errorMessage: '', attendanceDate: new Date(), backUpAttendance: [], studentAttendanceArray: [], isSundayOrHoliDay: '' }
        this.yupSchema = AttendanceSchema();
        this.state = {
            isLoading: false, isRender: false, isSuccess: false, successMessage: "", isError: false, errorMessage: ""
        }
    }

    componentWillMount = async () => {
        let response;
        if (this.props.currentUser.userDetails.role == 'Teacher') {
            response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        } else if (this.props.currentUser.userDetails.role == 'Principal') {
            response = await this.props.authenticatedApiCall('get', '/api/principalservice/getStaffList', null);
        }
        // let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        if (response.data.status == 1) {
            let studentList = []
            response.data.statusDescription.map((item) => {
                let studentObject = {
                    studentId: item.userId,
                    studentname: item.firstName + " " + item.lastName,
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
        this.setState({ isLoading: true })
        let dataToSend = [];
        values.studentAttendanceArray.map((item) => {
            let attendanceObj = {
                studentId: item.studentId,
                teacherId: this.props.currentUser.userDetails.userId,
                attendance: item.attendance.value,
                attendanceDate: formatDate(values.attendanceDate)
            }
            if (item.attendance.value == 2 || item.attendance.value == 3) {
                attendanceObj.reason = item.reason
            }
            dataToSend.push(attendanceObj)
        })
        console.log('dataToSend attendance',dataToSend)
        if (values.isUpdate) {
            let updatedData = []
            values.studentAttendanceArray.map((item, index) => {
                if (!deepEqual(item, values.backUpAttendance[index])) {
                    let attendanceObj = {
                        studentId: item.studentId,
                        teacherId: this.props.currentUser.userDetails.userId,
                        attendance: item.attendance.value,
                        attendanceDate: formatDate(values.attendanceDate)
                    }
                    if (item.attendance.value == 2 || item.attendance.value == 3) {
                        attendanceObj.reason = item.reason
                    }
                    updatedData.push(attendanceObj)
                }
            })
            dataToSend = updatedData;
        }
        if (dataToSend.length > 0) {
            let response;
            if (this.props.currentUser.userDetails.role == 'Teacher') {
                response = await this.props.authenticatedApiCall('post', '/api/teacherservice/savestudentAttendance', { attendanceArray: dataToSend });
            } else if (this.props.currentUser.userDetails.role == 'Principal') {
                response = await this.props.authenticatedApiCall('post', '/api/principalservice/saveStaffAttendance', { attendanceArray: dataToSend });
            }
            if (response.data.status === 1) {
                this.setState({ isLoading: false, isSuccess: true, successMessage: response.data.statusDescription })
            } else {
                this.setState({ isLoading: false, isError: true, errorMessage: response.data.statusDescription })
            }
        } else {
            this.setState({ isError: true, errorMessage: "No changes found" })
        }
    }
    handleCancel = () => {
        if (this.props.currentUser.userDetails.role == 'Teacher') {
            this.props.history.push('./studentattendance')
        } else if (this.props.currentUser.userDetails.role == 'Principal') {
            this.props.history.push('./staffattendance')
        }
    }
    backDashboard = () => {
        let attendancePageName;
        if (this.props.currentUser.userDetails.role === 'Principal') {
            attendancePageName = 'staffattendance'
        } else if (this.props.currentUser.userDetails.role === 'Teacher') {
            attendancePageName = 'studentattendance'
        }
        let parsed = {}
        parsed.reloadTo = `${attendancePageName}`;
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
                <FormHeader headerText={"Create Attendance"} pageTitle={"Create | Edit Attendance"} />
                <FormHeading formHeadingNumber={1} formHeadingText={'You can record daily attendance here.'} />
                {this.state.isRender &&
                    <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                        {(formikProps) => (
                            <Form>
                                <Card className={classes.backgroundColor}>
                                    <AttendanceDate />
                                    <AttendanceUI props={this.props} />
                                </Card>
                                <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
                            </Form>
                        )}
                    </Formik>}
                {this.state.isLoading && <CircularProgress style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        )
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(Attendance))))