import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import {  connect } from 'formik';
import FormHeading from '../../../components/FormHeading';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", marginBottom: "20px" }
});

class ImageUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={5} formHeadingText={'Images Uploads'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <UserImage fieldLabel={'Mother Image (Optional)'} fieldName={'motherImage'} />
                        <UserImage fieldLabel={'Father Image (Optional)'} fieldName={'fatherImage'} />
                        <UserImage fieldLabel={'Guardian Image (Optional)'} fieldName={'localGuardianImage'} />
                        <UserImage fieldLabel={'Address Proof (Optional)'} fieldName={'addressProof'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(ImageUI)));