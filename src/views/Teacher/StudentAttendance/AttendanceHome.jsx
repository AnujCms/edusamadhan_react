import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Avatar, Button, Typography} from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Helmet } from "react-helmet";
import { connect } from 'formik';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import AdminImage from '../../../assets/images/admin.png';
import _ from 'lodash';
import Spinner from '@material-ui/core/CircularProgress';

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

class AttendanceHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true, students: '', students: [], errorMessage: '', isError: false
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
            name: "studentName",
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
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
                    return <p style={{ color: value=="P"?"green":(value=="A"?"red":"blue" )}}><b>{value}</b></p>
                }
            }
        }
    ];
    calculateAttendanceType = (attendance) =>{
        if(attendance == 1){
            return "P"
        }else if(attendance == 2){
            return "A"
        }else if(attendance == 3){
            return "L"
        }
    }
    
    async componentDidMount() {
        let startDate = '2020-06-07'
        let endDate = '2020-06-10'
        let result = await this.props.authenticatedApiCall('get', `/api/teacherservice/getClassAttendanceOfSelecteddates/${startDate}/${endDate}`, null);
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        // let getdailyattendance = await this.props.authenticatedApiCall('get', '/api/teacherservice/getdailyattendance', null);
        
        let filterData = result.data.statusDescription.filter((item, i) => {
            response.data.statusDescription.map((studentData) => {
                if (item.studentId === studentData.userid) {
                    item.studentName = studentData.firstname + " " + studentData.lastname;
                    item.images = studentData.images
                }
            })
            return item;
        });
        const grouped = _.groupBy(filterData, "studentId");
        let separatedArray = Object.keys(grouped).map((key) => grouped[key]);
        let newArray = separatedArray.map((attendanceOfDay) => {
            let obj = {};
            obj.studentId = attendanceOfDay[0].studentId;
            obj.studentName = attendanceOfDay[0].studentName;
            obj.images = attendanceOfDay[0].images;
            attendanceOfDay.forEach((item)=>{
                let dayName = new Date(item.attendanceDate).getDate();
                let attendanceStatus = this.calculateAttendanceType(item.attendance)
                if (dayName == 1) {
                    obj.first = attendanceStatus
                } else if (dayName == 2) {
                    obj.second = attendanceStatus
                } else if (dayName == 3) {
                    obj.third = attendanceStatus
                } else if (dayName == 4) {
                    obj.four = attendanceStatus
                } else if (dayName == 5) {
                    obj.five = attendanceStatus
                } else if (dayName == 6) {
                    obj.six = attendanceStatus
                } else if (dayName == 7) {
                    obj.seven = attendanceStatus
                } else if (dayName == 8) {
                    obj.eight = attendanceStatus
                } else if (dayName == 9) {
                    obj.nine = attendanceStatus
                } else if (dayName == 10) {
                    obj.ten = attendanceStatus
                } else if (dayName == 11) {
                    obj.eleven = attendanceStatus
                } else if (dayName == 12) {
                    obj.twelve = attendanceStatus
                } else if (dayName == 13) {
                    obj.thirteen = attendanceStatus
                } else if (dayName == 14) {
                    obj.fourteen = attendanceStatus
                } else if (dayName == 15) {
                    obj.fifteen = attendanceStatus
                } else if (dayName == 16) {
                    obj.sixteen = attendanceStatus
                } else if (dayName == 17) {
                    obj.seventeen = attendanceStatus
                } else if (dayName == 18) {
                    obj.eighteen = attendanceStatus
                } else if (dayName == 19) {
                    obj.nineteen = attendanceStatus
                } else if (dayName == 20) {
                    obj.twenty = attendanceStatus
                } else if (dayName == 21) {
                    obj.twentyone = attendanceStatus
                } else if (dayName == 22) {
                    obj.twentytwo = attendanceStatus
                } else if (dayName == 23) {
                    obj.twentythree = attendanceStatus
                } else if (dayName == 24) {
                    obj.twentyfour = attendanceStatus
                } else if (dayName == 25) {
                    obj.twentyfive = attendanceStatus
                } else if (dayName == 26) {
                    obj.twentysix = attendanceStatus
                } else if (dayName == 27) {
                    obj.twentyseven = attendanceStatus
                } else if (dayName == 28) {
                    obj.twentyeight = attendanceStatus
                } else if (dayName == 29) {
                    obj.twentynine = attendanceStatus
                } else if (dayName == 30) {
                    obj.thirty = attendanceStatus
                } else if (dayName == 31) {
                    obj.thirtyone = attendanceStatus
                }
            })

            return obj;
        });
        this.setState({ students: newArray, isLoading: false })
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
                   {this.state.isLoading&& <Spinner style={{ position: "absolute", top: "30%", left: "45%", zIndex: '99999' }} />}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Attendance'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="attendanceList" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(connect(AttendanceHome))));