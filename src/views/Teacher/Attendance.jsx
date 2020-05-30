import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Avatar, Button, Typography, Paper, TextField } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import SimpleCheckBox from '../../components/FormikValidatedComponents/SimpleCheckBox';
import { Formik, Form, Field, connect } from 'formik';
import AttendanceUI from './AttendanceUI';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import AdminImage from '../../assets/images/admin.png';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    container: { display: 'flex', flexWrap: 'wrap' },
    textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: 200 },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    bodyUI: { height: "100%", width: "100%", padding: "20px 50px 0px 50px", background: '#d6eef8' },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

const periodsObjects = [{ value: 1, label: "1st Period" }, { value: 2, label: "2nd Period" }, { value: 3, label: "3rd Period" }, { value: 4, label: "4th Period" }, { value: 5, label: "5th Period" }, { value: 6, label: "6th Period" }, { value: 7, label: "7th Period" }, { value: 8, label: "8th Period" }, { value: 9, label: "9th Period" }, { value: 10, label: "10th Lunch Break" }]

class Attendance extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        this.fieldVariables = {
            periodDetails: []
        }
        this.state = {
            students: '', periodObj: "", periodStartTime: "07:30", periodEndTime: "08:30", successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
        };
    }
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
                sort: true,
                searchable: true
            }
        },
        {
            name: "first",
            label: "1",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "second",
            label: "2",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "third",
            label: "3",
            options: {
                filter: false,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "four",
            label: "4",
            options: {
                filter: false,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "five",
            label: "5",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "six",
            label: "6",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "seven",
            label: "7",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "eight",
            label: "8",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "nine",
            label: "9",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "ten",
            label: "10",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "eleven",
            label: "11",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twelve",
            label: "12",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "thirteen",
            label: "13",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "fourteen",
            label: "14",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "fifteen",
            label: "15",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "sixteen",
            label: "16",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "seventeen",
            label: "17",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "eighteen",
            label: "18",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "nineteen",
            label: "19",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twenty",
            label: "20",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentyone",
            label: "21",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentytwo",
            label: "22",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentythree",
            label: "23",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentyfour",
            label: "24",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentyfive",
            label: "25",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentysix",
            label: "26",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentyseven",
            label: "27",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentyeight",
            label: "28",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "twentynine",
            label: "29",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "thirty",
            label: "30",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "thirtyone",
            label: "31",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ color: value=="P"?"green":"red" }}><b>{value}</b></p>
                }
            }
        }
    ];
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        let getdailyattendance = await this.props.authenticatedApiCall('get', '/api/teacherservice/getdailyattendance', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item, index) => {
                item.name = item.firstname + " " + item.lastname;
                item.first = {
                    userid: item.userid, classid: item.classid, section: item.section
                }
            });

            if (getdailyattendance.data.status == 1) {
                getdailyattendance.data.statusDescription.map((item, index) => {
                    console.log(index)
                    item.name = item.firstname + " " + item.lastname
                    item.images = item.images
                    console.log('item', item)
                    let monthNameData = null;
                    if (item.january !== undefined) {
                        monthNameData = JSON.parse(item.january)
                    } else if (item.february !== undefined) {
                        monthNameData = JSON.parse(item.february)
                    } else if (item.march !== undefined) {
                        monthNameData = JSON.parse(item.march)
                    } else if (item.april !== undefined) {
                        monthNameData = JSON.parse(item.april)
                    } else if (item.may !== undefined) {
                        monthNameData = JSON.parse(item.may)
                    } else if (item.june !== undefined) {
                        monthNameData = JSON.parse(item.june)
                    } else if (item.july !== undefined) {
                        monthNameData = JSON.parse(item.july)
                    } else if (item.august !== undefined) {
                        monthNameData = JSON.parse(item.august)
                    } else if (item.september !== undefined) {
                        monthNameData = JSON.parse(item.september)
                    } else if (item.october !== undefined) {
                        monthNameData = JSON.parse(item.october)
                    } else if (item.november !== undefined) {
                        monthNameData = JSON.parse(item.november)
                    } else if (item.december !== undefined) {
                        monthNameData = JSON.parse(item.december)
                    }
                    let absentAttendance = []
                    for (let i = 1; i <= new Date().getDate(); i++) {
                        absentAttendance.push(i.toString())
                    }
                    let abcObj = []
                    absentAttendance.map((item) => {
                        if (monthNameData !== null) {
                            if (!monthNameData.includes(item)) {
                                abcObj.push(item)
                            }
                        } else {
                            abcObj = absentAttendance
                        }
                    })
                    if (monthNameData != null) {
                        monthNameData.map((date) => {
                            if (date == 1) {
                                item.first = "P"
                            } else if (date == 2) {
                                item.second = "P"
                            } else if (date == 3) {
                                item.third = "P"
                            } else if (date == 4) {
                                item.four = "P"
                            } else if (date == 5) {
                                item.five = "P"
                            } else if (date == 6) {
                                item.six = "P"
                            } else if (date == 7) {
                                item.seven = "P"
                            } else if (date == 8) {
                                item.eight = "P"
                            } else if (date == 9) {
                                item.nine = "P"
                            } else if (date == 10) {
                                item.ten = "P"
                            } else if (date == 11) {
                                item.eleven = "P"
                            } else if (date == 12) {
                                item.twelve = "P"
                            } else if (date == 13) {
                                item.thirteen = "P"
                            } else if (date == 14) {
                                item.fourteen = "P"
                            } else if (date == 15) {
                                item.fifteen = "P"
                            } else if (date == 16) {
                                item.sixteen = "P"
                            } else if (date == 17) {
                                item.seventeen = "P"
                            } else if (date == 18) {
                                item.eighteen = "P"
                            } else if (date == 19) {
                                item.nineteen = "P"
                            } else if (date == 20) {
                                item.twenty = "P"
                            } else if (date == 21) {
                                item.twentyone = "P"
                            } else if (date == 22) {
                                item.twentytwo = "P"
                            } else if (date == 23) {
                                item.twentythree = "P"
                            } else if (date == 24) {
                                item.twentyfour = "P"
                            } else if (date == 25) {
                                item.twentyfive = "P"
                            } else if (date == 26) {
                                item.twentysix = "P"
                            } else if (date == 27) {
                                item.twentyseven = "P"
                            } else if (date == 28) {
                                item.twentyeight = "P"
                            } else if (date == 29) {
                                item.twentynine = "P"
                            } else if (date == 30) {
                                item.thirty = "P"
                            } else if (date == 31) {
                                item.thirtyone = "P"
                            }
                        })
                    }
                    if (abcObj.length > 0) {
                        abcObj.map((date) => {
                            if (date == 1) {
                                item.first = "A"
                            } else if (date == 2) {
                                item.second = "A"
                            } else if (date == 3) {
                                item.third = "A"
                            } else if (date == 4) {
                                item.four = "A"
                            } else if (date == 5) {
                                item.five = "A"
                            } else if (date == 6) {
                                item.six = "A"
                            } else if (date == 7) {
                                item.seven = "A"
                            } else if (date == 8) {
                                item.eight = "A"
                            } else if (date == 9) {
                                item.nine = "A"
                            } else if (date == 10) {
                                item.ten = "A"
                            } else if (date == 11) {
                                item.eleven = "A"
                            } else if (date == 12) {
                                item.twelve = "A"
                            } else if (date == 13) {
                                item.thirteen = "A"
                            } else if (date == 14) {
                                item.fourteen = "A"
                            } else if (date == 15) {
                                item.fifteen = "A"
                            } else if (date == 16) {
                                item.sixteen = "A"
                            } else if (date == 17) {
                                item.seventeen = "A"
                            } else if (date == 18) {
                                item.eighteen = "A"
                            } else if (date == 19) {
                                item.nineteen = "A"
                            } else if (date == 20) {
                                item.twenty = "A"
                            } else if (date == 21) {
                                item.twentyone = "A"
                            } else if (date == 22) {
                                item.twentytwo = "A"
                            } else if (date == 23) {
                                item.twentythree = "A"
                            } else if (date == 24) {
                                item.twentyfour = "A"
                            } else if (date == 25) {
                                item.twentyfive = "A"
                            } else if (date == 26) {
                                item.twentysix = "A"
                            } else if (date == 27) {
                                item.twentyseven = "A"
                            } else if (date == 28) {
                                item.twentyeight = "A"
                            } else if (date == 29) {
                                item.twentynine = "A"
                            } else if (date == 30) {
                                item.thirty = "A"
                            } else if (date == 31) {
                                item.thirtyone = "A"
                            }
                        })
                    }
                })
            }
            this.setState({
                students: getdailyattendance.data.statusDescription, isLoading: false
            })
        }
    }
    handleTakeAttendance = () => {
        this.props.history.push('./takeattendance')
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Class Attendance</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Class Attendance</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleTakeAttendance} className={classes.primaryBtn}>Take Attendance</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Attendance'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="attendanceList" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(connect(Attendance))));