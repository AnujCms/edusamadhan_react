import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Grid, Typography, InputAdornment, Radio, FormControlLabel } from '@material-ui/core';
import { Field, connect } from 'formik';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FormikDateField from '../../../components/FormikValidatedComponents/DateField';
import { formatDate } from '../../../components/utilsFunctions';
import FormikRadioGroup from '../../../components/FormikValidatedComponents/FormikRadioGroup';
import { handleAttendance } from '../../../components/utilsFunctions';

const styles = theme => ({
    GridContainerStyle: { margin: "25px", [theme.breakpoints.down('sm')]: { marginLeft: "0px" } },
    inputSelect: { width: "350px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    errorMessageText: { color: 'red', fontSize: '12px', marginTop: '10px' }
});

const AttendanceDate = (props) => {
    const { classes } = props;
    const handleDateChange = async (date) => {
        let Date = formatDate(date)
        let response;
        if (props.currentUser.userDetails.role == 'Teacher') {
            response = await props.authenticatedApiCall('get', '/api/teacherservice/getClassAttendanceOfDate/' + Date, null);
        } else if (props.currentUser.userDetails.role == 'Principal') {
            response = await props.authenticatedApiCall('get', '/api/principalservice/getStaffAttendanceOfDate/' + Date, null);
        }
        if (response.data.status === 1) {
            let attendanceArray = [];
            response.data.statusDescription.map((item, index) => {
                if (index == 0) {
                    if (item.attendance == 4) {
                        props.formik.setFieldValue('isSundayOrHoliDay', "1", false)
                    } else if (item.attendance == 5) {
                        props.formik.setFieldValue('isSundayOrHoliDay', "2", false)
                    }else{
                        props.formik.setFieldValue('isSundayOrHoliDay', "", false)
                    }
                }
                if (props.formik.values.studentAttendanceArray.length > index) {
                    let attendanceObj = {
                        studentname: props.formik.values.studentAttendanceArray[index].studentname,
                        studentId: props.formik.values.studentAttendanceArray[index].studentId,
                        images: props.formik.values.studentAttendanceArray[index].images,
                        attendance: handleAttendance(item.attendance),
                        reason: item.reason
                    }
                    attendanceArray.push(attendanceObj);
                }
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
                    attendance: { value: 1, label: "Present" }
                }
                emptyArray.push(emptyObj)
            })
            props.formik.setFieldValue('isUpdate', false, false)
            props.formik.setFieldValue('errorMessage', "Attendance not found for this Date.", false)
            props.formik.setFieldValue('backUpAttendance', emptyArray, false)
            props.formik.setFieldValue('studentAttendanceArray', emptyArray, false)
        }
    }
    const calculateData = async (object) => {
        let emptyArray = [];
        props.formik.values.studentAttendanceArray.map((item, index) => {
            let emptyObj = {
                studentId: item.studentId,
                studentname: item.studentname,
                images: item.images,
                attendance: object
            }
            emptyArray.push(emptyObj)
        });
        props.formik.setFieldValue('studentAttendanceArray', emptyArray, false)
    }
    const handleOtherHoliday = async (event) => {
        if (event.target.value == 1) {
            calculateData({ value: 4, label: "Sunday" })
        } else if (event.target.value == 2) {
            calculateData({ value: 5, label: "Holiday" })
        }
        props.formik.setFieldValue('isSundayOrHoliDay', event.target.value, false)
    }
    return (
        <>
            <Typography className={props.classes.errorMessageText}>{props.formik.values.errorMessage}</Typography>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
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
                <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                    <Field
                        component={FormikRadioGroup}
                        name={"isSundayOrHoliDay"}
                        onChange={handleOtherHoliday}
                    >
                        <FormControlLabel
                            value="1"
                            control={
                                <Radio color="primary" />}
                            label={"Is Sunday"}
                        />
                        <FormControlLabel
                            value="2"
                            control={
                                <Radio color="primary" />}
                            label={"Is Holiday"}
                        />
                    </Field>
                </Grid>
            </Grid>
        </>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(AttendanceDate))));