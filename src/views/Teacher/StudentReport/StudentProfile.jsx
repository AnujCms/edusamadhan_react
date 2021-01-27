import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, Avatar, Paper } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';
import AdminImage from '../../../assets/images/admin.png';
import StudentDetails from '../../../components/StudentDetails';
import FormHeader from '../../../components/FormHeader';

const styles = theme => ({
    GridContainer: { margin: "10px", [theme.breakpoints.down('md')]: { margin: 0, marginTop: "10px" } },
    avatar: { width: 200, height: 200 },
    imageStyle: { marginLeft: '40%', marginTop: "10%", [theme.breakpoints.down('md')]: { marginLeft: "20%" } }
});

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentObject: ''
        };
    }
    async componentDidMount() {
        let studentId = this.props.match.params.studentId || this.props.studentId
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getstudentprofile/' + studentId, null)
        if (response.data.status == 1) {
            this.setState({ studentObject: response.data.statusDescription })
        } else {
            this.setState({ startSpinner: true })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeader headerText={`Student Report`} pageTitle={"Student Report"} />
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12} >
                        <Paper style={{padding:"10px"}}>
                                <StudentDetails studentRecord={this.state.studentObject} />
                        </Paper>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <div className={classes.imageStyle}>
                            <Avatar alt="No Images" src={this.state.studentObject.studentImage === null || this.state.studentObject.studentImage === undefined ? AdminImage : "data:image/jpeg;base64," + this.state.studentObject.studentImage} className={classes.avatar} />
                        </div>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(StudentProfile))));