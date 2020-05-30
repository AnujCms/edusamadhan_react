import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper, Avatar} from '@material-ui/core';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import ErrorDialog from '../../components/ErrorDialog';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import AdminImage from '../../assets/images/admin.png';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    GridContainer: { marginTop: "20px" },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "10px" },
    paddingBottom: { padding: "10px" },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "20px" } },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },

    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});
const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];

const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

class ViewAllFeeDetails extends React.Component {
    constructor(props){
        super(props);
        this.yupSchema = object().shape({
            class: string().required("This field is required"),
            section: string().required("This field is required"),
        });
    this.state = {
       totalClassFee:'', totalSubmittedFee:'', totalDueFee:'', showStudents:false,  studentsFeeDetails: [], studentName: '', isDelete: false, isError: false, errorMessage: ''
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

    handleSubmit = async(values) => {
        this.setState({showStudents:false})
        let response = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getfullfeedetails/' + values.class.value + "/" + values.section.value, null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                // item.feesum = item.january + item.february + item.march + item.april + item.may + item.june + item.july + item.august + item.september + item.october + item.november + item.december;
                if(item.busservice == 2){
                    item.busservice = "Yes";
                    if(item.totalFee == 0){
                        item.totalFee = 0
                        item.due = 0
                    }else{
                        item.totalFee = item.totalFee + 12 * item.transport
                        item.due = item.totalFee - item.submittedSum;
                    }
                }else{
                    if(item.totalFee == 0){
                        item.totalFee = 0
                        item.due = 0
                    }else{
                        item.due = item.totalFee - item.submittedSum;
                    }
                    item.busservice = "No"
                }
            });
            this.setState({ showStudents:true,
                studentsFeeDetails: response.data.statusDescription
            })
        } 
        else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
        
    }
    backDashboard = () => {
        // this.props.history.push(`./studentlist`)
        this.setState({ isError: false })
    }
    handleBackHome = () =>{
        if(this.props.currentUser.userDetails.role === 'FeeAccount'){
            this.props.history.push('./studentslist')
        }else if(this.props.currentUser.userDetails.role === 'Principal'){
            this.props.history.push('./teacherlist')
        }
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                 <Grid container className={classes.GridContainer}>
                    {/* <Grid item lg={5} md={5} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleBackHome} className={classes.primaryBtn}>Back To Home</Button>
                        </div>
                    </Grid> */}
                    <Grid item lg={7} md={7} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Class Full Fee Details</Typography>
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
                        {this.state.showStudents&&<MuiThemeDataTable title={'Students Fee Details'} rows={this.state.studentsFeeDetails} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayPatientDetailsFOrMobileView} tableContent="viewFullFeeDetails" />}
                    </Grid>
                </Grid>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}


export default withStyles(styles)(AuthenticatedPage(["Teacher"])(ViewAllFeeDetails));
