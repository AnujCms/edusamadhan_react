import React from 'react';
import { withStyles, Grid, Typography, Card, Avatar, Paper, CardContent } from '@material-ui/core';
import axios from 'axios';
import AdminImage from '../../../assets/images/admin.png';
import { handleQualificationLabel, handleSubjectLabel, handleUserRoleLabel } from '../../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    userroleText: { textAlign: "center", color: "green", fontWeight: 900, fontSize: "16px" },
    cardStyle: { marginTop: "30px", height: "470px", width: "99%" },
    avatar: { width: 200, height: 200, marginLeft: "30%",  [theme.breakpoints.down('md')]: { marginLeft: '21%' } },
    textStyle: { marginTop: "40px", textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" },
    cardTextStyle: { textAlign: "center", color: "brown", fontWeight: 900, fontSize: "36px" },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});


class StaffDetails extends React.Component {
    state = {
        facultyList: [], errorMessage:''
    };


    async componentDidMount() {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        // if(this.props.selectedSchoolDetails != undefined){
        axios.get('/api/publiccontent/getAllFaculyDetails/' + accountId).then(response => {
            if (response.data.status == 1) {
                this.setState({ facultyList: response.data.statusDescription })
            }else{
                this.setState({errorMessage: response.data.statusDescription})
            }
        })
    }


    render() {
        const { classes } = this.props;
        const { errorMessage } = this.state; 
        return (
            <div className={classes.root}>
                <Paper className={classes.formHeader}>
                    <Typography className={classes.center}>SCHOOL FACULTY DETAILS</Typography>
                </Paper>
                {this.state.facultyList.length>0?<Grid container>
                    {this.state.facultyList.map((item, index) =>
                        <Grid item lg={4} md={4} sm={12} xs={12} key={'faculty' + index}>
                            <Card className={classes.cardStyle}>
                                <Avatar alt="No Images" src={item.images === null ? AdminImage : "data:image/jpeg;base64," + item.images} className={classes.avatar} />
                                <div>
                                    <Typography className={classes.cardTextStyle}>{item.gender == 1 ? "Mr." : "Mrs."} {item.facultyName}</Typography>
                                    <Typography className={classes.userroleText}>{handleUserRoleLabel(item.userrole)}</Typography>
                                </div>
                                <CardContent>
                                    <Typography className={classes.userroleText}>Qualification: {handleQualificationLabel(item.qualification)}</Typography>
                                    <Typography className={classes.userroleText}>Specialization: {handleSubjectLabel(item.subject)}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>)}
                        </Grid> : <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        );
    }
}

export default withStyles(styles)(StaffDetails);
