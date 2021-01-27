import React from 'react';
import { withStyles, Grid, InputAdornment } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikDateField from '../components/FormikValidatedComponents/DateField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputSelect: { width: "320px", [theme.breakpoints.down('sm')]: { width: "350px" } }
});

class SelectDate extends React.Component {
    render() {
        const { classes, fieldName, fieldLabel, minDate } = this.props;
        return (
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                <Field
                    name={fieldName}
                    locale={this.dateLanguage}
                    className={classes.dateComponentAlign}
                    component={FormikDateField}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className={classes.inputSelect + " " + "selectstyle"}
                    maxDate={new Date()}
                    minDate={new Date(minDate)}
                    textFieldProps={{
                        variant: "filled",
                        label: `${fieldLabel}`,
                        InputProps: {
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
        );
    }
}

export default withStyles(styles)(connect(SelectDate));