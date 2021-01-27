import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles, TableRow, TableHead, TableCell, TableBody, Table, MenuItem, Select, Button } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]
const styles = theme => ({
    root: {
        marginTop: theme.spacing(12),
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    OkButton: { backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" },
})
class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true, scroll: 'body', totalDays: [], presentDays: [], monthName: [], TWD: '', TPD: '', isError: false, errorMessage: ''
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
        let response = await this.props.authenticatedApiCall('get', '/api/studentservice/studentattendance', null);
        if (response.data.status == 1) {
            const r = response.data.statusDescription;
            let MonthsName = []
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
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    backDashboard = () => {
        this.setState({ isError: false });
        this.props.history.push('./studentsdetails');
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeading} key='subjects'>Months Name</TableCell>
                            <TableCell className={classes.tableHeading} key='tm'>Total Classes</TableCell>
                            <TableCell className={classes.tableHeading} key='om'>Present Classes</TableCell>
                            <TableCell className={classes.tableHeading} key='per'>Present Percenatges</TableCell>
                            <TableCell className={classes.tableHeading} key='grade'>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.monthName.map((month, i) =>
                            <TableRow key={i}>
                                <TableCell className={classes.tableHeading} key='a'><b>{month}</b></TableCell>
                                <TableCell className={classes.tableHeading} key='b'>{this.state.totalDays[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='c'>{this.state.presentDays[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='d'>{Math.round((this.state.presentDays[i] * 100) / this.state.totalDays[i])} {'%'}</TableCell>
                                <TableCell className={classes.tableHeading} key='e'>{((this.state.presentDays[i] * 100) / this.state.totalDays[i]) > 90 ? 'A' : ((this.state.presentDays[i] * 100) / this.state.totalDays[i]) > 70 ? 'B' : ((this.state.presentDays[i] * 100) / this.state.totalDays[i]) > 50 ? 'C' : 'D'}</TableCell>
                            </TableRow>)}
                        <TableRow>
                            <TableCell className={classes.tableHeading} key='a'><b>{'Total Attendance'}</b></TableCell>
                            <TableCell className={classes.tableHeading} key='b'>{this.state.TWD}</TableCell>
                            <TableCell className={classes.tableHeading} key='c'>{this.state.TPD}</TableCell>
                            <TableCell className={classes.tableHeading} key='d'>{Math.round((this.state.TPD * 100) / this.state.TWD)} {'%'}</TableCell>
                            <TableCell className={classes.tableHeading} key='e'>{((this.state.TPD * 100) / this.state.TWD) > 60 ? 'GOOD' : 'BAD'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.OkButton} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(Attendance));
