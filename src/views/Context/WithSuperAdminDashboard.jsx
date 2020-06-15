import React from "react";
import { SuperAdminDashboarContextConsumer } from "./SuperAdminDashboardContext";

const WithSuperAdminDashboard = (WrappedComponent) => {
    return class UserWrapped extends React.Component {
        render() {
            return (
                <SuperAdminDashboarContextConsumer >
                    {dashboardObj => (
                        <WrappedComponent selectedSchoolAndTeacher={dashboardObj} {...this.props} />
                    )}
                </SuperAdminDashboarContextConsumer>)
        }
    }
}

export default WithSuperAdminDashboard;