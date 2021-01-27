import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';

class SetClassAndSection extends React.Component {
    async componentDidMount() {
        let data = this.props.clasAndSection;
        this.props.formik.setFieldValue("classId", data.classId, false);
        this.props.formik.setFieldValue("sectionId", data.sectionId, false);
        this.props.formik.setFieldValue("status", 10, false);
    }


    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(SetClassAndSection)));