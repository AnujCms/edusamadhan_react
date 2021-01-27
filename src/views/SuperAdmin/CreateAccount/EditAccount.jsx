import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';

class EditAccount extends React.Component {
    constructor(props) {
        super(props)
        this.sessionOptions = [ { value: 1, label: '2020-21' }, { value: 2, label: '2021-22' }, { value: 3, label: '2022-23' }, { value: 4, label: '2023-24' }, { value: 5, label: '2024-25' }, { value: 6, label: '2025-26' },{ value: 7, label: '2026-27' },{ value: 8, label: '2027-28' }, { value: 9, label: '2028-29' },{ value: 10, label: '2029-30' }]
        this.examOptions = [{ value: '1', label: '3 Monthly' }, { value: '2', label: '6 Monthly' }, { value: '3', label: '9 Monthly' }, { value: '4', label: 'Yearly' }]
    }
    setSessionOptions = (value) => {
        let session = '';
        this.sessionOptions.forEach((item) => {
            if (item.value == value) {
                session = item;
            }
        })
        return session;
    }

    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("schoolName", data.accountName, false);
        this.props.formik.setFieldValue("phoneNumber", data.phoneNumber, false);
        this.props.formik.setFieldValue("registration", data.accountRefNumber, false);
        this.props.formik.setFieldValue("firstName", data.firstName, false);
        this.props.formik.setFieldValue("lastName", data.lastName, false);
        this.props.formik.setFieldValue("emailId", data.emailId, false);
        this.props.formik.setFieldValue("cellNumber", data.cellNumber, false);
        this.props.formik.setFieldValue("aadharNumber", data.aadharNumber, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("schoolAddress", data.accountAddress, false);
        this.props.formik.setFieldValue("sessionoptions", this.setSessionOptions(data.sessionId), false);
        this.props.formik.setFieldValue("configType", data.configData.configType.toString(), false);
        this.props.formik.setFieldValue("parmanentAddress", data.parmanentAddress, false);
        this.props.formik.setFieldValue("localAddress", data.localAddress, false);
        this.props.formik.setFieldValue("dob", new Date(data.dob), false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("schoolLogo", data.schoolLogo, false);
        if(data.configData.configType == 2){      
            this.props.formik.setFieldValue("feeAccount", data.configData.accountant, false);
            this.props.formik.setFieldValue("entranceExamination", data.configData.examination, false);
            this.props.formik.setFieldValue("examOption", data.configData.examOption, false);
            this.props.formik.setFieldValue("examinationType", data.configData.examinationType, false);
        }
    }


    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(EditAccount)));