import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Grid, Typography } from '@material-ui/core';
import { Field, connect } from 'formik';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormikDateField from '../../../components/FormikValidatedComponents/DateField';
import { formatDate } from '../../../components/utilsFunctions';

const styles = theme => ({
    GridContainerStyle: { marginTop: "10px" },
    inputSelect: { width: "500px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    errorMessageText:{color:'red', fontSize:'12px', marginTop:'10px'}
});

const AttendanceDate = (props) => {
    const { classes } = props;
    const attendanceType = [{ value: 1, label: "Present" }, { value: 2, label: "Absent" }, { value: 3, label: "Leave" }]

    const setAttendance = (value) => {
        let attendance = '';
        attendanceType.map((item) => {
            if (item.value == value) {
                attendance = item;
            }
        })
        return attendance;
    }
    const handleDateChange = async (date) => {
        let Date = formatDate(date)
        let response = await props.authenticatedApiCall('get', '/api/teacherservice/getClassAttendanceOfDate/' + Date, null);
        if (response.data.status === 1) {
            let attendanceArray = [];
            response.data.statusDescription.map((item, index) => {
                let attendanceObj = {
                    studentname: props.formik.values.studentAttendanceArray[index].studentname,
                    studentId:props.formik.values.studentAttendanceArray[index].studentId,
                    images: props.formik.values.studentAttendanceArray[index].images,
                    attendance: setAttendance(item.attendance)
                }
                attendanceArray.push(attendanceObj);
            })
            props.formik.setFieldValue('errorMessage', "", false)
            props.formik.setFieldValue('backUpAttendance', attendanceArray, false)
            props.formik.setFieldValue('studentAttendanceArray', attendanceArray, false)
        } else {
            let emptyArray = [];
            props.formik.values.studentAttendanceArray.map((item, index) => {
                let emptyObj = {
                    studentId: item.studentId,
                    studentname: item.studentname,
                    images: item.images,
                    attendance: ""
                }
                emptyArray.push(emptyObj)
            })
            props.formik.setFieldValue('errorMessage', "Attendance not found for this Date.", false)
            props.formik.setFieldValue('backUpAttendance', emptyArray, false)
            props.formik.setFieldValue('studentAttendanceArray', emptyArray, false)
        }
    }
    return (
        <>
        <Typography className={props.classes.errorMessageText}>{props.formik.values.errorMessage}</Typography>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Field
                        name="attendanceDate"
                        component={FormikDateField}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className={classes.inputSelect}
                        inputProps={{ style: "width=100%" }}
                        maxDate={new Date()}
                        onChange={handleDateChange}
                        textFieldProps={{
                            variant: "filled", label: "Attendance Date", InputProps: {
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CalendarTodayIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(AttendanceDate))));