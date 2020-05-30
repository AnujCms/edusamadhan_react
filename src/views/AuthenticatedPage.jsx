import  React from "react";
import withUser from '../views/LoginPage/WithUser';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";
import queryString from 'query-string'


function tieAuthorization(Component) {
  return class withAuthorization extends React.Component {
    state = { isError: false }
    makeAuthenticatedAPICall = async (method, url, data) => {
      try {
        try {
          let result = await axios({
            method: method,
            url: url,
            headers: { 'x-access-token': localStorage.getItem("accessToken") },
            data: data
          });
          if (result.status === 200) {
            return result;
          }
          else {
            this.setState({ isError: true })
          }
        }
        catch (error) {
          if (error.response.status = 401) {
            await this.props.currentUser.refreshTokens();
            let result = await axios({
              method: method,
              url: url,
              headers: { 'x-access-token': localStorage.getItem("accessToken") },
              data: data
            });
            if (result.status === 200) {
              return result
            }
            else {
              this.setState({ isError: true })
            }

          }
          throw error;
        }
      } catch (ex) {
        console.log("ERROR:", ex);
        this.setState({ isError: true })
      }
    }
    getRedirectQueryString = function (redirectTo) {
      let qs = { redirectTo };
      return `?${queryString.stringify(qs)}`;
    }
    render() {
      const { currentUser: userObj } = this.props;
      return (
        this.state.isError ? <Redirect to={`/guest/login${this.getRedirectQueryString(this.props.location.pathname)}`} /> : <Component loggedInUserObj={userObj} authenticatedApiCall={this.makeAuthenticatedAPICall} {...this.props} />
      )
    }
  }
}

const AuthenticatedPage = () => Component => {

  return withUser(withRouter(tieAuthorization(Component)));

}

export default AuthenticatedPage;

