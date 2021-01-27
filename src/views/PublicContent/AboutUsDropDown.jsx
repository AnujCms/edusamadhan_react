import React, { Component } from 'react';
import { withStyles, Menu, MenuItem, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClipboardList, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import clipboard from '../../assets/images/clipboard.png';

const styles = theme => ({
    simpleMenu: { minWidth: theme.palette.minWidthMenu.minWidthMenu + "!important", '& a':{borderBottom: "1.6px solid rgb(248, 248, 248)",padding: "14px 16px !important"},'&:last-child .last a':{borderBottom:"0"},'& li':{padding:"0 !important"}  },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    navLink: { padding: "20px 20px", textDecorationLine: "none", display: "inline-flex", float: "left" },
    navchildlogo:{marginRight:15,width:24},
    headPop: { padding: "20px 20px",float: "left", color:"rgb(170, 173, 175)", '&:hover':{background:"transparent"},fontWeight: "bold",lineHeight: "1.6","& span":{fontSize:"17px !important"}},
    headPopAdmin: { padding: "20px 15px",float: "left", color:theme.palette.formcolor.backgroundHeader, '&:hover':{background:"transparent",color:"#06303f"},fontWeight: "400",lineHeight: "1.7","& span":{fontSize:"17px !important"}},
    drpDownIcnStyle:{marginLeft:"6px", fontSize: '14px', color: "rgb(170, 173, 175)"},
    drpDownIcnStyleAdmin:{marginLeft:"6px", fontSize: '14px', color: "#d4d4d4"},
    elevationPopover:{zIndex:"10002 !important"}
});

class AboutUsDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: null}
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { anchorEl } = this.state;
        const { t, classes, match } = this.props; 
        return (
            <div>
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.headPopAdmin}
                >AboutUs<FontAwesomeIcon icon={faChevronDown} className={classes.drpDownIcnStyleAdmin} />
                </Button>
                <Menu className={classes.root +" "+ "navBarMenu"}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handlepopClose}
                    className={classes.elevationPopover}
                >
                    <div className={classes.simpleMenu}>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/aboutschool`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Information About School</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/facultylist`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Highlty Qualified Faculty</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/educationsystem`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Education System</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/protocol`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Campus Infrastructure</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/facilitydetails`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Our Facilities</NavLink></MenuItem>
                        <MenuItem onClick={this.handlepopClose}><NavLink to={`${match.url}/childsafty`} className={classes.navLink} activeStyle={{ fontWeight: "bold", color: this.props.color }} style={{ padding: "0", width: "100%", color: '#515974',alignItems: "center",fontSize: "16px" }} ><img src={clipboard} className={classes.navchildlogo} />Child Safty</NavLink></MenuItem>
                    </div>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(AboutUsDropDown);