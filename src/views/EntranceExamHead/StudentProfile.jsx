import React from 'react';
import Card from "../../components/Card/Card.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';

const styles = theme => ({
    tableHeading: {
        border: '1px solid #000',
        height: '10px',
        textAlign: 'center'
    }
})
class StudentProfile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, t } = this.props;
        const studentDetails = this.props.location.state;
        return (
            <>
                <Card style={{ paddingTop:"20px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Student Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.name} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Date Of Birth </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.dob} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Cell Number  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.cellnumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Adhar Number  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.adharnumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Total Marks  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.totalmarks} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Obtain Marks  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.obtainedmarks} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Status  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.status} </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </GridItem>
                    </GridContainer>
                    <br />
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(StudentProfile);