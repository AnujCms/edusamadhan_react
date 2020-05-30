import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

class EditTeacherUI extends React.Component {
    constructor(props) {
        super(props)
        this.qualificationOptions = [{ value: 1, label: "B.Sc" }, { value: 2, label: "M.Sc" }, { value: 3, label: "B.Tech" }, { value: 4, label: "M.Tech" }, { value: 5, label: "BA" }, { value: 6, label: "MA" }, { value: 7, label: "B.Com" }, { value: 8, label: "M.Com" }, { value: 9, label: "MBA" }, { value: 10, label: "P.hd" }, { value: 11, label: "LLB" }, { value: 12, label: "LLM" }, { value: 13, label: "BCA" }, { value: 14, label: "MCA" }];
        this.userRoleOption = [{ value: 3, label: "Faculty" }, { value: 4, label: "Examination Head" }, { value: 5, label: "Accountant" }];
        this.subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
        this.subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]
    }
    setQualificationOptions = (value) => {
        var qualificationValue = '';
        this.qualificationOptions.forEach((item, index) => {
            if (item.value == value) {
                qualificationValue = item;
            }
        })
        return qualificationValue;
    }
    setSubjectOptions = (value) => {
        var subjectValue = '';
        if(this.props.currentUser.userDetails.accouttype == 1){
            this.subjectOptions0to5.forEach((item, index) => {
                if (item.value == value) {
                    subjectValue = item;
                }
            })
        }else{
            this.subjectOptions6to12.forEach((item, index) => {
                if (item.value == value) {
                    subjectValue = item;
                }
            })
        }
        return subjectValue;
    }
    setUserroleOptions = (value) => {
        var userroleValue = '';
        this.userRoleOption.forEach((item, index) => {
            if (item.value == value) {
                userroleValue = item;
            }
        })
        return userroleValue;
    }
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("firstname", data.firstname, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellnumber", data.cellnumber, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("emailid", data.emailid, false);
        this.props.formik.setFieldValue("adharnumber", data.adharnumber, false);
        this.props.formik.setFieldValue("qualification", this.setQualificationOptions(data.qualification), false);
        this.props.formik.setFieldValue("subject", this.setSubjectOptions(data.subject), false);
        this.props.formik.setFieldValue("userrole", this.setUserroleOptions(data.userrole), false);
        this.props.formik.setFieldValue("parmanentaddress", data.parmanentaddress, false);
        this.props.formik.setFieldValue("localaddress", data.localaddress, false);
        this.props.formik.setFieldValue("file", data.images, false);
        this.props.formik.setFieldValue("isUpdate", false, false);
        this.props.formik.setFieldValue("salary", data.salary, false);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withStyles()(AuthenticatedPage("Principal")(connect(EditTeacherUI)));