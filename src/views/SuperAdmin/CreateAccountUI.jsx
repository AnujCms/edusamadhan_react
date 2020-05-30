import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, Grid, Paper, FormLabel, InputAdornment, CardActions, Typography, FormControlLabel, Radio } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CustomImageInput from '../../components/FormikValidatedComponents/ImageInput';
import FormikRadioGroup from '../../components/FormikValidatedComponents/FormikRadioGroup';
import CheckBoxGroup from '../../components/FormikValidatedComponents/CheckBoxGroup';
import SimpleCheckBox from '../../components/FormikValidatedComponents/SimpleCheckBox';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    textFieldSize: { padding: '6px' },
    marginBottom: { marginBottom: "35px" },
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "330px" } },
    dateComponentAlign: { paddingTop: "10px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    center: { textAlign: "center", margin: "15px", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    breakLine: { borderBottom: "1px solid rgba(213, 213, 213, 1)", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }

});

class CreateAccountUI extends React.Component {
    constructor(props) {
        super(props)
        this.sessionOptions = [{ value: 1, label: '2019-20' }, { value: 2, label: '2020-21' }, { value: 3, label: '2021-22' }, { value: 4, label: '2022-23' }, { value: 5, label: '2023-24' }, { value: 6, label: '2024-25' }, { value: 7, label: '2025-26' }]
        this.examOptions = [{ value: '1', label: '3 Monthly' }, { value: '2', label: '6 Monthly' }, { value: '3', label: '9 Monthly' }, { value: '4', label: 'Yearly' }]

        this.religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
        this.categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
        this.localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];
    }
    handleCheckBox = () => {
        this.props.formik.setFieldValue("localaddress", this.props.formik.values.parmanentaddress, false);
    }
    render() {
        console.log(this.props.formik.errors)
        const { classes } = this.props;
        return (
            <>
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="schoolname"
                                className={classes.inputItem}
                                variant="filled"
                                label="School Name"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="registration"
                                className={classes.inputItem}
                                variant="filled"
                                label="Registration Number"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="schooladdress"
                                className={classes.inputItem}
                                multiline
                                rows={3}
                                rowsMax={10}
                                variant="filled"
                                label="School Address"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                            <Field
                                name="sessionoptions"
                                options={this.sessionOptions}
                                placeholder={"Select Session"}
                                className={classes.inputSelect + " " + "selectstyle"}
                                component={FormikSelect}
                                isSearchable={false}
                                variant="filled"
                                isClearable={false}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Grid>
                        <Grid item lg={2} md={2} sm={6} xs={6} className={classes.paddingBottom} style={{ paddingBottom: "30px" }}>
                            <Typography>Config Type :</Typography>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={6} className={classes.paddingBottom} style={{ textAlign: "left" }}>
                            <Field
                                component={FormikRadioGroup}
                                name="configType"
                            >
                                <FormControlLabel
                                    value="2"
                                    control={
                                        <Radio color="primary" />}
                                    label="New Config"
                                />
                                <FormControlLabel
                                    value="1"
                                    control={
                                        <Radio color="primary" />}
                                    label="Default"
                                />
                            </Field>
                        </Grid>
                        {this.props.formik.values.configType === '2' && <>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <FormLabel component="span" className={classes.lbltxt}>Exam Type </FormLabel>
                                <Field
                                    name="examoption"
                                    component={CheckBoxGroup}
                                >
                                    {this.examOptions.map((item, index) => {
                                        return (
                                            <Field
                                                component={SimpleCheckBox}
                                                name={item.value}
                                                label={item.label}
                                                key={index}
                                            />
                                        )
                                    }
                                    )}
                                </Field>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6} className={classes.paddingBottom} style={{ textAlign: "left" }}>
                                <Typography>Account Type :</Typography>
                                <Field
                                    component={FormikRadioGroup}
                                    name="accounttype"
                                >
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio color="primary" />}
                                        label="6th to 12th"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio color="primary" />}
                                        label="Up to 5th"
                                    />
                                </Field>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6} className={classes.paddingBottom} style={{ textAlign: "left" }}>
                                <Typography>Fee Account :</Typography>
                                <Field
                                    component={FormikRadioGroup}
                                    name="feeaccount"
                                >
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio color="primary" />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio color="primary" />}
                                        label="No"
                                    />
                                </Field>
                            </Grid>
                            {this.props.formik.values.accounttype == 2&&<Grid item lg={3} md={3} sm={6} xs={6} className={classes.paddingBottom} style={{ textAlign: "left" }}>
                                <Typography>Entrance Examination :</Typography>
                                <Field
                                    component={FormikRadioGroup}
                                    name="entranceexamination"
                                >
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio color="primary" />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio color="primary" />}
                                        label="No"
                                    />
                                </Field>
                            </Grid>}</>}
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.breakLine}></div>
                            <Typography variant="h6" style={{ padding: "0px 15px 15px 15px" }}>Principal Profile</Typography>
                            <div className={classes.breakLine}></div>
                        </Grid>
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
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="adharnumber"
                                className={classes.inputItem}
                                variant="filled"
                                type="number"
                                label="Adhar Number"
                                component={FormikTextField}
                                onChange={() => {
                                    this.asyncadharnumberValidationDone = false;
                                }}
                                validate={async value => {
                                    if (value) {
                                        if (this.asyncadharnumberValidationDone) {
                                            if (this.asyncEmailIdValidationMessage != "") {
                                                throw this.asyncEmailIdValidationMessage;
                                            }
                                        } else {
                                            if (value !== this.props.adharNumber) {
                                                this.asyncadharnumberValidationDone = true;
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
                        <Grid item lg={1} md={1} sm={6} xs={6} className={classes.paddingBottom} style={{ paddingBottom: "30px" }}>
                            <Typography>Gender</Typography>
                        </Grid>
                        <Grid item lg={5} md={5} sm={6} xs={6} className={classes.paddingBottom} style={{ textAlign: "left" }}>
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
                                                <CalendarTodayIcon />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <FormLabel component="span" className="labelstyle">Click here to select Principal Image</FormLabel>
                            <Field
                                name="file"
                                fullWidth
                                placeholder={'Student Image'}
                                variant="outlined"
                                style={{ borderRadius: "10px !important" }}
                                inputProps={{ className: classes.textFieldSize }}
                                component={CustomImageInput}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(connect(CreateAccountUI)));