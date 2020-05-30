import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";

class StudentLogbook extends React.Component {
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/studentservice/getteacherid', null);
        if (response.data.status == 1) {
            this.setState({ teacherid: response.data.statusDescription });
            this.props.history.push('./logbook/' + this.props.currentUser.userDetails.userid + '/' + response.data.statusDescription);
        }
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage(['Student'])(StudentLogbook);
