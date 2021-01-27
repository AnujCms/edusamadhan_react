import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';


class CreateNoticeEdit extends React.Component {
    componentDidMount = () =>{
        this.props.formik.setFieldValue('noticeDate', new Date(this.props.noticeData.noticeDate), false)
        this.props.formik.setFieldValue('studentNotice', this.props.noticeData.studentNotice, false)
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default AuthenticatedPage()(connect(CreateNoticeEdit));