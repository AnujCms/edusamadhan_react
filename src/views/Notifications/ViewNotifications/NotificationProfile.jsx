import React from 'react';
import Card from "../../../components/Card/Card.jsx";
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.jsx';

const styles = theme => ({
    tableHeading: { border: '1px solid #000', height: '10px', textAlign: 'center' },
    pad10:{ marginTop:"10px"  }
})
class NotificationProfile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, t } = this.props;
        const notificationDetails = this.props.location.state;
        return (
            <div className={classes.pad10}>
                <Card style={{ paddingTop:"15px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                <TableRow>
                                        <TableCell className={classes.tableHeading}> Created By </TableCell>
                                        <TableCell className={classes.tableHeading}> {notificationDetails.createdby} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Notification user </TableCell>
                                        <TableCell className={classes.tableHeading}> {notificationDetails.notificationuser} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Notification Subject  </TableCell>
                                        <TableCell className={classes.tableHeading}> {notificationDetails.notificationsubject} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Created Date  </TableCell>
                                        <TableCell className={classes.tableHeading}> {notificationDetails.notificationcreateddate} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Notification Description  </TableCell>
                                        <TableCell className={classes.tableHeading}> {notificationDetails.notificationdescription} </TableCell>
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

export default withStyles(styles)(NotificationProfile);