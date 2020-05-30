import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Button, Typography, Card, CardContent, withStyles, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: "25px" },
    },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
    marginLeft: { marginLeft: "20px", [theme.breakpoints.down('md')]: { marginLeft: "0px", marginTop: "20px" } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "5px", marginBottom:"10px" },
    pad0: { padding: 0 }
});
class StudentDetails extends React.Component {
    state = {transportFee:'', busservice:'',
        payfee: false, religion:'', category:'', locality:'', laddress:'', paddress:'',
        adharnumber: '', submited: true, sname: '', smother: '', sfather: '', sdob: '', scell: '', sadhar: '', sgender: '',
        Jan: '', feb: '', mar: '', apr: '', mayy: '', jun: '', jul: '', aug: '', sep: '', oct: '', nov: '', dec: '', january: '', february: '', march: '',
        april: '', may: '', june: '', july: '', august: '', september: '', october: '', november: '', december: '', isError: false, errorMessage: ''
    }

    async componentDidMount() {
        if (this.props.currentUser.userDetails.adharnumber) {
            this.setState({ submited: false })
            let url = '/api/studentservice/studentfeedetails/'+ this.props.currentUser.userDetails.adharnumber ;
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.status == 1) {
                var student = response.data.studentfeeData;
                var fee = response.data.studentFeeDetails;
                var str = response.data.studentFeeStructure;
                if (student.busservice == 2) {
                    let transportFee = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getstudenttransportfee/' + this.props.currentUser.userDetails.adharnumber, null)
                    if (transportFee.data.status === 1) {
                        this.setState({ transportFee: transportFee.data.statusDescription[0].fee })
                    }
                }
                if (student.religion == 1) { student.religion = 'Hindu' }
                else if (student.religion == 2) { student.religion = 'Muslim' }
                else if (student.religion == 3) { student.religion = 'Shikh' }
                else if (student.religion == 4) { student.religion = 'Jain' }

                if (student.category == 1) { student.category = 'Genral' }
                else if (student.category == 2) { student.category = 'OBC' }
                if (student.category == 3) { student.category = 'ST/SC' }

                if (student.locality == 1) { student.locality = 'Urban' }
                else if (student.locality == 2) { student.locality = 'Rural' }

                if(student.gender == 1){student.gender = "Female"}
                else if(student.gender == 2){student.gender = "Male"}
                this.setState({ busservice: student.busservice, religion:student.religion, category:student.category, locality:student.locality, laddress:student.localaddress,paddress:student.parmanentaddress,
                    sname: student.name, smother: student.mothername, sfather: student.fathername, sdob: student.dob, scell: student.cellnumber, sgender: student.gender, sadhar: student.adharnumber, submited: false,
                    jan: fee.jan, feb: fee.feb, mar: fee.mar, apr: fee.apr, mayy: fee.may, jun: fee.jun, jul: fee.jul, aug: fee.aug, sep: fee.sep, oct: fee.oct, nov: fee.nov, dec: fee.dec, january: str.jan, february: str.feb, march: str.mar,
                    april: str.apr, may: str.may, june: str.jun, july: str.jul, august: str.aug, september: str.sep, october: str.oct, november: str.nov, december: str.dec
                })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        }
    }

    backDashboard = () => {
        this.setState({ isError: false });
        this.props.history.push('./student');
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                <Grid item lg={12} md={12} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Students Details</Typography>
                    </Grid>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan="2" className={classes.tableHeading}> <h3>Student Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Student Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.sname} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Mother Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.smother} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Father Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.sfather} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Cell Number  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.scell} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> DOB  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.sdob} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Gender  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.sgender} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Adhar Number  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.sadhar} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Religion  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.religion} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Category  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.category} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Locality  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.locality} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Local </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.laddress} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Parmanent</TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.paddress} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                                <TableCell className={classes.tableCell}>Transport </TableCell>
                                                <TableCell className={classes.tableCell}> {(this.state.busservice == 2)?"Yes":"No"} </TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <Card className={classes.marginLeft}>
                            <CardContent>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                        <TableCell colSpan={(this.state.busservice == 2) ? "4" : "3"} className={classes.tableHeading}> <h3>Student Fee Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}><b>Month Name</b></TableCell>
                                            <TableCell className={classes.tableHeading}> <b>Total Fee</b> </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableHeading}> <b>Transport Fee</b> </TableCell>}
                                            <TableCell className={classes.tableHeading}> <b>Subitted Fee</b> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> January  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.january} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.jan} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> February  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.february} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.feb} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> March  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.march} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.mar} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> April  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.april} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.apr} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> May  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.may} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.mayy} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> June  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.june} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.jun} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>July  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.july} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.jul} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> August  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.august} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.aug} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> September  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.september} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.sep} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> October  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.october} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.oct} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>November  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.november} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.nov} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>December  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.december} </TableCell>
                                            {(this.state.busservice == 2) && <TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>}
                                            <TableCell className={classes.tableCell}> {this.state.dec} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.OkButton} /> : "")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(['Student'])(StudentDetails));
