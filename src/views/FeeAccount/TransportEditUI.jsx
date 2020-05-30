import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { connect } from 'formik';

class TransportEditUI extends React.Component {
    constructor(props) {
        super(props);
        this.vehicleOptions = [{ value: 1, label: "Bus" }, { value: 2, label: "Van" }, { value: 3, label: "Car" }, { value: 4, label: "Auto" }]
    }
    setVehicleOptions = (value) => {
        let vehicleValue = '';
        this.vehicleOptions.forEach((item, index) => {
            if (item.value == value) {
                vehicleValue = item;
            }
        })
        return vehicleValue;
    }
    componentDidMount = () => {
        let data = this.props.feeData;
        this.props.formik.setFieldValue('route', data.route, false);
        this.props.formik.setFieldValue('fee', data.fee, false);
        this.props.formik.setFieldValue('vehiclenumber', data.vehiclenumber, false);
        this.props.formik.setFieldValue('drivername', data.drivername, false);
        this.props.formik.setFieldValue('drivernumber', data.drivernumber, false);
        this.props.formik.setFieldValue('driversalary', data.driversalary, false);
        this.props.formik.setFieldValue('vehicletype', this.setVehicleOptions(data.vehicletype), false);
        this.props.formik.setFieldValue('vehiclecolor', data.vehiclecolor, false);
        this.props.formik.setFieldValue('vehicleexpense', data.vehicleexpense, false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage("FeeAccount")(WithAccount(connect(TransportEditUI)));