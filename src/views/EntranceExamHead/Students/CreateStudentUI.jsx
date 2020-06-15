import React from 'react';
import { withStyles, Card, Grid, InputAdornment } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }

});
const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

class CreateStudentUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="firstname"
                            className={classes.inputItem}
                            variant="filled"
                            label="First Name"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="lastname"
                            className={classes.inputItem}
                            variant="filled"
                            label="Last Name"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="cellnumber"
                            className={classes.inputItem}
                            variant="filled"
                            label="Mobile Number"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="adharnumber"
                            className={classes.inputItem}
                            variant="filled"
                            type="number"
                            label="Adhar Number"
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
                                        if (value !== this.props.adharNumber) {
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
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
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
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="section"
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
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
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
                                            <CalendarToday />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("ExamHead")(connect(CreateStudentUI)));