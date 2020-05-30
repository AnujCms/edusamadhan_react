import React from "react";

const defaultUserObj = {
    name: 'guest',
    isAuthenticated: false,
    role: 'guest',
    studenttype: '',
    accesstoken: "",
    studentid:'',
    studentname: '',
    firstname:'',
    lastname:'',
    userid:'',
    accountid:'',
    configdata:''
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
