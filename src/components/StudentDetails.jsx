import React from 'react';
import { withStyles, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const styles = theme => ({
    GridContainer: { margin: "20px", [theme.breakpoints.down('md')]: { margin: 0, marginTop: "10px" } },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' }
});

class StudentDetails extends React.Component {
    render() {
        const { classes, studentRecord, routeName } = this.props;
        return (
            <>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan="2" className={classes.tableHeading}><h3>Student Details</h3></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.studentName || studentRecord.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Mother Name</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.motherName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Father Name</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.fatherName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Cell Number</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.cellNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Adhar Number</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.aadharNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>DOB</TableCell>
                                    <TableCell className={classes.tableCell}>{studentRecord.dob}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Gender</TableCell>
                                    <TableCell className={classes.tableCell}>{(studentRecord.gender == 1) ? 'Female' : 'Male'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Transport</TableCell>
                                    <TableCell className={classes.tableCell}>{(studentRecord.busService == 1) ? "Yes" : "No"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Route</TableCell>
                                    <TableCell className={classes.tableCell}>{(studentRecord.busService == 1) ? routeName : "--"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Medium</TableCell>
                                    <TableCell className={classes.tableCell}>{(studentRecord.mediumType == 1) ? "Hindi" : "English"}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default withStyles(styles)(StudentDetails);