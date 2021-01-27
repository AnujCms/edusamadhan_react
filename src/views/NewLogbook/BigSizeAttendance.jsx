import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(0.5),
        maxWidth: '1100px',
        margin: '5px auto',
        [theme.breakpoints.down('sm')]: {
            marginLeft: "10px",
            marginRight: "10px",
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(0.1),
        paddingBottom: theme.spacing(1),
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
    },
    tableHeading: {
        border: '1px solid #000',
        height: '30px',
        textAlign: 'center'
    }
});
function BigSizeAttendance(props) {
    const { classes, attendanceData } = props;
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='subjects'>Months Name</TableCell>
                        <TableCell className={classes.tableHeading} key='tm'>Total Classes</TableCell>
                        <TableCell className={classes.tableHeading} key='om'>Present Classes</TableCell>
                        <TableCell className={classes.tableHeading} key='per'>Present Percenatges</TableCell>
                        <TableCell className={classes.tableHeading} key='grade'>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendanceData.monthName.map((month, i) =>
                        <TableRow key={i}>
                            <TableCell className={classes.tableHeading} key='a'><b>{month}</b></TableCell>
                            <TableCell className={classes.tableHeading} key='b'>{attendanceData.totalDays[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='c'>{attendanceData.presentDays[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='d'>{Math.round((attendanceData.presentDays[i] * 100) / attendanceData.totalDays[i])} {'%'}</TableCell>
                            <TableCell className={classes.tableHeading} key='e'>{((attendanceData.presentDays[i] * 100) / attendanceData.totalDays[i]) > 90 ? 'A' : ((attendanceData.presentDays[i] * 100) / attendanceData.totalDays[i]) > 70 ? 'B' : ((attendanceData.presentDays[i] * 100) / attendanceData.totalDays[i]) > 50 ? 'C' : 'D'}</TableCell>
                        </TableRow>)}
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='a'><b>{'Total Attendance'}</b></TableCell>
                        <TableCell className={classes.tableHeading} key='b'>{attendanceData.TWD}</TableCell>
                        <TableCell className={classes.tableHeading} key='c'>{attendanceData.TPD}</TableCell>
                        <TableCell className={classes.tableHeading} key='d'>{Math.round((attendanceData.TPD * 100) / attendanceData.TWD)} {'%'}</TableCell>
                        <TableCell className={classes.tableHeading} key='e'>{((attendanceData.TPD * 100) / attendanceData.TWD) > 60 ? 'GOOD' : 'BAD'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default withStyles(styles)(BigSizeAttendance);
