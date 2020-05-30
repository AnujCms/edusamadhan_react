import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import BGimage from '../../assets/images/logo.jpg';
import admininstrationImg from '../../assets/images/admininstration.png';
import accountantImg from '../../assets/images/acc.jpeg';
import facultyImg from '../../assets/images/faculty.png';
import exminationImg from '../../assets/images/exmination.png';
import eventsImg from '../../assets/images/event.png';
import notificationsImg from '../../assets/images/notification.png';
import timetablesImg from '../../assets/images/timetables.jpg';
import timtbleImg from '../../assets/images/timtble.png';
import exminationImgg from '../../assets/images/examination.png';
import ttableImg from '../../assets/images/ttable.jpg';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles, Card, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 0.5,
        maxWidth: '1200px',
        margin: '5px auto',
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            maxWidth: '100%',
            marginBottom: '55px'
        },
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * .1,
        paddingBottom: theme.spacing.unit * 1,
        paddingLeft: '0px',
        paddingRight: '0px',
        backgroundColor:"#E8E8E8"
    },
    navLink: { padding: "5px 15px", textDecorationLine: "none", display: "inline-flex", float: "right" },
    pad60: { padding: "30px" },
    cardWidthHeoght:{marginTop:"45px", width:"250px", height:"250px"},
    login: { textAlign:"center", marginTop:"20px", cursor:"pointer", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } }
});

class HomeDashboard extends React.Component {
    hanldeHomePage = () =>{
        this.props.history.push('./dashboard')
    }
    hanldePrincipal = () =>{
        this.props.history.push('./principal')
    }
    hanldeAccountant = () =>{
        this.props.history.push('./accountant')
    }
    hanldeFaculty = () =>{
        this.props.history.push('./faculty')
    }
    hanldeExamination = () =>{
        this.props.history.push('./examination')
    }
    hanldeStudent = () =>{
        this.props.history.push('./student')
    }
    hanldeEvents = () =>{
        this.props.history.push('./events')
    }
    hanldeNotifications = () =>{
        this.props.history.push('./notifications')
    }
    hanldeTimeTable = () =>{
        this.props.history.push('./timetable')
    }

    render() {
        const { match, classes } = this.props;
        return (
            <div className={classes.root}>
                <GridContainer>
                    <GridItem onClick={this.hanldePrincipal} lg={4} md={4} xs={12} sm={12} className={classes.login} >
                        <img src={admininstrationImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeAccountant} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={accountantImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeFaculty} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={facultyImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeExamination} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={exminationImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeStudent} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={exminationImgg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeEvents} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={eventsImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeNotifications} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={notificationsImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                    <GridItem onClick={this.hanldeTimeTable} lg={4} md={4} xs={12} sm={12} className={classes.login}>
                        <img src={timtbleImg} alt="logo" width="190px" height="190px"/>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default (withStyles(styles)(HomeDashboard));
