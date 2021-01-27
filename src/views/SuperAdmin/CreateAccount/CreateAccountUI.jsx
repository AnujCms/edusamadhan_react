import React from 'react';
import { withStyles } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import SchoolUI from './SchoolUI';
import DirectorUI from './DIrectorUI';

const styles = (theme) => ({
});

class CreateAccountUI extends React.Component {
    render() {
        return (
            <>
                <SchoolUI />
                <DirectorUI aadharNumber={this.props.aadharNumber} emailId={this.props.emailId}/>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateAccountUI)));