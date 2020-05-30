import React from 'react';
import { withStyles, Button, Avatar } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import ActionButton from './ActionButtonForSuperAdmin';
import queryString from 'query-string';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing.unit * 10,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class ManageAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [], isLocked: false, isUnlocked: false
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
                        <Avatar alt="No Images" src={value === null?AdminImage:"data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
                    )
                }
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                searchable: true,
            }
        },
        {
            name: "accountname",
            label: "School Name",
            options: {
                filter: false,
                sort: true,
                searchable: true,
            }
        },

        {
            name: "accountrefnumber",
            label: "Registration No.",
            options: {
                filter: true,
                sort: false,
                searchable: true
            }
        },
        {
            name: "name",
            label: "Principal",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },
        {
            name: "emailid",
            label: "Email Id",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "adharnumber",
            label: "AAdhar Number",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },
        {
            name: "cellnumber",
            label: "Contact no.",
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
                        <ActionButton accountid={value.accountid} status={value.status} handleUnlockAccount={this.onHandleUnlockAccount} handleLockAccount={this.onHandleLockAccount} handleEditAccountClick={this.onHandleEditAccount} />
                    )
                }
            }
        },

    ];
    //Inactivate the account
    onHandleLockAccount = async (accountid) => {
        let response = await this.props.authenticatedApiCall('put', '/api/superadminservice/' + accountid + '/lockaccount', null);
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }

    //Deactivate the account
    onHandleUnlockAccount = async (accountid) => {
        let response = await this.props.authenticatedApiCall('put', '/api/superadminservice/' + accountid + '/unlockaccount', null);
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    //Edit Account
    onHandleEditAccount = (accountId) => {
        this.props.history.push('./edit-account/' + accountId);
    }

    //fetching the data from API
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/getallschooladmin', null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = { accountid: item.accountid, status: item.status }
                if (item.status == 1) { item.status = 'Active' }
                else if (item.status == 2) { item.status = 'Inactive' }
                else if (item.status == 3) { item.status = 'Lock' }
            });
            this.setState({ rows: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }

    backDashboard1 = () => {
        this.props.history.push(`./manage-account`)
        this.setState({ isLocked: false })
    }
    backDashboardUpdate = () => {
        var parsed = {}
        parsed.reloadTo = 'manage-account';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ isUnlocked: false })
    }
    backDashboard = () => {
        this.setState({ isLocked: false })
        var parsed = {}
        parsed.reloadTo = 'manage-account';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Accounts List</title></Helmet>
                <MuiThemeDataTable title={'Schools List'} rows={this.state.rows} columns={this.tableheads1} />
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(ManageAccount));
