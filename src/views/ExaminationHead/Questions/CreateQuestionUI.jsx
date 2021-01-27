import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { answerOptions, subjectOptions, classOptions0to5, classOptions6to12, optioneOptions } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiLineText from '../../../CommonComponents/MultiLineText';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateQuestionUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Question Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select Class'} fieldName={'classId'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} />
                        <SelectWithLabel fieldLabel={'Select Subject'} fieldName={'subjectId'} selectOptions={subjectOptions} />
                        <MultiLineText fieldLabel={'Write question here ...'} fieldName={'question'} />
                        <TextField fieldLabel={'Option A'} fieldName={'optiona'} />
                        <TextField fieldLabel={'Option B'} fieldName={'optionb'} />
                        <TextField fieldLabel={'Option C'} fieldName={'optionc'} />
                        <TextField fieldLabel={'Option D'} fieldName={'optiond'} />
                        <SelectWithLabel fieldLabel={'Option E'} fieldName={'optione'} selectOptions={optioneOptions} />
                        <SelectWithLabel fieldLabel={'Select Answer'} fieldName={'answer'} selectOptions={answerOptions} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateQuestionUI)));