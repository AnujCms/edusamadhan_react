import React from 'react';
import { withStyles, Button, Card, Paper, CardActions, Typography, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import FormikSelectWithCheckBox from "../../components/FormikValidatedComponents/SelectFieldWithCheckBox";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = (theme) => ({
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right", marginBottom: '70px' },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    paddingBottom: { padding: "15px" },
    inputItem: { width: "100%" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
});
const userOptions = [{ value: 6, label: "Student" }]

class CreateNotificationUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper style={{ width: "100%" }}>
                <Card>
                    <Grid container className={classes.questionContainer}>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                            <Field
                                name="notificationuser"
                                options={userOptions}
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
                                textFieldProps={{
                                    variant: "filled", label: "Notification Created Date", InputProps: {
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
                                label="Notification Description"
                                component={FormikTextField}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(connect(CreateNotificationUI)));