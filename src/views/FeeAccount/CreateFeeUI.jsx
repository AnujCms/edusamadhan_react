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
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }

})
class CreateFeeUI extends React.Component {
    constructor(props) {
        super(props);
        this.classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
        this.classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
    }

    render() {
        const { classes, isUpdate } = this.props;
        return (
            <>
                <Paper style={{ margin: "0px", height: "150px", width: "100%" }}>
                    <Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12} className={classes.formHeader}>
                                <Typography className={classes.center}>Schedule Fee</Typography>
                            </Grid>
                    </Grid>
                    <Grid container className={classes.questionContainer}>
                        <Grid item lg={5} md={5} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                            <Field
                                name="class"
                                options={this.props.currentUser.userDetails.accouttype == 1 ? this.classOptions0to5 : this.classOptions6to12}
                                placeholder={"Select class"}
                                className={classes.inputSelect + " " + "selectstyle"}
                                component={FormikSelect}
                                isDisabled={isUpdate}
                                isSearchable={false}
                                variant="filled"
                                isClearable={false}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="january"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="January Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="february"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="February Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="march"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="March Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="april"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="April Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="may"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="May Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="june"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="June Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="july"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="July Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="august"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="August Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="september"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="September Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="october"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="October Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="november"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="November Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom}>
                            <Field
                                name="december"
                                type="number"
                                className={classes.inputItem}
                                variant="filled"
                                label="December Fee"
                                component={FormikTextField}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount(connect(CreateFeeUI))));