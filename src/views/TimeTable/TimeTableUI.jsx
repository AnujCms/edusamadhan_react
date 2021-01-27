import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';
import { classOptions6to12, classOptions0to5, sectionOptions, weekDaysOptions, subjectOptions6to12, subjectOptions0to5 } from '../../components/utilsFunctions';
import FormHeading from '../../components/FormHeading';
import SelectWithFunction from '../../CommonComponents/SelectWithFunction';
import SelectWithLabel from '../../CommonComponents/SelectWithLabel';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class TimeTableUI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectsArray: [], teachersArray: [], periodArray: []
        }
    }
    handleCheckBox = () => {
        if (this.props.formik.values.botharesame) {
            this.props.formik.setFieldValue("localaddress", "", false);
        } else {
            this.props.formik.setFieldValue("localaddress", this.props.formik.values.parmanentaddress, false);
        }
    }
    componentDidMount = async () => {
        let response = await this.props.authenticatedApiCall('get', "/api/timetableservice/getperiodsdetails", null);
        if (response.data.status === 1) {
            let periodArray = []
            response.data.statusDescription.map((item) => {
                if (item.period1 !== null) {
                    periodArray.push({ label: "1st Period", value: 1 })
                }
                if (item.period2 !== null) {
                    periodArray.push({ label: "2nd Period", value: 2 })
                }
                if (item.period3 !== null) {
                    periodArray.push({ label: "3rd Period", value: 3 })
                }
                if (item.period4 !== null) {
                    periodArray.push({ label: "4th Period", value: 4 })
                }
                if (item.period5 !== null) {
                    periodArray.push({ label: "5th Period", value: 5 })
                }
                if (item.period6 !== null) {
                    periodArray.push({ label: "6th Period", value: 6 })
                }
                if (item.period7 !== null) {
                    periodArray.push({ label: "7th Period", value: 7 })
                }
                if (item.period8 !== null) {
                    periodArray.push({ label: "8th Period", value: 8 })
                }
                if (item.period9 !== null) {
                    periodArray.push({ label: "9th Period", value: 9 })
                }
                if (item.period10 !== null) {
                    periodArray.push({ label: "Lunch Time", value: 10 })
                }
            })
            this.setState({ periodArray: periodArray })
        }
    }
    createSubjectObject = (subjectArray) => {
        let subjetcs = []
        if (this.props.currentUser.userDetails.userType == 1) {
            subjectArray.map((data) => {
                subjectOptions0to5.map((item) => {
                    if (item.value === data) {
                        subjetcs.push(item)
                    }
                })
            })
        } else {
            subjectArray.map((data) => {
                subjectOptions6to12.map((item) => {
                    if (item.value === data) {
                        subjetcs.push(item)
                    }
                })
            })
        }
        let lunchSubject = { value: 10, label: "Lunch Time" }
        subjetcs.push(lunchSubject)
        return subjetcs;
    }

    createTeachersObject = (teachersArray) => {
        let teachers = []
        teachersArray.map((data) => {
            teachers.push({ value: data.userId, label: data.firstName + " " + data.lastName })
        })
        return teachers;
    }
    handleClassChange = async (event) => {
        this.setState({ subjectsArray: [], teachersArray: [] })
        this.props.formik.setFieldValue('subject', "", false)
        this.props.formik.setFieldValue('teacherName', "", false)
        let response = await this.props.authenticatedApiCall('get', "/api/timetableservice/getsubjectofselectedclass/" + event.value, null)
        if (response.data.status === 1) {
            this.setState({ subjectsArray: this.createSubjectObject(response.data.statusDescription) });
        }
    }
    handleSubjectChange = async (event) => {
        this.setState({ teachersArray: [] })
        this.props.formik.setFieldValue('teacherName', "", false)
        let response = await this.props.authenticatedApiCall('get', "/api/timetableservice/getsubjectteachers/" + event.value, null)
        if (response.data.status === 1) {
            this.setState({ teachersArray: this.createTeachersObject(response.data.statusDescription) });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Time Table Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithFunction fieldLabel={'Select Class'} fieldName={'classId'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} handleChangeOption={this.handleClassChange} />
                        <SelectWithLabel fieldLabel={'Select Section'} fieldName={'sectionId'} selectOptions={sectionOptions} />
                        <SelectWithLabel fieldLabel={'Select Day'} fieldName={'dayName'} selectOptions={weekDaysOptions} />
                        <SelectWithLabel fieldLabel={'Select Period'} fieldName={'periodName'} selectOptions={this.state.periodArray} />
                        <SelectWithFunction fieldLabel={'Select Subject'} fieldName={'subject'} selectOptions={this.state.subjectsArray} handleChangeOption={this.handleSubjectChange} />
                        <SelectWithLabel fieldLabel={'Select Teacher'} fieldName={'teacherName'} selectOptions={this.state.teachersArray} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(TimeTableUI)));