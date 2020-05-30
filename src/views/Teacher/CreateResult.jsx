import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Button, Card, withStyles, Typography, Grid, Paper } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, Field, connect } from 'formik';
import { object, string, number } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: { margin: theme.spacing.unit * 12, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' } },
    selectContainer: { width: "100%" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: {
        width: "550px", textAlign: "right", marginRight: "25px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'", fontWeight: "bold", fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            width: "100px"
        }
    },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" },
    paddingBottom: { padding: "10px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, borderRadius: "50px", margin: "8px 23px", textAlign: "right", padding: "6px 17px", fontWeight: "400", lineHeight: "1.42857143", '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.hoverTextPrimaryColor } },
    selectContainer: { width: 200 },
    inputItem: { width: "50%", [theme.breakpoints.down('md')]: { width: '100%' } },
    cardRoot: { "overflow": "initial", textAlign: "center" },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right" },
    zIndex: { marginLeft: "326px", marginRight: "326px", [theme.breakpoints.down('md')]: { marginLeft: 0, marginRight: 0 } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },

});

class CreateResult extends React.Component {
    constructor(props) {
        super(props)
        this.subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
        this.subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]

        this.examOptions = [{ value: 1, label: '3 Monthly' }, { value: 2, label: '6 Monthly' }, { value: 3, label: '9 Monthly' }, { value: 4, label: 'Yearly' }]
        this.yupSchema = object().shape({
            examinationObject: string().required("This field is required"),
            subjectObject: string().required("This field is required"),
            totalMarks: number().required("This field is required").min(1, "Total Marks can not be less than 1."),
            obtainMarks: number().required("This field is required").min(0, "Obtain Marks can not be less than 0."),
        })
        this.state = {
            startSpinner: false, subjects: [], subjectid: null, examinationid: null, examinations: [], obtainMarks: '', totalMarks: '', isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        }
    }

    handleSubjects = async (selectedSubject) => {
        this.setState({ subjectid: selectedSubject })
    }
    handleExamination = async (selectedExamination) => {
        this.setState({ examinationid: selectedExamination })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    setSelectedSubjects6to12 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            this.subjectOptions6to12.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj)
                }
            })
        })
        this.setState({subjects:subjects})
    }
    setSelectedSubjects0to5 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            this.subjectOptions0to5.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj)
                }
            })
        })
        this.setState({subjects:subjects})
    }
    async componentDidMount() {
        let examinationArray = [];
        JSON.parse(this.props.currentUser.userDetails.configdata).examoption.map((item) => {
            this.examOptions.forEach(examObj => {
                if (item == examObj.value) {
                    examinationArray.push(examObj)
                }
            })
        })

        this.setState({ examinations: examinationArray })
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/assignsubjects', null);
        if (response.data.status == 1) {
            if(this.props.currentUser.userDetails.accouttype == 1){
                this.setSelectedSubjects0to5(response.data.statusDescription)
            }else{
                this.setSelectedSubjects6to12(response.data.statusDescription)
            }
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }

    handleSubmit = async (values) => {
        if (parseInt(values.totalMarks) >= parseInt(values.obtainMarks)) {
            this.setState({ startSpinner: true })
            let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentResult", {
                studentid:this.props.studentid,
                totalMarks: values.totalMarks,
                obtainMarks: values.obtainMarks,
                subjectid: values.subjectObject.value,
                examinationtype: values.examinationObject.value
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
            }
            else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false })
            }
        } else {
            this.setState({ errorMessage: 'Obtain marks can not be greater than total marks', isError: true });
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
    //9864076550
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Result</title></Helmet>
                <Formik initialValues={{ examinationObject: '', subjectObject: '', totalMarks: '', obtainMarks: '' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Create Result</Typography>
                                </Paper>
                                <Card className={classes.backgroundColor}>
                                    {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                                    <Grid container>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                            <Field
                                                name="examinationObject"
                                                options={this.state.examinations}
                                                placeholder={"Select Exam Type"}
                                                className={classes.inputSelect + " " + "selectstyle"}
                                                component={FormikSelect}
                                                isSearchable={false}
                                                variant="filled"
                                                isClearable={false}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                            <Field
                                                name="subjectObject"
                                                options={this.state.subjects}
                                                placeholder={"Select Subject"}
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
                                                name="totalMarks"
                                                className={classes.inputItem}
                                                variant="filled"
                                                type="number"
                                                label="Total Markss"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="obtainMarks"
                                                className={classes.inputItem}
                                                variant="filled"
                                                type="number"
                                                label="Obtain Marks"
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


export default withStyles(styles)(AuthenticatedPage("Teacher")(CreateResult));   
