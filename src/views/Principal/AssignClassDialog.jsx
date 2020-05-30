import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles } from '@material-ui/core/styles';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator';
import { ValidatorForm } from 'react-material-ui-form-validator-vivek';
import { Button, FormLabel, Card, CardContent, CardActions } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Spinner from '@material-ui/core/CircularProgress';

const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]
const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: { width: "100px", textAlign: "right", marginRight: "35px" },
    selectContainer: { width: 200 },
    cardRoot: { "overflow": "initial" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right" }
});
class Relation extends React.Component {
    state = {
        startSpinner: false, selectedClass: null, selectedSection: null, sessionOptions: null, assignClassSuccess: false
    };
    //handle class
    handleClass = value => {
        this.setState({ selectedClass: value })
    }

    //handle Section
    handleSection = value => {
        this.setState({ selectedSection: value })
    }
    handleSession = (value) => {
        this.setState({ sessionOptions: value })
    }
    setAssignClass = (data) => {
        if (this.props.currentUser.userDetails.accouttype == 1) {
            classOptions0to5.map(classObj => {
                if (data[0].classid == classObj.value) {
                    this.setState({ selectedClass: classObj })
                }
            })
        } else {
            classOptions6to12.map(classObj => {
                if (data[0].classid == classObj.value) {
                    this.setState({ selectedClass: classObj })
                }
            })
        }

        sectionOptions.map(sectionObj => {
            if (data[0].section == sectionObj.value) {
                this.setState({ selectedSection: sectionObj })
            }
        })
    }
    async componentDidMount() {
        let teacherid = this.props.teacherid;
        let response = await this.props.authenticatedApiCall('get', "/api/principalservice/getAssignedClass" +  "/" + teacherid, null );
        if (response.data.status == 1) {
            this.setAssignClass(response.data.statusDescription);
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    //Handle the form submit event
    handleSubmit = async event => {
        this.setState({ startSpinner: true })
        let response = await this.props.authenticatedApiCall('post', "/api/principalservice/assignclasstofaculty", {
            selectedClass: this.state.selectedClass.value,
            selectedSection: this.state.selectedSection.value,
            teacherid:this.props.teacherid
        })
        if (response.data.status == 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
        }
    };

    handleAssignClass = () => {
        this.props.closeDialog()
    }
    backDashboard = () => {
        this.props.history.push('./teacherlist');
        this.props.closeDialog()
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div><br></br>
                <Card className={classes.cardRoot}>
                    {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                    <ValidatorForm onSubmit={this.handleSubmit}>
                        <div className={classes.questionContainer}>
                            <FormLabel className={classes.labelContainer} component="span"> Class </FormLabel>
                            <div className={classes.selectContainer}>
                                <SelectValidator
                                    options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                    placeholder='Select Class'
                                    onChange={this.handleClass}
                                    value={this.state.selectedClass}
                                    withRequiredValidator
                                    validators={['required']}
                                    fullWidth
                                    errorMessages={['Class is required']}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </div>
                            <FormLabel className={classes.labelContainer} component="span"> Section </FormLabel>
                            <div className={classes.selectContainer}>
                                <SelectValidator
                                    options={sectionOptions}
                                    placeholder='Select Section'
                                    onChange={this.handleSection}
                                    value={this.state.selectedSection}
                                    withRequiredValidator
                                    validators={['required']}
                                    fullWidth
                                    errorMessages={['Section is required']}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </div>
                        </div>
                        <GridContainer>
                            <GridItem>
                                <CardActions className={classes.pad_15}>
                                    <Button type="submit" disabled={this.state.startSpinner} className={classes.primaryButton}>Submit</Button>
                                </CardActions>
                            </GridItem>
                        </GridContainer>
                    </ValidatorForm>
                    {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                    {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage(["Principal"])(WithAccount((Relation))));
