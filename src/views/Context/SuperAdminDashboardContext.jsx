import React from "react";

const dashboardObj = {
    teacherState: null
};

const SuperAdminDashboarContext = React.createContext({
    teacherDetails: dashboardObj,
    changeTeacherSelection: () => {
    }
}
);

const SuperAdminDashboarContextProvider = SuperAdminDashboarContext.Provider;
const SuperAdminDashboarContextConsumer = SuperAdminDashboarContext.Consumer;
export { SuperAdminDashboarContext as default, dashboardObj, SuperAdminDashboarContextProvider, SuperAdminDashboarContextConsumer};
