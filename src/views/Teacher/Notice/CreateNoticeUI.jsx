import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import FormHeading from '../../../components/FormHeading';
import SelectDate from '../../../CommonComponents/SelectDate';
import MultiLineText from '../../../CommonComponents/MultiLineText';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateNoticeUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Notice Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectDate fieldLabel={'Notice Date'} fieldName={'noticeDate'} />
                        <MultiLineText fieldLabel={'Type Your Nocie ...'} fieldName={'studentNotice'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateNoticeUI)));