import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import CreateRows from './CreateRows';
import { classOptions6to12, classOptions0to5, sectionOptions } from '../../../components/utilsFunctions';
import ClassSection from '../../../components/ClassSection';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(9),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    TypographyText: { textAlign: "center" },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "5px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "20px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, '&:hover': { color: "rgba(75, 123, 227, 1)" }, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class SettingArrangementHome extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            sectionId: string().required("This field is required"),
        });
        this.fieldVariables = { classId: "", sectionId: "" }
        this.state = {
            totalEmptySeats: '', isShowTable: false, studentsList: "", totalColumns: "", totalRows: "", totalSeats: "", successMessage: '', isSuccess: false, errorMessage: '', isError: false
        };
    }

    handleSettingArrangement = () => {
        this.props.history.push(`./settingarrangement`);
    }

    handleMixedStudents = () => {
        this.props.history.push(`./mixedstudents`);
    }

    handleCreateClassCapacity = () => {
        this.props.history.push('./createclass')
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    handleSubmit = async (values) => {
        let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getseatingarrangement/" + values.classId.value + "/" + values.sectionId.value, null)
        if (response.data.status == 1) {
            let data = response.data.statusDescription[0];
            let totalEmptySeats = data.totalSeats - JSON.parse(data.mixedStudentList).length
            this.setState({ isShowTable: true, studentsList: JSON.parse(data.mixedStudentList), totalColumns: data.totalColumns, totalRows: data.totalRows, totalSeats: data.totalSeats, totalEmptySeats: totalEmptySeats })
        } else {
            this.setState({ isShowTable: false, isError: true, errorMessage: response.data.statusDescription })
        }
    }
    handleCancel = () => {
        this.props.history.push('./studentlist')
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Seating Arrangement</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Seating Arrangement</Typography>
                    </Grid>
                    {this.props.currentUser.userDetails.role === 'ExamHead' && <><Grid item lg={2} md={2} sm={6} xs={6}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateClassCapacity} className={classes.primaryBtn}>Create Class</Button>
                        </div>
                    </Grid>
                        <Grid item lg={2} md={2} sm={6} xs={6}>
                            <div className={classes.cstmprotoBtnWrap}>
                                <Button onClick={this.handleMixedStudents} className={classes.primaryBtn}>Mixed Students</Button>
                            </div>
                        </Grid>
                        <Grid item lg={2} md={2} sm={6} xs={6}>
                            <div className={classes.cstmprotoBtnWrap}>
                                <Button onClick={this.handleSettingArrangement} className={classes.primaryBtn}>Setting Arrangement</Button>
                            </div>
                        </Grid></>}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                   <ClassSection />
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                    {this.state.isShowTable && <>
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.TypographyText}>
                            <Typography variant="h6">Total Seats: {this.state.totalSeats}</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <Typography variant="h6">Empty Seats: {this.state.totalEmptySeats}</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <CreateRows data={this.state.studentsList} totalColumns={this.state.totalColumns} totalRows={this.state.totalRows} totalSeats={this.state.totalSeats} />                        </Grid></>}
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(SettingArrangementHome)));