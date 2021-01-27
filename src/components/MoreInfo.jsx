import React from 'react';
import { withStyles, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const styles = (theme) => ({
    medTooltip: { fontSize: 12, maxWidth: 140, textAlign: "center" },
    infoIcon: { fontSize: 15, color: "rgba(0, 0, 0, 0.54)" }
});

class MoreInfo extends React.Component {


    render() {
        const { classes } = this.props;
        return (
            <span><Tooltip title={this.props.tooltipMessage} arrow placement="top" classes={{ tooltip: classes.medTooltip }}><InfoIcon className={this.props.classes.infoIcon} /></Tooltip></span>
        );
    }
}

export default withStyles(styles)(MoreInfo);