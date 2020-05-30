
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles, Typography, Card, Button } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const styles = theme => ({
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});
class EntranceCompletedUI extends React.Component {
    state = {
        totalmarks: '', obtainedmarks: '', resultStatus: '', isRender: false, isError:false, errorMessage:''
    }
    async componentDidMount() {
        var response = await this.props.authenticatedApiCall('get', '/api/entranceexamservice/getentranceresult', null);
        console.log(response.data)
        if (response.data.status == 1) {
            let data = response.data.statusDescription;
            this.setState({ isRender: true, totalmarks: data.totalmarks, obtainedmarks: data.obtainedmarks, resultStatus: data.status })
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
            <>
                {this.state.isRender && <>
                    <Card style={{ padding: '30px', borderBottom: "2px solid #00aacb" }}>
                        <Typography variant="h6">Your Exam completed successfully.</Typography>
                    </Card>
                    <Card style={{ padding: '30px', marginTop: "30px", borderBottom: "2px solid #00aacb" }}>
                        <Typography variant="h5" style={{ padding: '10px'}}> Your Result Details </Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Total Marks: {this.state.totalmarks}</Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Obtained Marks: {this.state.obtainedmarks}</Typography><hr></hr>
                        <Typography variant="h6" style={{ padding: '10px'}}>Your percentages is: {Math.round((this.state.obtainedmarks * 100) / this.state.totalmarks)}%</Typography><hr></hr>
                        {(this.state.resultStatus === 'Passed') ? <Typography variant="h5">Your status is: <b style={{ color: 'green' }}>{this.state.resultStatus}</b></Typography> :
                            <Typography variant="h5">Your status is: <b style={{ color: 'red' }}>{this.state.resultStatus}</b></Typography>}
                    </Card>
                    <Card style={{ padding: '30px', marginTop: "30px", borderBottom: "2px solid #00aacb" }}>
                        <Typography><b>Note:</b></Typography><br/>
                        <Typography variant="h6">If there is any error in your result</Typography><br />
                        <Typography variant="h6"> Contact your Exam Head.</Typography>
                    </Card>
                </>}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage(["EntranceCompleted"])(EntranceCompletedUI));