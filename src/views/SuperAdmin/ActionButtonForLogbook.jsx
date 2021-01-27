import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        transformOrigin: 'center bottom' ,

    }
});
class ActionButtonForLogbook extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLogbookClick = () => {
        this.setState({anchorEl:null});
        this.props.onLogBookClick(this.props.studentid, this.props.teacherid);
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button
                    variant="outlined" color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleLogbookClick}
                    style={{ borderRadius: "50px"}}
            >
                Logbook
        </Button>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForLogbook);