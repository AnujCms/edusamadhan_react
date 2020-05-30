import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper, Avatar} from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import AdminImage from '../../assets/images/admin.png';
import ActionButton from './ActionButtonForAccountant';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    createUserSelect: { '& p': { overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", "-webkitBoxOrient": "vertical", "-webkitLineClamp": 1 } },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },

    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px" },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    pad0: { padding: 0 },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "20px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "10px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

class StudentList extends React.Component {
    constructor(props){
        super(props);
        this.yupSchema = object().shape({
            class: string().required("This field is required"),
            section: string().required("This field is required"),
        });
        this.state = {
            students: [], showStudents: false, displayTimeTable: false, timeTableData: '', successMessage: '', isSuccess: false, errorMessage: '', isError: false
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
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "adharnumber",
            label: "AAdhar",
            options: {
                filter: false,
                sort: false,
                searchable: true
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
                searchable: false
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
            name: "busservice",
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
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton status={value.status} adharnumber={value.adharnumber} userid={value.userid} teacherid={this.props.currentUser.userDetails.userid} studentName={value.studentName} getFeeDetails={this.getFeeDetails} sendNotification={this.handleSendNotiifcation} />
                    )
                }
            }
        }
    ];
    getFeeDetails = (adharnumber) => {
        this.props.history.push('./studentfee', adharnumber);
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    handleSubmit = async (values) => {
        this.setState({showStudents:true})
        let response = await this.props.authenticatedApiCall('get', "/api/studentfeeservice/getstudentslist/" + values.class.value + "/" + values.section.value, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    userid: item.userid, studentName: item.name, adharnumber: item.adharnumber, status: item.status, busservice:item.busservice
                }
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

                if(item.busservice == 1){ item.busservice = "No"}
                else if(item.busservice == 2){ item.busservice = "Yes"}
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false })
        }
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Fee Details</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={7} md={7} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Class Fee Details</Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ class: "", section: "" }}>
                            {(props) => (
                                <Form>
                                    <Paper>
                                        <Grid container>
                                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="class"
                                                    options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                                    placeholder={"Select Class"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="section"
                                                    options={sectionOptions}
                                                    placeholder={"Select Section"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper className={classes.btnStyle}>
                                        <Grid container>
                                            <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                                <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Search</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Form>
                            )}
                        </Formik>
                        {this.state.showStudents&&<MuiThemeDataTable title={'Students List'} rows={this.state.students} columns={this.tableheads1} tableContent="studentsFeeList" />}
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(StudentList)));