import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Avatar, Paper, Grid } from '@material-ui/core';
import ActionButton from './ActionButtonForLogbook';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import AdminImage from '../../assets/images/admin.png';
import { Helmet } from "react-helmet";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import WithSuperAdminDashboard from '../Context/WithSuperAdminDashboard';
import { handleGenderLabel, handleReligionLabel, handleMediumLabel, handleCategoryLabel, handleLocalityLabel } from '../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    topM:{marginTop:"15px"},
    paddingBottom: { padding: "10px" },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
        selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" }
});

class StudentList extends React.Component {
    constructor(props){
        super(props)
        this.fieldVariables = { selectedAccount: "", selectedTeacher: "" }
        this.state = {
        accounts: [], selectedAccount: null, teacherArray: [], selectedTeacher: null, students: [], studentName: ''
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
            name: "aadharNumber",
            label: "AAdhar Number",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "motherName",
            label: "Mother",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "fatherName",
            label: "Father",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "cellNumber",
            label: "Mobile",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "dob",
            label: "Birth Date",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
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
            name: "busService",
            label: "Bus",
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
                        <ActionButton studentid={value.studentid} teacherid={this.state.selectedTeacher} studentName={value.studentName} onLogBookClick={this.onLogBookClick} />
                    )
                }
            }
        }
    ];
    onLogBookClick = (studentid, teacherid) => {
        this.props.history.push('./logbook/' + studentid + '/' + teacherid)
    }
    async componentDidMount() {
        let contextData = this.props.selectedSchoolAndTeacher.teacherDetails.teacherState;
        if(contextData){
            this.setState({students:contextData.students, selectedAccount:contextData.selectedAccount, teacherArray:contextData.teacherArray})
            this.fieldVariables.selectedAccount = contextData.selectedAccount
            this.fieldVariables.selectedTeacher = contextData.selectedTeacher
        }
        let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/all', null)
        if (response.data.status == 1) {
            let labelsArray = response.data.statusDescription.map((item) => {
                return { value: item.accountId, label: item.accountName }
            });
            this.setState({ accounts: labelsArray })
        }
    }

    handleAccountChange = async selectedValue => {
        let url = '/api/superadminservice/' + selectedValue.value + '/teachersforselectedaccount/all';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            let labelsArray = response.data.statusDescription.map((item) => {
                return { value: item.userId, label: item.firstName +" "+ item.lastName }
            });
            this.setState({selectedAccount: selectedValue, teacherArray: labelsArray })
        }else if(response.data.status == 0){
            this.setState({ teacherArray: [] })
        }
    };

    handleTeacherChange = async (selectedValue) => {
        let url = "/api/superadminservice/" + this.state.selectedAccount.value + "/" + selectedValue.value + "/students";
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.lastName + " " + item.firstName;

                item.Action = { studentId: item.studentId, studentName: item.name }
                item.locality = handleLocalityLabel(item.locality)
                item.category = handleCategoryLabel(item.category)
                item.gender = handleGenderLabel(item.gender)
                item.religion = handleReligionLabel(item.religion)
                item.mediumType = handleMediumLabel(item.mediumType)
                if(item.busService == 1){ item.busService = "No"}
                else if(item.busService == 2){ item.busService = "Yes"}
            });
            this.setState({
                selectedTeacher: selectedValue, students: response.data.statusDescription },() => this.props.selectedSchoolAndTeacher.changeTeacherSelection({
                    teacherState: this.state
        }))
            if (this.state.patients !== null) {
                return
            }
        }else{
            this.setState({students:[]})
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Helmet> <title>Students List</title></Helmet>
                <GridContainer justify="center">
                    <GridItem md={12}>
                    <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <Paper className={classes.topM}>
                                        <Grid container>
                                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="selectedAccount"
                                                    options={this.state.accounts}
                                                    placeholder={"Select an Account"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleAccountChange}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="selectedTeacher"
                                                    options={this.state.teacherArray}
                                                    placeholder={"Select a Teacher"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleTeacherChange}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Form>
                            )}
                        </Formik>
                        <MuiThemeDataTable title={'Students List'} rows={this.state.students} columns={this.tableheads1} />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(WithSuperAdminDashboard(AuthenticatedPage()(StudentList)));
