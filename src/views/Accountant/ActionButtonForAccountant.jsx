import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: { display: 'flex', flexWrap: 'wrap', transformOrigin: 'center bottom' },
    borderBottom:{fontSize:"16px", borderBottom:"1px solid rgba(218, 223, 224, 1)"},
    btnIcon: { fontSize: 18, marginRight:"10px"},
    liCommon:{borderBottom:"1px solid #dadfe0",padding:"12px 15px"}
});
class ActionButtonForAccountant extends React.Component {
    state = {
        anchorEl: null, open: false, scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleFeeDetailsClick = () => {
        this.setState({ anchorEl: null });
        this.props.getFeeDetails(this.props.adharnumber, this.props.mediumType)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

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