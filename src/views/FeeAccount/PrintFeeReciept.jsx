import React, { Fragment } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: { marginTop: theme.spacing.unit * 12, maxWidth: "900px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },

    table: {
        // minWidth: 700,
        maxWidth: 860
    },
    tableBorder: {
        paddingLeft: 0,
        maxWidth: 150,
        minWidth: 400,
    },
    tableBorder1: {

    },
    tableBorder2: {
        maxWidth: 150,
        paddingLeft: 4,
    },
    alternateRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#fff",
        },
    },
    header: {
        padding: '0 0 0 55px',
        background: 'rgb(224, 225, 226)',
        maxWidth: '750px',
        margin: '0 auto',
    },
    prescriptionbody: {
        padding: '15px 0 0 35px',
        maxWidth: '700px',
        margin: '0 auto',

    },
    underline: {
        textDecoration: 'underline',
        fontSize: '20px',
        marginRight: '5px'
    },
    texts: {
        fontSize: '20px'
    },
    qrCode: {
        position: "absolute",
        // marginTop: -55,
        // marginLeft: 26
        left: 0,
        top: -35
    },
    text2: {
        fontSize: '12px !important',
        paddingRight: 35,
    },
    text3: {
        fontSize: '16px !important',
    },
    text4: {
        fontSize: '10px !important',
        marginLeft: 20
    },
    text5: {
        fontSize: '12px !important',
    },
    text6: {
        fontSize: '9px !important',
    }

});
const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

class PrintFeeReciept extends React.Component {
    state = {
       totalFee:'', monthName:"", schoolName: '', schoolNumber: '', schoolAddress: '', studentName: "", adharNumber: "", motherName: '', fatherName: '', className:'', cellNumber: '', dob: ''

    }
    setStudentClass = (classid) => {
        let className = ''
        if(this.props.currentUser.userDetails.accouttype == 1){
            classOptions0to5.map((item)=>{
                if(classid === item.value){
                    className = item.label
                }
            })
        }else{
            classOptions6to12.map((item)=>{
                if(classid === item.value){
                    className = item.label
                }
            })
        }
        return className
    }
    setStudentSection = (section) => {
        let sectionName = ''
        sectionOptions.map((item)=>{
            if(section === item.value){
                sectionName = item.label
            }
        })
        return sectionName
    }
    async componentDidMount() {
        let studentid = this.props.match.params.studentid
        let res = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getfeeprintdetails/' + studentid, null);
        if (res.data.status === 1) {
            let data = res.data.statusDescription
            this.setState({
                schoolName: data.schoolName, schoolNumber: data.schoolNumber, schoolAddress: data.schoolAddress, studentName: data.studentName, adharNumber: data.adharNumber, motherName: data.motherName, fatherName: data.fatherName, className: this.setStudentClass(data.class)+" "+ this.setStudentSection(data.section), cellNumber: data.cellNumber, dob: data.dob
            })
        }
        let url = '/api/studentfeeservice/feedetails/' + studentid;
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            var fee = response.data.studentFeeDetails;
            var str = response.data.studentFeeStructure;
            this.setState({startSpinner:false})
            if(response.data.studentFeeDetails){
                let feeObject = Object.values(fee)
            var feeObjArray = []
                for(let i=0;i<feeObject.length;i++){
                    if(feeObject[i] !== null){
                        feeObjArray.push(feeObject[i])
                    }
                }
                this.setState({totalFee:feeObjArray[feeObjArray.length-1]})   
            }
            if(response.data.studentFeeStructure){
                let feeMonth = Object.keys(str)
                let feeMonthName = []
                for(let i=0;i<feeMonth.length;i++){
                    if(feeMonth[i] !== null){
                        feeMonthName.push(feeMonth[i])
                    }
                }
                this.setState({monthName:feeMonthName[feeObjArray.length-1]}) 
        }

            this.setState({ submited: false })

        }else if(response.data.status === 2){
            this.setState({startSpinner:false,isError:true, errorMessage:response.data.statusDescription})
        }else{
            this.setState({startSpinner:false,isError:true, errorMessage:"Something went wrong. Try again some time."})
        }
    }
    todayDate() {
        var today = new Date();
        return (
            <Moment format="MMMM D, YYYY" withTitle>
                <b>{today}</b>
            </Moment>
        );
    }
    render() {
        // console.log(this.props,'propsss')
        const stuPrintData = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet>
                    <title>
                        {"Student Fee Details"}
                    </title>
                </Helmet>
                <Grid container id="section-to-print" className="graphTable">
                    <Grid item lg={4} md={4}>
                        <Typography variant="h6">Registration No. {stuPrintData.schoolNumber}</Typography>
                    </Grid>
                    <Grid item lg={5} md={5} style={{ marginLeft: "20px" }}>
                        <Typography variant="h4">{stuPrintData.schoolName}</Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan="2" className={classes.tableHeading}> <h3>Student Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Student Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.studentName} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Mother Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.motherName} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Father Name  </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.fatherName} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> AAdhar Number  </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.adharNumber} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Cell Number  </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.cellNumber} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Date of Birth</TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.dob} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}> Class </TableCell>
                                            <TableCell className={classes.tableCell}> {stuPrintData.className} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan="2" className={classes.tableHeading}> <h3>Student Fee Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>{this.state.monthName}</TableCell>
                                            <TableCell className={classes.tableCell}>{this.state.totalFee}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>
        )
    }
}
export default withStyles(styles)(AuthenticatedPage(["Teacher", "FeeAccount"])(PrintFeeReciept));