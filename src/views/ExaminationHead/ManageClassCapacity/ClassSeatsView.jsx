import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import ActionButtonForClassSeats from './ActionButtonForClassSeats';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import { connect } from 'formik';
import queryString from 'query-string';
import { handleClassLabel, handleSectionLabel } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class ClassSeatsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classSeatsArray: [], isSuccess: false, successMessage: "", isError: false, errorMessage: ""
        }
    }
    tableheads1 = [
        {
            name: "classId",
            label: "Class",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "sectionId",
            label: "Section",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "totalRows",
            label: "Total Rows",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "totalColumns",
            label: "Total Columns",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "totalSeats",
            label: "Total Seats",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButtonForClassSeats classSeatId={value.classSeatId} handleDeleteClassSeats={this.handleDeleteClassSeats} handleEditClassSeats={this.handleEditClassSeats} />
                    )
                }
            }
        }
    ];

    handleDeleteClassSeats = async (classSeatId) => {
        let response = await this.props.authenticatedApiCall('delete', "/api/examinationservice/deleteclassseatsdetails/" + classSeatId, null);
        if (response.data.status === 1) {
            this.setState({ reRender: false, isSuccess: true, successMessage: response.data.statusDescription });
        } else {
            this.setState({ isError: true, successMessage: response.data.statusDescription });
        }
    }

    componentDidMount = async () => {
        let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getclassseatsdetails", null);
        if (response.data.status === 1) {
            response.data.statusDescription.forEach((item) => {
                item.Action = { classSeatId: item.classSeatId }
                item.classId = handleClassLabel(item.classId, this.props.currentUser.userDetails.userType)
                item.sectionId = handleSectionLabel(item.sectionId)
            })
            this.setState({ classSeatsArray: response.data.statusDescription })
        }
    }

    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'createclass';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const HeaderText = "Success"
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <>
                <MuiThemeDataTable title={'Class Seats Details'} rows={this.state.classSeatsArray} columns={this.tableheads1} tableContent="entranceStudentList" />
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(ClassSeatsView)));