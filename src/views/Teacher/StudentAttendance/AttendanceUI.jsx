import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth } from '@material-ui/core';
import { connect, FieldArray } from 'formik';
import AttendanceFields from './AttendanceFields';
import { formatDate } from '../../../components/utilsFunctions';
import { handleAttendance } from '../../../components/utilsFunctions';

const styles = theme => ({
});

class AttendanceUI extends React.Component {
    constructor() {
        super()
        this.state = { date: '' }
    }
    componentDidMount = async () => {
        let date = formatDate(this.props.formik.values.attendanceDate)
        let response;
        if (this.props.currentUser.userDetails.role == 'Teacher') {
            response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getClassAttendanceOfDate/' + date, null);
        } else if (this.props.currentUser.userDetails.role == 'Principal') {
            response = await this.props.authenticatedApiCall('get', '/api/principalservice/getStaffAttendanceOfDate/' + date, null);
        }
        if (response.data.status === 1) {
            let attendanceArray = [];
            response.data.statusDescription.map((item, index) => {
                if (this.props.formik.values.studentAttendanceArray.length > index) {
                    if (index == 0) {
                        if (item.attendance == 4) {
                            this.props.formik.setFieldValue('isSundayOrHoliDay', "1", false)
                        } else if (item.attendance == 5) {
                            this.props.formik.setFieldValue('isSundayOrHoliDay', "2", false)
                        } else {
                            this.props.formik.setFieldValue('isSundayOrHoliDay', "", false)
                        }
                    }
                    let attendanceObj = {
                        studentname: this.props.formik.values.studentAttendanceArray[index].studentname,
                        studentId: this.props.formik.values.studentAttendanceArray[index].studentId,
                        images: this.props.formik.values.studentAttendanceArray[index].images,
                        attendance: handleAttendance(item.attendance),
                        reason: item.reason
                    }
                    attendanceArray.push(attendanceObj);
                }
            })
            this.props.formik.setFieldValue('isUpdate', true, false)
            this.props.formik.setFieldValue('backUpAttendance', attendanceArray, false)
            this.props.formik.setFieldValue('studentAttendanceArray', attendanceArray, false)
        } else {
            let emptyArray = [];
            this.props.formik.values.studentAttendanceArray.map((item, index) => {
                let emptyObj = {
                    studentId: item.studentId,
                    studentname: item.studentname,
                    images: item.images,
                    attendance: { value: 1, label: "Present" }
                }
                emptyArray.push(emptyObj)
            })
            this.props.formik.setFieldValue('backUpAttendance', emptyArray, false)
            this.props.formik.setFieldValue('studentAttendanceArray', emptyArray, false)
        }
    }

    render() {
        return (
            <>
                {
                    <FieldArray
                        name="studentAttendanceArray"
                        render={arrayHelpers => (
                            <>
                                {this.props.formik.values.studentAttendanceArray.length > 0 && this.props.formik.values.studentAttendanceArray.map((item, index) =>
                                    (
                                        <div key={'attendance' + index}>
                                            <AttendanceFields index={index} />
                                            <br></br>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    />
                }
            </>
        )
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(AttendanceUI))));