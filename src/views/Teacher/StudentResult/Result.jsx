import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth, Button, Card } from '@material-ui/core';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import FormHeader from '../../../components/FormHeader';
import ResultSchema from './ResultSchema';
import ResultUI from './ResultUI';
import ExamType from './ExamType';
import FormFooter from '../../../components/FormFooter';
import { examOptions, subjectOptions6to12, subjectOptions0to5 } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: { marginTop: theme.spacing(11), maxWidth: "1200px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
})

class Result extends React.Component {
    constructor() {
        super()
        this.fieldVariables = { backUp: [], examinationType: '', subjectResultArray: [] }
        this.yupSchema = ResultSchema();
        this.state = {
            examinationType: "", isSuccess: false, successMessage: "", isError: false, errorMessage: ""
        }
    }

    setSelectedSubjects6to12 = (data) => {
        let subjects = [];
        data.forEach(subjectObj => {
            subjectOptions6to12.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push({ subjectName: obj.label, theoryTotalMarks: "", theoryObtainMarks: "", practicalTotalMarks: "", practicalObtainMarks: "", grade: "" })
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
                    subjects.push({ subjectName: obj.label, theoryTotalMarks: "", theoryObtainMarks: "", practicalTotalMarks: "", practicalObtainMarks: "", grade: "" })
                }
            })
        })
        this.fieldVariables.backUp = subjects;
        this.fieldVariables.subjectResultArray = subjects;
    }
    componentWillMount = async () => {
        let examinationArray = [];
        JSON.parse(this.props.currentUser.userDetails.configData).examOption.map((item) => {
            examOptions.forEach(examObj => {
                if (item == examObj.value) {
                    examinationArray.push(examObj)
                }
            })
        })
        this.setState({ examinationType: examinationArray })
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
        if (values.subjectResultArray.length > 0) {
            let dataToSend = {
                studentId: this.props.studentId,
                examinationType: values.examinationType.value,
                subjectResultArray: values.subjectResultArray
            }
            let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/savestudentresult', dataToSend);
            if (response.data.status === 1) {
                this.setState({ isSuccess: true, successMessage: response.data.statusDescription })
            } else {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        } else {
            this.setState({ isError: true, errorMessage: "Not enough data to save." })
        }
    }
    handleCancel = () => {
        this.props.history.push('../studentlist')
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success";
        console.log('saate',this.state.examinationType)
        return (
            <div className={classes.root}>
                <FormHeader headerText={"Create Result"} pageTitle={"Create | Edit Result"} />
                <Formik initialValues={this.fieldVariables} validationSchema={this.yupSchema} onSubmit={this.handleSubmit}>
                    {(formikProps) => (
                        <Form>
                            <Card className={classes.backgroundColor}>
                                <ExamType examinationType={this.state.examinationType} studentId={this.props.studentId} />
                                <ResultUI props={this.props} />
                            </Card>
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
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