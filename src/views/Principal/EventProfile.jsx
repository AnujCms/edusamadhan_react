import React from 'react';
import Card from "../../components/Card/Card.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';

const styles = theme => ({
    tableHeading: { border: '1px solid #000', height: '10px', textAlign: 'center' },
    pad10:{ marginTop:"10px"  }
})
class EventProfile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const eventDetails = this.props.location.state;
        return (
            <div className={classes.pad10}>
                <Card style={{ paddingTop:"15px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Event Name </TableCell>
                                        <TableCell className={classes.tableHeading}> {eventDetails.eventname} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Event Type  </TableCell>
                                        <TableCell className={classes.tableHeading}> {eventDetails.eventtype} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Start Date  </TableCell>
                                        <TableCell className={classes.tableHeading}> {eventDetails.eventstartdate} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> End Date  </TableCell>
                                        <TableCell className={classes.tableHeading}> {eventDetails.eventenddate} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Event Description  </TableCell>
                                        <TableCell className={classes.tableHeading}> {eventDetails.eventdescription} </TableCell>
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

export default withStyles(styles)(EventProfile);