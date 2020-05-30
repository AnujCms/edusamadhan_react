import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles, Button, Paper, Grid, Card, Typography } from '@material-ui/core';
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';

const styles = theme => ({
    inputItem: { width: "100%" },
    paddingBottom: { padding: "10px" },
    center: { textAlign: "center", margin: "15px", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    breakLine: { borderBottom: "1px solid rgba(213, 213, 213, 1)", marginBottom: "15px" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "340px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px", marginTop: "15px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }

})
class TranportFeeUI extends React.Component {
    constructor(props) {
        super(props);
        this.classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
        this.vehicleOptions = [{ value: 1, label: "Bus" }, { value: 2, label: "Van" }, { value: 3, label: "Car" }, { value: 4, label: "Auto" }]
    }

    render() {
        const { classes, isUpdate } = this.props;
        return (
            <>
                <Paper style={{ margin: "0px", height: "70px", width: "100%" }}>
                    <Grid container>
                        <Grid item lg={12} md={12} xs={12} sm={12} className={classes.formHeader}>
                            <Typography className={classes.center}>Schedule Tranport Fee</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="route"
                                className={classes.inputItem}
                                variant="filled"
                                label="Route (Path)"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="fee"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Vehicle Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="vehiclenumber"
                                className={classes.inputItem}
                                variant="filled"
                                label="Vehicle Number"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="drivername"
                                className={classes.inputItem}
                                variant="filled"
                                label="Driver Name"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="drivernumber"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Driver Number"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="driversalary"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Driver Salary"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                            <Field
                                name="vehicletype"
                                options={this.vehicleOptions}
                                placeholder={"Select Vehicle Type"}
                                className={classes.inputSelect + " " + "selectstyle"}
                                component={FormikSelect}
                                isSearchable={false}
                                variant="filled"
                                isClearable={false}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="vehiclecolor"
                                className={classes.inputItem}
                                variant="filled"
                                label="Vehicle Color"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="vehicleexpense"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="Vehicle Expense"
                                component={FormikTextField}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(connect(TranportFeeUI))));