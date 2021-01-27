import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../components/FormikValidatedComponents/TextField';
import AuthenticatedPage from "../views/AuthenticatedPage";

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
});

class AadharNumber extends React.Component {
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
                    onChange={() => {
                        this.asyncAdharValidationDone = false;
                    }}
                    validate={async value => {
                        if (value) {
                            if (this.asyncAdharValidationDone) {
                                if (this.asyncAdharValidationMessage != "") {
                                    throw this.asyncAdharValidationMessage;
                                }
                            } else {
                                if (value !== this.props.adharNumber) {
                                    this.asyncAdharValidationDone = true;
                                    let response = await this.props.authenticatedApiCall("get", "/api/teacherservice/getAdharnumber/" + value);
                                    this.asyncAdharValidationMessage = "";
                                    if (response.data.isAdharNumberUsed) {
                                        this.asyncAdharValidationMessage = "This AAdhar number is already used.";
                                        throw "This AAdhar number is already used.";
                                    }
                                }
                            }
                        }
                    }}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(AadharNumber)));