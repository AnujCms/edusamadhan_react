import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Field, connect } from 'formik';
import SelectFieldWithCheckBox from '../components/FormikValidatedComponents/SelectFieldWithCheckBox';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputSelect: { width: "320px", [theme.breakpoints.down('sm')]: { width: "350px" } }
});

class MultiSelectCheckBox extends React.Component {
    render() {
        const { classes, fieldName, fieldLabel, selectOptions } = this.props;
        return (
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                <Field
                    name={fieldName}
                    component={SelectFieldWithCheckBox}
                    checkboxProps={{ color: "primary" }}
                    placeholder={fieldLabel}
                    options={selectOptions}
                    className={classes.inputSelect + " " + "selectstyle"}
                    isSearchable={false}
                    variant="filled"
                    isClearable={false}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(MultiSelectCheckBox));