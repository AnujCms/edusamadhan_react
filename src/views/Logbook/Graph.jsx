import React from 'react';
import { withStyles } from '@material-ui/core';
import ResultGraph from './ResultGraph';
import AttendanceGraph from './AttendanceGraph';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DevelopementGraph from './DevelopementGraph';

const styles = theme => ({
  root: {
    maxWidth: '1100px',
    margin: '1px auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
    ...theme.mixins.gutters(),
    paddingLeft: '0px',
    paddingRight: '0px'
  },    
  radiodis:{display: "flex"},

});

class Graph extends React.Component {
  state = {
    value: "resultgraph",
    studentid: '',
    resultgraph: true,
    attendancegraph: false,
    developementgraph: false
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
};
  resultGraph = () => {
    this.setState({ resultgraph: true, attendancegraph: false, developementgraph: false });
  }
  attendanceGraph = () => {
    this.setState({ attendancegraph: true, resultgraph: false, developementgraph: false});
  }
   developementGraph = () => {
    this.setState({ developementgraph: true, attendancedata: true, resultdata: false, graphdata: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}> 
             <div className={classes.radiodis}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            onChange={this.handleChange}
                            value={this.state.value}
                        >
                            <FormControlLabel value="resultgraph" onChange={this.resultGraph} control={<Radio />} label="Result Graph" />
                            <FormControlLabel value="attendancegraph" onChange={this.attendanceGraph} control={<Radio />} label="Attendance" />
                            {/* <FormControlLabel value="developementgraph" onChange={this.developementGraph} control={<Radio />} label="Development" /> */}
                        </RadioGroup>
                    </FormControl>
                </div>
        {(this.state.resultgraph ? <ResultGraph studentid={this.props.studentid} teacherid={this.props.teacherid}/> : "")}
        {(this.state.attendancegraph ? <AttendanceGraph studentid={this.props.studentid} teacherid={this.props.teacherid}/> : "")}
        {(this.state.developementgraph ? <DevelopementGraph studentid={this.props.studentid} teacherid={this.props.teacherid}/> : "")}
      </div>
    );
  }
}

export default withStyles(styles)(Graph);
