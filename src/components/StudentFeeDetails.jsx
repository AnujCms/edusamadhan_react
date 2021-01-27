import React from 'react';
import { withStyles, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const styles = theme => ({
    GridContainer: { margin: "20px", [theme.breakpoints.down('md')]: { margin: 0, marginTop: "10px" } },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' }
});

class StudentFeeDetails extends React.Component {
    render() {
        const { classes, feeStructure, studentData, submittedFee, transportSubmittedFee, transportFee } = this.props;
        return (
            <>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={(studentData.busService == 1) ? "5" : "4"} className={classes.tableHeading}> <h3>Student Fee Details</h3> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableHeading}><b>Month Name</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>School Fee</b></TableCell>
                                    <TableCell className={classes.tableHeading}><b>Subitted Fee</b></TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableHeading}><b>Transport Fee</b></TableCell>
                                        <TableCell className={classes.tableHeading}><b>Subitted Fee</b></TableCell></>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>January</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.jan}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.jan}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.jan}</TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}> February  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.feb} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.feb} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.feb} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}> March  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.mar} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.mar} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.mar} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}> April  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.apr} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.apr} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.apr} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}> May  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.may} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.may} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.may} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}> June  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.jun} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.jun} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.jun} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>July  </TableCell>
                                    <TableCell className={classes.tableCell}> {feeStructure.jul} </TableCell>
                                    <TableCell className={classes.tableCell}> {submittedFee.jul} </TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}> {transportFee} </TableCell>
                                        <TableCell className={classes.tableCell}> {transportSubmittedFee.jul} </TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>August</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.aug}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.aug}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.aug}</TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>September</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.sep}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.sep}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.sep}</TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>October</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.oct}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.oct}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.oct}</TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>November</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.nov}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.nov}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.nov}</TableCell></>}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>December</TableCell>
                                    <TableCell className={classes.tableCell}>{feeStructure.dec}</TableCell>
                                    <TableCell className={classes.tableCell}>{submittedFee.dec}</TableCell>
                                    {(studentData.busService == 1) && <><TableCell className={classes.tableCell}>{transportFee}</TableCell>
                                        <TableCell className={classes.tableCell}>{transportSubmittedFee.dec}</TableCell></>}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default withStyles(styles)(StudentFeeDetails);