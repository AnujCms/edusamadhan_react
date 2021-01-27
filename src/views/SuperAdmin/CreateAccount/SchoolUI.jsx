import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import RadioButton from '../../../CommonComponents/RadioButton';
import CellNumber from '../../../CommonComponents/CellNumber';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import MultiSelectCheckBox from '../../../CommonComponents/MultiSelectCheckBox';
import { examOptions, sessionOptions } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class SchoolUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'School Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'School Name'} fieldName={'schoolName'} />
                        <TextField fieldLabel={'Registration Number'} fieldName={'registration'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'phoneNumber'} />
                        <SelectWithLabel fieldLabel={'Select Session'} fieldName={'sessionoptions'} selectOptions={sessionOptions} />
                        <RadioButton labelText={'Config Type:'} fieldName={'configType'} fieldLabelOne={'Default'} fieldLabelTwo={'New Config'} />

                        {this.props.formik.values.configType === '2' && <>
                            <MultiSelectCheckBox fieldLabel={'Exam Type'} fieldName={'examOption'} selectOptions={examOptions} />
                            <RadioButton labelText={'Accountant'} fieldName={'feeAccount'} fieldLabelOne={'No'} fieldLabelTwo={'Yes'} />
                            <RadioButton labelText={'Entrance'} fieldName={'entranceExamination'} fieldLabelOne={'No'} fieldLabelTwo={'Yes'} />
                            <RadioButton labelText={'Entrance Type'} fieldName={'examinationType'} fieldLabelOne={'Offline'} fieldLabelTwo={'Online'} />
                        </>}
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={2} formHeadingText={'School Address Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <MultiLineText fieldLabel={'School Address'} fieldName={'schoolAddress'} />
                    </Grid>
                </Card>

            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(SchoolUI)));