import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { eventOptions, sportsOptions, singingOptions, danceOptions } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectDate from '../../../CommonComponents/SelectDate';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiSelectCheckBox from '../../../CommonComponents/MultiSelectCheckBox';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateEventsUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Event Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'Event Name'} fieldName={'eventName'} />
                        <SelectDate fieldLabel={'Event Start Date'} fieldName={'eventStartdate'} />
                        <SelectDate fieldLabel={'Event End Date'} fieldName={'eventEnddate'} minDate={this.props.formik.values.eventStartdate} />
                        <MultiLineText fieldLabel={'Write Event Description here ...'} fieldName={'eventDescription'} />
                        <SelectWithLabel fieldLabel={'Select Event Type'} fieldName={'eventType'} selectOptions={eventOptions} />
                        {this.props.formik.values.eventType.value === 1 &&
                            <MultiSelectCheckBox fieldLabel={'Select Sport'} fieldName={'soprtnames'} selectOptions={sportsOptions} />}
                        {this.props.formik.values.eventType.value === 2 &&
                            <MultiSelectCheckBox fieldLabel={'Select Singing Option'} fieldName={'singingnames'} selectOptions={singingOptions} />}
                        {this.props.formik.values.eventType.value === 3 &&
                            <MultiSelectCheckBox fieldLabel={'Select Dancing Option'} fieldName={'dancenames'} selectOptions={danceOptions} />}
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateEventsUI)));