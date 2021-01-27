import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { withStyles, withWidth, Grid, Button } from '@material-ui/core';
import MasterPage from './MasterPage';
import EbooksDetails from './EbooksDetails';
import HomeNavbar from '../../components/HomeNavebar';
import { NavLink } from 'react-router-dom'

const styles = theme => ({
    navLink: { padding: "20px 30px", textDecoration: "none", display: "inline-flex", float: "left", color: "#001C61" },
    login: { width: "410px", marginLeft: "33%", marginTop: "15%", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } },
    headPop: { padding: "20px 30px", float: "right", color: "#001C61", margin: "0 10px", '&:hover': { background: "transparent" } },
    navLinkMobile: { marginLeft: "6px", padding: "2px 5px", textDecoration: "none", display: "inline-flex", float: "left", color: "#515974" },
    dispBlk: { [theme.breakpoints.down('sm')]: { display: "block", width: "100%" } },
});

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
    }

    handleClick = () => {
        this.props.history.push('../public/teachers')
    }
    render() {
        const { anchorEl } = this.state;
        const { match, width, classes } = this.props;
        if (width == "xs" || width == "sm") {
            var Nav = [
                <NavLink to={`${match.url}/Home`} className={classes.navLinkMobile + " " + classes.dispBlk} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            ];
        } else {
            Nav = [
                <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.headPop}
                >Login</Button>,
                <NavLink to={`${match.url}/dashboard`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
                <NavLink to={`${match.url}/ebooksdetails`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>E-Books</NavLink>
            ];
        }
        return (
            <div key={this.props}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <HomeNavbar Nav={Nav} homeLink={'./studentlist'} />
                        <Switch>
                            <Route path={this.props.match.url + "/dashboard"} component={MasterPage} />
                            <Route path={this.props.match.url + "/ebooksdetails"} component={EbooksDetails} />
                            <Redirect to={this.props.match.url + "/dashboard"} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default (withStyles(styles)(withWidth()(HomePage)));
