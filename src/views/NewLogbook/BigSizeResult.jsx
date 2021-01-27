import React from 'react';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(0.5),
        maxWidth: '1100px',
        margin: '5px auto',
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            maxWidth: '100px',
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(.1),
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

function BigSizeResult(props) {
    const { classes, resultdata } = props;
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='subjects'>Subject</TableCell>
                        <TableCell className={classes.tableHeading} key='tm'>Total Marks</TableCell>
                        <TableCell className={classes.tableHeading} key='om'>Obtained Marks</TableCell>
                        <TableCell className={classes.tableHeading} key='per'>Subject Percenatges</TableCell>
                        <TableCell className={classes.tableHeading} key='grade'>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resultdata.subjects.map((subjects, i) =>
                        <TableRow key={i}>
                            <TableCell className={classes.tableHeading} key='a'><b>{subjects}</b></TableCell>
                            <TableCell className={classes.tableHeading} key='b'>{resultdata.totalMarks[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='c'>{resultdata.obtainedMarks[i]}</TableCell>
                            <TableCell className={classes.tableHeading} key='d'>{resultdata.obtainedMarks[i] === '-' ? '0':((resultdata.obtainedMarks[i] * 100) / resultdata.totalMarks[i])} {'%'}</TableCell>
                            <TableCell className={classes.tableHeading} key='e'>{((resultdata.obtainedMarks[i] * 100) / resultdata.totalMarks[i]) > 90 ? 'A' : ((resultdata.obtainedMarks[i] * 100) / resultdata.totalMarks[i]) > 70 ? 'B' : ((resultdata.obtainedMarks[i] * 100) / resultdata.totalMarks[i]) > 50 ? 'C' : 'D'}</TableCell>
                        </TableRow>)}
                    <TableRow>
                        <TableCell className={classes.tableHeading} key='a'><b>{'Total Marks'}</b></TableCell>
                        <TableCell className={classes.tableHeading} key='b'>{resultdata.TTM}</TableCell>
                        <TableCell className={classes.tableHeading} key='c'>{resultdata.OBTM}</TableCell>
                        <TableCell className={classes.tableHeading} key='d'>{Math.round((resultdata.OBTM * 100) / resultdata.TTM)} {'%'}</TableCell>
                        <TableCell className={classes.tableHeading} key='e'>{((resultdata.OBTM * 100) / resultdata.TTM) > 33 ? 'Passed' : 'Fail'}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </div>
    );
}

export default withStyles(styles)(BigSizeResult);
