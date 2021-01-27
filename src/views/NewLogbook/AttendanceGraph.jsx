import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { withStyles, Button } from '@material-ui/core';
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

class AttendanceGraph extends React.Component {
    state = {
        subjects: '',
        bgData: [],
        isError: false, 
        errorMessage: '',
        attendanceGraphData: [],
        value: 'bganddose',
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

    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/logbookservice/' + this.props.studentid + '/'+ this.props.teacherid + '/studentattendanceforgraph', null);
        if (response.data.status == 1) {
            this.setState({ attendanceGraphData: response.data.attendance });
        }else if(response.data.status == 0){
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
        this.attendanceGraph();
    }

    attendanceGraph = (event) => {
        var { attendanceGraphData } = this.state;
        this.setState({
            graphOptions: {
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
                        formatter: function () { return attendanceGraphData[this.value][0]; },
                    }
                },
                series: [{
                    data: this.state.attendanceGraphData, name: "Present Days", yAxis: 1, type: 'column',
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
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={this.state.graphOptions}
                />
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(AttendanceGraph));