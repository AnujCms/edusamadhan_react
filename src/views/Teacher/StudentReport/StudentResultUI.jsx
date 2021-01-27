import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Table, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';

const styles = theme => ({
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
});

class StudentResultUI extends React.Component {
    render() {
        const { classes, index, resultObject } = this.props;
        let periodicResult = '';
        if (index == 0) {
            periodicResult = 'First Periodic'
        } else if (index == 1) {
            periodicResult = 'Second Periodic'
        } else if (index == 2) {
            periodicResult = 'Third Periodic'
        } else if (index == 3) {
            periodicResult = 'Final'

        }
        return (
            <Paper style={{padding:"10px", marginBottom:"20px"}}>
                <Grid container >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={"6"} className={classes.tableHeading}> <h3>{periodicResult}</h3> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableHeading}><b>Subject Name</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Theory Total Marks</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Theory Obtained Marks</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Practical Total Marks</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Practical Obtained marks</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Grade</b></TableCell>
                                </TableRow>
                            </TableHead>
                            {resultObject.map((result, index) => {
                                return <TableBody key={index+'r'}>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>{result.subjectName}</TableCell>
                                        <TableCell className={classes.tableCell}>{result.theoryTotalMarks}</TableCell>
                                        <TableCell className={classes.tableCell}>{result.theoryObtainMarks}</TableCell>
                                        <TableCell className={classes.tableCell}>{result.practicalTotalMarks}</TableCell>
                                        <TableCell className={classes.tableCell}>{result.practicalObtainMarks}</TableCell>
                                        <TableCell className={classes.tableCell}>{result.grade}</TableCell>
                                    </TableRow>
                                </TableBody>
                            })}
                        </Table><br></br>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(StudentResultUI))));