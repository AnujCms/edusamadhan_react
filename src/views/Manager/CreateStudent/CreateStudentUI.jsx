import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { classOptions6to12, classOptions0to5, sectionOptions, classMediumType } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectDate from '../../../CommonComponents/SelectDate';
import CellNumber from '../../../CommonComponents/CellNumber';
import AadharNumber from '../../../CommonComponents/AadharNumber';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateStudentUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Student Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select Class'} fieldName={'classId'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} />
                        <SelectWithLabel fieldLabel={'Select Section'} fieldName={'sectionId'} selectOptions={sectionOptions} />
                        <SelectWithLabel fieldLabel={'Select Medium Type'} fieldName={'mediumType'} selectOptions={classMediumType} />
                        <TextField fieldLabel={'First Name'} fieldName={'firstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'lastName'} />
                        <SelectDate fieldLabel={'Date Of Birth'} fieldName={'dob'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'cellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'aadharNumber'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateStudentUI)));