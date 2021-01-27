import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../components/FormikValidatedComponents/TextField';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
});

class AddressField extends React.Component {
    render() {
        const { classes, fieldName, fieldLabel } = this.props;
        return (
            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                <Field
                    name={fieldName}
                    className={classes.inputItem}
                    multiline
                    rows={3}
                    rowsMax={10}
                    variant="filled"
                    label={fieldLabel}
                    component={FormikTextField}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(AddressField));