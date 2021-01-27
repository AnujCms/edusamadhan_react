import React from "react";

const defaultUserObj = {
    name: 'guest',
    isAuthenticated: false,
    role: 'guest',
    studenttype: '',
    accesstoken: "",
    studentid:'',
    studentName: '',
    accountName: '',
    firstName:'',
    lastName:'',
    userId:'',
    accountId:'',
    configData:'',
    userType:'',
    entranceExamType: '',
    mediumType: ''
};

const UserLoggedInContext = React.createContext({
    userDetails: defaultUserObj,
    changeUser: () => {
        
    }
}
);

const UserLoggedInContextProvider = UserLoggedInContext.Provider;
const UserLoggedInContextConsumer = UserLoggedInContext.Consumer;
export { UserLoggedInContext as default, defaultUserObj, UserLoggedInContextProvider, UserLoggedInContextConsumer};
