import React from 'react';
import { withStyles, Card, Grid, Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';
import { handleDaysName } from '../../components/utilsFunctions';
import FormHeader from '../../components/FormHeader';

const styles = (theme) => ({
    paddingBottom: { padding: "15px", [theme.breakpoints.down('md')]: { paddingTop: "15px", paddingLeft: "0px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", overflowX: 'auto' },
    container: { display: 'flex', flexWrap: 'wrap' },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'left' }
});

class TimeTableView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            periodArray: [], daysArray: [], periodCountArray: [], mondayArray: [], tuesdayArray: [], wednesdayArray: [], thursdayArray: [], fridayArray: [], saturdayArray: []
        }
    }

    filterDayWiseData = (value) => {
        let daysObject = []
        if (value.period1 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period1)[0].subjectName, teacherName: JSON.parse(value.period1)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('1st Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period2 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period2)[0].subjectName, teacherName: JSON.parse(value.period2)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('2nd Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period3 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period3)[0].subjectName, teacherName: JSON.parse(value.period3)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('3rd Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period4 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period4)[0].subjectName, teacherName: JSON.parse(value.period4)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('4th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period5 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period5)[0].subjectName, teacherName: JSON.parse(value.period5)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('5th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period6 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period6)[0].subjectName, teacherName: JSON.parse(value.period6)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('6th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period7 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period7)[0].subjectName, teacherName: JSON.parse(value.period7)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('7th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period8 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period8)[0].subjectName, teacherName: JSON.parse(value.period8)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('8th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period9 !== null) {
            daysObject.push({ subjectName: JSON.parse(value.period9)[0].subjectName, teacherName: JSON.parse(value.period9)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('9th Period')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        if (value.period10 !== null) {
            daysObject.push({ periodName: "Lunch Time", subjectName: JSON.parse(value.period10)[0].subjectName, teacherName: JSON.parse(value.period10)[0].teacherName })
        } else {
            if (this.props.periodCountArray.includes('Lunch Time')) {
                daysObject.push({ subjectName: "--", teacherName: "--" })
            }
        }
        return daysObject;
    }
    componentDidMount = async () => {
        if (this.props.timeTableData) {
            let daysArray = [];
            this.props.timeTableData.map((item) => {
                daysArray.push(handleDaysName(item.dayname))
                if (item.dayname === 1) {
                    this.setState({ mondayArray: this.filterDayWiseData(item) });
                }
                if (item.dayname === 2) {
                    this.setState({ tuesdayArray: this.filterDayWiseData(item) });
                }
                if (item.dayname === 3) {
                    this.setState({ wednesdayArray: this.filterDayWiseData(item) });
                }
                if (item.dayname === 4) {
                    this.setState({ thursdayArray: this.filterDayWiseData(item) });
                }
                if (item.dayname === 5) {
                    this.setState({ fridayArray: this.filterDayWiseData(item) });
                }
                if (item.dayname === 6) {
                    this.setState({ saturdayArray: this.filterDayWiseData(item) });
                }
            })
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeader headerText={"View TimeTable"} pageTitle={"View TimeTable"} />
                <Paper>
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Table>
                                    <TableHead>
                                        {this.props.periodWithTime && <TableRow>
                                            <TableCell className={classes.tableHeading} key='subjects'><b>Day Name/Period Name</b></TableCell>
                                            {this.props.periodWithTime.map((item, name) =>
                                                <TableCell className={classes.tableHeading} key={name}><b>{item.periodName}</b><br />{item.periodStartTime + " - " + item.periodEndTime}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.mondayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='monday'><b>Monday</b></TableCell>
                                            {this.state.mondayArray.map((item, monday) =>
                                                <TableCell className={classes.tableHeading} key={monday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.tuesdayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='tuesday'><b>Tuesday</b></TableCell>
                                            {this.state.tuesdayArray.map((item, tuesday) =>
                                                <TableCell className={classes.tableHeading} key={tuesday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.wednesdayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='wednesday'><b>Wednesday</b></TableCell>
                                            {this.state.wednesdayArray.map((item, wednesday) =>
                                                <TableCell className={classes.tableHeading} key={wednesday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.thursdayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='thursday'><b>Thursday</b></TableCell>
                                            {this.state.thursdayArray.map((item, thursday) =>
                                                <TableCell className={classes.tableHeading} key={thursday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.fridayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='friday'><b>Friday</b></TableCell>
                                            {this.state.fridayArray.map((item, friday) =>
                                                <TableCell className={classes.tableHeading} key={friday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}

                                        {this.state.saturdayArray && <TableRow>
                                            <TableCell className={classes.tableHeading} key='saturday'><b>Saturday</b></TableCell>
                                            {this.state.saturdayArray.map((item, saturday) =>
                                                <TableCell className={classes.tableHeading} key={saturday}><b>{item.subjectName}</b><br />{item.teacherName}</TableCell>
                                            )}
                                        </TableRow>}
                                    </TableHead>
                                </Table>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(TimeTableView)));