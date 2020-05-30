import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button, Avatar } from '@material-ui/core';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import ErrorDialog from '../../components/ErrorDialog';
import AdminImage from '../../assets/images/admin.png';

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
            response.data.statusDescription.forEach((item) => {
                // item.feesum = item.january + item.february + item.march + item.april + item.may + item.june + item.july + item.august + item.september + item.october + item.november + item.december;
                if (item.busservice == 2) {
                    item.busservice = "Yes";
                    if (item.totalFee == 0) {
                        item.totalFee = 0
                        item.due = 0
                    } else {
                        item.totalFee = item.totalFee + 12 * item.transport
                        item.due = item.totalFee - item.submittedSum;
                    }
                } else {
                    if (item.totalFee == 0) {
                        item.totalFee = 0
                        item.due = 0
                    } else {
                        item.due = item.totalFee - item.submittedSum;
                    }
                    item.busservice = "No"
                }
            });
            this.setState({
                studentsFeeDetails: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
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
