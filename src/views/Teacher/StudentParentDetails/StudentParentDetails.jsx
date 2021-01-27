import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Button, Typography, Grid } from '@material-ui/core';
import queryString from 'query-string';
import FormHeader from '../../../components/FormHeader';
import ViewParentDetails from './ViewParentDetails';
import ViewOtherDetais from './ViewOtherDetais';

const styles = theme => ({
    root: { marginTop: theme.spacing(10), maxWidth: "1050px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0} },
    pad0: { padding: 0 },
    textStyle:{textAlign:"center", color:'red', marginTop:"20px"},
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right", [theme.breakpoints.down('md')]: { textAlign: "left" } },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "15px" } },
});

class StudentDetailsHome extends React.Component {
    state = {
        parentDetails: [], studentId: "", otherDetails: '', parentDetailsId: '', noRecordToDisplay: false, isRender: false
    };

    async componentDidMount() {
        let studentId = this.props.match.params.userId || this.props.studentId;
        if (studentId) {
            let response = await this.props.authenticatedApiCall('get', '/api/teacherservice/getParentDetailOfStudent/' + studentId, null);
            if (response.data.status === 1) {
                let data = response.data.statusDescription;
                let parentDetetailsArray = []
                parentDetetailsArray.push({
                    firstName: data.motherFirstName,
                    lastName: data.motherLastName,
                    cellNumber: data.motherCellNumber,
                    aadharNumber: data.motherAAdharNumber,
                    occupation: data.motherOccupation,
                    qualification: data.motherQualification,
                    image: data.motherImage,
                    title: "Mother Details"
                })
                parentDetetailsArray.push({
                    firstName: data.fatherFirstName,
                    lastName: data.fatherLastName,
                    cellNumber: data.fatherCellNumber,
                    aadharNumber: data.fatherAAdharNumber,
                    occupation: data.fatherOccupation,
                    qualification: data.fatherQualification,
                    image: data.fatherImage,
                    title: "Father Details"
                })

                if (data.localGuardianFirstName != null) {
                    parentDetetailsArray.push({
                        firstName: data.localGuardianFirstName,
                        lastName: data.localGuardianLastName,
                        cellNumber: data.localGuardianCellNumber,
                        aadharNumber: data.localGuardianAAdharNumber,
                        occupation: data.localGuardianOccupation,
                        qualification: data.localGuardianQualification,
                        image: data.localGuardianImage,
                        title: "Local Gaurdian Details"
                    })
                }
                let otherDetails = {
                    siblings: data.siblings,
                    siblingsDetails: data.siblingsDetails,
                    physicalDisability: data.physicalDisability,
                    physicalDisabilityDetails: data.physicalDisabilityDetails,
                    currentTreatment: data.currentTreatment,
                    currentTreatmentDetails: data.currentTreatmentDetails,
                    isStaffChild: data.isStaffChild,
                    studentBloodGroup: data.studentBloodGroup,
                    isWeekInSubject: data.isWeekInSubject,
                    image: data.addressProof,
                    title: "Other Details"
                }

                this.setState({isRender:true, noRecordToDisplay: true, studentId: studentId, parentDetailsId: response.data.statusDescription.Id, isUpdate: true, parentDetails: parentDetetailsArray, otherDetails: otherDetails })
            } else if (response.data.status === 0) {
                this.setState({isRender:true, isError: true, errorMessage: response.data.statusDescription })
            }
        }
    }


    backDashboard = () => {
        let parsed = {}
        parsed.reloadTo = 'teacherlist';
        parsed.timeOut = '100';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname: `./formReloader`,
            search: "?" + stringified
        });
        this.setState({ confirmActionDialog: false, isError: false, isSuccess: false })
    }
    handleCreateParentDetails = () => {
        if (this.state.parentDetailsId) {
            let idsObject = {
                studentId: this.props.match.params.userId,
                parentDetailsId: this.state.parentDetailsId
            }
            this.props.history.push('../createparentdetails/' + this.props.match.params.userId + '/' + this.state.parentDetailsId, idsObject);
        } else if (this.props.match.params.userId) {
            this.props.history.push('../createparentdetails/' + this.props.match.params.userId)
        }
    }
    handleEditNotice = (e, noticeId) => {
        let userObj = {
            studentId: this.state.studentId,
            noticeId: noticeId
        }
        this.props.history.push('../createnotice/' + this.state.studentId + '/' + noticeId, userObj)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.isRender&&<Grid container className={classes.GridContainer}>
                    {(this.props.currentUser.userDetails.role == "Teacher") &&
                        <> <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                            <Typography variant="h4" className={classes.evenetsTitle}>Parents Details</Typography>
                        </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <div className={classes.cstmprotoBtnWrap}>
                                    <Button onClick={this.handleCreateParentDetails} className={classes.primaryBtn}>Create Parents</Button>
                                </div>
                            </Grid></>}
                    <FormHeader headerText={"Parent Details"} pageTitle={"Parent Details"} />
                    {this.state.noRecordToDisplay ? <>{this.state.parentDetails.length > 0 && <>
                        {this.state.parentDetails.map((item, index) =>
                            <ViewParentDetails data={item} key={'parent' + index}/>)}
                    </>}
                        <ViewOtherDetais otherDetails={this.state.otherDetails} />
                    </>:<Typography variant='h4' className={classes.textStyle}>Parent Details are not recorded yet.</Typography>}
                </Grid>}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(StudentDetailsHome));
