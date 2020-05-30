import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';
import ErrorDialog from './components/ErrorDialog';

const styles = theme => ({
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});
 class TimeOutRenderer extends React.Component    

{
    state = {isTimedOut: false}
    componentDidMount(){
        const timeoutCB = this.props.timeOutCallBack? this.props.timeOutCallBack: this.timeOutDone;
        this.props.userTimer(this.props.timeOutInMillis, timeoutCB);
    }

     timeOutDone = () => {
         this.setState({isTimedOut:true});
         localStorage.clear();
     };
     handleClick = () =>{
         this.props.history.push(`/public`);
     }
     componentWillUnmount() {
         this.props.userTimer.stopTimer();
     }


    render(){
        const { classes } = this.props;
        const okButton = [<Button className={classes.OkButton} onClick={this.handleClick}>Login</Button>]
           return ( 
            this.state.isTimedOut&&<ErrorDialog successButton={okButton} HeaderText={"Session has been expired due to inactivity, please login again to continue."} dismiss={this.handleClick} /> 
           );
    }
} 

TimeOutRenderer.propTypes = {
    timeOutInMillis: PropTypes.number,
    userTimer:PropTypes.func.isRequired,
    timeOutCallBack:PropTypes.func
}

TimeOutRenderer.defaultProps = {
    timeOutInMillis: 20*60*1000,
}


export default withStyles(styles)(TimeOutRenderer);