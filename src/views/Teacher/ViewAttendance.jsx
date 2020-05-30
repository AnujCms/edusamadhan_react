import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button } from '@material-ui/core';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 8,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class AttendanceList extends React.Component {
    state = {
        Results: [], isError: false, errorMessage: ''
    };

    tableheads1 = [
        {
            name: "studentid",
            label: "SR. No.",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "jtd",
            label: "JAN TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "jpd",
            label: "JAN PD",
            options: {
                filter: true,
                sort: true,
                searchable: true,
            }
        },

        {
            name: "ftd",
            label: "FEB TD",
            options: {
                filter: true,
                sort: true,
                searchable: false
            }
        },
        {
            name: "fpd",
            label: "FEB PD",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "mtd",
            label: "MAR TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "mpd",
            label: "MAR PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "atd",
            label: "APR TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "apd",
            label: "APR PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "matd",
            label: "MAY TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "mapd",
            label: "MAY PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "jutd",
            label: "JUN TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "jupd",
            label: "JUN PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "jultd",
            label: "JUL TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "julpd",
            label: "JUL PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "autd",
            label: "AUG TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "aupd",
            label: "AUG PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "std",
            label: "SEP TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "spd",
            label: "SEP PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "otd",
            label: "OCT TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "opd",
            label: "OCT PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "dtd",
            label: "DEC TD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "dpd",
            label: "DEC PD",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        }
    ];

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getstudentsattendance', null);
        if (response.data.status == 1) {
            this.setState({ Results: response.data.statusDescription })
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
                <GridContainer justify="center">
                    <GridItem md={12}>
                        <br></br>
                        <MuiThemeDataTable title={'Students Attendance'} rows={this.state.Results} columns={this.tableheads1} />
                        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["Teacher"])(AttendanceList));
