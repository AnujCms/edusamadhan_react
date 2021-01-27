import React, { Component } from 'react';
import { withStyles, withWidth, Grid } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';
import UserImage from '../../CommonComponents/UserImage';

const styles = theme => ({
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } }
})
class ProfileFields extends Component {

    componentDidMount = async () => {
        let path = '/api/teacherservice/getTeacherDetails'
        let response = await this.props.authenticatedApiCall('get', path, null)
        if (response.data.status === 1) {
            this.props.formik.setFieldValue("file", response.data.statusDescription.image, false);
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Grid container className={classes.GridContainer}>
                <UserImage fieldLabel={'User Image'} fieldName={'file'} />
                </Grid>
            </div >
        )
    }
}
export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(ProfileFields))));
