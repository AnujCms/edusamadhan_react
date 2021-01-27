import React from 'react';
import { withStyles } from '@material-ui/core';
import { Helmet } from "react-helmet";
import HomeImage from './HomeImage';
import AboutEdu from './AboutEdu';
import OurServices from './OurServices';
import ContactUs from './ContactUs';
import OurMotive from './OurMotive';
import OurClients from './OurClients';
import Footer from './Footer';
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

const styles = theme => ({
    main: {
        backgroundColor: '#DCDCDC'
    },
    title: {
        color: 'white',
        textAlign: 'center',
    }
});
class MasterPage extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <Helmet><title>Welcome</title></Helmet>
                <HomeImage />
                <AboutEdu />
                <OurMotive />
                <OurServices />
                <OurClients />
                <ContactUs />
                <Footer />
            </div>
        )
    }
}

export default withStyles(styles)(MasterPage);
