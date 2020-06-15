import React from 'react';
import { withStyles, withWidth, Grid } from '@material-ui/core';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import { Field, connect } from 'formik';

const styles = theme => ({
    GridContainerStyle: { marginTop: "10px" }
});
const ResultFields = (props) => {
    const { classes } = props;
    const handleGrade = (index, event) =>{
        let dataIndex = index.target.name.split('.')
        let gradeIndex = parseInt(dataIndex[1]);
        let obtainedMarks = parseInt(index.target.value)
        let TotalMarks = parseInt(props.formik.values.subjectResultArray[gradeIndex].theoryTotalMarks)
        let percentage = Math.round((obtainedMarks * 100) / TotalMarks);
        let grade = ""
        if(percentage>90){
            grade = "A1"
        }else if(percentage>80){
            grade = "A2"
        }else if(percentage>70){
            grade = "B1"
        }else if(percentage>60){
            grade = "B2"
        }else if(percentage>50){
            grade = "C1"
        }else if(percentage>40){
            grade = "C2"
        }else if(percentage>30){
            grade = "D"
        }else{
            grade = "E"
        }
        props.formik.setFieldValue(`subjectResultArray.${gradeIndex}.grade`, grade, false)
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
                        label="Theory Obtained Marks"
                        name={`subjectResultArray.${props.index}.theoryObtainMarks`}
                        onChange={(props,e) => { handleGrade(props, e) }}
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