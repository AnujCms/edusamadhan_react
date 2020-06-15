import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper, FormControlLabel, Radio, } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import { Field, connect } from 'formik';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import FormikRadioGroup from '../../../components/FormikValidatedComponents/FormikRadioGroup';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    container: { display: 'flex', flexWrap: 'wrap' },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
    pad0: { padding: 0 },
    paddingTop:{marginTop:"10px", color:"green"},
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});


class AttendanceUI extends React.Component {
    state = {
        attendanceArray: 1, periodObj: "", periodStartTime: "07:30", periodEndTime: "08:30", successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
    };

    handleChangeAttendance = (item, index, e) => {
        let attendanceArray = [...this.props.formik.values.attendanceArray];
        if (e.target.value == 1) {
            let attendanceObj = {
                studentId: item.userid,
                classid: item.classid,
                section: item.section
            }
            attendanceArray.push(attendanceObj);
            this.props.formik.setFieldValue('attendanceArray', attendanceArray, false)
        }
    }
    handelSubmit = async () => {
        let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/savedailyattendance', this.props.formik.values.attendanceArray);
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription })
        } else {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    handleClose = () => {
        this.props.history.push('./studentattendance')
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        var okbutton = [<Button className={this.props.classes.primaryBtn} onClick={this.handleClose}>Ok</Button>]
        return (
            <>
                {this.props.studentsList.map((item, index) =>
                    <>
                        <Field
                            component={FormikRadioGroup}
                            name="attendanceArra"
                            onClick={(e) => this.handleChangeAttendance(item, index, e)}
                        >
                            <GridContainer>
                                <GridItem lg={4} md={4} sm={4} xs={4} >
                                    <Typography className={classes.paddingTop}>{item.firstname}</Typography>
                                </GridItem>
                                <GridItem lg={4} md={4} sm={4} xs={4} >
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio color="secondary" />}
                                        label="P"
                                    />
                                </GridItem>
                                <GridItem lg={4} md={4} sm={4} xs={4}>
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio color="secondary" />}
                                        label="A"
                                    />
                                </GridItem>
                            </GridContainer>
                        </Field>

                        <br /></>)}
                <Paper className={classes.btnStyle}>
                    <Grid container>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                            <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                            <Button onClick={this.handelSubmit} disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                        </Grid>
                    </Grid>
                </Paper>
                {(this.state.isError ? <ErrorDialog successButton={okbutton} HeaderText={this.state.errorMessage} dismiss={this.handleClose} /> : " ")}
                {(this.state.isSuccess ? <SuccessDialog successButton={okbutton} HeaderText={"Success"} BodyText={this.state.successMessage} dismiss={this.handleClose} /> : " ")}
            </>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(connect(AttendanceUI))));