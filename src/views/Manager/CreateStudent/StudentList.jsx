import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Button, Avatar } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import ErrorDialog from '../../../components/ErrorDialog';
import SuccessDialog from '../../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import AdminImage from '../../../assets/images/admin.png';
import ActionButtonManager from './ActionButtonForManager';
import ActionButtomExamHead from './ActionButtonForExamHead';
import WithDashboard from '../../WithDashboard';
import queryString from 'query-string';
import ClassSection from '../../../components/ClassSection';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    GridContainer: { marginTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            sectionId: string().required("This field is required"),
        });
        this.fieldVariables = { classId: "", sectionId: "" }
        this.state = {
            confirmActionDialog: '', typeOfAction: "", studentId: '', sectionId: "", headerText: '', isLoading: false, schoolUsers: [], isSuccess: false, successMessage: '', errorMessage: '', isError: false, userrole: '', openClassDialog: false,
            selectedClassObject: '', students: [], showStudents: false
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
                        <Avatar alt="No Images" src={AdminImage} className={this.props.classes.avatar} />
                    )
                }
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (<>
                        {(value == 10) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pending</p>}
                        {(value == 11) && <p style={{ width: "100px", color: 'blue', fontWeight: 800, fontSize: "14px !important" }}>AllowToExam</p>}
                        {(value == 12) && <p style={{ width: "100px", color: 'brown', fontWeight: 800, fontSize: "14px !important" }}>ExamCompleted</p>}
                        {(value == 13) && <p style={{ width: "100px", color: "#8B0000", fontWeight: 800, fontSize: "14px !important" }}>Pramoted</p>}
                        {(value == 1) && <p style={{ width: "100px", color: "green", fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
                        {(value == 4) && <p style={{ width: "100px", color: 'red', fontWeight: 800, fontSize: "14px !important" }}>Locked</p>}
                        {(value == 5) && <p style={{ width: "100px", color: 'blue', fontWeight: 800, fontSize: "14px !important" }}>UnLocked</p>}
                    </>)
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
            name: "aadharNumber",
            label: "AAdhar",
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
            name: "mediumType",
            label: "Medium",
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
                        <>
                            {this.props.currentUser.userDetails.role == "Manager" && <ActionButtonManager status={value.status} studentId={value.studentId} onClickEditStudent={this.handleEditStudent} handleDeleteStudent={this.handleDeleteStudent} />}
                            {this.props.currentUser.userDetails.role == "ExamHead" && <ActionButtomExamHead status={value.status} studentId={value.studentId} sectionId={value.sectionId} onClickEditStudent={this.handleEditStudent} handlePromoteStudent={this.handlePromoteStudent} entranceExamType={this.props.currentUser.userDetails.entranceExamType} handleAllowExam={this.handleAllowExam} />}
                        </>)
                }
            }
        }
    ];

    handleSubmit = async (values) => {
        this.setState({ showStudents: true, selectedClassObject: values })
        let response = await this.props.authenticatedApiCall('get', "/api/managerservice/getAllStudentOfClass/" + values.classId.value + "/" + values.sectionId.value, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstName + " " + item.lastName;
                item.Action = {
                    studentId: item.studentId, status: item.status
                }
                if (item.mediumType == 1) { item.mediumType = "Hindi" }
                else if (item.mediumType == 2) { item.mediumType = "English" }
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            }, () => this.props.selectedClassStudent.changeClassSelection({
                studentState: this.state
            }))
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false, students: [], isError: true, errorMessage: response.data.statusDescription })
        }
    }

    handleEditStudent = (studentId) => {
        this.props.history.push('./edit-student/' + studentId);
    }

    handlePromoteStudent = (studentId) => {
        this.setState({ studentId: studentId, confirmActionDialog: true, typeOfAction: "PromoteStudent", successMessage: "Do you really want to promote the student?" })
    }
    handleAllowExam = (studentId) => {
        this.setState({ studentId: studentId, confirmActionDialog: true, typeOfAction: "AllowExamination", successMessage: "Do you really want to Allow Examination?" })
    }
    handleDeleteStudent = (studentId) => {
        this.setState({ studentId: studentId, confirmActionDialog: true, typeOfAction: "DeleteStudent", successMessage: "Do you really want to Delete Student?" })
    }
    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "PromoteStudent") {
            response = await this.props.authenticatedApiCall('put', "/api/examinationservice/pramotestudent/" + this.state.studentId, null)
        }
        else if (actionType === "AllowExamination") {
            response = await this.props.authenticatedApiCall('put', "/api/examinationservice/allowForExam/" + this.state.studentId, null)
        }
        else if (actionType === "DeleteStudent") {
            response = await this.props.authenticatedApiCall('delete', "/api/managerservice/deleteStudentDetails/" + this.state.studentId, null)
        }
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
        } else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'studentslist';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ confirmActionDialog: false, isError: false, isSuccess: false })
    }
    handleCreateStudent = () => {
        this.props.history.push('./create-student');
    }
    render() {
        const { classes } = this.props;
        const confirmText = "Confirm Message"
        let confirmActionButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>Cancel</Button>,
            <Button className={classes.OkButton} onClick={(e) => this.handleAllActions(e, this.state.typeOfAction)}>Yes</Button>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Students List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <ClassSection />
                                </Form>
                            )}
                        </Formik>
                        <MuiThemeDataTable title={'Admitted Students List'} rows={this.state.students} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(StudentList))));