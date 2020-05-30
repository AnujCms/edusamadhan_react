import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", overflowX: 'auto' },
    container: { display: 'flex', flexWrap: 'wrap' },
    textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: 200 },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'left' }
});

class PeriodView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectsArray: [], teachersArray: [], periodArray: []
        }
    }
    componentDidMount = async () => {
        let response = await this.props.authenticatedApiCall('get', "/api/timetableservice/getperiodsdetails", null);
        if (response.data.status === 1) {
            let periodArray = []
            response.data.statusDescription.map((item) => {
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
            this.setState({ periodArray: periodArray })
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper className={classes.formHeader}>
                    <Typography className={classes.center}>View Periods</Typography>
                </Paper>
                <Paper>
                    <Card className={classes.backgroundColor}>
                        <Grid container className={classes.questionContainer}>
                            <Grid item lg={8} md={8} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading} key='subjects'><b>Period Name</b></TableCell>
                                            <TableCell className={classes.tableHeading} key='tm'><b>Period Start Time</b></TableCell>
                                            <TableCell className={classes.tableHeading} key='om'><b>Period End Time</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    {this.state.periodArray.map((data, i) =>
                                        <TableBody>
                                            <TableRow key={i}>
                                                <TableCell className={classes.tableHeading} key='a'>{data.periodName}</TableCell>
                                                <TableCell className={classes.tableHeading} key='b'>{data.periodStartTime}</TableCell>
                                                <TableCell className={classes.tableHeading} key='c'>{data.periodEndTime}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("Principal")(connect(PeriodView)));