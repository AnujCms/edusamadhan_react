
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles, Typography, Card, Button } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    root: {
        margin: theme.spacing(22),
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});
class EntranceCompletedUI extends React.Component {
    state = {
        totalMarks: '', obtainedMarks: '', resultStatus: '', isRender: false, isError:false, errorMessage:''
    }
    async componentDidMount() {
        var response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getEntranceResult', null);
        if (response.data.status == 1) {
            let data = response.data.statusDescription;
            this.setState({ isRender: true, totalMarks: data.totalMarks, obtainedMarks: data.obtainedMarks, resultStatus: data.resultStatus })
        } else if (response.data.status == 0) {
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }
    }
    backDashboard = () => {
        this.setState({ isError: false})
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                {this.state.isRender && <>
                    <Card style={{ padding: '30px', borderBottom: "2px solid #00aacb" }}>
                        <Typography variant="h6">Your Exam completed successfully.</Typography>
                    </Card>
                    <Card style={{ padding: '30px', marginTop: "30px", borderBottom: "2px solid #00aacb" }}>
                        <Typography variant="h5" style={{ padding: '10px'}}> Your Result Details </Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Total Marks: {this.state.totalMarks}</Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Obtained Marks: {this.state.obtainedMarks}</Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Your percentages is: {Math.round((this.state.obtainedMarks * 100) / this.state.totalMarks)}%</Typography><hr></hr>
                        {(this.state.resultStatus == '2') ? <Typography variant="h5">Your status is: <b style={{ color: 'green' }}>{"Passed"}</b></Typography> :
                            <Typography variant="h5">Your status is: <b style={{ color: 'red' }}>{"Failed"}</b></Typography>}
                    </Card>
                    <Card style={{ padding: '30px', marginTop: "30px", borderBottom: "2px solid #00aacb" }}>
                        <Typography><b>Note:</b></Typography><br/>
                        <Typography variant="h6">If there is any error in your result</Typography><br />
                        <Typography variant="h6"> Contact your Exam Head.</Typography>
                    </Card>
                </>}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage(['EntranceCompleted'])(EntranceCompletedUI));