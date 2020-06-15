import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator-vivek';
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@material-ui/core';
import PayFee from './PayFee';
import ErrorDialog from '../../../components/ErrorDialog';
import Spinner from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 8,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        [theme.breakpoints.down('md')]: { margin: 0, padding: 0, paddingBottom: '10px', marginTop: '5px' }
    },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    cardRoot: { marginLeft: "400px", marginTop: "50px", width: "700px", height: "250px", textAlign: "center", [theme.breakpoints.down('md')]: { width: "200px", marginLeft: "0px", width: 'auto', marginTop: 0 } },
    GridContainer: { marginTop: "20px" },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
    primaryButton: {
        color: "#fff",
        background: "#f5bc53",
        width: "150px",
        borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }
    },
    inputItem: { width: "100%" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginTop: "25px", marginBottom: "15px" },
    pad_15: { float: "right" },
});
class StudentPayFee extends React.Component {
    state = {
        isRender: false,
        transportFee: '', busservice: '', disablePayBtn:true, studentfeeData:'', studentMonthFee:'', transportFee:'',
        startSpinner: false, payfee: false, isError: false, errorMessage: "",
        adharnumber: '', submited: true, route:'', mediumType:'',sname: '', smother: '', sfather: '', sdob: '', scell: '', sadhar: '', sgender: '',
        Jan: '', feb: '', mar: '', apr: '', mayy: '', jun: '', jul: '', aug: '', sep: '', oct: '', nov: '', dec: '',
        tJan: '', tfeb: '', tmar: '', tapr: '', tmayy: '', tjun: '', tjul: '', taug: '', tsep: '', toct: '', tnov: '', tdec: '',
        january: '', february: '', march: '',
        april: '', may: '', june: '', july: '', august: '', september: '', october: '', november: '', december: ''
    }

