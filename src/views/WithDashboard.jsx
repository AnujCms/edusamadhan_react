import React from "react";
import { AccountantDashboarContextConsumer } from "./AccountStudentListContext";

const WithDashboard = (WrappedComponent) => {
    return class UserWrapped extends React.Component {
        render() {
            return (
                <AccountantDashboarContextConsumer >
                    {dashboardObj => (
                        <WrappedComponent selectedClassStudent={dashboardObj} {...this.props} />
                    )}
                </AccountantDashboarContextConsumer>)
        }
    }
}

export default WithDashboard;