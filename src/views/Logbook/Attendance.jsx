import React from 'react';
import SmallSizeAttendance from './SmallSizeAttendance';
import BigSizeAttendance from './BigSizeAttendance';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, withWidth, Button } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]
const styles = theme => ({
    tableHeading: {
        border: '1px solid #000',
        height: '30px',
        textAlign: 'center'
    }
});
class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            scroll: 'body',
            totalDays: [],
            presentDays: [],
            monthName: [],
            TWD: '',
            TPD: '',
            isError: false, 
            errorMessage: ''
        };
    }


    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    async componentDidMount() {
        var studentid = this.props.studentid;
        var teacherid = this.props.teacherid;

        var response = await this.props.authenticatedApiCall('get', '/api/logbookService/' + studentid + '/' + teacherid + '/studentattendance', null);
        if(response.data.status == 1){
        const r = response.data.attendance;
        var MonthsName = []
        monthOptions.map(month => {
            MonthsName.push(month.label)
        })

        var TotalDays = []
        TotalDays.push(r.jtd)
        TotalDays.push(r.ftd)
        TotalDays.push(r.mtd)
        TotalDays.push(r.atd)
        TotalDays.push(r.matd)
        TotalDays.push(r.juntd)
        TotalDays.push(r.jultd)
        TotalDays.push(r.autd)
        TotalDays.push(r.std)
        TotalDays.push(r.otd)
        TotalDays.push(r.ntd)
        TotalDays.push(r.dtd)

        var PresentDays = []
        PresentDays.push(r.jpd)
        PresentDays.push(r.fpd)
        PresentDays.push(r.mpd)
        PresentDays.push(r.apd)
        PresentDays.push(r.mapd)
        PresentDays.push(r.junpd)
        PresentDays.push(r.julpd)
        PresentDays.push(r.aupd)
        PresentDays.push(r.spd)
        PresentDays.push(r.opd)
        PresentDays.push(r.npd)
        PresentDays.push(r.dpd)

        var sumTD = 0;
        TotalDays.map((td, i) => {
            sumTD = sumTD + td
        })
        var sumPD = 0;
        PresentDays.map((pd, i) => {
            sumPD = sumPD + pd
        })
        this.setState({ totalDays: TotalDays, presentDays: PresentDays, monthName: MonthsName, TWD: sumTD, TPD: sumPD })
    }else if(response.data.status == 0){
        this.setState({ errorMessage: response.data.statusDescription, isError: true })
    }
}
backDashboard = () => {
    this.setState({ isError: false })
}
    render() {
        const { classes, width } = this.props;
        const attendanceData = this.state;
        const OkButton = [<Button style={{ backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" }} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                {(width == "xs" || width == "sm") ? <SmallSizeAttendance attendanceData={attendanceData} /> :
                    <BigSizeAttendance attendanceData={attendanceData} />
                }
               {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(AuthenticatedPage(["Teacher", "ExamHead", "SuperAdmin", "Principal", "Student"])(Attendance)));
