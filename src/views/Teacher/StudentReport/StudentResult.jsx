import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';
import StudentResultUI from './StudentResultUI';

class StudentResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultObject: ''
        };
    }
    async componentDidMount() {
        let studentId = this.props.match.params.studentId || this.props.studentId;
        let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getstudentallresult/' + studentId, null)
        if (response.data.status == 1) {
            let resultArray = [];
            response.data.statusDescription.map((item) => {
                resultArray.push(JSON.parse(item.subjectResultArray))
            })
            this.setState({ resultObject: resultArray })
        } else {
            this.setState({ startSpinner: true })
        }
    }

    render() {
        return (
            <>
                {this.state.resultObject.length > 0 &&
                    this.state.resultObject.map((item, index) => {
                        return <StudentResultUI resultObject={item} key={index+'r'} index={index}/>
                    })}
            </>
        );
    }
}
export default AuthenticatedPage()(WithAccount(connect(StudentResult)));