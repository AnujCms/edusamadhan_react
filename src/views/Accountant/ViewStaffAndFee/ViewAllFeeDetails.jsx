import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Avatar } from '@material-ui/core';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import AdminImage from '../../../assets/images/admin.png';
import ClassSection from '../../../components/ClassSection';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class ViewAllFeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            sectionId: string().required("This field is required"),
        });
        this.fieldVariables = { classId: "", sectionId: "" }
        this.state = {
            totalClassFee: '', totalSubmittedFee: '', totalDueFee: '', showStudents: false, studentsFeeDetails: [], studentName: '', isDelete: false, isError: false, errorMessage: ''
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
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "busService",
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
            label: "Sum",
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
    handleAllFeeDetails = (response) => {
        let filterData = response.data.statusDescription.studentData.filter((item, i) => {
            item.submittedSum = 0;
            response.data.statusDescription.submittedfee.map((studentFeeData) => {
                if (item.studentId === studentFeeData.studentId) {
                    if (studentFeeData.january != null) {
                        item.january = JSON.parse(studentFeeData.january)[0].schoolFee;
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
                if (item.studentId === transportFeeData.studentId) {
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
                        }
                        else {
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
                        if (item.may == undefined) {
                            item.may = JSON.parse(transportFeeData.may)[0].transportFee
                            item.submittedSum = item.submittedSum + JSON.parse(transportFeeData.may)[0].transportFee;
                        } else {
                            item.may = item.may + JSON.parse(transportFeeData.may)[0].transportFee;
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
            if (item.busService == 1) {
                item.totalFee = item.totalFee + item.transportFee * 12
                item.due = item.totalFee - item.submittedSum;
            } else {
                item.due = item.totalFee - item.submittedSum;
            }
            item.busService = item.busService == 1 ? `Yes(${item.transportFee})` : "No"
            return item;
        });
        this.setState({ showStudents: true, studentsFeeDetails: filterData })
    }
    componentDidMount = async () => {
        if (this.props.currentUser.userDetails.role == 'Teacher') {
            let classId = this.props.classId;
            let sectionId = this.props.sectionId;
            let response = await this.props.authenticatedApiCall('get', '/api/accountantservice/getfullfeedetails/' + classId + "/" + sectionId, null);
            if (response.data.status == 1) {
                this.handleAllFeeDetails(response)
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, studentsFeeDetails: [] })
            }
        }
    }
    handleSubmit = async (values) => {
        this.setState({ showStudents: false })
        let response = await this.props.authenticatedApiCall('get', '/api/accountantservice/getfullfeedetails/' + values.classId.value + "/" + values.sectionId.value, null);
        if (response.data.status == 1) {
            this.handleAllFeeDetails(response)
        }
        else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, studentsFeeDetails: [] })
        }
    }
    backDashboard = () => {
        // this.props.history.push(`./studentlist`)
        this.setState({ isError: false })
    }
    handleBackHome = () => {
        if (this.props.currentUser.userDetails.role === 'FeeAccount') {
            this.props.history.push('./studentslist')
        } else if (this.props.currentUser.userDetails.role === 'Principal') {
            this.props.history.push('./teacherlist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        {(this.props.currentUser.userDetails.role !== 'Teacher') && <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <ClassSection />
                                </Form>
                            )}
                        </Formik>}
                        <MuiThemeDataTable title={'Students Fee Details'} rows={this.state.studentsFeeDetails} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayPatientDetailsFOrMobileView} tableContent="viewFullFeeDetails" />
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}


export default withStyles(styles)(AuthenticatedPage()(ViewAllFeeDetails));
