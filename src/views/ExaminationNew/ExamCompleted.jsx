
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { Typography } from '@material-ui/core';

class ExamCompleted extends React.Component {
    state = {
        result : 0,
    }
    async componentDidMount () {
        var r = (this.props.rightAnswer*100)/this.props.totalQuestion.length
        this.setState({result: r })
        var response = await this.props.authenticatedApiCall('post', '/api/entranceexamservice/createentranceresult', {
            totalmarks: this.props.totalQuestion.length,
            obtainedmarks: this.props.rightAnswer,
        });
        if(response.data.status == 1){
            console.log("saved")
        }else if(response.data.status == 0){
            console.log("not saved")
        }
    }
    render() {
        return (
            <div>
                <Typography>You have been completed your entrance examination successfully.</Typography><hr></hr>
                <Typography>{"Student Name : "+ (this.props.currentUser.userDetails.studentname) }</Typography>
                <Typography>{"Your correct answers are : "+ this.props.rightAnswer +" out of "+ this.props.totalQuestion.length}</Typography>
                <Typography>{"Your percentages is : "+ this.state.result}</Typography>
                <Typography>Final Result : {(this.state.result > 60? "Passed": "Failed")}</Typography>
            </div>
        );
    }
}
export default AuthenticatedPage(['EntranceStudent'])(ExamCompleted);