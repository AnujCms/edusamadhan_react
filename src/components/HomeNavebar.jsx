import React, {useEffect } from 'react';
import logo from '../assets/images/logo.jpg';
import { withStyles, withWidth, Hidden, Button, IconButton, Typography, Toolbar, AppBar, ListItem, Divider, List, SwipeableDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import TeacherImage from '../assets/images/admin.png';

const styles = theme => ({
    list: { width: 250 },
    fullList: { width: 'auto' },
    menuButton: { marginRight: 20, height: 46, position: "absolute", left: "2%"},
    root: { flexGrow: 1, marginBottom: "65px" },
    logoutBtn: { textDecoration: "none", color: "#515974", display: "inline-flex", float: "right", textTransform: "capitalize", marginRight: "2%", paddingTop:"10px" },
    logoBg: { backgroundColor: "#fff",padding: "0px"},
    logoForMobile: { left: "30%", width:"100px", position: "absolute" },
    navLinkMobile: { textDecoration: "none", display: "inline-flex", color: "#515974" },
    avatar:{ width: 40, height: 40, marginLeft:"40px" },
    dispBlk:{
        [theme.breakpoints.down('sm')]:{
            display:"block",
            width:"100%"
        }
    },
});

function HomeNavbar(props) {
    const [state, setState] = React.useState({
        left: false
    });
    const { classes, userDetails,  homeLink, t } = props;
    // var isImage = false;
    // if (userDetails.image) {
    //     isImage = true;
    // } 
    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ state, [side]: open });
    };

    function login(){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        axios.get('/api/providerauthservice/signout').then(response =>{
      console.log(response);  
    })
  window.location.href = "/public/Login"
}
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem>
                    <span style={{display:"flex"}}> 
                    <Typography variant="h6" style={{marginTop:"18px"}}>Edusamadhan</Typography>
                    <Avatar alt="No Images" src={TeacherImage} className={classes.avatar} />
                    </span>
                </ListItem>
                <Divider />
                {props.Nav.map((links, i) =>
                <div key={i}><ListItem ><div className={classes.dispBlk}>{links}</div></ListItem></div>
                )}
                <ListItem >
                    <div style={{ width: "100%" }}>
                        <Button onClick={login} className={classes.navLinkMobile}>Login</Button>
                    </div>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{ backgroundColor: '#f5f5f5' }}>
                <Toolbar style={{ padding: "0" }}>
                    <Hidden smDown>
                        <Typography variant="h6" color="inherit" className={classes.logoBg}>
                            <NavLink to={homeLink} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>
                            <img src={logo} alt="logo"  width="140px" height="70px"/>
                            </NavLink>
                        </Typography>
                    </Hidden>
                    <Hidden mdUp>
                        <Typography variant="h6" color="inherit" className={classes.logoForMobile}>
                            <NavLink to={"#"} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>
                            <img src={logo} alt="logo" width="155px" height="56px"/>
                            </NavLink>
                        </Typography>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smDown>
                        <div style={{ width: "100%" }}>
                            {/* <Button onClick={logout} className={classes.logoutBtn} >Logout</Button> */}
                            {props.Nav.map((links, i) =>
                                <div key={i}>{links}</div>
                            )}

                        </div>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );

}

export default withStyles(styles, { withTheme: true })(HomeNavbar);
