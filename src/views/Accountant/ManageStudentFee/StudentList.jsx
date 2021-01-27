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
import ActionButton from './ActionButtonForAccountant';
import WithDashboard from '../../WithDashboard';
import { handleGenderLabel, handleReligionLabel, handleMediumLabel, handleCategoryLabel, handleLocalityLabel } from '../../../components/utilsFunctions';
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
            selectedClassObject: '', students: [], showStudents: false, displayTimeTable: false, timeTableData: '', successMessage: '', isSuccess: false, errorMessage: '', isError: false
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
                        <Avatar alt="No Images" src={value === null ? AdminImage : "data:image/jpeg;base64," + value} className={this.props.classes.avatar} />
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
                        {(value == 13) && <p style={{ width: "100px", color: "red", fontWeight: 800, fontSize: "14px !important" }}>Pramoted</p>}
                        {(value == 1) && <p style={{ width: "100px", color: 'green', fontWeight: 800, fontSize: "14px !important" }}>Active</p>}
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
                searchable: false
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
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton mediumType={value.mediumType} status={value.status} aadharNumber={value.aadharNumber} userId={value.userId} teacherid={this.props.currentUser.userDetails.userId} studentName={value.studentName} getFeeDetails={this.getFeeDetails} sendNotification={this.handleSendNotiifcation} />
                    )
                }
            }
        }
    ];
    getFeeDetails = (userId, mediumType) => {
        let studentObj = {
            userId: userId,
            mediumType: mediumType
        }
        this.props.history.push('./studentfee', studentObj);
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    componentDidMount() {
        if (this.props.selectedClassStudent.studentDetails.studentState) {
            this.setState({ showStudents: true, students: this.props.selectedClassStudent.studentDetails.studentState.students })
            this.fieldVariables.classId = this.props.selectedClassStudent.studentDetails.studentState.selectedClassObject.classId
            this.fieldVariables.sectionId = this.props.selectedClassStudent.studentDetails.studentState.selectedClassObject.sectionId
        }
    }
    handleSubmit = async (values) => {
        this.setState({ showStudents: true, selectedClassObject: values })
        let response = await this.props.authenticatedApiCall('get', "/api/accountantservice/getstudentslist/" + values.classId.value + "/" + values.sectionId.value, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.name = item.firstName + " " + item.lastName;
                item.Action = {
                    userId: item.userId, studentName: item.name, aadharNumber: item.aadharNumber, status: item.status, busService: item.busService, mediumType: item.mediumType
                }
                item.locality = handleLocalityLabel(item.locality)
                item.category = handleCategoryLabel(item.category)
                item.gender = handleGenderLabel(item.gender)
                item.religion = handleReligionLabel(item.religion)
                item.mediumType = handleMediumLabel(item.mediumType)

                if (item.busService == 2) { item.busService = "No" }
                else if (item.busService == 1) { item.busService = "Yes" }
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            }, () => this.props.selectedClassStudent.changeClassSelection({
                studentState: this.state
            }))
        } else if (response.data.status == 0) {
            this.setState({ isLoading: false, isError: true, errorMessage: response.data.statusDescription })
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
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: '50px' }}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <ClassSection />
                                </Form>
                            )}
                        </Formik>
                        <MuiThemeDataTable title={'Students List'} rows={this.state.students} columns={this.tableheads1} tableContent="studentsFeeList" />
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithDashboard(WithAccount(StudentList))));