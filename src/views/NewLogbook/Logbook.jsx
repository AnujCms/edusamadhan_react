import React from 'react';
import { withStyles, Paper, Tabs, Tab, Typography, Grid } from '@material-ui/core';
import Result from './Result';
import Attendance from './Attendance';
import Graph from './Graph';
import { Helmet } from "react-helmet";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(11),
    maxWidth: '1100px',
    margin: '20px auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: '0px'
    },
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "5px", marginBottom:"10px", [theme.breakpoints.down('md')]: { marginTop: "0px" }  },
  GridContainer: { marginTop: "10px", [theme.breakpoints.down('md')]: { marginTop: "15px" } },
  pad0: { padding: 0 }
});

class Logbook extends React.Component {
  state = {
    value: 0,
    studentid: '',
    resultdata: true,
    graphdata: false,
    attendancedata: false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getResultData = () => {
    this.setState({ resultdata: true, attendancedata: false, graphdata: false });
  }

  getGraphData = () => {
    this.setState({ graphdata: true, resultdata: false, attendancedata: false });
  }

  getAttendanceData = () => {
    this.setState({ attendancedata: true, resultdata: false, graphdata: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet> <title>Student Logbook</title></Helmet>
        <Grid container className={classes.GridContainer}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.pad0}>
            <Typography variant="h4" className={classes.evenetsTitle}>Students Result, Attendance</Typography>
          </Grid>
        </Grid>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Result" onClick={this.getResultData} />
            <Tab label="Attendance" onClick={this.getAttendanceData} />
            <Tab label="Graph" onClick={this.getGraphData} />
          </Tabs>
        </Paper>
        {(this.state.resultdata ? <Result studentid={this.props.studentid} teacherid={this.props.teacherid} /> : "")}
        {(this.state.graphdata ? <Graph studentid={this.props.studentid} teacherid={this.props.teacherid} /> : "")}
        {(this.state.attendancedata ? <Attendance studentid={this.props.studentid} teacherid={this.props.teacherid} /> : "")}
      </div>
    );
  }
}

export default withStyles(styles)(Logbook);
