import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Grid, Avatar } from '@material-ui/core';
import ActionButton from './ActionButtonForStudent';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Helmet } from "react-helmet";
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { handleClassAndSection } from '../../../components/utilsFunctions';
import AdminImage from '../../../assets/images/admin.png';
import ClassSection from '../../../components/ClassSection';
import queryString from 'query-string';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
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
            confirmActionDialog: '', typeOfAction: "", headerText: '', isSuccess: false, successMessage: '', errorMessage: '', isError: false, userrole: '', openClassDialog: false,
            studentId: '', sectionId: '', students: []
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
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return (<>
                        {(value == 10) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pending</p>}
                        {(value == 11) && <p style={{ width: "100px", color: 'blue', fontWeight: 800, fontSize: "14px !important" }}>AllowToExam</p>}
                        {(value == 12) && <p style={{ width: "100px", color: 'brown', fontWeight: 800, fontSize: "14px !important" }}>ExamCompleted</p>}
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
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
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
            name: "classname",
            label: "Class/Section",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "cellNumber",
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
            name: "totalMarks",
            label: "Total Marks",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "obtainedMarks",
            label: "Obtained Marks",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "resultStatus",
            label: "Result Status",
            options: {
                filter: true,
                sort: true,
                searchable: false,
                customBodyRender: (value) => {
                    return (<>
                        {(value == "Passed") && <p style={{ width: "100px", color: "green", fontWeight: 800, fontSize: "14px !important" }}>Passed</p>}
                        {(value == "Failed") && <p style={{ width: "100px", color: 'red', fontWeight: 800, fontSize: "14px !important" }}>Failed</p>}
                    </>)
                }
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
                    return (<>{value.status != 11 &&
                        <ActionButton resultStatus={value.resultStatus} studentId={value.studentId} sectionId={value.sectionId} status={value.status} userrole={value.userrole} handlePromoteStudent={this.handlePromoteStudent} handleReExamination={this.handleReExamination} />}
                    </>)
                }
            }
        },

    ];
    handleSubmit = async (values) => {
        this.setState({ class: values });
        let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/entranceStudents/" + values.classId.value + "/" + values.sectionId.value, null)
        if (response.data.status == 1) {
            response.data.students.forEach((item) => {
                let percentage = Math.round((item.obtainedMarks * 100) / item.totalMarks);
                if (percentage > 60) {
                    item.resultStatus = "Passed";
                } else {
                    item.resultStatus = item.obtainedMarks == null ? "" : "Failed";
                }
                item.name = item.firstName + " " + item.lastName;
                item.Action = {
                    resultStatus: item.resultStatus, studentId: item.studentId, studentName: item.name, status: item.status, userrole: item.userrole, sectionId: item.sectionId
                }
                item.classname = handleClassAndSection(item.classId, item.sectionId);
            });

            this.setState({ students: response.data.students });
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }

    displayStudentDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./studentdetails/' + this.state.students[rowMeta.dataIndex].studentid, this.state.students[rowMeta.dataIndex])
    }

    handleReExamination = (studentId) => {
        this.setState({ studentId: studentId, confirmActionDialog: true, typeOfAction: "ReExamination", successMessage: "Are you really want to re-exam of this Student?" })
    }
    handlePromoteStudent = (studentId) => {
        this.setState({ studentId: studentId, confirmActionDialog: true, typeOfAction: "PromoteStudent", successMessage: "Are you really want to Promote this Student?" })
    }
    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "ReExamination") {
            response = await this.props.authenticatedApiCall('put', "/api/examinationservice/reexamentrance", { studentId: this.state.studentId });
        }
        else if (actionType === "PromoteStudent") {
            response = await this.props.authenticatedApiCall('put', "/api/examinationservice/pramotestudent/" + this.state.studentId, null)
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <ClassSection />
                                </Form>
                            )}
                        </Formik>
                        <MuiThemeDataTable title={'Entrance Students List'} rows={this.state.students} columns={this.tableheads1} rowDetailsRedirectFunctionExamHead={this.displayStudentDetailsForMobileView} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(StudentList));
