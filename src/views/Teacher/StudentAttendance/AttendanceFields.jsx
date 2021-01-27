import React from 'react';
import { withStyles, withWidth, Grid, Avatar, Paper } from '@material-ui/core';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import { Field, connect } from 'formik';
import AdminImage from '../../../assets/images/admin.png';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';

const styles = theme => ({
    paperStle:{padding:"15px"},
    GridContainerStyle: { marginTop: "10px" },
    avatar: { width: 60, height: 60 },
    inputItem: { width: "100%", marginLeft:"30px", [theme.breakpoints.down('sm')]: {width: "80%", marginLeft:"0px", margin:"10px"} },
    inputSelect: { width: "300px", [theme.breakpoints.down('sm')]: { width: "350" } }

});
const AttendanceFields = (props) => {
    const attendanceType = [{value:1, label:"Present"},{value:2, label:"Absent"},{value:3, label:"Leave"}]
    const { classes } = props;

    return (
        <Paper className={classes.paperStle}>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={1} md={1} sm={2} xs={2} style={{ marginLeft: "20px", display: 'flex' }}>
                    <Avatar alt="No Images" src={props.formik.values.studentAttendanceArray[props.index].images === null ? AdminImage : "data:image/jpeg;base64," + props.formik.values.studentAttendanceArray[props.index].images} className={props.classes.avatar} />
                </Grid>
                <Grid item lg={3} md={3} sm={9} xs={9}>
                    <Field
                        variant="filled"
                        label="Student Name"
                        name={`studentAttendanceArray.${props.index}.studentname`}
                        component={FormikTextField}
                        disabled
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12} >
                <Field
                        name={`studentAttendanceArray.${props.index}.attendance`}
                        options={attendanceType}
                        placeholder={"Select Exam Type"}
                        className={classes.inputSelect + " " + "selectstyle"}
                        component={FormikSelect}
                        isSearchable={false}
                        variant="filled"
                        isClearable={false}
                        // isDisabled = {props.formik.values.isSundayOrHoliDay == 1 || props.formik.values.isSundayOrHoliDay == 2}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                </Grid>
                {(props.formik.values.studentAttendanceArray[props.index].attendance.value == 2 || props.formik.values.studentAttendanceArray[props.index].attendance.value == 3) &&  <Grid item lg={4} md={4} sm={12} xs={12} >
                <Field
                        name={`studentAttendanceArray.${props.index}.reason`}
                        className={classes.inputItem}
                        variant="filled"
                        label="Reason"
                        component={FormikTextField}
                        />
                </Grid>}
            </Grid>
        </Paper>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(connect(AttendanceFields)))