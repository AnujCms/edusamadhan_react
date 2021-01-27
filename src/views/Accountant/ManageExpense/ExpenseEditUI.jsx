import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';

class ExpenseEditUI extends React.Component {
    componentDidMount = () => {
        let data = this.props.feeData;
        this.props.formik.setFieldValue('expenseName', data.expenseName, false);
        this.props.formik.setFieldValue('expenseAmount', data.expenseAmount, false);
        this.props.formik.setFieldValue('expenseDate', new Date(`${data.expenseDate}`), false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage()(WithAccount(connect(ExpenseEditUI)));