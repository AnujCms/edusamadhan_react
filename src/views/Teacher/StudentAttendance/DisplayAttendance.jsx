import React from 'react';

class DisplayAttendance extends React.Component {

    render() {
        const value = this.props.attendance;
        return <p style={{ color: value == "P" ? "green" : (value == "A" ? "red" : (value == "S" ? "#800000" : (value == "H" ? "#483D8B" : "blue"))) }}><b>{value}</b></p>
    }
}

export default DisplayAttendance;