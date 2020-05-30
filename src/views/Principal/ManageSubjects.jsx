import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import { Button, Card } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, Field } from 'formik';
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import FormikSelectWithCheckBox from '../../components/FormikValidatedComponents/SelectFieldWithCheckBox';
import ManageSubjectsUI from './ManageSubjectsUI';
import Spinner from '@material-ui/core/CircularProgress';
import { string, object } from 'yup';
import { Helmet } from "react-helmet";

const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]

const classOptions0to5 = [{value: 1, label: "Nursery"},{ value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
const subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]

const styles = (theme) => ({
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "400px" } },
    root: {
        margin: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 12,
        paddingBottom: theme.spacing.unit * 1,
        [theme.breakpoints.down('md')]: {
            margin: 0,
            paddingTop: '5px'
        },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 10, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "70px" } },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    paddingBottom: { marginLeft: "0px", marginTop:"20px",marginBottom:"20px", [theme.breakpoints.down('md')]: { marginLeft: "0px"} },

});
class ManageSubjects extends React.Component {
    constructor() {
        super()
        this.yupSchema = object().shape({
            selectedClass: string().required("This field is required."),
            selectedSubjects: string().required("This field is required."),
        });
        this.state = {
            startSpinner: false, isUpdate: false, subjectsData: [], subjectOptions1: [], createSubject: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        };
    }

    //handle class
    handleClass = async (selectedClass) => {
        this.setState({ isUpdate: false, subjectsData:[] })
        this.setState({ selectedClass: selectedClass.value, subjectOptions1: '' })
        let response = await this.props.authenticatedApiCall('get', "/api/principalservice/getsubjectsofselectedclass/" + selectedClass.value);
        if (response.data.status == 1) {
            this.setState({ isUpdate: true, subjectsData: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({isUpdate:true, errorMessage: response.data.statusDescription, subjectsData:[], isError: true })
        }
    }

    //Handle the form submit event
    handleSubmit = async (values) => {
        this.setState({ startSpinner: true })
        let subjects = [];
        for (var i = 0; i < values.selectedSubjects.length; i++) {
            subjects.push(values.selectedSubjects[i].value)
        }
        let response = await this.props.authenticatedApiCall('post', "/api/principalservice/assignsubjectstoselectedclass", {
            subjectOptions: subjects,
            selectedClass: values.selectedClass.value
        })
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false, })
        }
    };

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false });
    }

    handleCancel = () => {
        this.props.history.push('./teacherlist')
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Create | Edit Subjects</title></Helmet>
                <Formik initialValues={{ selectedClass: '', selectedSubjects: '' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                                {(this.state.isUpdate) && <ManageSubjectsUI subjectsData={this.state.subjectsData} />}
                                <Paper className={classes.formHeader}>
                                    <Typography className={classes.center}>Assign Subjects To Class</Typography>
                                </Paper>
                                <Card className={classes.backgroundColor}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                            <Field
                                                name="selectedClass"
                                                options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5:classOptions6to12}
                                                onChange={this.handleClass}
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
                                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                                            <Field
                                                name="selectedSubjects"
                                                component={FormikSelectWithCheckBox}
                                                checkboxProps={{ color: "primary" }}
                                                placeholder="Select Subject"
                                                options={this.props.currentUser.userDetails.accouttype == 1 ? subjectOptions0to5 : subjectOptions6to12}
                                                className={classes.inputSelect + " " + "selectstyle"}
                                                isSearchable={false}
                                                variant="filled"
                                                isClearable={false}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Paper className={classes.btnStyle}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                                            <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                                            <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["Principal"])(WithAccount((ManageSubjects)))); 
