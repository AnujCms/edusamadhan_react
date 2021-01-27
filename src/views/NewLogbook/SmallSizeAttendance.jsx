import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(0.5),
        maxWidth: '1100px',
        margin: '2px auto',
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            marginBottom:'10px'
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(.1),
        paddingBottom: theme.spacing(1),
        paddingLeft: '0px',
        paddingRight: '0px'
    },
    tableHeading: {
        border: '1px solid #000',
        height: '30px',
        textAlign: 'left'
    }
});

function SmallSizeAttendance(props) {

    const { classes, attendanceData } = props;
    return (
        <div className={classes.root}>
                        <Grid container>
                <Grid item sm={12} xs={12}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='subjects'>Months</TableCell>
                        <TableCell className={classes.tableHeading} key='tm'>Total</TableCell>
                        <TableCell className={classes.tableHeading} key='om'>Present</TableCell>
                        <TableCell className={classes.tableHeading} key='per'>%</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendanceData.monthName.map((month, i) =>
                        <TableRow key={i}>
                            <TableCell className={classes.tableHeading} key='a'><b>{month}</b></TableCell>
                            <TableCell className={classes.tableHeading} key='b'>{attendanceData.totalDays[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='c'>{attendanceData.presentDays[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='d'>{Math.round((attendanceData.presentDays[i] * 100) / attendanceData.totalDays[i])} </TableCell>
                        </TableRow>)}
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='a'><b>{'Total Attendance'}</b></TableCell>
                        <TableCell className={classes.tableHeading} key='b'>{attendanceData.TWD}</TableCell>
                        <TableCell className={classes.tableHeading} key='c'>{attendanceData.TPD}</TableCell>
                        <TableCell className={classes.tableHeading} key='d'>{Math.round((attendanceData.TPD * 100) / attendanceData.TWD)} </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(SmallSizeAttendance);
