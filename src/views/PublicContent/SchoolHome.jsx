import React from 'react';
import { withStyles, Typography, Avatar } from '@material-ui/core';
import c from '../../assets/images/c.jpg';
import AdminImage from '../../assets/images/admin.png';
import axios from 'axios';

const styles = theme => ({
    root: {
        backgroundImage:`url(${c})`,
        margin: theme.spacing(0),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        height: "100vh",
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    btnStyle:{width: '100%', marginTop: "17px", marginBottom: "10px", marginLeft: "120px", [theme.breakpoints.down('md')]: { marginLeft: '90px' }  },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    cardStyle: { marginTop: "30px", height: "470px", width: "99%" },
    avatar: { width: 200, height: 200, marginLeft: "42%" },
    cardText: { textAlign: "center", color: "green", fontWeight: 900, fontSize: "24px" },
    textStyle: {  textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" }
});

class SchoolHome extends React.Component {
    state = {selectedSchoolDetails:''}
    componentDidMount = () => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        axios.get('/api/publiccontent/getSchoolInformation/' + accountId).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, selectedSchoolDetails: response.data.statusDescription })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }
    render() {
        const { classes } = this.props;
        const { selectedSchoolDetails } = this.state;
        return (
            <div className={classes.root}>
                <Avatar alt="No Images" src={selectedSchoolDetails.schoolLogo === null ? AdminImage : "data:image/jpeg;base64," + selectedSchoolDetails.schoolLogo} className={classes.avatar} />
                <Typography className={classes.textStyle}><b>School Name: {selectedSchoolDetails.accountName}</b></Typography>
                <Typography className={classes.textStyle}><b>Phone Number: {selectedSchoolDetails.phoneNumber}</b></Typography>
                <Typography className={classes.textStyle}><b>School Address: {selectedSchoolDetails.accountAddress}</b></Typography>
            </div>
        )
    }
}

export default withStyles(styles)(SchoolHome);
