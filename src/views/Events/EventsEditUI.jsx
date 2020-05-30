import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';

class EventsEditUI extends React.Component {
    constructor(props) {
        super(props)
        this.eventOptions = [{ value: 1, label: "Sports" }, { value: 2, label: "Singing" }, { value: 3, label: "Dancing" }, { value: 4, label: "Essay Writing" }, { value: 5, label: "Drawing" }, { value: 6, label: "Speaking" }]
        this.sportsOptions = [{ value: 1, label: "Cricket" }, { value: 2, label: "Football" }, { value: 3, label: "Volleyball" }, { value: 4, label: "Badminton" }, { value: 5, label: "Race" }, { value: 6, label: "Long Jump" }, { value: 7, label: "Kabaddi" }, { value: 8, label: "Kho-Kho" }]
        this.singingOptions = [{ value: 1, label: "Single Singing" }, { value: 2, label: 'Group Singing' }]
        this.danceOptions = [{ value: 1, label: "Solo Dance" }, { value: 2, label: 'Group Dance' }]
    }
    setEventObject = (value) => {
        let eventValue = '';
        this.eventOptions.forEach((item) => {
            if (item.value == value) {
                eventValue = item;
            }
        })
        return eventValue;
    }
    setSportObject = (sports) => {
        let eventsArray = [];
        sports.forEach(eventObj => {
            this.sportsOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj)
                }
            })
        })
        return eventsArray;
    }
    setSingingObject = (song) => {
        let eventsArray = [];
        song.forEach(eventObj => {
            this.singingOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj)
                }
            })
        })
        return eventsArray;
    }
    setDancingObject = (dance) => {
        let eventsArray = [];
        dance.forEach(eventObj => {
            this.danceOptions.forEach(obj => {
                if (eventObj === obj.value) {
                    eventsArray.push(obj)
                }
            })
        })
        return eventsArray;
    }
    async componentDidMount() {
        let data = this.props.eventObject;
        console.log('data',data)
        console.log(JSON.parse(data.eventData))
        this.props.formik.setFieldValue("eventtype", this.setEventObject(data.eventtype), false);
        if(data.eventtype === 1){
            this.props.formik.setFieldValue("soprtnames", this.setSportObject(JSON.parse(data.eventData)[0].eventdetails), false);
        }
        if(data.eventtype === 2){
            this.props.formik.setFieldValue("singingnames", this.setSingingObject(JSON.parse(data.eventData)[0].eventdetails), false);
        }
        if(data.eventtype === 3){
            this.props.formik.setFieldValue("dancenames", this.setDancingObject(JSON.parse(data.eventData)[0].eventdetails), false);
        }
        this.props.formik.setFieldValue("eventname", data.eventname, false);
        this.props.formik.setFieldValue("lastname", data.lastname, false);
        this.props.formik.setFieldValue("eventstartdate", new Date(JSON.parse(data.eventData)[0].eventstartdate), false);
        this.props.formik.setFieldValue("eventenddate", new Date(JSON.parse(data.eventData)[0].eventstartdate), false);
        this.props.formik.setFieldValue("eventdescription", JSON.parse(data.eventData)[0].eventdescription, false);
    }
    render() {
        return (
            <>
            </>
        );
    }
}

export default withStyles()(AuthenticatedPage("Principal")(connect(EventsEditUI)));