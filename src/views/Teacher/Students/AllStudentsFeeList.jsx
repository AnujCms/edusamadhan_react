import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Avatar } from '@material-ui/core';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import ErrorDialog from '../../../components/ErrorDialog';
import AdminImage from '../../../assets/images/admin.png';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class AllStudentsFeeList extends React.Component {
    state = {
        studentsFeeDetails: [], studentName: '', isDelete: false, isError: false, errorMessage: ''
    };

    tableheads1 = [
        {
            name: "images",
            label: "Photo",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <Avatar alt="No Images" src={value === null ? AdminImage : "data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
                    )
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "busservice",
            label: "Transport",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "january",
            label: "Jan",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "february",
            label: "Feb",
            options: {
                filter: false,
                sort: false,
                searchable: false,
            }
        },

        {
            name: "march",
            label: "Mar",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "april",
            label: "Apr",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "may",
            label: "May",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "june",
            label: "Jun",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "july",
            label: "Jul",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "august",
            label: "Aug",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "september",
            label: "Sep",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "october",
            label: "Oct",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "november",
            label: "Nov",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "december",
            label: "Dec",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "totalFee",
            label: "Total",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "submittedSum",
            label: "Submitted",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "due",
            label: "Due",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        }
    ];

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getfeedetailsforteacher', null);
        if (response.data.status == 1) {
            let filterData = response.data.statusDescription.studentData.filter((item, i) => {
                item.submittedSum = 0;
                item.busservice = item.busservice == 2 ? "Yes" : "No"
                response.data.statusDescription.submittedfee.map((studentFeeData) => {
                    if (item.adharnumber === studentFeeData.adharnumber) {
                        if (studentFeeData.january != null) {
                            item.janurary = JSON.parse(studentFeeData.january)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.january)[0].schoolFee;
                        }
                        if (studentFeeData.february != null) {
                            item.february = JSON.parse(studentFeeData.february)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.february)[0].schoolFee;
                        }
                        if (studentFeeData.march != null) {
                            item.march = JSON.parse(studentFeeData.march)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.march)[0].schoolFee;
                        }
                        if (studentFeeData.april != null) {
                            item.april = JSON.parse(studentFeeData.april)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.april)[0].schoolFee;
                        }
                        if (studentFeeData.may != null) {
                            item.may = JSON.parse(studentFeeData.may)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.may)[0].schoolFee;
                        }
                        if (studentFeeData.june != null) {
                            item.june = JSON.parse(studentFeeData.june)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.june)[0].schoolFee;
                        }
                        if (studentFeeData.july != null) {
                            item.july = JSON.parse(studentFeeData.july)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.july)[0].schoolFee;
                        }
                        if (studentFeeData.august != null) {
                            item.august = JSON.parse(studentFeeData.august)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.august)[0].schoolFee;
                        }
                        if (studentFeeData.september != null) {
                            item.september = JSON.parse(studentFeeData.september)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.september)[0].schoolFee;
                        }
                        if (studentFeeData.october != null) {
                            item.october = JSON.parse(studentFeeData.october)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.october)[0].schoolFee;
                        }
                        if (studentFeeData.november != null) {
                            item.november = JSON.parse(studentFeeData.november)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.november)[0].schoolFee;
                        }
                        if (studentFeeData.december != null) {
                            item.december = JSON.parse(studentFeeData.december)[0].schoolFee;
                            item.submittedSum = item.submittedSum + JSON.parse(studentFeeData.december)[0].schoolFee;
                        }
                    }
                })
                response.data.statusDescription.studenttransportfee.map((transportFeeData) => {
                    if (item.adharnumber === transportFeeData.adharnumber) {
                        if (transportFeeData.january != null) {
                            if (item.january == undefined) {
                                item.january = JSON.parse(transportFeeData.january)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.january)[0].transportFee;
                            } else {
                                item.january = item.january + JSON.parse(transportFeeData.january)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.january)[0].transportFee;
                            }
                        }
                        if (transportFeeData.february != null) {
                            if (item.february == undefined) {
                                item.february = JSON.parse(transportFeeData.february)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.february)[0].transportFee;
                            } else {
                                item.february = item.february + JSON.parse(transportFeeData.february)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.february)[0].transportFee;
                            }
                        }
                        if (transportFeeData.march != null) {
                            if (item.march == undefined) {
                                item.march = JSON.parse(transportFeeData.march)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.march)[0].transportFee;
                            } else {
                                item.march = item.march + JSON.parse(transportFeeData.march)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.march)[0].transportFee;
                            }
                        }
                        if (transportFeeData.april != null) {
                            if (item.april == undefined) {
                                item.april = JSON.parse(transportFeeData.april)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.april)[0].transportFee;
                            } else {
                                item.april = item.april + JSON.parse(transportFeeData.april)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.april)[0].transportFee;
                            }
                        }
                        if (transportFeeData.may != null) {
                            if (item.june == undefined) {
                                item.june = JSON.parse(transportFeeData.june)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.may)[0].transportFee;
                            } else {
                                item.june = item.june + JSON.parse(transportFeeData.june)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.may)[0].transportFee;
                            }
                        }
                        if (transportFeeData.june != null) {
                            if (item.june == undefined) {
                                item.june = JSON.parse(transportFeeData.june)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.june)[0].transportFee;
                            } else {
                                item.june = item.june + JSON.parse(transportFeeData.june)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.june)[0].transportFee;
                            }
                        }
                        if (transportFeeData.july != null) {
                            if (item.july == undefined) {
                                item.july = JSON.parse(transportFeeData.july)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.july)[0].transportFee;
                            } else {
                                item.july = item.july + JSON.parse(transportFeeData.july)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.july)[0].transportFee;
                            }
                        }
                        if (transportFeeData.august != null) {
                            if (item.august == undefined) {
                                item.august = JSON.parse(transportFeeData.august)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.august)[0].transportFee;
                            } else {
                                item.august = item.august + JSON.parse(transportFeeData.august)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.august)[0].transportFee;
                            }
                        }
                        if (transportFeeData.september != null) {
                            if (item.september == undefined) {
                                item.september = JSON.parse(transportFeeData.september)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.september)[0].transportFee;
                            } else {
                                item.september = item.september + JSON.parse(transportFeeData.september)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.september)[0].transportFee;
                            }
                        }
                        if (transportFeeData.october != null) {
                            if (item.october == undefined) {
                                item.october = JSON.parse(transportFeeData.october)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.october)[0].transportFee;
                            } else {
                                item.october = item.october + JSON.parse(transportFeeData.october)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.october)[0].transportFee;
                            }
                        }
                        if (transportFeeData.november != null) {
                            if (item.november == undefined) {
                                item.november = JSON.parse(transportFeeData.november)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.november)[0].transportFee;
                            } else {
                                item.november = item.november + JSON.parse(transportFeeData.november)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.november)[0].transportFee;
                            }
                        }
                        if (transportFeeData.december != null) {
                            if (item.december == undefined) {
                                item.december = JSON.parse(transportFeeData.december)[0].transportFee
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.december)[0].transportFee;
                            } else {
                                item.december = item.december + JSON.parse(transportFeeData.december)[0].transportFee;
                                item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.december)[0].transportFee;
                            }
                        }
                    }
                })
                if(item.busservice == "Yes"){
                    item.totalFee = item.totalFee + item.transportFee*12
                    console.log(item.totalFee + item.transportFee*12)
                    item.due = item.transportFee * 12 + item.totalFee - item.submittedSum;
                }else{
                    item.due = item.transportFee + item.totalFee - item.submittedSum;
                }
                return item;
            });
            this.setState({ showStudents: true, studentsFeeDetails: filterData })
        }
        else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    backDashboard = () => {
        this.props.history.push(`./studentlist`)
        this.setState({ isError: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <br></br>
                <MuiThemeDataTable title={'Students Fee Details'} rows={this.state.studentsFeeDetails} columns={this.tableheads1} tableContent="attendanceList" />
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}


export default withStyles(styles)(AuthenticatedPage(["Teacher"])(AllStudentsFeeList));
