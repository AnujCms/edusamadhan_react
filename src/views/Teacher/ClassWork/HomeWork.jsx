import React from 'react';
import { withStyles, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import ActionButton from './ActionButtonForHomeWork';
import AuthenticatedPage from "../../AuthenticatedPage";
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { Formik, Form, connect } from 'formik';
import { string, object } from 'yup';
import HomeWorkSearchUI from './HomeWorkSearchUI';
import queryString from 'query-string';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(9),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    cstmprotoBtnWrap: {
        margin: "10px 0",
        textAlign: "right",
        [theme.breakpoints.down('md')]: { textAlign: "left" }
    },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class CreateHomeWork extends React.Component {
    constructor(props) {
        super(props);
        this.yupSchema = object().shape({
            classId: string().required("This feild is required."),
            sectionId: string().required("This feild is required."),
            mediumType: string().required("Medium is required."),
            homeWorkDate: string().required("Date is required.")
        });
        this.fieldVariables = { classId: '', sectionId: '', mediumType: '', homeWorkDate: new Date()}
        this.state = {
            homeWorkId: '', startSpinner: false, isUpdate: false, updateHomeWorkData: '', classHomeWorkData:[], studentRegistrationText: 'Create Home Work', typeOfAction: '', confirmActionDialog: false, isError: false, errorMessage:'', isSuccess: false, successMessage: ''
        }
    }
    tableheads1 = [
        {
            name: "count",
            label: "S.No",
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
            name: "subjectId",
            label: "Subject Name",
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
            name: "homeWorkDetails",
            label: "Home Work Details",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        this.props.currentUser.userDetails.role =='Teacher'&&{
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                searchable: false,
                customBodyRender: (value) => {
                    return (
                        (value.userId == this.props.currentUser.userDetails.userId) &&
                        <ActionButton homeWorkId={value.homeWorkId} handleEditHomeWork = {this.handleEditHomeWork} handleDeleteHomeWork={this.handleDeleteHomeWork}/>
                    )
                }
            }
        }
    ];
    
    backDashboard = () => {
        if (this.props.homeWorkId) {
            this.props.history.push(`../homework`)
        } else {
            this.props.history.push(`./homework`)
        }
        this.setState({ isError: false, isSuccess: false })
    }

    handleCreateHomeWord = () =>{
        this.props.history.push('./createhomework')
    }
    handleClassHmeWorkRecord = (data) =>{
        this.setState({classHomeWorkData: data})
    }
    handleEditHomeWork = (homeWorkId) => {
        this.setState({ homeWorkId: homeWorkId, confirmActionDialog: true, typeOfAction: "EditHomeWork", successMessage: "Do you really want to Edit Home Work?" })
    }
    handleDeleteHomeWork = (homeWorkId) => {
        this.setState({ homeWorkId: homeWorkId, confirmActionDialog: true, typeOfAction: "DeleteHomeWork", successMessage: "Do you really want to Delete Home Work?" })
    }
    handleAllActions = async (e, actionType) => {
        let response = 0;
        if (actionType === "EditHomeWork") {
            this.props.history.push('./edithomework/'+ this.state.homeWorkId)
        }
        else if (actionType === "DeleteHomeWork") {
            response = await this.props.authenticatedApiCall('delete', "/api/teacherservice/deleteHomeWork/" + this.state.homeWorkId, null)
            if (response.data.status === 1) {
                this.setState({ isSuccess: true, headerText: "Success", successMessage: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        }
    }
    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'homework';
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
                <Grid container className={classes.GridContainer}>
                    {this.props.currentUser.userDetails.role == 'Teacher'&&<><Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Home Work Details</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateHomeWord} className={classes.primaryBtn}>Create HomeWork</Button>
                        </div>
                    </Grid></>}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    {this.state.startSpinner && <CircularProgress style={{ position: "absolute", top: "80%", left: "45%", zIndex: '99999' }} />}
                                    <HomeWorkSearchUI startSpinner={this.state.startSpinner} handleClassHmeWorkRecord={this.handleClassHmeWorkRecord} />
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
                <MuiThemeDataTable title={`Home Work Details`} rows={this.state.classHomeWorkData} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="studentsFeeList" />
                {(this.state.confirmActionDialog && <SuccessDialog successButton={confirmActionButton} isConfirm={true} HeaderText={confirmText} BodyText={this.state.successMessage} dismiss={this.backDashboard} />)}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={this.state.headerText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div >
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateHomeWork)));