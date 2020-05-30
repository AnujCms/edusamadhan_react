import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import FormikSelectWithCheckBox from "../../components/FormikValidatedComponents/SelectFieldWithCheckBox";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "330px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});
const eventOptions = [{ value: 1, label: "Sports" }, { value: 2, label: "Singing" }, { value: 3, label: "Dancing" }, { value: 4, label: "Essay Writing" }, { value: 5, label: "Drawing" }, { value: 6, label: "Speaking" }]
const sportsOptions = [{ value: 1, label: "Cricket" }, { value: 2, label: "Football" }, { value: 3, label: "Volleyball" }, { value: 4, label: "Badminton" }, { value: 5, label: "Race" }, { value: 6, label: "Long Jump" }, { value: 7, label: "Kabaddi" }, { value: 8, label: "Kho-Kho" }]
const singingOptions = [{ value: 1, label: "Single Singing" }, { value: 2, label: 'Group Singing' }]
const danceOptions = [{ value: 1, label: "Solo Dance" }, { value: 2, label: 'Group Dance' }]

class CreateEventsUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="eventname"
                            className={classes.inputItem}
                            variant="filled"
                            label="Event Name"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '9999' }}>
                        <Field
                            name="eventstartdate"
                            locale={this.dateLanguage}
                            className={classes.dateComponentAlign}
                            component={FormikDateField}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className={classes.inputSelect}
                            inputProps={{ style: "width=100%" }}
                            minDate={new Date()}
                            textFieldProps={{
                                variant: "filled", label: "Event Start Date", InputProps: {
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
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '9999' }}>
                        <Field
                            name="eventenddate"
                            locale={this.dateLanguage}
                            className={classes.dateComponentAlign}
                            component={FormikDateField}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className={classes.inputSelect}
                            inputProps={{ style: "width=100%" }}
                            minDate={new Date()}
                            textFieldProps={{
                                readOnly: true,
                                variant: "filled", label: "Event End Date", InputProps: {
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
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="eventdescription"
                            className={classes.inputItem}
                            variant="filled"
                            multiline
                            rows={3}
                            rowsMax={10}
                            label="Event Description"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="eventtype"
                            options={eventOptions}
                            placeholder={"Select Event Type"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    {this.props.formik.values.eventtype.value === 1 && <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="soprtnames"
                            component={FormikSelectWithCheckBox}
                            checkboxProps={{ color: "primary" }}
                            placeholder={"Select Sports Name"}
                            options={sportsOptions}
                            className="selectstyle"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>}
                    {this.props.formik.values.eventtype.value === 2 && <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="singingnames"
                            component={FormikSelectWithCheckBox}
                            checkboxProps={{ color: "primary" }}
                            placeholder={"Select Singing Option"}
                            options={singingOptions}
                            isClearable={false}
                            className="selectstyle"
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>}
                    {this.props.formik.values.eventtype.value === 3 && <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="dancenames"
                            component={FormikSelectWithCheckBox}
                            checkboxProps={{ color: "primary" }}
                            placeholder={"Select Dancing Option"}
                            options={danceOptions}
                            className="selectstyle"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>}
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(connect(CreateEventsUI)));