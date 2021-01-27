import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import FormHeader from '../../components/FormHeader';
import { Formik, Form } from 'formik';
import TimeTableView from './TimeTableView';
import { object, string } from 'yup';
import ClassSection from '../../components/ClassSection';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            sectionId: string().required("This field is required"),
        });
        this.fieldVariables = { classId: "", sectionId: "" }
        this.state = {
            periodWithTime: [], periodCountArray: [], displayTimeTable: false, timeTableData: '', successMessage: '', isSuccess: false, errorMessage: '', isError: false
        };
    }

    handleCreateTimeTable = () => {
        this.props.history.push(`./create-timetable`);
    }

    handleCreatePeriod = () => {
        this.props.history.push('./create-period')
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    handleSubmit = async (values) => {
        let timeTableResponse = await this.props.authenticatedApiCall('get', "/api/timetableservice/getfulltimetable/" + values.classId.value + "/" + values.sectionId.value, null)
        let periodTimeResponse = await this.props.authenticatedApiCall('get', "/api/timetableservice/getperiodsdetails", null);
        let [fullTimeTable, periodTime] = await Promise.all([timeTableResponse, periodTimeResponse]);
        let periodArray = [];
        if (periodTime.data.status === 1) {
            periodTime.data.statusDescription.map((item) => {
                if (item.period1 !== null) {
                    periodArray.push({ periodName: "1st Period", periodStartTime: JSON.parse(item.period1)[0].periodStartTime, periodEndTime: JSON.parse(item.period1)[0].periodEndTime })
                }
                if (item.period2 !== null) {
                    periodArray.push({ periodName: "2nd Period", periodStartTime: JSON.parse(item.period2)[0].periodStartTime, periodEndTime: JSON.parse(item.period2)[0].periodEndTime })
                }
                if (item.period3 !== null) {
                    periodArray.push({ periodName: "3rd Period", periodStartTime: JSON.parse(item.period3)[0].periodStartTime, periodEndTime: JSON.parse(item.period3)[0].periodEndTime })
                }
                if (item.period4 !== null) {
                    periodArray.push({ periodName: "4th Period", periodStartTime: JSON.parse(item.period4)[0].periodStartTime, periodEndTime: JSON.parse(item.period4)[0].periodEndTime })
                }
                if (item.period5 !== null) {
                    periodArray.push({ periodName: "5th Period", periodStartTime: JSON.parse(item.period5)[0].periodStartTime, periodEndTime: JSON.parse(item.period5)[0].periodEndTime })
                }
                if (item.period6 !== null) {
                    periodArray.push({ periodName: "6th Period", periodStartTime: JSON.parse(item.period6)[0].periodStartTime, periodEndTime: JSON.parse(item.period6)[0].periodEndTime })
                }
                if (item.period7 !== null) {
                    periodArray.push({ periodName: "7th Period", periodStartTime: JSON.parse(item.period7)[0].periodStartTime, periodEndTime: JSON.parse(item.period7)[0].periodEndTime })
                }
                if (item.period8 !== null) {
                    periodArray.push({ periodName: "8th Period", periodStartTime: JSON.parse(item.period8)[0].periodStartTime, periodEndTime: JSON.parse(item.period8)[0].periodEndTime })
                }
                if (item.period9 !== null) {
                    periodArray.push({ periodName: "9th Period", periodStartTime: JSON.parse(item.period9)[0].periodStartTime, periodEndTime: JSON.parse(item.period9)[0].periodEndTime })
                }
                if (item.period10 !== null) {
                    periodArray.push({ periodName: "Lunch Time", periodStartTime: JSON.parse(item.period10)[0].periodStartTime, periodEndTime: JSON.parse(item.period10)[0].periodEndTime })
                }
            })
        } else {
            this.setState({ isError: true, displayTimeTable: false, errorMessage: periodTime.data.statusDescription })
        }
        let periodCountArray = [];
        if (fullTimeTable.data.status === 1) {
            fullTimeTable.data.statusDescription.map((item) => {
                if (item.period1 !== null) {
                    periodCountArray.push("1st Period")
                }
                if (item.period2 !== null) {
                    periodCountArray.push("2nd Period")
                }
                if (item.period3 !== null) {
                    periodCountArray.push("3rd Period")
                }
                if (item.period4 !== null) {
                    periodCountArray.push("4th Period")
                }
                if (item.period5 !== null) {
                    periodCountArray.push("5th Period")
                }
                if (item.period6 !== null) {
                    periodCountArray.push("6th Period")
                }
                if (item.period7 !== null) {
                    periodCountArray.push("7th Period")
                }
                if (item.period8 !== null) {
                    periodCountArray.push("8th Period")
                }
                if (item.period9 !== null) {
                    periodCountArray.push("9th Period")
                }
                if (item.period10 !== null) {
                    periodCountArray.push("10th Period")
                }
            })
            this.setState({ periodCountArray: [...new Set(periodCountArray)] })
        } else {
            this.setState({ isError: true, displayTimeTable: false, errorMessage: fullTimeTable.data.statusDescription })
        }
        if (fullTimeTable.data.status === 1 && periodTime.data.status === 1) {
            let pppp = []
            let filterData = [...new Set(periodCountArray)].filter((item, i) => {
                periodArray.map((data) => {
                    if (item === data.periodName) {
                        pppp.push({
                            periodName: item,
                            periodStartTime: data.periodStartTime,
                            periodEndTime: data.periodEndTime
                        })
                    }
                })
                this.setState({ periodWithTime: pppp })
                return pppp;
            });
            this.setState({ displayTimeTable: true, timeTableData: fullTimeTable.data.statusDescription })
        }
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                {this.props.currentUser.userDetails.role !== 'Principal' && <FormHeader headerText={"Class Time Table"} pageTitle={"Class Time Table"} />}
                <Grid container className={classes.GridContainer}>
                    {this.props.currentUser.userDetails.role === 'Principal' && <><Grid item lg={7} md={7} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Class Time Table</Typography>
                    </Grid>
                        <Grid item lg={2} md={2} sm={6} xs={6}>
                            <div className={classes.cstmprotoBtnWrap}>
                                <Button onClick={this.handleCreatePeriod} className={classes.primaryBtn}>Create Period</Button>
                            </div>
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                            <div className={classes.cstmprotoBtnWrap}>
                                <Button onClick={this.handleCreateTimeTable} className={classes.primaryBtn}>Create Time Table</Button>
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
                        {this.state.displayTimeTable && <TimeTableView timeTableData={this.state.timeTableData} periodCountArray={this.state.periodCountArray} periodWithTime={this.state.periodWithTime} />}
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(TimeTable)));