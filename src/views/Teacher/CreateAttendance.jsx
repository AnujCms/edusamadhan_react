import React from 'react';
import { Button, Card, withStyles, Grid, Paper, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, Field } from 'formik';
import { object, string, number } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "330px" } },
    paddingBottom: { padding: "10px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } },
    root: { margin: theme.spacing.unit * 12, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: { width: "550px", textAlign: "right", marginRight: "25px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'", fontWeight: "bold", fontWeight: 900, [theme.breakpoints.down('sm')]: { width: "100px" } },
    inputItem: { width: "50%", [theme.breakpoints.down('md')]: { width: '100%' } },
    selectContainer: { width: 200 },
    cardRoot: { "overflow": "initial", textAlign: "center" },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right" },
    zIndex: { zIndex: '999', marginLeft: "326px", marginRight: "326px", [theme.breakpoints.down('md')]: { marginLeft: 0, marginRight: 0 } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },

});


var sub = '';
class ResultTable extends React.Component {
    constructor(props) {
        super(props)
        this.yupSchema = object().shape({
            selectedMonth: string().required("This field is required"),
            totalClasses: number().required("This field is required").min(1, "Total classes can not be less than 1"),
            presentClasses: number().required("This field is required").min(0, "Present classes can not be less than 0."),
        })
        this.monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]
        this.state = {
            startSpinner: false, subjects: [], subjectid: null, selectedMonth: null, presentClasses: '', otalClasses: '', createAttendanceMsg: '',
            createAttendance: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        }
    }

    handleMonth = value => {
        this.setState({ selectedMonth: value })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = async (values) => {
        if (parseInt(values.totalClasses) >= parseInt(values.presentClasses) && parseInt(values.totalClasses) < 30 && parseInt(values.presentClasses) < 30) {
            this.setState({ startSpinner: true })
            let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentAttendance" , {
                studentid:this.props.studentid,
                monthName: values.selectedMonth.value,
                totalClasses: values.totalClasses,
                presentClasses: values.presentClasses
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
            }
            else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
            }
        } else {
            this.setState({ errorMessage: 'Present classes can not be greater than total class', isError: true });
        }
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    handleCancel = () => {
        this.props.history.push('../studentlist')
    }
    handleClose = () => {
        this.setState({ isSuccess: false, isError: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Attendance</title></Helmet>
                <Formik initialValues={{ selectedMonth: '', totalClasses: '', presentClasses: '' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Create Attendance</Typography>
                                </Paper>
                                <Card className={classes.backgroundColor}>
                                    {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                                    <Grid container>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="selectedMonth"
                                                options={this.monthOptions}
                                                placeholder={"Select month"}
                                                className={classes.inputSelect + " " + "selectstyle"}
                                                component={FormikSelect}
                                                isSearchable={false}
                                                variant="filled"
                                                isClearable={false}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="totalClasses"
                                                className={classes.inputItem}
                                                variant="filled"
                                                type="number"
                                                label="Total Classes"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="presentClasses"
                                                className={classes.inputItem}
                                                variant="filled"
                                                type="number"
                                                label="Present Classes"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Paper className={classes.btnStyle}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                            <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                            <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );

    }
}


export default withStyles(styles)(AuthenticatedPage("Teacher")(ResultTable));