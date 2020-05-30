import React from 'react';
import Card from "../../components/Card/Card.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles, Table, TableBody, TableCell, TableRow, Typography  } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFastBackward } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import AuthenticatedPage from "../AuthenticatedPage";

const styles = theme => ({
    iconSize: { fontSize: 35 },
    texeCenter: { textAlign: 'left' },
    actions: { bottom: 0, position: "fixed", marginBottom: 0, left: 0 },
    addColor: { color: theme.palette.primary.main },
    tableHeading: { border: '1px solid #000', height: '10px', textAlign: 'center' },
})
class ClassFeeDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "profile",
            confirmInactivateDialog: false,
            confirmInactivate: false
        }
    }

    handleBackToDashboard = () =>{
        this.props.history.push(`./fullclassfeedetails`);
    }
    render() {
        const { classes } = this.props;
        const studentFeeDetails = this.props.location.state
        return (
            <>
                <Card style={{ marginBottom: "55px", marginTop:"25px", paddingBottom:"15px", paddingTop:"15px" }}>
                    <GridContainer style={{ textTransform: "initcase" }}>
                        <GridItem xs={12} sm={12} >
                            <Typography variant="h5" style={{marginBottom:'10px'}}>Student Fee Details</Typography>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Student Name  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.name} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> Adhar Number </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.adharnumber} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> January Fee </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.january} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> February Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.february} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> March Fee </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.march} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> April Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.april} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>May Fee </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.may} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> June Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.june} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>July Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.july} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> August Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.august} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>September Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.september} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}> October Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.october} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>November Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.november} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>December Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.december} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Total Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.totalFee} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Paid Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.paidfee} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>Left Fee  </TableCell>
                                        <TableCell className={classes.tableHeading}> {studentFeeDetails.remainingfee} </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </GridItem>
                    </GridContainer>
                </Card>
                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleBackToDashboard} className={this.state.activeComponent === "profile" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount"])(ClassFeeDetails));