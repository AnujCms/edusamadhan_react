
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import ExamStart from './ExamStart';
import { withStyles, Typography, Button, Card, CardContent, CardActions, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(11),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            margin: 0,
            paddingTop: '5px'
        },
    },
    pad_15: { float: "right" },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },

})

class Entrance extends React.Component {
    state = { startTest: false, disableButton:false, numberOfStudents:"" }

    handleStartTest = () => {
        this.setState({ startTest: true })
    }
    
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getQuestionForEntrance', null);
        if (response.data.status == 0) {
            this.setState({disableButton:true, numberOfStudents:"No question found to start your examination."})
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card style={{ padding: "30px" }}>
                {this.state.startTest?<ExamStart />:
                    <>
                    <CardContent>
                        <GridContainer>
                            <GridItem  lg={12} md={12} xs={12} sm={12} >
                                <Typography variant="h4">** Important Information **</Typography>
                                <Typography variant="h3">Please read the instructions carefully.</Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} style={{marginTop:"20px"}}>
                            {/* <div className={classes.lineBreak}></div> */}
                            <span>1. Welcome to Online Examination, If you are feeling well and want to start the test then click on Start button.</span><br />
                            <span>2. Don't Refresh the page during your examination.</span><br />
                            <span>3. Press Next Button for next question.</span><br />
                            <span>4. When will your exam don't close the tab Note done your reasult.</span>
                            </GridItem><br></br>
                            {this.state.disableButton&&<GridItem  xs={12} sm={12} style={{marginTop:"20px"}}>
                               <Typography variant="h4">Note: <b>{this.state.numberOfStudents}</b></Typography>
                            </GridItem>}
                        </GridContainer>
                    </CardContent>
                    <CardActions className={classes.pad_15}>
                    <Button onClick={this.handleStartTest} className={classes.primaryButton} disabled={this.state.disableButton}> Start Your Test </Button>
                    </CardActions>
                    </>}
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(AuthenticatedPage(['EntranceStudent'])(Entrance));