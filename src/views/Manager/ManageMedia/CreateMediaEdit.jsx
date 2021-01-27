import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import {handleMediaType } from '../../../components/utilsFunctions';

class CreateMediaEdit extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("mediaType", handleMediaType(data.mediaType), false);
        this.props.formik.setFieldValue("mediaTitle", data.mediaTitle, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("mediaId", data.mediaId, false);
    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(CreateMediaEdit)));