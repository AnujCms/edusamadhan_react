import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.jsx';

const styles = theme => ({
    tableHeading: { border: '1px solid #000', height: '10px', textAlign: 'center' },
    pad10:{ marginTop:"10px"  }
})

class StudentProfile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, t } = this.props;
        const studentDetails = this.props.location.state;
        return (
            <div className={classes.pad10}>
                <Card style={{ paddingTop:"15px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Student Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.name} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Mother Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.motherName} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Father Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.fatherName} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Cell Number  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.cellNumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Adhar Number  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.aadharNumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Gender  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.gender} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Religion  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.religion} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Category  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.category} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Locality  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentDetails.locality} </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </GridItem>
                    </GridContainer>
                    <br /><br />
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(StudentProfile);