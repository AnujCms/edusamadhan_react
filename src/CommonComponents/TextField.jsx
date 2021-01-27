import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../components/FormikValidatedComponents/TextField';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
});

class TextField extends React.Component {
    render() {
        const { classes, fieldName, fieldLabel } = this.props;
        return (
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                <Field
                    name={fieldName}
                    className={classes.inputItem}
                    variant="filled"
                    label={fieldLabel}
                    component={FormikTextField}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(TextField));