import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

class EditAccount extends React.Component {
    constructor(props) {
        super(props)
        this.sessionOptions = [{ value: 1, label: '2019-20' }, { value: 2, label: '2020-21' }, { value: 3, label: '2021-22' }, { value: 4, label: '2022-23' }, { value: 5, label: '2023-24' }, { value: 6, label: '2024-25' }, { value: 7, label: '2025-26' }]
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
        this.props.formik.setFieldValue("schoolname", data.accountname, false);
        this.props.formik.setFieldValue("registration", data.accountrefnumber, false);
        this.props.formik.setFieldValue("firstname", data.firstname, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("emailid", data.emailid, false);
        this.props.formik.setFieldValue("cellnumber", data.cellnumber, false);
        this.props.formik.setFieldValue("adharnumber", data.adharnumber, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("schooladdress", data.accountaddress, false);
        this.props.formik.setFieldValue("sessionoptions", this.setSessionOptions(data.session), false);
        this.props.formik.setFieldValue("configType", data.configdata.configType.toString(), false);
        this.props.formik.setFieldValue("parmanentaddress", data.paraddress, false);
        this.props.formik.setFieldValue("localaddress", data.locaddress, false);
        this.props.formik.setFieldValue("dob", new Date(data.dob), false);
        this.props.formik.setFieldValue("file", data.images, false);
        if(data.configdata.configType == 2){      
            this.props.formik.setFieldValue("feeaccount", data.configdata.account, false);
            if(data.configdata.accounttype == 2){
                this.props.formik.setFieldValue("entranceexamination", data.configdata.examination, false);
            }
            this.props.formik.setFieldValue("examoption", data.configdata.examoption, false);
            this.props.formik.setFieldValue("accounttype", data.configdata.accounttype, false);
        }
    }


    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage("SuperAdmin")(connect(EditAccount)));