import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography, Checkbox } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';

const religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
const categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
const localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];

var emailID;
const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: {
            margin: 0,
            paddingTop: '5px'
        },
    },
    questionContainer: {display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: { width: "200px", textAlign: "right", marginTop: "20px", marginRight: "20px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'", fontWeight: "bold", fontWeight: 900 },
    inputItem: { width: 350},
    selectContainer: { width: 350 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: {
        color: "#fff",
        background: "#f5bc53",
        width: "150px",
        borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }
    },
    pad_15: { float: "right" },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" }
});

class CreateAccount extends React.Component {
    state = {
        fname: "", lname: "", mothername: "", fathername: "", cellnumber: "", dob: "", gender: "", adharcard: "", religion: "HINDU", category: "", locality: "", buttonText: "", localaddress: "", parmanentaddress: "", same: "", 
        checkedValue: false, createStudent: false, updateStudent: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleReligion = value => {
        this.setState({ religion: value })
    }
    handleCategory = value => {
        this.setState({ category: value })
    }
    handleLocality = value => {
        this.setState({ locality: value })
    }

    //set the provider value for update
    setStateForEditProvider = (data) => {
        this.setState({
            fname: data.firstname,
            lname: data.lastname,
            mothername: data.mothername,
            fathername: data.fathername,
            cellnumber: data.cellnumber,
            adharcard: data.adharcard,
            dob: data.dob,
            gender: data.gender,
            parmanentaddress: data.paraddress,
            localaddress: data.locaddress
        })

        religionOptions.forEach(religionObj => {
            if (data.religion == religionObj.value) {
                this.setState({ religion: religionObj })
            }
        })
        categoryOptions.forEach(categoryObj => {
            if (data.category == categoryObj.value) {
                this.setState({ category: categoryObj })
            }
        })
        localityOptions.forEach(localityObj => {
            if (data.locality == localityObj.value) {
                this.setState({ locality: localityObj })
            }
        })
    }


    handleCheckBox = event => {
        if (this.state.checkedValue == true) {
            this.setState({ checkedValue: false, localaddress: "" })
        } else { this.setState({ checkedValue: true, localaddress: this.state.parmanentaddress }) }
    }

    async componentDidMount() {
        let studentid = this.props.studentid;
        if (studentid == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/updateStudentDetails', { studentid });
            if (response.data.status == 1) {
                this.setStateForEditProvider(response.data.statusDescription[0])
            } else if (response.data.status == 0) {
            }
            this.setState({ buttonText: 'Update Student' })
        }
    }

    //Handle the form submit event
    handleSubmit = async event => {
        let studentid = this.props.studentid;

        if (studentid) {
            let response = await this.props.authenticatedApiCall('post', '/api/teacherservice/updateStudent', {
                studentid: studentid,
                fname: this.state.fname,
                lname: this.state.lname,
                mothername: this.state.mothername,
                fathername: this.state.fathername,
                cellnumber: this.state.cellnumber,
                adharnumber: this.state.adharcard,
                dob: this.state.dob,
                gender: this.state.gender,
                religion: this.state.religion.value,
                category: this.state.category.value,
                locality: this.state.locality.value,
                paraddress: this.state.parmanentaddress,
                locaddress: this.state.localaddress
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/studentRegistration", {
                fname: this.state.fname,
                lname: this.state.lname,
                mothername: this.state.mothername,
                fathername: this.state.fathername,
                cellnumber: this.state.cellnumber,
                adharcard: this.state.adharcard,
                dob: this.state.dob,
                gender: this.state.gender,
                religion: this.state.religion.value,
                category: this.state.category.value,
                locality: this.state.locality.value,
                paraddress: this.state.parmanentaddress,
                locaddress: this.state.localaddress
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true });
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true });
            }
        }
    };
    backDashboard = () => {
        if (this.props.studentid) {
            this.props.history.push(`../studentlist`)
        } else {
            this.props.history.push(`./studentlist`)
        }
        this.setState({ isError: false, isSuccess: false })
    }

    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Card>
                    <ValidatorForm onSubmit={this.handleSubmit}>

                        <CardContent>
                            <GridContainer>
                                <GridItem xs={12} sm={12} >
                                    <Typography className={classes.center}>Student Registration</Typography>
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span">First Name :  </FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="First Name"
                                        onChange={this.handleChange}
                                        name="fname"
                                        value={this.state.fname}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['First Name is required']}
                                    />
                                </GridItem>

                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Last Name :  </FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Last Name"
                                        onChange={this.handleChange}
                                        name="lname"
                                        value={this.state.lname}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Last Name is required']}
                                    />

                                </GridItem>

                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Mother Name :</FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Mother Name"
                                        onChange={this.handleChange}
                                        rows={5}
                                        name="mothername"
                                        value={this.state.mothername}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Mother Name is required']}
                                    />
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Father Name : </FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Father Name"
                                        onChange={this.handleChange}
                                        rows={5}
                                        name="fathername"
                                        value={this.state.fathername}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Father Name is required']}
                                    />
                                </GridItem>

                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Mobile Number :</FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Mobile Number"
                                        onChange={this.handleChange}
                                        rows={5}
                                        name="cellnumber"
                                        value={this.state.cellnumber}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Mobile Munber is required']}
                                    />
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Adhar Number :</FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Adhar Number"
                                        onChange={this.handleChange}
                                        rows={5}
                                        name="adharcard"
                                        value={this.state.adharcard}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Roll Munber is required']}
                                    />
                                </GridItem>

                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Birth Date :</FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Birth Date"
                                        onChange={this.handleChange}
                                        rows={5}
                                        name="dob"
                                        value={this.state.dob}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Birth Date is required']}
                                    />
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Gender </FormLabel>
                                    <RadioGroupValidator
                                        className={classes.inputItem}
                                        name="gender"
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['Gender is required']}
                                        value={this.state.gender} onChange={this.handleChange} row>
                                        <FormControlLabel
                                            value="male"
                                            control={
                                                <Radio
                                                    color="primary"
                                                />
                                            }
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={
                                                <Radio
                                                    color="primary"
                                                />
                                            }
                                            label="Female"
                                        />

                                    </RadioGroupValidator>

                                </GridItem>
                                {/* <br /><br />
                            // <hr />
                            <br /> */}
                                <GridItem>
                                    <hr />
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} md={4} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Religion </FormLabel>
                                    <div className={classes.selectContainer}>
                                        <SelectValidator
                                            options={religionOptions}
                                            placeholder='Select Religion'
                                            onChange={this.handleReligion}
                                            value={this.state.religion}
                                            withRequiredValidator
                                            validators={['required']}
                                            fullWidth
                                            errorMessages={['Religion is required']}
                                        />
                                    </div>
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} md={4} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Category </FormLabel>
                                    <div className={classes.selectContainer}>
                                        <SelectValidator
                                            options={categoryOptions}
                                            placeholder='Select Category'
                                            onChange={this.handleCategory}
                                            value={this.state.category}
                                            withRequiredValidator
                                            validators={['required']}
                                            fullWidth
                                            errorMessages={['Category is required']}
                                        />
                                    </div>
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} md={4} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Locality </FormLabel>
                                    <div className={classes.selectContainer}>
                                        <SelectValidator
                                            options={localityOptions}
                                            placeholder='Select Locality'
                                            onChange={this.handleLocality}
                                            value={this.state.locality}
                                            withRequiredValidator
                                            validators={['required']}
                                            fullWidth
                                            errorMessages={['Locality is required']}
                                        />
                                    </div>
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} md={6} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Parmanent Address </FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Parmanent Address"
                                        onChange={this.handleChange}
                                        multiline
                                        rows={2}
                                        name="parmanentaddress"
                                        value={this.state.parmanentaddress}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </GridItem>
                                <GridItem lg={6} md={6} xs={12} sm={12} md={6} className={classes.questionContainer}>
                                    <FormLabel className={classes.labelContainer} component="span"> Local Address </FormLabel>
                                    <TextValidator
                                        className={classes.inputItem}
                                        label="Local Address"
                                        onChange={this.handleChange}
                                        multiline
                                        rows={2}
                                        name="localaddress"
                                        value={this.state.localaddress}
                                        withRequiredValidator
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </GridItem>
                                {!(this.props.studentid) &&
                                    <GridItem lg={6} md={6} xs={12} sm={12} md={12} className={classes.questionContainer}>
                                        <FormLabel className={classes.labelContainer} component="span"> My Parmanent and Local Address is Same. </FormLabel>
                                        <Checkbox
                                            checked={this.state.checkedValue}
                                            onChange={this.handleCheckBox}
                                            value={this.state.checkedValue}
                                            color="primary"
                                        />
                                    </GridItem>}
                            </GridContainer>
                        </CardContent>
                        <GridContainer>
                            <GridItem>
                                <CardActions className={classes.pad_15}>
                                    <Button type="submit" className={classes.primaryButton}> {this.state.buttonText}</Button>
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

export default withStyles(styles)(AuthenticatedPage("Teacher")(CreateAccount));