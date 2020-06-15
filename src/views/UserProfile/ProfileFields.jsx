import React, { Component } from 'react';
import { withStyles, withWidth, Button, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import CustomImageInput from '../../components/FormikValidatedComponents/ImageInput';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    marginBottom:{marginBottom:"20px"},
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", marginLeft: "40px", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    changeBtn: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "180px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
})
class ProfileFields extends Component {
    state = {
        isError: false, errorMessage: '', isUpdate: true
    }

    componentDidMount = async () => {
        let path = '/api/teacherservice/getTeacherDetails'
        let response = await this.props.authenticatedApiCall('get', path, null)
        if (response.data.status === 1) {
            this.props.formik.setFieldValue("file", response.data.statusDescription.image, false);
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    }

    changePassword = () => {
        this.setState({ isUpdate: false })
        this.props.formik.setFieldValue("changePassword", true, false);
    }
    backDashboard = () => {
        this.props.history.push(`./studentlist`)
        this.setState({ isError: false })
    }
    render() {
        const { classes, t, width } = this.props
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Field
                            name="file"
                            component={CustomImageInput}
                            defaultsrc={process.env.PUBLIC_URL + "/images/" + this.props.theme.custom.profilePic}
                        />
                    </Grid>
                    {this.props.formik.values.changePassword ?
                        <>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.marginBottom}>
                                        <Field
                                            component={FormikTextField}
                                            label="Old Password"
                                            name="oldPassword"
                                            type="password"
                                            fullWidth
                                            variant="filled"
                                            className="selectstyle"
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.marginBottom}>
                                        <Field
                                            component={FormikTextField}
                                            label="New Password"
                                            name="newPassword"
                                            type="password"
                                            fullWidth
                                            variant="filled"
                                            className="selectstyle"
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.marginBottom}>
                                        <Field
                                            component={FormikTextField}
                                            label="Cnf Password"
                                            name="confNewPassword"
                                            type="password"
                                            fullWidth
                                            variant="filled"
                                            className="selectstyle"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid></> : ""}
                            </Grid>
                            <Grid container className={classes.GridContainer}>
                    <div style={{ display: "flex" }}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            {this.state.isUpdate ? <Button className={classes.changeBtn} onClick={this.changePassword}>Change Password </Button> : ""}
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button className={classes.OkButton} type="submit"> Update</Button>
                        </Grid>
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                    </div>
                </Grid>
            </div >
        )
    }
}
export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage(["Teacher", "ExamHead"])(connect(ProfileFields))));
