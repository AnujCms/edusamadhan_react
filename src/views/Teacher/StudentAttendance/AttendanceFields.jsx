import React from 'react';
import { withStyles, withWidth, Grid, Avatar } from '@material-ui/core';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import { Field, connect } from 'formik';
import AdminImage from '../../../assets/images/admin.png';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';

const styles = theme => ({
    GridContainerStyle: { marginTop: "10px" },
    avatar: { width: 60, height: 60 },
    inputSelect: { width: "300px", [theme.breakpoints.down('sm')]: { width: "350" } }

});
const AttendanceFields = (props) => {
    const attendanceType = [{value:1, label:"Present"},{value:2, label:"Absent"},{value:3, label:"Leave"}]
    const { classes } = props;
  
    return (
        <>
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
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(connect(AttendanceFields)))