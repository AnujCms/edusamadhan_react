import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { achievementUserOption } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateAchievementUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Achievement Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select User'} fieldName={'classId'} selectOptions={achievementUserOption} />
                        <TextField fieldLabel={'Student Name'} fieldName={'studentName'} />
                        <TextField fieldLabel={'Percentage'} fieldName={'percentage'} />
                        <MultiLineText fieldLabel={'Student Message ...'} fieldName={'userMessage'} />
                        <UserImage fieldLabel={'User Image'} fieldName={'file'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateAchievementUI)));