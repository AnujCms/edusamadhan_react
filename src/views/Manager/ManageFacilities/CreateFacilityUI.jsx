import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { facilityOption } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateFacilityUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'School Facilities Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                       <SelectWithLabel fieldLabel={'Select Facility'} fieldName={'faculityType'} selectOptions={facilityOption} />
                        <MultiLineText fieldLabel={'Facility Deatils ...'} fieldName={'facilityDetails'} />
                        <UserImage fieldLabel={'Facility Image'} fieldName={'file'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateFacilityUI)));