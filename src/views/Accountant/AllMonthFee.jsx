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
    },
    pad10:{
        marginTop:"10px"
    }
})
class AllMonthFee extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, t } = this.props;
        const feeDetails = this.props.location.state;
        return (
            <div className={classes.pad10}>
                <Card style={{ paddingTop:"15px"}}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Table>
                                <TableBody>
                                <TableRow>
                                        <TableCell className={classes.tableHeading}><b>Month Namea</b></TableCell>
                                        <TableCell className={classes.tableHeading}><b>Fee of Month</b></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> January  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.january} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> February  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.february} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> March  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.march} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> April  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.april} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> May </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.may} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> June  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.june} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> July  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.july} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> August  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.august} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> September  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.september} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> October  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.october} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> November  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.november} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> December  </TableCell>
                                        <TableCell className={classes.tableHeading}> {feeDetails.december} </TableCell>
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

export default withStyles(styles)(AllMonthFee);