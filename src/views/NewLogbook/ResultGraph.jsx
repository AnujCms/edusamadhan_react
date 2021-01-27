import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { withStyles, Button } from '@material-ui/core';
import SelectExamType from './SelectExamType';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    root: {
        maxWidth: '1100px',
        margin: '20px auto',
        [theme.breakpoints.down('sm')]: {
            marginLeft: "10px",
            marginRight: "10px",
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
    }
});


class ResultGraph extends React.Component {
    state = {
        subjectArray: '',
        showGraph: false,
        isError: false,
        errorMessage: '',
        subjects: '',
        resultGraphData: [],
        graphOptions: {
            chart: {
                renderTo: 'graph',
                zoomType: 'xy'
            },
            xAxis: {
                gridLineWidth: 1,
            },
            yAxis: [{
                gridLineWidth: 1,
                opposite: false
            }, {
                gridLineWidth: 1,
                opposite: true
            }],
            rangeSelector: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
                valueDecimals: 0,
                split: true
            },
            series: [{
                data: []
            }]
        }
    }
    createSubjectArray = (data) => {
        let array = []
        data.map((item) => {
            if(this.props.currentUser.userDetails.accouttype == 1){
                if (item === 1) { array.push('hindi') }
                else if (item === 2) { array.push('english') }
                else if (item === 3) { array.push('mathematics') }
                else if (item === 4) { array.push('science') }
                else if (item === 5) { array.push('gk') }
                else if (item === 6) { array.push('moralscience') }
                else if (item === 7) { array.push('drawing') }
                else if (item === 8) { array.push('evs') }
                else if (item === 9) { array.push('computer') }
                else if (item === 10) { array.push('sanskrat') }
            }else{
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
                else if (item === 13) { array.push('evs') }
                else if (item === 14) { array.push('sanskrat') }
            }
        })
        this.setState({ subjectArray: array })
    }
    async componentDidMount() {
        let studentid = this.props.studentid;
        let subjectResponse = await this.props.authenticatedApiCall('get', '/api/logbookservice/' + studentid + '/assignsubjects', null);
        if (subjectResponse.data.status == 1) {
            this.createSubjectArray(subjectResponse.data.statusDescription)
            this.handleExaminationType({ value: 1, label: '3 Monthly' })
        } else if (subjectResponse.data.status == 0) {
            this.setState({ errorMessage: subjectResponse.data.statusDescription, isError: true })
        }
    }
    handleExaminationType = async (selectedValue) => {
        let studentid = this.props.studentid;
        let teacherid = this.props.teacherid;
        let response = await this.props.authenticatedApiCall('get', '/api/logbookservice/' + studentid + '/' + teacherid + '/' + selectedValue.value + '/' + this.state.subjectArray + '/getresultforgraph', null);
        if (response.data.status == 1) {
            let res = response.data.result;
            let graphData = []
            this.state.subjectArray.map((item) => {
                if (item === 'hindi') {
                    if (res.hindi !== null) {
                        graphData.push(['Hindi', parseInt(JSON.parse(res.hindi)[0].obtainMarks)])
                    }
                } else if (item === 'english') {
                    if (res.english !== null) {
                        graphData.push(['English', parseInt(JSON.parse(res.english)[0].obtainMarks)])
                    }
                } else if (item === 'mathematics') {
                    if (res.mathematics !== null) {
                        graphData.push(['Mathematics', parseInt(JSON.parse(res.mathematics)[0].obtainMarks)])
                    }
                } else if (item === 'science') {
                    if (res.science !== null) {
                        graphData.push(['Science', parseInt(JSON.parse(res.science)[0].obtainMarks)])
                    }
                } else if (item === 'socialscience') {
                    if (res.socialscience !== null) {
                        graphData.push(['Social Science', parseInt(JSON.parse(res.socialscience)[0].obtainMarks)])
                    }
                } else if (item === 'geography') {
                    if (res.geography !== null) {
                        graphData.push(['Geography', parseInt(JSON.parse(res.geography)[0].obtainMarks)])
                    }
                } else if (item === 'physics') {
                    if (res.physics !== null) {
                        graphData.push(['Physics', parseInt(JSON.parse(res.physics)[0].obtainMarks)])
                    }
                } else if (item === 'chemistry') {
                    if (res.chemistry !== null) {
                        graphData.push(['Chemistry', parseInt(JSON.parse(res.chemistry)[0].obtainMarks)])
                    }
                } else if (item === 'biology') {
                    if (res.biology !== null) {
                        graphData.push(['Biology', parseInt(JSON.parse(res.biology)[0].obtainMarks)])
                    }
                } else if (item === 'moralscience') {
                    if (res.moralscience !== null) {
                        graphData.push(['Moral Science', parseInt(JSON.parse(res.moralscience)[0].obtainMarks)])
                    }
                } else if (item === 'drawing') {
                    if (res.drawing !== null) {
                        graphData.push(['Drawing', parseInt(JSON.parse(res.drawing)[0].obtainMarks)])
                    }
                }else if(item === 'computer'){
                    if (res.computer !== null) {
                    graphData.push(['Computer', parseInt(JSON.parse(res.computer)[0].obtainMarks)]) 
                    }
                }else if(item === 'evs'){
                    if (res.evs !== null) {
                    graphData.push(['evs', parseInt(JSON.parse(res.evs)[0].obtainMarks)]) 
                    }
                }else if(item === 'gk'){
                    if (res.gk !== null) {
                    graphData.push(['gk', parseInt(JSON.parse(res.gk)[0].obtainMarks)]) 
                    }
                }else if(item === 'sanskrat'){
                    if (res.sanskrat !== null) {
                    graphData.push(['sanskrat', parseInt(JSON.parse(res.sanskrat)[0].obtainMarks)]) 
                    }
                }
            })
            this.setState({ resultGraphData: graphData, showGraph: true });
        } else if (response.data.status == 0) {
            this.setState({resultGraphData:[], errorMessage: response.data.statusDescription, isError: true })
        }
        this.resultGraph();
    }

    resultGraph = (event) => {
        var { resultGraphData } = this.state;
        this.setState({
            graphOptions: {
                credits: { enabled: false },
                scrollbar: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: false
                },
                xAxis: {
                    tickInterval: 1,
                    labels: {
                        enabled: true,
                        formatter: function () { return resultGraphData[this.value][0]; },
                    }
                },
                series: [{
                    data: this.state.resultGraphData, name: "Obtained Marks", yAxis: 1, type: 'column',
                    fillColor: {
                        stops: [
                            [0, '#01F3B9'],
                            [1, '#04E1F9'],
                            [2, '#04E1F9']
                        ]
                    }
                }]
            }
        })
    };
    backDashboard = () => {
        this.setState({ isError: false })
    }
    render() {
        const OkButton = [<Button style={{ backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" }} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                <SelectExamType handleExaminationType={this.handleExaminationType} teacherid={this.props.teacherid} />
                {this.state.showGraph ? <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={this.state.graphOptions}
                /> : ""}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(ResultGraph));