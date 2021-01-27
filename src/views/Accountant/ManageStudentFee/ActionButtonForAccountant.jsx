import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' }
});
class ActionButtonForAccountant extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleFeeDetailsClick = () => {
        this.setState({ anchorEl: null });
        this.props.getFeeDetails(this.props.userId, this.props.mediumType)
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Button
                    onClick={this.handleFeeDetailsClick}
                    variant="outlined" color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    style={{ borderRadius: "50px" }}
                >
                    Pay
        </Button>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForAccountant);