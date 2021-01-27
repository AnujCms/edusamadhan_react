import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../components/FormikValidatedComponents/TextField';
import AuthenticatedPage from "../views/AuthenticatedPage";

const styles = (theme) => ({
    paddingBottom: { padding: "15px", marginTop: "15px" },
    inputItem: { width: "100%" },
});

class EmailId extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                <Field
                    name="emailId"
                    className={classes.inputItem}
                    variant="filled"
                    label="Email Id"
                    component={FormikTextField}
                    onChange={() => {
                        this.asyncEmailidValidationDone = false;
                    }}
                    validate={async value => {
                        function validateEmail(value) {
                            var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            return email.test(value);
                        }
                        if (value && validateEmail(value)) {
                            if (this.asyncEmailidValidationDone) {
                                if (this.asyncEmailIdValidationMessage != "") {
                                    throw this.asyncEmailIdValidationMessage;
                                }
                            } else {
                                if (value !== this.props.emailId) {
                                    this.asyncEmailidValidationDone = true;
                                    let response = await this.props.authenticatedApiCall(
                                        "get",
                                        "/api/teacherservice/getEmailId/" + value
                                    );
                                    this.asyncEmailIdValidationMessage = "";
                                    if (response.data.isEmailIdUsed) {
                                        this.asyncEmailIdValidationMessage = "This Email Id is already used.";
                                        throw "This Email Id is already used.";
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

export default withStyles(styles)(AuthenticatedPage()(connect(EmailId)));