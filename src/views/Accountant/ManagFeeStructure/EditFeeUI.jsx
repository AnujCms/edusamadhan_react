import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';
import { handleClassObject, handleSelectedMediumType } from '../../../components/utilsFunctions';

class EditFeeUI extends React.Component {

    componentDidMount = () => {
        let data = this.props.feeData;
        this.props.formik.setFieldValue('classId', handleClassObject(this.props.currentUser.userDetails.userType, data.classId), false);
        this.props.formik.setFieldValue('mediumType', handleSelectedMediumType(data.mediumType), false);
        this.props.formik.setFieldValue('january', data.january, false);
        this.props.formik.setFieldValue('february', data.february, false);
        this.props.formik.setFieldValue('march', data.march, false);
        this.props.formik.setFieldValue('april', data.april, false);
        this.props.formik.setFieldValue('may', data.may, false);
        this.props.formik.setFieldValue('june', data.june, false);
        this.props.formik.setFieldValue('july', data.july, false);
        this.props.formik.setFieldValue('august', data.august, false);
        this.props.formik.setFieldValue('september', data.september, false);
        this.props.formik.setFieldValue('october', data.october, false);
        this.props.formik.setFieldValue('november', data.november, false);
        this.props.formik.setFieldValue('december', data.december, false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage("FeeAccount")(WithAccount(connect(EditFeeUI)));