import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Grid, Card } from '@material-ui/core';
import { connect } from 'formik';
import { classOptions6to12, classOptions0to5, classMediumType } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';

const styles = theme => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
})
class CreateFeeUI extends React.Component {

    render() {
        const { classes, isUpdate } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Fee Structure'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select class'} fieldName={'classId'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} />
                        <SelectWithLabel fieldLabel={'Select Medium Type'} fieldName={'mediumType'} selectOptions={classMediumType} />
                        <Grid item item lg={4} md={4} sm={12}></Grid>
                        <TextField fieldLabel={'January Fee'} fieldName={'january'} />
                        <TextField fieldLabel={'February Fee'} fieldName={'february'} />
                        <TextField fieldLabel={'March Fee'} fieldName={'march'} />
                        <TextField fieldLabel={'April Fee'} fieldName={'april'} />
                        <TextField fieldLabel={'May Fee'} fieldName={'may'} />
                        <TextField fieldLabel={'June Fee'} fieldName={'june'} />
                        <TextField fieldLabel={'July Fee'} fieldName={'july'} />
                        <TextField fieldLabel={'August Fee'} fieldName={'august'} />
                        <TextField fieldLabel={'September Fee'} fieldName={'september'} />
                        <TextField fieldLabel={'October Fee'} fieldName={'october'} />
                        <TextField fieldLabel={'November Fee'} fieldName={'november'} />
                        <TextField fieldLabel={'December Fee'} fieldName={'december'} />
                    </Grid>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(CreateFeeUI))));