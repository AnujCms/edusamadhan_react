import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, Paper } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../../../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';
import { classOptions6to12, classOptions0to5, sectionOptions, classMediumType } from '../../../../components/utilsFunctions';

const styles = (theme) => ({
    textFieldSize: { padding: '6px' },
    marginBottom: { marginBottom: "35px" },
    paddingBottom: { padding: "15px", marginTop:"15px" },
    inputItem: { width: "100%" },
    dateComponentAlign: { paddingTop: "10px" },
    inputSelect: { width: "320px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateStudentUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper>
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="classId"
                                    options={classOptions6to12}
                                    placeholder={"Select Class"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="sectionId"
                                    options={sectionOptions}
                                    placeholder={"Select Section"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="mediumType"
                                    options={classMediumType}
                                    placeholder={"Select Medium Type"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="firstName"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="First Name"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="lastName"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="Last Name"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="cellNumber"
                                    type="number"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="Mobile Number"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="aadharNumber"
                                    className={classes.inputItem}
                                    variant="filled"
                                    type="number"
                                    label="AAdhar Number"
                                    component={FormikTextField}
                                    onChange={() => {
                                        this.asyncEmailidValidationDone = false;
                                    }}
                                    validate={async value => {
                                        if (value) {
                                            if (this.asyncEmailidValidationDone) {
                                                if (this.asyncEmailIdValidationMessage != "") {
                                                    throw this.asyncEmailIdValidationMessage;
                                                }
                                            } else {
                                                if (value !== this.props.aadharNumber) {
                                                    this.asyncEmailidValidationDone = true;
                                                    let response = await this.props.authenticatedApiCall("get", "/api/teacherservice/getAdharnumber/" + value);
                                                    this.asyncEmailIdValidationMessage = "";
                                                    if (response.data.isAdharNumberUsed) {
                                                        this.asyncEmailIdValidationMessage = "This AAdhar number is already used.";
                                                        throw "This AAdhar number is already used.";
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="dob"
                                    locale={this.dateLanguage}
                                    className={classes.dateComponentAlign}
                                    component={FormikDateField}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className={classes.inputSelect}
                                    inputProps={{ style: "width=100%" }}
                                    maxDate={new Date()}
                                    textFieldProps={{
                                        variant: "filled", label: "Date of Birth", InputProps: {
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
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(connect(CreateStudentUI));