    async componentDidMount() {
        let routeOptions = []
        let url = '/api/studentfeeservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            response.data.statusDescription.map((item) => {
                let routeObj = { label: item.route, value: item.transportfeeid }
                routeOptions.push(routeObj)
            })
        }
        if (this.props.location.state.adharnumber && this.props.location.state.mediumType) {
            this.setState({ startSpinner: true, adharnumber: this.props.location.state.adharnumber })
            let url = '/api/studentfeeservice/feedetails/'+ this.props.location.state.adharnumber+"/"+this.props.location.state.mediumType;
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.status === 1) {
                this.setState({studentfeeData:response.data.studentFeeStructure})
                var student = response.data.studentfeeData;
                var fee = response.data.studentFeeDetails;
                var str = response.data.studentFeeStructure;
                let trns = response.data.transportFeeDetails;
                this.setState({ startSpinner: false })
                if (response.data.studentfeeData) {
                    if (student.busservice == 2) {
                        let transportFee = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getstudenttransportfee/' + this.state.adharnumber, null)
                        if (transportFee.data.status === 1) {
                            this.setState({ transportFee: transportFee.data.statusDescription[0].fee })
                        }
                    }  
                    let data = routeOptions.filter((item)=>{return item.value == student.route})
                    this.setState({mediumType:student.mediumType,route:routeOptions.filter((item)=>{return item.value == student.route}), disablePayBtn: false, sname: student.name, smother: student.mothername, sfather: student.fathername, sdob: student.dob, scell: student.cellnumber, sgender: student.gender, sadhar: student.adharnumber, busservice: student.busservice })
                }
                if (response.data.studentFeeStructure) {
                    this.setState({ january: str.jan, february: str.feb, march: str.mar, april: str.apr, may: str.may, june: str.jun, july: str.jul, august: str.aug, september: str.sep, october: str.oct, november: str.nov, december: str.dec })
                }
                if (response.data.studentFeeDetails) {
                    this.setState({jan: fee.jan, feb: fee.feb, mar: fee.mar, apr: fee.apr, mayy: fee.may, jun: fee.jun, jul: fee.jul, aug: fee.aug, sep: fee.sep, oct: fee.oct, nov: fee.nov, dec: fee.dec})
                }
                if(response.data.transportFeeDetails){
                    this.setState({tjan: trns.jan, tfeb: trns.feb, tmar: trns.mar, tapr: trns.apr, tmayy: trns.may, tjun: trns.jun, tjul: trns.jul, taug: trns.aug, tsep: trns.sep, toct: trns.oct, tnov: trns.nov, tdec: trns.dec})
                }
                this.setState({ submited: false, isRender:true })

            } else if (response.data.status === 2) {
                this.setState({ startSpinner: false, isError: true, errorMessage: response.data.statusDescription })
            } else {
                this.setState({ startSpinner: false, isError: true, errorMessage: "Something went wrong. Try again some time." })
            }
        }
    }

    handlePayFeeDuialog = () => {
        this.setState({ payfee: true })
    }
    handleClosePayFeeDialog = () =>{
        this.setState({ payfee: false })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    backDashboard = () => {
        this.setState({ isError: false })
    }
    handleBackHome = () => {
        this.props.history.push('./studentslist')
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button style={{ backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" }} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Students Fee Details</title></Helmet>
                {this.state.isRender?<><Grid container className={classes.GridContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleBackHome} className={classes.primaryBtn}>Back To Home</Button>
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Student Fee Details</Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan="2" className={classes.tableHeading}><h3>Student Details</h3></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Student Name</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.sname}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Mother Name</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.smother}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Father Name</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.sfather}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Cell Number</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.scell}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>DOB</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.sdob}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Gender</TableCell>
                                            <TableCell className={classes.tableCell}>{(this.state.sgender == 1) ? 'Female' : 'Male'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Adhar Number</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.sadhar}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Transport</TableCell>
                                            <TableCell className={classes.tableCell}>{(this.state.busservice == 2) ? "Yes" : "No"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Route</TableCell>
                                            <TableCell className={classes.tableCell}>{(this.state.busservice == 2)? this.state.route[0].label:"--"}</TableCell>
                                        </TableRow>                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Medium</TableCell>
                                            <TableCell className={classes.tableCell}>{(this.state.mediumType == 1) ? "Hindi" : "English"}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        {this.props.currentUser.userDetails.role =='FeeAccount'&& <ValidatorForm onSubmit={this.handlePayFeeDuialog}>
                            <Card>
                                <CardContent>
                                    {this.state.payfee ? <div>{this.props.location.state ? <PayFee adharnumber={this.props.location.state.adharnumber} busservice={this.state.busservice} transportFee={this.state.transportFee} name={this.state.sname} handleClosePayFeeDialog={this.handleClosePayFeeDialog} studentfeeData={this.state.studentfeeData}/> : <PayFee adharnumber={this.props.location.state} busservice={this.state.busservice} transportFee={this.state.transportFee}  name={this.state.sname} handleClosePayFeeDialog={this.handleClosePayFeeDialog}  studentfeeData={this.state.studentfeeData}/>}</div> :
                                        <Grid container>
                                            <Grid item>
                                                <CardActions className={classes.pad_15}>
                                                    <Button type="submit" disabled={this.state.disablePayBtn} className={classes.primaryButton}>Pay fee</Button>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    }
                                </CardContent>
                            </Card>
                        </ValidatorForm>}
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={(this.state.busservice == 2) ? "5" : "4"} className={classes.tableHeading}> <h3>Student Fee Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}><b>Month Name</b></TableCell>
                                            <TableCell className={classes.tableHeading}><b>School Fee</b></TableCell>
                                            <TableCell className={classes.tableHeading}><b>Subitted Fee</b></TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableHeading}><b>Transport Fee</b></TableCell>
                                            <TableCell className={classes.tableHeading}><b>Subitted Fee</b></TableCell></>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>January</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.january}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.jan}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.tjan}</TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> February  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.february} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.feb} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tfeb} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> March  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.march} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.mar} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tmar} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> April  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.april} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.apr} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tapr} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> May  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.may} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.mayy} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tmayy} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> June  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.june} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.jun} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tjun} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>July  </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.july} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.jul} </TableCell>
                                            {(this.state.busservice == 2) && <><TableCell className={classes.tableCell}> {this.state.transportFee} </TableCell>
                                            <TableCell className={classes.tableCell}> {this.state.tjul} </TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>August</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.august}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.aug}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.taug}</TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>September</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.september}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.sep}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.tsep}</TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>October</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.october}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.oct}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.toct}</TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>November</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.november}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.nov}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.tnov}</TableCell></>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>December</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.december}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.dec}</TableCell>
                                            {(this.state.busservice == 2)&&<><TableCell className={classes.tableCell}>{this.state.transportFee}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.tdec}</TableCell></>}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid></>:<Spinner  style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }}/>}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount"])(StudentPayFee));
