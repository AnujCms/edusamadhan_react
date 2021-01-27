import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import OtherDeatils from './OtherDeatils';
import ImageUI from './ImageUI';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import CellNumber from '../../../CommonComponents/CellNumber';
import AadharNumber from '../../../CommonComponents/AadharNumber';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateDetailsUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Mother Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'motherFirstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'motherLastName'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'motherCellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'motherAAdharNumber'} />
                        <TextField fieldLabel={'Occupation'} fieldName={'motherOccupation'} />
                        <TextField fieldLabel={'Qualification'} fieldName={'motherQualification'} />
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={2} formHeadingText={'Father Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'fatherFirstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'fatherLastName'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'fatherCellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'fatherAAdharNumber'} />
                        <TextField fieldLabel={'Occupation'} fieldName={'fatherOccupation'} />
                        <TextField fieldLabel={'Qualification'} fieldName={'fatherQualification'} />
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={3} formHeadingText={'Local Gaurdian Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'localGuardianFirstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'localGuardianLastName'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'localGuardianCellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'localGuardianAAdharNumber'} />
                        <TextField fieldLabel={'Occupation'} fieldName={'localGuardianOccupation'} />
                        <TextField fieldLabel={'Qualification'} fieldName={'localGuardianQualification'} />
                    </Grid>
                </Card>
                <OtherDeatils />
                <ImageUI />
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateDetailsUI)));