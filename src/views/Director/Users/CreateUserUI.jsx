import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import { qualificationOptions, educationalAwards, subjectOptions, userOptions, workExperienceOptions } from '../../../components/utilsFunctions';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectDate  from '../../../CommonComponents/SelectDate';
import CellNumber from '../../../CommonComponents/CellNumber';
import AadharNumber from '../../../CommonComponents/AadharNumber';
import EmailId from '../../../CommonComponents/EmailId';
import RadioButton from '../../../CommonComponents/RadioButton';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import AddressField from '../../../CommonComponents/AddressField';
import CheckBox from '../../../CommonComponents/CheckBox';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    textFieldSize: { padding: '6px' },
    paddingBottom: { padding: "15px", marginTop: "15px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" }
});

class CreateTeacherUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Personal Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'firstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'lastName'} />
                        <SelectDate fieldLabel={'Date Of Birth'} fieldName={'dob'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'cellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'aadharNumber'} />
                        <EmailId emailId={this.props.emailId} />
                        <RadioButton labelText={'Gender'} fieldName={'gender'} fieldLabelOne={'Male'} fieldLabelTwo={'Female'} />
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={2} formHeadingText={'Qualification and Experience Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select User Role'} fieldName={'userrole'} selectOptions={userOptions} />
                        <SelectWithLabel fieldLabel={'Select Qualification'} fieldName={'qualification'} selectOptions={qualificationOptions} />
                        <SelectWithLabel fieldLabel={'Specialization'} fieldName={'subject'} selectOptions={subjectOptions} />
                        <SelectWithLabel fieldLabel={'Work Experience'} fieldName={'workExperience'} selectOptions={workExperienceOptions} />
                        <SelectWithLabel fieldLabel={'Educational Awards'} fieldName={'educationalAwards'} selectOptions={educationalAwards} />
                        {this.props.formik.values.educationalAwards.value == 1 && <TextField fieldLabel={'Award Details (Optional)'} fieldName={'awardDetails'} />}
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={3} formHeadingText={'Address Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <AddressField fieldLabel={'Parmanent Address'} fieldName={'parmanentAddress'} />
                        <AddressField fieldLabel={'Local Address'} fieldName={'localAddress'} />
                        {this.props.formik.values.isUpdate && <CheckBox />}
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={4} formHeadingText={'Other Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'Salary'} fieldName={'salary'} />
                        <RadioButton labelText={'User Type'} fieldName={'userType'} fieldLabelOne={'Up to 5th'} fieldLabelTwo={'6th to 12th'} />
                        <UserImage fieldLabel={'User Image'} fieldName={'file'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateTeacherUI)));