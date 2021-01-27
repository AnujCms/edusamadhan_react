import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { notificationUserOptions, notificationStudentOption } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectDate from '../../../CommonComponents/SelectDate';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateNotificationUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Notification Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select User'} fieldName={'notificationUser'} selectOptions={this.props.currentUser.userDetails.role === 'Teacher' ? notificationStudentOption : notificationUserOptions} />
                        <SelectDate fieldLabel={'Notification Created Date'} fieldName={'notificationCreatedDate'} />
                        <TextField fieldLabel={'Notification Subject'} fieldName={'notificationSubject'} />
                        <MultiLineText fieldLabel={'Notification Description'} fieldName={'notificationDescription'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateNotificationUI)));