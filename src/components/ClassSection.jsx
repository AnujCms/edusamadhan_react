import React from 'react';
import AuthenticatedPage from "../views/AuthenticatedPage";
import { withStyles, Grid, Button, Paper } from '@material-ui/core';
import FormikSelect from './FormikValidatedComponents/SelectFieldWithLabel';
import { Field, connect } from 'formik';
import { classOptions6to12, classOptions0to5, sectionOptions } from './utilsFunctions';
import { WithAccount } from '../views/AccountContext';
import WithDashboard from '../views/WithDashboard';

const styles = theme => ({
    inputSelect: { width: "450px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", '&:hover': { backgroundColor: '#fff', color: "rgba(75, 123, 227, 1)", border: "1px solid rgba(75, 123, 227, 1)" }, [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } }
});

class ClassSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <Grid container>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="classId"
                            options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12}
                            placeholder={"Select Class"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="sectionId"
                            options={sectionOptions}
                            placeholder={"Select Section"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                        <Button type="submit" className={classes.createUser}>Search</Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(connect(ClassSection)))));