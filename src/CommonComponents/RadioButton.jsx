import React from 'react';
import { withStyles, Grid, FormControlLabel, Radio, Typography } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikRadioGroup from '../components/FormikValidatedComponents/FormikRadioGroup';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
});

class RadioButton extends React.Component {
    render() {
        const { classes, fieldName, fieldLabelOne, fieldLabelTwo, labelText } = this.props;
        return (
            <>
                <Grid item lg={1} md={1} sm={6} xs={6} className={classes.paddingBottom}>
                    <Typography>{labelText}</Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6} className={classes.paddingBottom}>
                    <Field
                        component={FormikRadioGroup}
                        name={fieldName}
                    >
                        <FormControlLabel
                            value="1"
                            control={
                                <Radio color="primary" />}
                            label={fieldLabelOne}
                        />
                        <FormControlLabel
                            value="2"
                            control={
                                <Radio color="primary" />}
                            label={fieldLabelTwo}
                        />
                    </Field>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(connect(RadioButton));