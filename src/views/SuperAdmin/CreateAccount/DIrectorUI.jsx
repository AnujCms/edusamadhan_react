import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import EmailId from '../../../CommonComponents/EmailId';
import SelectDate from '../../../CommonComponents/SelectDate';
import CellNumber from '../../../CommonComponents/CellNumber';
import AadharNumber from '../../../CommonComponents/AadharNumber';
import RadioButton from '../../../CommonComponents/RadioButton';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class DirectorUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={3} formHeadingText={'Director Profile'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'firstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'lastName'} />
                        <SelectDate fieldLabel={'Date Of Birth'} fieldName={'dob'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'cellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'aadharNumber'} />
                        <EmailId emailId={this.props.emailId} />
                        <RadioButton labelText={'Gender'} fieldName={'gender'} fieldLabelOne={'Male'} fieldLabelTwo={'Female'} />
                        <UserImage fieldLabel={'Director Image'} fieldName={'file'} />
                        <UserImage fieldLabel={'School Logo'} fieldName={'schoolLogo'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(DirectorUI)));