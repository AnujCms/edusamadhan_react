import React from 'react';
import Card from "../../components/Card/Card.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';

const styles = theme => ({
    tableHeading: { border: '1px solid #000', height: '10px', textAlign: 'center'  },
    pad10:{ marginTop:"10px"  }
})
class TeacherProfile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const teacherDetails = this.props.location.state;
        console.log(teacherDetails)
        return (
            <div className={classes.pad10}>
                <Card style={{ paddingTop:"15px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Student Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.name} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Cell Number  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.cellnumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Email Id  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.emailid} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Gender  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.gender} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Qualification  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.qualification} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Subject  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.subject} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> User Role  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.userrole} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Class Teacher  </TableCell>
                                        <TableCell className={classes.tableHeading}> {teacherDetails.class+" "+teacherDetails.section} </TableCell>
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

export default withStyles(styles)(TeacherProfile);