import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';
import { handleVehicleOptions } from '../../../components/utilsFunctions';

class TransportEditUI extends React.Component {
    componentDidMount = () => {
        let data = this.props.feeData;
        this.props.formik.setFieldValue('route', data.route, false);
        this.props.formik.setFieldValue('fee', data.fee, false);
        this.props.formik.setFieldValue('vehicleNumber', data.vehicleNumber, false);
        this.props.formik.setFieldValue('driverName', data.driverName, false);
        this.props.formik.setFieldValue('driverNumber', data.driverNumber, false);
        this.props.formik.setFieldValue('driverSalary', data.driverSalary, false);
        this.props.formik.setFieldValue('vehicleType', handleVehicleOptions(data.vehicleType), false);
        this.props.formik.setFieldValue('vehicleColor', data.vehicleColor, false);
        this.props.formik.setFieldValue('vehicleExpense', data.vehicleExpense, false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage()(WithAccount(connect(TransportEditUI)));