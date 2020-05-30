import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withWidth, Button } from '@material-ui/core';
import BigSizeResult from './BigSizeResult';
import SmallSizeResult from './SmallSizeResult';
import ErrorDialog from '../../components/ErrorDialog';
import SelectExamType from './SelectExamType';

const subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
const subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]

const styles = theme => ({

});
class Result extends React.Component {
    state = { subjectArray: [], resultdata: [], fullData: [], subjects: [], obtainedMarks: [], totalMarks: [], OBTM: '', isError: false, errorMessage: '' }
    setSelectedSubjects6to12 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            subjectOptions6to12.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj.label)
                }
            })
        })
        this.setState({subjects:subjects})
    }
    setSelectedSubjects0to5 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            subjectOptions0to5.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj.label)
                }
            })
        })
        this.setState({subjects:subjects})
    }
    createSubjectArray = (data) => {
        let array = []
        data.map((item) => {
            if (item === 1) { array.push('hindi') }
            else if (item === 2) { array.push('english') }
            else if (item === 3) { array.push('mathematics') }
            else if (item === 4) { array.push('science') }
            else if (item === 5) { array.push('socialscience') }
            else if (item === 6) { array.push('geography') }
            else if (item === 7) { array.push('physics') }
            else if (item === 8) { array.push('chemistry') }
            else if (item === 9) { array.push('biology') }
            else if (item === 10) { array.push('moralscience') }
            else if (item === 11) { array.push('drawing') }
            else if (item === 12) { array.push('computer') }
        })
        this.setState({ subjectArray: array })
    }
    async componentDidMount() {
        let studentid = this.props.studentid;
        let subjectResponse = await this.props.authenticatedApiCall('get', '/api/logbookservice/' + studentid + '/assignsubjects', null);
        if (subjectResponse.data.status == 1) {
            if(this.props.currentUser.userDetails.accouttype == 1){
                this.setSelectedSubjects0to5(subjectResponse.data.statusDescription)
            }else{
                this.setSelectedSubjects6to12(subjectResponse.data.statusDescription)
            }
            this.createSubjectArray(subjectResponse.data.statusDescription)
            this.handleExaminationType({ value: 1, label: '3 Monthly' })
        } else if (subjectResponse.data.status == 0) {
            this.setState({ errorMessage: subjectResponse.data.statusDescription, isError: true })
        }
    }
    handleExaminationType = async (selectedValue) => {
        let studentid = this.props.studentid;
        let teacherid = this.props.teacherid;
        let response = await this.props.authenticatedApiCall('get', '/api/logbookservice/' + studentid + '/' + teacherid + '/' + selectedValue.value + '/' + this.state.subjectArray + '/getresult', null);
        if (response.data.status == 1) {
            let res = response.data.statusDescription
            let totalMarksArray = []
            let sumOfTotalMarks = 0
            let obtainedMarksArray = []
            let sumOfObtainedMarks = 0
            this.state.subjectArray.map((item) => {
                if (item === 'hindi') {
                    if (res.hindi !== null) {
                        totalMarksArray.push(JSON.parse(res.hindi)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.hindi)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.hindi)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.hindi)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'english') {
                    if (res.english !== null) {
                        totalMarksArray.push(JSON.parse(res.english)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.english)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.english)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.english)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'mathematics') {
                    if (res.mathematics !== null) {
                        totalMarksArray.push(JSON.parse(res.mathematics)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.mathematics)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.mathematics)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.mathematics)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'science') {
                    if (res.science !== null) {
                        totalMarksArray.push(JSON.parse(res.science)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.science)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.science)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.science)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'socialscience') {
                    if (res.socialscience !== null) {
                        totalMarksArray.push(JSON.parse(res.socialscience)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.socialscience)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.socialscience)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.socialscience)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'geography') {
                    if (res.geography !== null) {
                        totalMarksArray.push(JSON.parse(res.geography)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.geography)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.geography)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.geography)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'physics') {
                    if (res.physics !== null) {
                        totalMarksArray.push(JSON.parse(res.physics)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.physics)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.physics)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.physics)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'chemistry') {
                    if (res.chemistry !== null) {
                        totalMarksArray.push(JSON.parse(res.chemistry)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.chemistry)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.chemistry)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.chemistry)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'biology') {
                    if (res.biology !== null) {
                        totalMarksArray.push(JSON.parse(res.biology)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.biology)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.biology)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.biology)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'moralscience') {
                    if (res.moralscience !== null) {
                        totalMarksArray.push(JSON.parse(res.moralscience)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.moralscience)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.moralscience)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.moralscience)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'drawing') {
                    if (res.drawing !== null) {
                        totalMarksArray.push(JSON.parse(res.drawing)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.drawing)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.drawing)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.drawing)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'computer') {
                    if (res.computer !== null) {
                        totalMarksArray.push(JSON.parse(res.computer)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.computer)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.computer)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.computer)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'evs') {
                    if (res.evs !== null) {
                        totalMarksArray.push(JSON.parse(res.evs)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.evs)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.evs)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.evs)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'sanskrat') {
                    if (res.sanskrat !== null) {
                        totalMarksArray.push(JSON.parse(res.sanskrat)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.sanskrat)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.sanskrat)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.sanskrat)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                } else if (item === 'gk') {
                    if (res.gk !== null) {
                        totalMarksArray.push(JSON.parse(res.gk)[0].totalMarks)
                        obtainedMarksArray.push(JSON.parse(res.gk)[0].obtainMarks)
                        sumOfTotalMarks = sumOfTotalMarks + parseInt(JSON.parse(res.gk)[0].totalMarks)
                        sumOfObtainedMarks = sumOfObtainedMarks + parseInt(JSON.parse(res.gk)[0].obtainMarks)
                    }else{
                        totalMarksArray.push("-")
                        obtainedMarksArray.push("-")
                    }
                }
            })
            this.setState({ totalMarks: totalMarksArray, obtainedMarks: obtainedMarksArray, OBTM: sumOfObtainedMarks, TTM: sumOfTotalMarks })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    backDashboard = () => {
        this.setState({ isError: false })
    }
    handleSubmit = () => { }
    render() {
        const { width } = this.props;
        const resultdata = this.state;
        const OkButton = [<Button style={{ backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" }} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                <SelectExamType handleExaminationType={this.handleExaminationType} teacherid={this.props.teacherid} />
                {(width == "xs" || width == "sm") ? <SmallSizeResult resultdata={resultdata} /> :
                    <BigSizeResult resultdata={resultdata} />}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withWidth(styles)(AuthenticatedPage(["Teacher", "ExamHead", "SuperAdmin", "Principal", "Student"])(Result));
