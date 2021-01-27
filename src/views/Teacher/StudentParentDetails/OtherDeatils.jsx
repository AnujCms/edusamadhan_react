import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import { bloodGroupOption, subjectOptions } from '../../../components/utilsFunctions';
import SiblingsDetails from './SiblingsDetails';
import FormHeading from '../../../components/FormHeading';
import MoreInfo from '../../../components/MoreInfo';
import MultiSelectCheckBox from '../../../CommonComponents/MultiSelectCheckBox';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import RadioButton from '../../../CommonComponents/RadioButton';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class OtherDeatils extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={4} formHeadingText={'Other Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <RadioButton labelText={'Siblings'} fieldName={'siblings'} fieldLabelOne={'Yes'} fieldLabelTwo={'No'} />
                        {this.props.formik.values.siblings == 1 ? <>
                            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                <SiblingsDetails />
                            </Grid></> : <Grid item lg={12} md={12} sm={12} xs={12} />}
                        <RadioButton labelText={'Disability'} fieldName={'physicalDisability'} fieldLabelOne={'Yes'} fieldLabelTwo={'No'} />
                        {this.props.formik.values.physicalDisability == 1 ?
                            <Grid item lg={8} md={8} sm={12} xs={12} className={classes.paddingBottom}>
                                {/* <MoreInfo tooltipMessage={'If child has physical problem.'} /> */}
                                <Field
                                    name="physicalDisabilityDetails"
                                    className={classes.inputItem}
                                    variant="filled"
                                    label="Physical Disability Details"
                                    component={FormikTextField}
                                />
                            </Grid> : <Grid item lg={8} md={8} sm={12} xs={12}></Grid>}
                        <RadioButton labelText={'Treatment'} fieldName={'currentTreatment'} fieldLabelOne={'Yes'} fieldLabelTwo={'No'} />
                        {this.props.formik.values.currentTreatment == 1 ? <Grid item lg={8} md={8} sm={12} xs={12} className={classes.paddingBottom}>
                            {/* <MoreInfo tooltipMessage={'Any treatment is going on.'} /> */}
                            <Field
                                name="currentTreatmentDetails"
                                className={classes.inputItem}
                                variant="filled"
                                label="Current Treatment Details"
                                component={FormikTextField}
                            />
                        </Grid> : <Grid item lg={8} md={8} sm={12} xs={12}></Grid>}
                        <RadioButton labelText={'Staff Chield'} fieldName={'isStaffChild'} fieldLabelOne={'Yes'} fieldLabelTwo={'No'} />
                        <SelectWithLabel fieldLabel={'Select Blood Group'} fieldName={'studentBloodGroup'} selectOptions={bloodGroupOption} />
                        {/* <MoreInfo tooltipMessage={'Slect the subject in which student is weak.'} /> */}
                        <MultiSelectCheckBox fieldLabel={'Select Subject'} fieldName={'isWeekInSubject'} selectOptions={subjectOptions} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(OtherDeatils)));