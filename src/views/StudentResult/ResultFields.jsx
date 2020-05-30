import React from 'react';
import { withStyles, withWidth, Grid } from '@material-ui/core';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import { Field, connect } from 'formik';

const styles = theme => ({
    GridContainerStyle: { marginTop: "10px" }
});
const ResultFields = (props) => {
    const { classes } = props;
    const handleGrade = (index, event) =>{
        let dataIndex = index.target.name.split('.')
        let gradeIndex = parseInt(dataIndex[1]);
        let obtainedMarks = index.target.value
        let grade = ""
        if(obtainedMarks>90){
            grade = "A1"
        }else if(obtainedMarks>80){
            grade = "A2"
        }else if(obtainedMarks>80){
            grade = "B1"
        }else if(obtainedMarks>70){
            grade = "B2"
        }else if(obtainedMarks>60){
            grade = "C1"
        }else if(obtainedMarks>50){
            grade = "C2"
        }else if(obtainedMarks>40){
            grade = "D"
        }else{
            grade = "E"
        }
        props.formik.setFieldValue(`subjectResultArray.${gradeIndex}.grade`, grade, false)
    }
    return (
        <>
            <Grid container className={classes.GridContainerStyle} >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        label="Subject"
                        name={`subjectResultArray.${props.index}.subjectName`}
                        component={FormikTextField}
                        disabled
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        label="Total"
                        name={`subjectResultArray.${props.index}.totalMarks`}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Field
                        variant="filled"
                        type="number"
                        label="Obtained"
                        name={`subjectResultArray.${props.index}.obtainMarks`}
                        onChange={(props,e) => { handleGrade(props, e) }}
                        component={FormikTextField}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
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