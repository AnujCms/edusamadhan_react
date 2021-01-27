import React from 'react';
import { withStyles, withWidth, Grid } from '@material-ui/core';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import { Field, connect } from 'formik';

const styles = theme => ({
    GridContainerStyle: { marginTop: "10px" }
});
const ResultFields = (props) => {
    const { classes } = props;
    const handleCalculateGrade = (totalObtainedMarks, totalMarks, gradeIndex) => {
        let percentage = Math.round((totalObtainedMarks * 100) / totalMarks);
        let grade = ""
        if (percentage > 90) {
            grade = "A1"
        } else if (percentage > 80) {
            grade = "A2"
        } else if (percentage > 70) {
            grade = "B1"
        } else if (percentage > 60) {
            grade = "B2"
        } else if (percentage > 50) {
            grade = "C1"
        } else if (percentage > 40) {
            grade = "C2"
        } else if (percentage > 30) {
            grade = "D"
        } else {
            grade = "E"
        }
        props.formik.setFieldValue(`subjectResultArray.${gradeIndex}.grade`, grade, false)
    }
    const handlePracticalMarksChange = (index, event) => {
        let dataIndex = index.target.name.split('.')
        let gradeIndex = parseInt(dataIndex[1]);
        if (props.formik.values.subjectResultArray[gradeIndex].theoryTotalMarks && props.formik.values.subjectResultArray[gradeIndex].theoryObtainMarks && props.formik.values.subjectResultArray[gradeIndex].practicalTotalMarks) {
            let totalMarks = parseInt(props.formik.values.subjectResultArray[gradeIndex].theoryTotalMarks) + parseInt(props.formik.values.subjectResultArray[gradeIndex].practicalTotalMarks)
            let totalObtainedMarks = parseInt(props.formik.values.subjectResultArray[gradeIndex].theoryObtainMarks) + parseInt(index.target.value)
            handleCalculateGrade(totalObtainedMarks, totalMarks, gradeIndex)
        }
    }
    const handleTheoryMarksChange = (index, event) => {
        let dataIndex = index.target.name.split('.')
        let gradeIndex = parseInt(dataIndex[1]);
        if (props.formik.values.subjectResultArray[gradeIndex].theoryTotalMarks && props.formik.values.subjectResultArray[gradeIndex].practicalObtainMarks && props.formik.values.subjectResultArray[gradeIndex].practicalTotalMarks) {
            let totalMarks = parseInt(props.formik.values.subjectResultArray[gradeIndex].theoryTotalMarks) + parseInt(props.formik.values.subjectResultArray[gradeIndex].practicalTotalMarks)
            let totalObtainedMarks = parseInt(props.formik.values.subjectResultArray[gradeIndex].practicalObtainMarks) + parseInt(index.target.value)
            handleCalculateGrade(totalObtainedMarks, totalMarks, gradeIndex)
        }
    }
    return (
        <>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        label="Subject"
                        name={`subjectResultArray.${props.index}.subjectName`}
                        component={FormikTextField}
                        disabled
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        label="Theory Total Marks"
                        name={`subjectResultArray.${props.index}.theoryTotalMarks`}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        onChange={(props, e) => { handleTheoryMarksChange(props, e) }}
                        label="Theory Obtained Marks"
                        name={`subjectResultArray.${props.index}.theoryObtainMarks`}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        label="Practical Total Marks"
                        name={`subjectResultArray.${props.index}.practicalTotalMarks`}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        label="Practical Obtained Marks"
                        onChange={(props, e) => { handlePracticalMarksChange(props, e) }}
                        name={`subjectResultArray.${props.index}.practicalObtainMarks`}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        label="Grade"
                        name={`subjectResultArray.${props.index}.grade`}
                        component={FormikTextField}
                        disabled
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(connect(ResultFields)))