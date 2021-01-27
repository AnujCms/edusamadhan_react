import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";

class StudentDetails extends React.Component {
  componentDidMount() {
        let studentObj = {
            userId: this.props.currentUser.userDetails.userId,
            mediumType: this.props.currentUser.userDetails.mediumType
        }
        this.props.history.push('./studentfee', studentObj);
            }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage()(StudentDetails);
