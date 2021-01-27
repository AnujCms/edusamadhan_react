import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Grid } from '@material-ui/core';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Field, connect } from 'formik';

const styles = theme => ({
    GridContainerStyle: { margin: "25px" },
    inputSelect: { width: "300px", [theme.breakpoints.down('sm')]: { width: "300px" } }
});

const ExamType = (props) => {
    const { classes } = props;
    const handleExaminationChange = async (selectedExam) =>{
        let response = await props.authenticatedApiCall('get', '/api/teacherservice/getstudentresult/'+ props.studentId + "/"+ selectedExam.value, null);
        if (response.data.status === 1) {
            props.formik.setFieldValue(`subjectResultArray`, JSON.parse(response.data.statusDescription[0].subjectResultArray), false )
        } else {
            props.formik.setFieldValue(`subjectResultArray`, props.formik.values.backUp, false )
        }
    }
    return (
        <>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Field
                        name="examinationType"
                        options={props.examinationType}
                        placeholder={"Select Exam Type"}
                        className={classes.inputSelect + " " + "selectstyle"}
                        component={FormikSelect}
                        onChange={handleExaminationChange}
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

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(ExamType))));