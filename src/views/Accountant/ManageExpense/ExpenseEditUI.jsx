import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';

class ExpenseEditUI extends React.Component {
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
        this.props.formik.setFieldValue('expense', data.expense, false);
        this.props.formik.setFieldValue('expenseamount', data.expenseamount, false);
        this.props.formik.setFieldValue('expensedate', new Date(`${data.expensedate.split("-").join("/")} 00:00:00`), false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage("FeeAccount")(WithAccount(connect(ExpenseEditUI)));