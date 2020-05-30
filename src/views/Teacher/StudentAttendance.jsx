import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, Button, Typography, Table } from '@material-ui/core';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import AttendanceUI from './Attendance';

const styles = theme => ({

});

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            students: [],
            studentObj: []
        }
    }

    tableheads1 = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "first",
            label: "1",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "2",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "3",
            options: {
                filter: true,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "4",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "5",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "6",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "7",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "8",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "9",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "10",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "11",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "12",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "13",
            options: {
                filter: true,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "14",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "15",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "16",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "17",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "18",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "19",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "20",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "21",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "22",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "23",
            options: {
                filter: true,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "24",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "25",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "26",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "27",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "28",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "29",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "30",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        },
        {
            name: "first",
            label: "31",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (
                        <AttendanceUI name={value.name} classid={value.classid} section={value.section} handleCheckBox={this.handleCheckBox} studentId={value.userid} />
                    )
                }
            }
        }
    ];

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        let getdailyattendance = await this.props.authenticatedApiCall('get', '/api/teacherservice/getdailyattendance', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.first = {
                    userid: item.userid, classid:item.classid, section:item.section 
                }

            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        }
    }

    render() {
        const { anchorEl } = this.state;
        const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let currentMonth = monthName[new Date().getMonth()];
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                    <AttendanceUI studentsList={this.state.students}/>
                        {/* <MuiThemeDataTable title={`Students Attendance of ${currentMonth}`} rows={this.state.students} columns={this.tableheads1} /> */}
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(AuthenticatedPage(["Teacher"])(HomePage)));
