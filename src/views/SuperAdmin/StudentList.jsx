import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, Avatar } from '@material-ui/core';
import ActionButton from '../../components/LogbookForSuperAdmin';
import Paper from '@material-ui/core/Paper';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
        selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" }
});

class StudentList extends React.Component {
    state = {
        accounts: [], accountid: null, providers: [], providerid: null, students: [], studentName: ''
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
                        <Avatar alt="No Images" src={value === null?AdminImage:"data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
                    )
                }
            }
        },
        {
            name: "roll",
            label: "AAdhar Number",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },

        {
            name: "mothername",
            label: "Mother",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "fathername",
            label: "Father",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "cellnumber",
            label: "Mobile",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        // {
        //     name: "dob",
        //     label: "Birth Date",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         searchable: true
        //     }
        // },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "religion",
            label: "Religion",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "locality",
            label: "locality",
            options: {
                filter: true,
                sort: true,
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
                        <ActionButton studentid={value.studentid} teacherid={this.state.providerid.value} studentName={value.studentName} onLogBookClick={this.onLogBookClick} />
                    )
                }
            }
        }
    ];
    onLogBookClick = (studentid, teacherid) => {
        this.props.history.push('./logbook/' + studentid + '/' + teacherid)
    }
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/all', null)
        if (response.data.status == 1) {
            let labelsArray = response.data.statusDescription.map((item) => {
                return { value: item.accountid, label: item.accountname }
            });
            this.setState({ accounts: labelsArray })
        }
    }

    handleAccountChange = async selectedValue => {
        this.setState({
            accountid: selectedValue,
            providers: [],
            providerid: null
        })
        let url = '/api/superadminservice/' + selectedValue.value + '/teachersforselectedaccount/all';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            let labelsArray = response.data.statusDescription.map((item) => {
                return { value: item.userid, label: item.firstname +" "+ item.lastname }
            });
            this.setState({ providers: labelsArray })
        }
    };

    handleProviderChange = async (selectedValue) => {
        this.setState({
            providerid: selectedValue,
            students: []
        })
        let url = "/api/superadminservice/" + this.state.accountid.value + "/" + selectedValue.value + "/students";
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.lastname + " " + item.firstname;

                item.Action = { studentid: item.studentid, studentName: item.name }
                if (item.religion === 1) { item.religion = 'Hindu' }
                else if (item.religion === 2) { item.religion = 'Muslim' }
                else if (item.religion === 3) { item.religion = 'Shikh' }
                else if (item.religion === 4) { item.religion = 'Jain' }

                if (item.category === 1) { item.category = 'Genral' }
                else if (item.category === 2) { item.category = 'OBC' }
                if (item.category === 3) { item.category = 'ST/SC' }

                if (item.locality === 1) { item.locality = 'Urban' }
                else if (item.locality === 2) { item.locality = 'Rural' }

                if (item.gender == 1) { item.gender = "Female" }
                else if (item.gender == 2) { item.gender = "Male" }
            });
            this.setState({
                students: response.data.statusDescription
            })
            if (this.state.patients !== null) {
                return
            }
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Helmet> <title>Students List</title></Helmet>
                <GridContainer justify="center">
                    <GridItem md={12}>
                        <Paper className={classes.root} elevation={1}>
                            <div className={this.props.classes.selectItemWrapper}>
                                <InputLabel>Accounts</InputLabel>
                                <FormControl
                                    style={{ width: 350 }}
                                >
                                    <Select
                                        value={this.state.accountid}
                                        onChange={this.handleAccountChange}
                                        options={this.state.accounts}
                                        placeholder='Select an Account'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={this.props.classes.selectItemWrapper}>
                                <InputLabel>Teachers</InputLabel>
                                <FormControl
                                    style={{ width: 350 }}
                                >
                                    <Select
                                        value={this.state.providerid}
                                        onChange={this.handleProviderChange}
                                        options={this.state.providers}
                                        placeholder='Select a Teacher'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >
                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                        <MuiThemeDataTable title={'Students List'} rows={this.state.students} columns={this.tableheads1} />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(StudentList));
