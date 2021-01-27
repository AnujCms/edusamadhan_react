import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { getBloodGroupObject } from '../../../components/utilsFunctions';


class CreateNoticeEdit extends React.Component {
    componentDidMount = () => {
        let data = this.props.parentData;

        this.props.formik.setFieldValue('motherFirstName', data.motherFirstName, false);
        this.props.formik.setFieldValue('motherLastName', data.motherLastName, false);
        this.props.formik.setFieldValue('motherCellNumber', data.motherCellNumber, false);
        this.props.formik.setFieldValue('motherAAdharNumber', data.motherAAdharNumber, false);
        this.props.formik.setFieldValue('motherOccupation', data.motherOccupation, false);
        this.props.formik.setFieldValue('motherQualification', data.motherQualification, false);

        this.props.formik.setFieldValue('fatherFirstName', data.fatherFirstName, false);
        this.props.formik.setFieldValue('fatherLastName', data.fatherLastName, false);
        this.props.formik.setFieldValue('fatherCellNumber', data.fatherCellNumber, false);
        this.props.formik.setFieldValue('fatherAAdharNumber', data.fatherAAdharNumber, false);
        this.props.formik.setFieldValue('fatherOccupation', data.fatherOccupation, false);
        this.props.formik.setFieldValue('fatherQualification', data.fatherQualification, false);

        this.props.formik.setFieldValue('localGuardianFirstName', data.localGuardianFirstName, false);
        this.props.formik.setFieldValue('localGuardianLastName', data.localGuardianLastName, false);
        this.props.formik.setFieldValue('localGuardianCellNumber', data.localGuardianCellNumber, false);
        this.props.formik.setFieldValue('localGuardianAAdharNumber', data.localGuardianAAdharNumber, false);
        this.props.formik.setFieldValue('localGuardianOccupation', data.localGuardianOccupation, false);
        this.props.formik.setFieldValue('localGuardianQualification', data.localGuardianQualification, false);

        this.props.formik.setFieldValue('siblings', data.siblings.toString(), false);
        if (data.siblings == 1) {
            this.props.formik.setFieldValue('siblingsArray', data.siblingsDetails, false);
        }

        this.props.formik.setFieldValue('physicalDisability', data.physicalDisability.toString(), false);
        if (data.physicalDisability == 1) {
            this.props.formik.setFieldValue('physicalDisabilityDetails', data.physicalDisabilityDetails, false);
        }

        this.props.formik.setFieldValue('currentTreatment', data.currentTreatment.toString(), false);
        if (data.currentTreatment == 1) {
            this.props.formik.setFieldValue('currentTreatmentDetails', data.currentTreatmentDetails, false);
        }

        this.props.formik.setFieldValue('isStaffChild', data.isStaffChild.toString(), false);
        this.props.formik.setFieldValue('studentBloodGroup', getBloodGroupObject(data.studentBloodGroup), false);
        this.props.formik.setFieldValue('isWeekInSubject', data.isWeekInSubject, false);

        this.props.formik.setFieldValue('motherImage', data.motherImage, false);
        this.props.formik.setFieldValue('fatherImage', data.fatherImage, false);
        this.props.formik.setFieldValue('localGuardianImage', data.localGuardianImage, false);
        this.props.formik.setFieldValue('addressProof', data.addressProof, false);

    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default AuthenticatedPage()(connect(CreateNoticeEdit));