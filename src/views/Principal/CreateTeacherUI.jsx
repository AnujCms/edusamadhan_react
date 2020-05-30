import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import SimpleCheckBox from '../../components/FormikValidatedComponents/SimpleCheckBox';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CustomImageInput from '../../components/FormikValidatedComponents/ImageInput';
import FormikRadioGroup from '../../components/FormikValidatedComponents/FormikRadioGroup';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = (theme) => ({
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right", [theme.breakpoints.down('md')]: { marginBottom: "60px" } },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    textFieldSize: { padding: '6px' },
    marginBottom: { marginBottom: "35px" },
    marginBottomSelect: { marginBottom: "35px", marginTop: "10px" },
    marginBottomDob: { marginBottom: "35px", marginTop: "20px" },
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "510px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    dateComponentAlign: { paddingTop: "10px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },

});

class CreateTeacherUI extends React.Component {
    constructor(props) {
        super(props)
        this.qualificationOptions = [{ value: 1, label: "B.Sc" }, { value: 2, label: "M.Sc" }, { value: 3, label: "B.Tech" }, { value: 4, label: "M.Tech" }, { value: 5, label: "BA" }, { value: 6, label: "MA" }, { value: 7, label: "B.Com" }, { value: 8, label: "M.Com" }, { value: 9, label: "MBA" }, { value: 10, label: "P.hd" }, { value: 11, label: "LLB" }, { value: 12, label: "LLM" }, { value: 13, label: "BCA" }, { value: 14, label: "MCA" }];
        this.subjectOptions = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'Physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
    }
    handleCheckBox = () => {
        if (this.props.formik.values.botharesame) {
            this.props.formik.setFieldValue("localaddress", "", false);
        } else {
            this.props.formik.setFieldValue("localaddress", this.props.formik.values.parmanentaddress, false);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
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
                                name="emailid"
                                className={classes.inputItem}
                                variant="filled"
                                label="Email Id"
                                component={FormikTextField}
                                onChange={() => {
                                    this.asyncEmailidValidationDone = false;
                                }}
                                validate={async value => {
                                    function validateEmail(value) {
                                        var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                                        return email.test(value);
                                    }
                                    if (value && validateEmail(value)) {
                                        if (this.asyncEmailidValidationDone) {
                                            if (this.asyncEmailIdValidationMessage != "") {
                                                throw this.asyncEmailIdValidationMessage;
                                            }
                                        } else {
                                            if (value !== this.props.emailId) {
                                                this.asyncEmailidValidationDone = true;
                                                let response = await this.props.authenticatedApiCall(
                                                    "get",
                                                    "/api/teacherservice/getEmailId/" + value
                                                );
                                                this.asyncEmailIdValidationMessage = "";
                                                if (response.data.isEmailIdUsed) {
                                                    this.asyncEmailIdValidationMessage = "This Email Id is already used.";
                                                    throw "This Email Id is already used.";
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="cellnumber"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Cell Number"
                                component={FormikTextField}
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
                                className={classes.inputSelect + " " + "selectstyle"}
                                // inputProps={{ style: "width=100%" }}
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
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <FormLabel component="span" className="labelstyle" style={{ marginRight: "20px" }}>Gender</FormLabel>
                            <Field
                                component={FormikRadioGroup}
                                name="gender"
                            >
                                <FormControlLabel
                                    value="2"
                                    control={
                                        <Radio color="primary" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="1"
                                    control={
                                        <Radio color="primary" />}
                                    label="Female"
                                />
                            </Field>
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
                                    this.asyncAdharValidationDone = false;
                                }}
                                validate={async value => {
                                    if (value) {
                                        if (this.asyncAdharValidationDone) {
                                            if (this.asyncAdharValidationMessage != "") {
                                                throw this.asyncAdharValidationMessage;
                                            }
                                        } else {
                                            if (value !== this.props.adharNumber) {
                                                this.asyncAdharValidationDone = true;
                                                let response = await this.props.authenticatedApiCall("get", "/api/teacherservice/getAdharnumber/" + value);
                                                this.asyncAdharValidationMessage = "";
                                                if (response.data.isAdharNumberUsed) {
                                                    this.asyncAdharValidationMessage = "This AAdhar number is already used.";
                                                    throw "This AAdhar number is already used.";
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                            <Field
                                name="userrole"
                                options={this.props.userRoleOption}
                                placeholder={"Select User Role"}
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
                                name="qualification"
                                options={this.qualificationOptions}
                                placeholder={"Select Qualification"}
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
                                name="subject"
                                options={this.subjectOptions}
                                placeholder={"Specialization"}
                                className={classes.inputSelect + " " + "selectstyle"}
                                component={FormikSelect}
                                isSearchable={false}
                                variant="filled"
                                isClearable={false}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="parmanentaddress"
                                className={classes.inputItem}
                                multiline
                                rows={3}
                                rowsMax={10}
                                variant="filled"
                                label="Parmanent Address"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="localaddress"
                                className={classes.inputItem}
                                multiline
                                rows={3}
                                rowsMax={10}
                                variant="filled"
                                label="Local Address"
                                component={FormikTextField}
                            />
                        </Grid>
                        {this.props.formik.values.isUpdate && <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <FormLabel component="span" className="labelstyle">Paramanent Address and Local Address both are same.</FormLabel>
                            <Field
                                name="botharesame"
                                component={SimpleCheckBox}
                                value="checkbox"
                                onClick={this.handleCheckBox}
                            />
                        </Grid>}
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <FormLabel component="span" className="labelstyle">Click here to select User Image</FormLabel>
                            <Field
                                name="file"
                                fullWidth
                                placeholder={'User Image'}
                                variant="outlined"
                                style={{ borderRadius: "10px !important" }}
                                inputProps={{ className: classes.textFieldSize }}
                                component={CustomImageInput}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="salary"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Salary"
                                component={FormikTextField}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(connect(CreateTeacherUI)));