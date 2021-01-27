import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleFacilityOption } from '../../../components/utilsFunctions';

class CreateFacilityEdit extends React.Component {
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("faculityType", handleFacilityOption(data.faculityType), false);
        this.props.formik.setFieldValue("facilityDetails", data.facilityDetails, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("faculityId", data.faculityId, false);
    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(CreateFacilityEdit)));