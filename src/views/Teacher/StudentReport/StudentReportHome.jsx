import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles } from '@material-ui/core';
import { WithAccount } from '../../AccountContext';
import { Helmet } from "react-helmet";
import { connect } from 'formik';
import StudentProfile from './StudentProfile';
import StudentResult from './StudentResult';

const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(11),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
});

class StudentReportHome extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Student Report</title></Helmet>
                <StudentProfile studentId={this.props.studentId}/>
                <StudentResult studentId={this.props.studentId}/>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(connect(StudentReportHome))));