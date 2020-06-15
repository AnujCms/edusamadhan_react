import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Paper, Button, Grid, Typography } from '@material-ui/core';
import ActionButton from '../ActionButtonForStudent';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Helmet } from "react-helmet";
import { Formik, Form, Field } from 'formik';

const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]
const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];

const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
// const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    paddingBottom: { padding: "10px" },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    widthSelect: { width: 350, [theme.breakpoints.down('md')]: { width: 350 } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    cstmprotoBtnWrap: {
        margin: "10px 0",
        textAlign: "right",
        [theme.breakpoints.down('md')]: { textAlign: "left" }
    },
});

class StudentList extends React.Component {
    state = {
       section:'', promoteStudent: false, deleteStudent: false, student: '', reexamStudent: false, students: [], class: '', successMessage: '', isSuccess: false, errorMessage: '', isError: false
    };

    tableheads1 = [
        {
            name: "studentid",
            label: "SR. No",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
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
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "classname",
            label: "Class/Section",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "cellnumber",
            label: "Cell Number",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "dob",
            label: "DOB",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "totalmarks",
            label: "Total Marks",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "obtainedmarks",
            label: "Obtained Marks",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                searchable: false
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
                        <ActionButton studentid={value.studentid} section={value.section} userrole={value.userrole} pramoteStudent={this.pramoteStudent} deleteStudent={this.deleteStudent} reExam={this.reExam} editRegistration={this.handleEditStudent}/>
                    )
                }
            }
        },

    ];
    //handle edit student
    handleEditStudent = (studentid) =>{
        this.props.history.push('./edit-student/' + studentid);
    }
    // Re Exam The Student
    reExam = (studentid) => {
        this.setState({ studentid: studentid, reexamStudent: true, successMessage: "Are you really want to re-exam of this Student?" })
    }
    handleReExam = async () => {
        this.setState({reexamStudent:false})
        let url = "/api/entranceexamservice/reexamentrance";
        let response = await this.props.authenticatedApiCall('put', url, { studentid: this.state.studentid });
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, handleReExam: false, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, handleReExam: false, isError: true })
        }
    }
    //handle Promote student
    pramoteStudent = (studentid, section) => {
        this.setState({ section:section, studentid: studentid, promoteStudent: true, successMessage: "Do you really want to promote the student?" })
    }
    onPramoteStudent = async () => {
        this.setState({promoteStudent:false})
        let url = "/api/entranceexamservice/pramotestudent/" + this.state.studentid + "/" + this.state.class.value + "/"+ this.state.section;
        let response = await this.props.authenticatedApiCall('put', url, null)
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    //handle Delete student
    deleteStudent = (studentid) => {
        this.setState({ studentid: studentid, deleteStudent: true, successMessage: "Do you really want to delete the student?" })
    }
    onDeleteStudent = async () => {
        this.setState({deleteStudent:false})
        let url = "/api/entranceexamservice/deletestudent/" + this.state.studentid ;
        let response = await this.props.authenticatedApiCall('delete', url, null);
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }

    handleClassAndSection = (classid, sectionid) => {
        let classname = '';
        let sectionname = '';
        classOptions.forEach((item) => {
            if (item.value == classid) {
                classname = item.label;
            }
        })
        if(sectionid !== null){
            sectionOptions.forEach((section) => {
                if (section.value == sectionid) {
                    sectionname = section.label;
                }
            })
        }else{
            sectionname = "N/A"
        }
        return classname +" " +sectionname
    }
    handleClassChange = async selectedValue => {
        this.setState({ class: selectedValue });
        let url = '/api/entranceexamservice/entrancestudents/' + selectedValue.value;
        let response = await this.props.authenticatedApiCall('get', url, null);
        if (response.data.status == 1) {
            response.data.students.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    studentid: item.studentid, studentName: item.name, userrole: item.userrole, section:item.section
                }
                item.classname = this.handleClassAndSection(item.class, item.section)
            });
            this.setState({ students: response.data.students });
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    };

    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false, reexamStudent: false, promoteStudent: false, deleteStudent:false })
        this.props.history.push(`./create-student`);
    }
    backDashboardStudentList = () => {
        this.setState({ isSuccess: false, isError: false })
        this.props.history.push(`./create-student`);
    }
    displayStudentDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./studentdetails/' + this.state.students[rowMeta.dataIndex].studentid, this.state.students[rowMeta.dataIndex])
    }
    handleRegistration = () =>{
        this.props.history.push('./create-student')
    }
    render() {
        const { classes } = this.props;
        let confirmReExamBtn = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.handleReExam}>Re-Exam</Button>
        ]
        let confirmPromoteBtn = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.onPramoteStudent}>Promote</Button>
        ]
        let confirmDeleteBtn = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={this.onDeleteStudent}>Delete</Button>
        ]
        const OkButtonStudentList = [<Button className={classes.OkButton} onClick={this.backDashboardStudentList}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const confirmText = "Confirm Message"
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Entrance Students</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleRegistration} className={classes.primaryBtn}>Registration</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ class: "", section: "" }}>
                            {(props) => (
                                <Form>
                                    <Paper>
                                        <Grid container>
                                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="class"
                                                    options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                                    placeholder={"Select Class"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleClassChange}
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
                        <MuiThemeDataTable title={'Student List of selected class'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunctionExamHead={this.displayStudentDetailsForMobileView} tableContent="entranceStudentList" />
                        {(this.state.reexamStudent && <SuccessDialog successButton={confirmReExamBtn} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                        {(this.state.promoteStudent && <SuccessDialog successButton={confirmPromoteBtn} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                        {(this.state.deleteStudent && <SuccessDialog successButton={confirmDeleteBtn} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                        {(this.state.isSuccess && <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                        {(this.state.isError && <ErrorDialog successButton={OkButtonStudentList} HeaderText={this.state.errorMessage} dismiss={this.backDashboardStudentList} />)}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["ExamHead"])(StudentList));
