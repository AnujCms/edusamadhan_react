import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

class UpdateRegistrationUI extends React.Component {
    constructor(props) {
        super(props)
        this.religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
        this.categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
        this.localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];
    }
    setReligionOptions = (value) => {
        var religionValue = '';
        this.religionOptions.forEach((item, index) => {
            if (item.value == value) {
                religionValue = item;
            }
        })
        return religionValue;
    }
    setCategoryOptions = (value) => {
        var categoryValue = '';
        this.categoryOptions.forEach((item, index) => {
            if (item.value == value) {
                categoryValue = item;
            }
        })
        return categoryValue;
    }
    setLocalityOptions = (value) => {
        var localityValue = '';
        this.localityOptions.forEach((item, index) => {
            if (item.value == value) {
                localityValue = item;
            }
        })
        return localityValue;
    }
    async componentDidMount() {
        let data = this.props.data;
        this.props.formik.setFieldValue("firstname", data.firstname, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("mothername", data.mothername, false);
        this.props.formik.setFieldValue("fathername", data.fathername, false);
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellnumber", data.cellnumber, false);
        this.props.formik.setFieldValue("adharnumber", data.adharcard, false);
        this.props.formik.setFieldValue("gender", data.gender, false);
        this.props.formik.setFieldValue("religion", this.setReligionOptions(data.religion), false);
        this.props.formik.setFieldValue("category", this.setCategoryOptions(data.category), false);
        this.props.formik.setFieldValue("locality", this.setLocalityOptions(data.locality), false);
        this.props.formik.setFieldValue("parmanentaddress", data.paraddress, false);
        this.props.formik.setFieldValue("localaddress", data.locaddress, false);
        this.props.formik.setFieldValue("file", data.images, false);
    }


    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage("Teacher")(connect(UpdateRegistrationUI)));