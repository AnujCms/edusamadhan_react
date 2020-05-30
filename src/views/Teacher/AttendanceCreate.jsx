import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Typography, Paper } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import { Helmet } from "react-helmet";
import { Formik, Form, connect } from 'formik';
import AttendanceUI from './AttendanceUI';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    container: { display: 'flex', flexWrap: 'wrap' },
    pad0: { padding: 0 },
    bodyUI: { height: "100%", width: "100%", padding: "20px 0px 0px 0px", background: '#d6eef8' }
});


class AttendanceCreate extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        this.fieldVariables = {
            periodDetails: []
        }
        this.state = {
            students: '', periodObj: "", periodStartTime: "07:30", periodEndTime: "08:30", successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
        };
    }

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getmystudents', null);
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item, index) => {
                item.name = item.firstname + " " + item.lastname;
                item.first = {
                    userid: item.userid, classid: item.classid, section: item.section
                }
            });
            this.setState({
                students: response.data.statusDescription, isLoading: false
            })

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Take Attendance</title></Helmet>
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ attendanceObj: [], arrayObj: [], attendanceArray: [] }}>
                    {(props) => (
                        <Form>
                            <Paper style={{ margin: "0px", height: "70px", width: "100%" }}>
                                <Grid container>
                                    <Grid item lg={12} md={12} xs={12} sm={12} className={classes.formHeader}>
                                        <Typography className={classes.center}>Take Attendance</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            {this.state.students && <Paper className={classes.bodyUI}>
                                <AttendanceUI studentsList={this.state.students} />
                            </Paper>}
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(connect(AttendanceCreate))));