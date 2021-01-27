import React from 'react';
import { withStyles, Grid, FormLabel } from '@material-ui/core';
import { Field, connect } from 'formik';
import SimpleCheckBox from '../components/FormikValidatedComponents/SimpleCheckBox';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" }
});

class CheckBox extends React.Component {
    handleCheckBox = () => {
        if (this.props.formik.values.botharesame) {
            this.props.formik.setFieldValue("localAddress", "", false);
        } else {
            this.props.formik.setFieldValue("localAddress", this.props.formik.values.parmanentAddress, false);
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                <Field
                    name="botharesame"
                    component={SimpleCheckBox}
                    value="checkbox"
                    onClick={this.handleCheckBox}
                />
                <FormLabel component="span" className="labelstyle">Paramanent Address and Local Address both are same.</FormLabel>
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(CheckBox));