import React from "react";

const dashboardObj = {
    studentState: null
};

const AccountantDashboarContext = React.createContext({
    studentDetails: dashboardObj,
    changeClassSelection: () => {

    }
}
);

const AccountantDashboarContextProvider = AccountantDashboarContext.Provider;
const AccountantDashboarContextConsumer = AccountantDashboarContext.Consumer;
export { AccountantDashboarContext as default, dashboardObj, AccountantDashboarContextProvider, AccountantDashboarContextConsumer};
