import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Button, Paper } from '@material-ui/core';
import Card from "../../../components/Card/Card.jsx";
import Typography from '@material-ui/core/Typography';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import ResultSchema from './ResultSchema';
import ResultUI from './ResultUI';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";
import ExamType from './ExamType';

const styles = theme => ({
    root: { margin: theme.spacing.unit * 12, paddingBottom: theme.spacing.unit * 1, [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },

    mainCardTitle: { fontSize: "20px !important", fontWeight: 500, color: "#003244" },
    submitDiv: { display: "flex", position: "relative", padding: "10px", justifyContent: "flex-end", backgroundColor: "#fff", marginBottom:"40px" }
})
const examOptions = [{ value: 1, label: '3 Monthly' }, { value: 2, label: '6 Monthly' }, { value: 3, label: '9 Monthly' }, { value: 4, label: 'Yearly' }]
const subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
const subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]

class Result extends React.Component {
    constructor() {
        super()
        this.fieldVariables = { backUp:[],examinationType: '', subjectResultArray: [] }
        this.yupSchema = ResultSchema();
        this.state = {
            examinationType:"",isSuccess: false, successMessage:"", isError:false, errorMessage:""
        }
    }

    setSelectedSubjects6to12 = (data) => {
        let subjects = [];
        data.forEach(subjectObj => {
            subjectOptions6to12.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push({ subjectName: obj.label, theoryTotalMarks: "", theoryObtainMarks: "", practicalTotalMarks:"", practicalObtainMarks:"", grade: "" })
                }
            })
        })
        this.fieldVariables.backUp = subjects;
        this.fieldVariables.subjectResultArray = subjects;
    }
    setSelectedSubjects0to5 = (data) => {
        let subjects = [];
        data.forEach(subjectObj => {
            subjectOptions0to5.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push({ subjectName: obj.label, theoryTotalMarks: "", theoryObtainMarks: "", practicalTotalMarks:"", practicalObtainMarks:"", grade: "" })
                }
            })
        })
        this.fieldVariables.backUp = subjects;
        this.fieldVariables.subjectResultArray = subjects;
    }
    componentWillMount = async () => {
        let examinationArray = [];
        JSON.parse(this.props.currentUser.userDetails.configdata).examoption.map((item) => {
            examOptions.forEach(examObj => {
                if (item == examObj.value) {
                    examinationArray.push(examObj)
                }
            })
        })
        this.setState({examinationType:examinationArray})
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/assignsubjects', null);
        if (response.data.status == 1) {
            if (this.props.currentUser.userDetails.accouttype == 1) {
                this.setSelectedSubjects0to5(response.data.statusDescription)
            } else {
                this.setSelectedSubjects6to12(response.data.statusDescription)
            }
        } else if (response.data.status == 0) {
            // setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
  
    handleSubmit = async (values) => {
      let dataToSend = {
        studentid: this.props.studentid,
        examinationType: values.examinationType.value,
        subjectResultArray: values.subjectResultArray
      }
        let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/savestudentresult', dataToSend);
        if (response.data.status === 1) {
            this.setState({isSuccess:true, successMessage: response.data.statusDescription})
        } else {
            this.setState({isError:true, errorMessage: response.data.statusDescription})
        }
    }
    backToHome = () =>{
        this.props.history.push('../studentlist')
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        console.log('this.fieldVariables.subjectResultArray',this.fieldVariables.subjectResultArray)
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Result</title></Helmet>
                <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                    {(formikProps) => (
                        <Form>
                            <>
                                <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Create Result</Typography>
                                </Paper>
                                <ExamType examinationType={this.state.examinationType} studentid={this.props.studentid} />
                                <Card className={classes.backgroundColor}>
                                    <ResultUI props={this.props} />
                                </Card>
                            </>
                            <div className={classes.submitDiv}>
                                <Button className={classes.cancelBtn} onClick={this.backToHome}>Cancel</Button>
                                <Button type="submit" className={classes.createUser}>Submit</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        )
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(Result))))