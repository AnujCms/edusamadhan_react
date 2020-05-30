import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
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
const userOptions = [{ value: 6, label: "Student" }, { value: 3, label: "Faculty" }, { value: 4, label: "Exam Head" }, { value: 5, label: "Accountant" }, { value: 10, label: "All Users" }]
const userOptionsStudent = [{ value: 6, label: "Student" }]

class CreateNotificationUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            name="notificationuser"
                            options={this.props.currentUser.userDetails.role === 'Teacher' ? userOptionsStudent : userOptions}
                            placeholder={"Select User"}
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
                            name="notificationcreateddate"
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
                                variant: "filled", label: "Notification Created Date", InputProps: {
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
                        <Field
                            name="notificationsubject"
                            className={classes.inputItem}
                            variant="filled"
                            label="Notification Subject"
                            component={FormikTextField}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                        <Field
                            name="notificationdescription"
                            className={classes.inputItem}
                            variant="filled"
                            multiline
                            rows={3}
                            rowsMax={10}
                            label="Notification Description"
                            component={FormikTextField}
                        />
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(connect(CreateNotificationUI)));