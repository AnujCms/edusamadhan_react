import React from 'react';
import { withStyles, Grid, Typography, Card, CardContent } from '@material-ui/core';
import a from '../../assets/images/a.jpg';
import b from '../../assets/images/b.jpg';
import c from '../../assets/images/c.jpg';
import d from '../../assets/images/d.jpg';
import e from '../../assets/images/e.jpg';
import f from '../../assets/images/f.jpg';
import g from '../../assets/images/g.jpg';
import i from '../../assets/images/i.jpg';
import j from '../../assets/images/j.jpg';
import h from '../../assets/images/h.jpg';
import k from '../../assets/images/k.jpg';
import l from '../../assets/images/l.jpg';
import m from '../../assets/images/m.jpg';

import BackgroundSlider from 'react-background-slider';



const styles =theme => ({
    main:{
    width: '100%',
    backgroundImage:`url(${l})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:'cover',
    backgroundPosition:'center',
    height:'650px'
  },
    title:{
      color:'white',
      textAlign:'center',
    },
    headingtext:{
      paddingTop:'230px',
      fontSize:'50px'
    },
   
    cardtitle:{
      color:'white',
      fontSize:'2rem',
      textAlign:'center'
    },
    button: {
      height: "40px", width:'200px', margin: "20px 0", marginRight: "20px", backgroundColor: "#2262bf", color: "white",
      fontSize: "13.7px", whiteSpace: "nowrap", cursor: "pointer", borderRadius: "50px", [theme.breakpoints.down("sm")]: { fontSize: '12px', minWidth: "120px" },
    '&:hover': { opacity:'0.8', transition:'0.2s' , backgroundColor:'#2262bf'}
    },
    navlink:{textDecoration:'none'},
    cardaction:{ justifyContent:'center',},
  paragraph:{maxWidth:'600px', margin:'auto',fontSize:'20px' ,[theme.breakpoints.down("sm")]: {padding:"10px"},}
  });
class HomeImage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>
              <div className={classes.title}>
                    <h1 className={classes.headingtext}>Welcome to EDUSAMADHAN</h1>
                    <p className={classes.paragraph}>
                        This is the place where you can manage your school activities.</p>
                </div>
                <br /><br /><br />
            </div>
        )
    }
}

export default (withStyles(styles)(HomeImage));
