import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { mediaTypeOption } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateMedisUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Media Details'} />
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select Meida Type'} fieldName={'mediaType'} selectOptions={mediaTypeOption} />
                        <TextField fieldLabel={'Media Title'} fieldName={'mediaTitle'} />
                        <UserImage fieldLabel={'Media Image'} fieldName={'file'} />
                        </Grid>
                    </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateMedisUI)));