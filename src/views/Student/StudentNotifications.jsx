import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button } from '@material-ui/core';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});
class StudentNotifications extends React.Component {
    state = {
     students: [], errorMessage: '', isError: false
    };

    tableheads1 = [
        {
            name: "createdby",
            label: "Created By",
            options: {
                filter: false,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "notificationsubject",
            label: "Notification Subject",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationcreateddate",
            label: "Created Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "notificationdescription",
            label: "Notification Details",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        }
    ];
   
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/notificationservice/getschoolnotificationsbyuserrole', null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item)=>{
                item.action = {notificationid:item.notificationid}
                if(item.notificationuser === 6){item.notificationuser = 'Student'}
                else if(item.notificationuser === 3){item.notificationuser = 'Faculty'}
                else if(item.notificationuser === 5){item.notificationuser = 'Accountant'}
                else if(item.notificationuser === 4){item.notificationuser = 'Exam Head'}
                else if(item.notificationuser === 10){item.notificationuser = 'All Users'}

                if(item.createdby === 2){item.createdby = 'Principal'}
                else if(item.createdby === 3){item.createdby = 'Class Teacher'}
            })
            this.setState({
                students: response.data.statusDescription
            })
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    displayNotificationDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./notificationDetails', this.state.students[rowMeta.dataIndex])
    }
    backDashboard = ()=>{
        this.setState({isError:false})
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <MuiThemeDataTable title={'Notifications List'} rows={this.state.students} columns={this.tableheads1} rowNotificationDetailsRedirectFunction={this.displayNotificationDetailsForMobileView} tableContent="notificationsList" />
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Student")(WithAccount(StudentNotifications)));