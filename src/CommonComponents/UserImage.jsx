import React from 'react';
import { withStyles, Grid, FormLabel } from '@material-ui/core';
import { Field, connect } from 'formik';
import CustomImageInput from '../components/FormikValidatedComponents/ImageInput';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    textFieldSize: { padding: '6px' },
});

class UserImage extends React.Component {
    render() {
        const { classes, fieldName, fieldLabel } = this.props;
        return (
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                <FormLabel component="span" className="labelstyle">{fieldLabel}</FormLabel>
                <Field
                    name={fieldName}
                    fullWidth
                    placeholder={fieldLabel}
                    variant="outlined"
                    style={{ borderRadius: "10px !important" }}
                    inputProps={{ className: classes.textFieldSize }}
                    component={CustomImageInput}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(UserImage));