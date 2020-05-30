import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Grid, Button, Typography, Paper, TextField } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Helmet } from "react-helmet";
import PeriodView from './PeriodView';
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import 'date-fns';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    container: { display: 'flex', flexWrap: 'wrap' },
    textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: 200 },
    paddingBottom: { padding: "10px" },
    pad0: { padding: 0 },
    btnStyle: { margin: "0px", height: "70px", width: "100%", [theme.breakpoints.down('md')]: { marginBottom: "20px" } },
    cancelBtn: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(75, 123, 227, 1)", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: 0 } },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

const periodsObjects = [{ value: 1, label: "1st Period" }, { value: 2, label: "2nd Period" }, { value: 3, label: "3rd Period" }, { value: 4, label: "4th Period" }, { value: 5, label: "5th Period" }, { value: 6, label: "6th Period" }, { value: 7, label: "7th Period" }, { value: 8, label: "8th Period" }, { value: 9, label: "9th Period" }, { value: 10, label: "10th Lunch Break" }]

class CreatePeriod extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        this.fieldVariables = {
            periodDetails: []
        }
        this.state = {
            reRender: true,
            periodObj: "", periodStartTime: new Date('2020-08-18T07:30:00'), periodEndTime: new Date('2020-08-18T08:30:00'), successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
        };
    }

    backDashboard = () => {
        this.setState({ reRender: true })
        this.setState({ isError: false, isSuccess: false })
    }
    backTimeTable = () => {
        this.setState({ isSuccess: false, reRender: true })
        this.props.history.push(`./create-period`);
    }

    setPeriodValue = (value) => {
        let periodObj
        periodsObjects.map((item) => {
            if (item.value === value) {
                periodObj = item
            }
        })
        return periodObj;
    }
    handlePeriodChange = (event) => {
        this.setState({ periodObj: this.setPeriodValue(event.value) })
    }
    handlePeriodStartTime = (value) => {
        this.setState({ periodStartTime: value })
    }
    handlePeroidEndTime = (value) => {
        this.setState({ periodEndTime: value })
    }
    handelSubmit = async () => {
        if (this.state.periodObj.value && this.state.periodStartTime && this.state.periodEndTime) {
            let startHours = new Date(this.state.periodStartTime).getHours()
            if (startHours < 10 && startHours != 0) {
                startHours = "0" + startHours
            } else if (startHours == 0) {
                startHours = "12"
            }
            let startTimeToSend = startHours + ":" + new Date(this.state.periodStartTime).getMinutes();

            let endHours = new Date(this.state.periodEndTime).getHours()
            if (endHours < 10 && endHours != 0) {
                endHours = "0" + endHours
            } else if (endHours == 0) {
                endHours = "12"
            }
            let endTimeToSend = endHours + ":" + new Date(this.state.periodEndTime).getMinutes();
            let dataToSend = {
                periodId: this.state.periodObj.value,
                periodStartTime: startTimeToSend,
                periodEndTime: endTimeToSend
            }
            let response = await this.props.authenticatedApiCall('post', "/api/timetableservice/createperiods", dataToSend);
            if (response.data.status === 1) {
                this.setState({reRender:false, isSuccess: true, successMessage: response.data.statusDescription });
            } else {
                this.setState({ isError: true, successMessage: response.data.statusDescription });
            }

        } else {
            this.setState({ isError: true, errorMessage: "First fill all the fileds." });
        }
    }
    handleCancel = () => {
        this.setState({ reRender: true })
        this.props.history.push(`./timetable`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backTimeTable}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <Helmet> <title>Time Table </title></Helmet>
                <Paper className={classes.formHeader}>
                    <Typography className={classes.center}>Manage Period Durations</Typography>
                </Paper>
                <Paper>
                    <form className={classes.container} noValidate>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000', marginTop: "20px" }}>
                                <InputLabel>Periods</InputLabel>
                                <FormControl
                                    style={{ width: 350 }}
                                >
                                    <Select
                                        value={this.state.periodObj}
                                        onChange={this.handlePeriodChange}
                                        options={periodsObjects}
                                        placeholder='Select Period'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >
                                    </Select>
                                </FormControl>
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Period Start Time"
                                        value={this.state.periodStartTime}
                                        onChange={this.handlePeriodStartTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Period End Time"
                                        value={this.state.periodEndTime}
                                        onChange={this.handlePeroidEndTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </form>
                </Paper>
                <Paper className={classes.btnStyle}>
                    <Grid container>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px", textAlign: 'end' }}>
                            <Button onClick={this.handleCancel} className={classes.cancelBtn}>Cancel</Button>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} style={{ width: '100%', marginTop: "17px" }}>
                            <Button onClick={this.handelSubmit} disabled={this.state.startSpinner} className={classes.createUser}>Submit</Button>
                        </Grid>
                    </Grid>
                </Paper>
                {this.state.reRender && <PeriodView />}
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backTimeTable} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("Principal")(WithAccount(CreatePeriod)));