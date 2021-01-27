import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { withStyles, Grid, Card } from '@material-ui/core';
import { connect } from 'formik';
import TextField from '../../../CommonComponents/TextField';
import SelectDate from '../../../CommonComponents/SelectDate';
import FormHeading from '../../../components/FormHeading';

const styles = theme => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px", marginTop: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
})
class ExpenseUI extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Expence Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'Expense Name'} fieldName={'expenseName'} />
                        <TextField fieldLabel={'Expense Amount'} fieldName={'expenseAmount'} />
                        <SelectDate fieldLabel={'Expense Date'} fieldName={'expenseDate'} />
                    </Grid>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(ExpenseUI))));