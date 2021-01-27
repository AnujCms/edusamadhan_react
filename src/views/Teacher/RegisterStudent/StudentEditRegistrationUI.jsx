import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleReligionOptions, handleCategoryOptions, handleSelectedMediumType, handleLocalityOptions, handleRouteOptions } from '../../../components/utilsFunctions';

class StudentEditRegistrationUI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routeOptions: []
        }
    }
    
    async componentDidMount() {
        let url = '/api/accountantservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            let routeOptions = []
            response.data.statusDescription.map((item) => {
                let routeObj = { label: item.route, value: item.transportFeeId }
                routeOptions.push(routeObj)
            })
            this.setState({ routeOptions: routeOptions })
        }
        let data = this.props.data;
        this.props.formik.setFieldValue("firstName", data.firstName, false);
        this.props.formik.setFieldValue("lastName", data.lastName, false);
        if(data.motherName !== null){
            this.props.formik.setFieldValue("motherName", data.motherName, false);
        }
        if(data.fatherName !== null){
            this.props.formik.setFieldValue("fatherName", data.fatherName, false);
        }
        this.props.formik.setFieldValue("dob", new Date(`${data.dob.split("-").join("/")} 00:00:00`), false);
        this.props.formik.setFieldValue("cellNumber", data.cellNumber, false);
        this.props.formik.setFieldValue("aadharNumber", data.aadharNumber, false);
        if(data.gender !== null){
            this.props.formik.setFieldValue("gender", data.gender, false);
        }
        this.props.formik.setFieldValue("religion", handleReligionOptions(data.religion), false);
        this.props.formik.setFieldValue("category", handleCategoryOptions(data.category), false);
        this.props.formik.setFieldValue("locality", handleLocalityOptions(data.locality), false);
        this.props.formik.setFieldValue("mediumType", handleSelectedMediumType(data.mediumType), false);

        if(data.paraddress !== null){
            this.props.formik.setFieldValue("parmanentAddress", data.parmanentAddress, false);
        }
        if(data.locaddress !== null){
            this.props.formik.setFieldValue("localAddress", data.localAddress, false);
        }
        this.props.formik.setFieldValue("file", data.images, false);
        if(data.busService!=null){
            this.props.formik.setFieldValue("busService", data.busService.toString(), false);
        }
        this.props.formik.setFieldValue("route", handleRouteOptions(this.state.routeOptions, data.route), false);
        this.props.formik.setFieldValue("classId", data.classId, false);
        this.props.formik.setFieldValue("sectionId", data.sectionId, false);
        this.props.formik.setFieldValue("status", data.status, false);
    }


    render() {
        return (
            <div>
            </div>
        );

    }
}

export default withStyles()(AuthenticatedPage()(connect(StudentEditRegistrationUI)));