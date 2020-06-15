import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, Paper, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import SimpleCheckBox from '../../../components/FormikValidatedComponents/SimpleCheckBox';
import CustomImageInput from '../../../components/FormikValidatedComponents/ImageInput';
import FormikRadioGroup from '../../../components/FormikValidatedComponents/FormikRadioGroup';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = (theme) => ({
    textFieldSize: { padding: '6px' },
    marginBottom: { marginBottom: "35px" },
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    dateComponentAlign: { paddingTop: "10px" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class StudentCreatedUI extends React.Component {
    constructor(props) {
        super(props)
        this.religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
        this.categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
        this.localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];
        this.classMediumType = [{ value: 1, label: "Hindi" }, { value: 2, label: "English" }];
        this.state = {
            routeOptions: []
        }
    }
    handleCheckBox = () => {
        if (this.props.formik.values.botharesame) {
            this.props.formik.setFieldValue("localaddress", "", false);
        } else {
            this.props.formik.setFieldValue("localaddress", this.props.formik.values.parmanentaddress, false);
        }
    }
    componentDidMount = async () => {
        let url = '/api/studentfeeservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            let routeOptions = []
            response.data.statusDescription.map((item) => {
                let routeObj = { label: item.route, value: item.transportfeeid }
                routeOptions.push(routeObj)
            })
            this.setState({ routeOptions: routeOptions })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper>
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
                                    name="mothername"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="Mother Name"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="fathername"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="Father Name"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="cellnumber"
                                    type="number"
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} >
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1001' }}>
                                <Field
                                    name="religion"
                                    options={this.religionOptions}
                                    placeholder={"Select Religion"}
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
                                    name="category"
                                    options={this.categoryOptions}
                                    placeholder={"Select Category"}
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
                                    name="locality"
                                    options={this.localityOptions}
                                    placeholder={"Select Locality"}
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
                                    name="mediumType"
                                    options={this.classMediumType}
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="parmanentaddress"
                                    className={classes.inputItem}
                                    variant="filled"
                                    multiline
                                    rows={3}
                                    rowsMax={10}
                                    label="Parmanent Address"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <Field
                                    name="localaddress"
                                    className={classes.inputItem}
                                    variant="filled"
                                    multiline
                                    rows={3}
                                    rowsMax={10}
                                    label="Local Address"
                                    component={FormikTextField}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <FormLabel component="span" className="labelstyle">Paramanent Address and Local Address both are same.</FormLabel>
                                <Field
                                    name="botharesame"
                                    component={SimpleCheckBox}
                                    value="checkbox"
                                    onClick={this.handleCheckBox}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                                <FormLabel component="span" className="labelstyle">Click here to select Student Image</FormLabel>
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} >
                                <FormLabel component="span" className="labelstyle" style={{ marginRight: "20px" }}>Bus Service</FormLabel>

                                <Field
                                    component={FormikRadioGroup}
                                    name="busservice"
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
                            {(this.props.formik.values.busservice == 2) &&
                                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                    <Field
                                        name="route"
                                        options={this.state.routeOptions}
                                        placeholder={"Select Route"}
                                        className={classes.inputSelect + " " + "selectstyle"}
                                        component={FormikSelect}
                                        isSearchable={false}
                                        variant="filled"
                                        isClearable={false}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Grid>}
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(connect(StudentCreatedUI)));