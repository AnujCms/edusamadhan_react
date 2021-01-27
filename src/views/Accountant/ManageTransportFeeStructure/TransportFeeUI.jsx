import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Grid, Card } from '@material-ui/core';
import { connect } from 'formik';
import { vehicleOptions } from '../../../components/utilsFunctions';
import TextField from '../../../CommonComponents/TextField';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import CellNumber from '../../../CommonComponents/CellNumber';
import FormHeading from '../../../components/FormHeading';

const styles = theme => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px", marginTop: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
})
class TranportFeeUI extends React.Component {
    render() {
        const { classes, isUpdate } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Transport Fee'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'Route (Path)'} fieldName={'route'} />
                        <TextField fieldLabel={'Transport Fee'} fieldName={'fee'} />
                        <TextField fieldLabel={'Vehicle Number'} fieldName={'vehicleNumber'} />
                        <TextField fieldLabel={'Driver Name'} fieldName={'driverName'} />
                        <CellNumber fieldLabel={'Driver Number'} fieldName={'driverNumber'} />
                        <TextField fieldLabel={'Driver Salary'} fieldName={'driverSalary'} />
                        <SelectWithLabel fieldLabel={'Select Vehicle Type'} fieldName={'vehicleType'} selectOptions={vehicleOptions} />
                        <TextField fieldLabel={'Vehicle Color'} fieldName={'vehicleColor'} />
                        <TextField fieldLabel={'Vehicle Expense'} fieldName={'vehicleExpense'} />
                    </Grid>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(TranportFeeUI))));