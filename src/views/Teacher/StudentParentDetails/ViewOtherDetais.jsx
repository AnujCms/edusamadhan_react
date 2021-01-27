import React, { Component } from 'react';
import { withStyles, Table, TableBody, TableRow, TableCell, Avatar, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import AdminImage from '../../../assets/images/admin.png';
import { handleBloodGroupLabel } from '../../../components/utilsFunctions';

const styles = theme => ({
    avatar: { width: 100, height: 100 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    table: { minWidth: 500 },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
})

class VewParentDetails extends Component {
    render() {
        const { siblings, siblingsDetails, physicalDisability, physicalDisabilityDetails, currentTreatment, currentTreatmentDetails, isStaffChild, studentBloodGroup, isWeekInSubject, image,  title } = this.props.otherDetails;
        const { classes } = this.props;
        let subjectList = [];
        let siblingsList = [];

        if (isWeekInSubject != undefined) {
            if (isWeekInSubject.length > 0) {
                isWeekInSubject.map((item, index) => {
                    subjectList.push(item.label);
                    if (isWeekInSubject.length - 1 > index)
                        subjectList.push(', ')
                })
            }
        }

        if (siblingsDetails != undefined) {
            if (siblingsDetails.length > 0) {
                siblingsDetails.map((item, index) => {
                    siblingsList.push(item.siblingFirstName + " " + item.siblingLastname + `(${item.siblingClassId})`);
                    if (siblingsDetails.length - 1 > index)
                        siblingsList.push(', ')
                })
            }
        }
        return (
            <Grid container className={classes.GridContainer}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan="2" className={classes.tableHeading}> <h3>{title}</h3> </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Siblings  </TableCell>
                                        <TableCell className={classes.tableCell}>{siblings == 1 ? 'No' : 'Yes'}</TableCell>
                                    </TableRow>
                                    {siblings == 2 && <TableRow>
                                        <TableCell className={classes.tableCell}>Siblings Details  </TableCell>
                                        <TableCell className={classes.tableCell}>{siblingsList}</TableCell>
                                    </TableRow>}
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Physical Disability  </TableCell>
                                            <TableCell className={classes.tableCell}>{physicalDisability == 1 ? 'No' : 'yes'}</TableCell>
                                        </TableRow>
                                    {physicalDisability == 2 && <TableRow>
                                        <TableCell className={classes.tableCell}>Physical Disability Details  </TableCell>
                                        <TableCell className={classes.tableCell}>{physicalDisabilityDetails}</TableCell>
                                    </TableRow>}
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Current Treatment  </TableCell>
                                        <TableCell className={classes.tableCell}>{currentTreatment == 1 ? 'No' : 'Yes'}</TableCell>
                                    </TableRow>
                                    {currentTreatment == 2 && <TableRow>
                                        <TableCell className={classes.tableCell}>Current Treatment Details  </TableCell>
                                        <TableCell className={classes.tableCell}>{currentTreatmentDetails}</TableCell>
                                    </TableRow>}
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Is Staff Child  </TableCell>
                                        <TableCell className={classes.tableCell}>{isStaffChild == 1 ? 'No' : 'Yes'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Student Blood Group  </TableCell>
                                        <TableCell className={classes.tableCell}>{handleBloodGroupLabel(studentBloodGroup)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Subjects in which Child is weak  </TableCell>
                                        <TableCell className={classes.tableCell}>{subjectList}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Image  </TableCell>
                                        <TableCell className={classes.tableCell}><Avatar alt="No Images" src={image === null ? AdminImage : "data:image/jpeg;base64," + image} className={classes.avatar} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        )
    }
}
export default withStyles(styles, { withTheme: true })(VewParentDetails);

