import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }

});
const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const subjectOptions = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
const answerOptions = [{ value: 1, label: "Option A" }, { value: 2, label: "Option B" }, { value: 3, label: "Option C" }, { value: 4, label: "Option D" }, { value: 5, label: "Non of These" }];
const optioneOptions = [{ value: 5, label: "None of These" }]

class CreateQuestionUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="class"
                            options={classOptions}
                            placeholder={"Select Class"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="subject"
                            options={subjectOptions}
                            placeholder={"Select Subject"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="question"
                            className={classes.inputItem}
                            variant="filled"
                            multiline
                            rows={3}
                            rowsMax={10}
                            label="Write question here"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="optiona"
                            className={classes.inputItem}
                            variant="filled"
                            label="Option A"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="optionb"
                            className={classes.inputItem}
                            variant="filled"
                            label="Option B"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="optionc"
                            className={classes.inputItem}
                            variant="filled"
                            label="Option C"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="optiond"
                            className={classes.inputItem}
                            variant="filled"
                            label="Option D"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="optione"
                            options={optioneOptions}
                            placeholder={"Select Option E"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="answer"
                            options={answerOptions}
                            placeholder={"Select Answer"}
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
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("ExamHead")(connect(CreateQuestionUI)));