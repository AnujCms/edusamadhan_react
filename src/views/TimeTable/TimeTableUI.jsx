import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, Paper } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});
const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];

const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]
const weekDaysOptions = [{ value: 1, label: "Monday" }, { value: 2, label: "Tuesday" }, { value: 3, label: "Wednesday" }, { value: 4, label: "Thursday" }, { value: 5, label: "Friday" }, { value: 6, label: "Saturday" }]
const subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
const subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]

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
        if (this.props.currentUser.userDetails.accouttype == 1) {
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
            teachers.push({ value: data.userid, label: data.firstname + " " + data.lastname })
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
                <Paper>
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="class"
                                    options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                    onChange={this.handleClassChange}
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="section"
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="dayName"
                                    options={weekDaysOptions}
                                    placeholder={"Select Day"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="periodName"
                                    options={this.state.periodArray}
                                    placeholder={"Select Period"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Field
                                    name="subject"
                                    onChange={this.handleSubjectChange}
                                    options={this.state.subjectsArray}
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
                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                <Field
                                    name="teacherName"
                                    options={this.state.teachersArray}
                                    placeholder={"Select Teacher"}
                                    className={classes.inputSelect + " " + "selectstyle"}
                                    component={FormikSelect}
                                    isSearchable={false}
                                    variant="filled"
                                    isClearable={false}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(connect(TimeTableUI)));