import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
  questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
  labelContainer: { width: "200px", textAlign: "right", marginRight: "35px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'" },
  inputItem: { width: 400 },
  selectContainer: { width: 200 },
  cardRoot: { "overflow": "initial" },
  OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
  primaryButton: {
    color: "#fff",
    background: "#f5bc53",
    width: "150px",
    borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }
  },
  pad_15: { float: "right" },
});

const sessionOptions = [{ value: 1, label: '2019-20' }, { value: 2, label: '2020-21' }, { value: 3, label: '2021-22' }, { value: 4, label: '2022-23' }, { value: 5, label: '2023-24' }, { value: 6, label: '2024-25' }, { value: 7, label: '2025-26' }]
const examOptions = [{ value: 1, label: '3 Monthly' }, { value: 2, label: '6 Monthly' }, { value: 3, label: '9 Monthly' }, { value: 4, label: 'Yearly' }]

class CreateAccount extends React.Component {
  state = {
    schoolname: "", registration: "", lastname: "", emailis: "", cellnumber: "", password: "", schooladdress: "", AdminType: "", newAdmin: "", sessionOptions: "",
    configType: "", account: "", examination: "", isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: "", examoption: []
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = async event => {
    let examoptions = [];
    for (var i = 0; i < this.state.examoption.length; i++) {
      examoptions.push(this.state.examoption[i].value)
  }
    if (this.props.accountId && this.props.accountId.length > 0) {
      let response = await this.props.authenticatedApiCall('put', "/api/superadminservice/" + this.props.accountId, {
        schoolname: this.state.schoolname,
        registration: this.state.registration,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        emailid: this.state.emailid,
        cellnumber: this.state.cellnumber,
        password: this.state.password,
        schooladdress: this.state.schooladdress,
        sessionOptions: this.state.sessionOptions,
        configType: parseInt(this.state.configType),
        examination: this.state.examination,
        account: this.state.account,
        examoptions: examoptions
      });
      if (response.data.status == 1) {
        this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
      } else if (response.data.status == 0) {
        this.setState({ errorMessage: response.data.statusDescription, isError: true })
      }
    } else {
      let response = await this.props.authenticatedApiCall('post', "/api/superadminservice/createschooladmin", {
        schoolname: this.state.schoolname,
        registration: this.state.registration,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        emailid: this.state.emailid,
        cellnumber: this.state.cellnumber,
        password: this.state.password,
        schooladdress: this.state.schooladdress,
        sessionOptions: this.state.sessionOptions,
        configType: parseInt(this.state.configType),
        examination: this.state.examination,
        account: this.state.account,
        examoptions: examoptions
      });
      if (response.data.status == 1) {
        this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
      } else if (response.data.status == 0) {
        this.setState({ errorMessage: response.data.statusDescription, isError: true })
      }
    }
  }

  setStateForEditAccount = (data) => {
    this.setState({
      schoolname: data.accountname,
      registration: data.accountrefnumber,
      firstname: data.firstname,
      lastname: data.lastname,
      emailid: data.emailid,
      cellnumber: data.cellnumber,
      schooladdress: data.accountaddress,
      sessionOptions: data.sessionOptions
    })
    sessionOptions.forEach(session => {
      if (data.configdata.session.value == session.value) {
        this.setState({ sessionOptions: data.configdata.session })
      }
    })
    if (data.configdata.configType === true || data.configdata.configType == 1) {
      var arr = []
      data.configdata.examoptions.forEach(item =>{
        examOptions.forEach(obj => {
          if (item == obj.value) {
              arr.push(obj)
          }
      })      
    })
      this.setState({ configType: "1", account: data.configdata.account, examination: data.configdata.examination, examoption: arr })
    } else {
      this.setState({ configType: "0" })
    }
  }
 
  async componentDidMount() {
    if (this.props.accountId) {
      this.setState({ buttonText: 'Update Account' });
      let response = await this.props.authenticatedApiCall('get', '/api/superadminservice/' + this.props.accountId + '/getschooldetails', null);
      if (response.data.status == 1) {
        this.setStateForEditAccount(response.data.statusDescription[0]);
      } else if (response.data.status == 0) {
        this.setState({ errorMessage: response.data.statusDescription, isError: true })
      }
    } else {
      this.setState({ buttonText: 'Create Account' });
    }
  }


  handleConfigRadiohange = event => {
    this.setState({ configType: event.target.value })
  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSession = (value) => {
    this.setState({ sessionOptions: value })
  }
  backDashboard = () => {
    if (this.props.accountId) {
      this.props.history.push('../manage-account');
    } else {
      this.props.history.push('./manage-account');
    }
    this.setState({ isError: false, isSuccess: false });
  }
  handleExamOption = (value) => {
    this.setState({ examoption: value })
}
  render() {
    const { classes } = this.props;
    const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
    const HeaderText = "Success"
    return (
      <div className={classes.root}>
        <Card className={classes.cardRoot}>
          <Typography>Create Account</Typography>
          <ValidatorForm onSubmit={this.handleSubmit}>

            <CardContent>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> School Name </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="School Name"
                  onChange={this.handleChange}
                  name="schoolname"
                  value={this.state.schoolname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Registration Number </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="Registration Number"
                  onChange={this.handleChange}
                  name="registration"
                  value={this.state.registration}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> School Address </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="School Address"
                  onChange={this.handleChange}
                  multiline
                  rows={3}
                  name="schooladdress"
                  value={this.state.schooladdress}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <br />
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span">Config Type</FormLabel>
                <RadioGroupValidator
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['This field is required']}
                  value={this.state.configType}
                  onChange={this.handleConfigRadiohange}
                  row>
                  <FormControlLabel
                    value="1"
                    control={
                      <Radio color="primary" />
                    }
                    label="New Config" />
                  <FormControlLabel
                    value="0"
                    control={
                      <Radio color="primary" />
                    }
                    label="Default Config" />
                </RadioGroupValidator>
              </div>
              {(this.state.configType == "1") ?
                <div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span"> Session </FormLabel>
                    <div className={classes.selectContainer}>
                      <SelectValidator
                        className={classes.inputItem}
                        options={sessionOptions}
                        placeholder='Select Session'
                        onChange={this.handleSession}
                        value={this.state.sessionOptions}
                        withRequiredValidator
                        validators={['required']}
                        fullWidth
                        errorMessages={['Session is required']}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      />
                    </div>
                  </div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Fee Account</FormLabel>
                    <RadioGroupValidator
                      name="account"
                      withRequiredValidator
                      validators={['required']}
                      errorMessages={['This field is required']}
                      value={this.state.account}
                      onChange={this.handleChange}
                      row>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio color="primary" />
                        }
                        label="Yes" />
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio color="primary" />
                        }
                        label="No" />
                    </RadioGroupValidator>
                  </div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Examination</FormLabel>
                    <RadioGroupValidator
                      name="examination"
                      withRequiredValidator
                      validators={['required']}
                      errorMessages={['This field is required']}
                      value={this.state.examination}
                      onChange={this.handleChange}
                      row>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio color="primary" />
                        }
                        label="Yes" />
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio color="primary" />
                        }
                        label="No" />
                    </RadioGroupValidator>
                  </div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Select Exam Options</FormLabel>
                    <div className={classes.selectContainer}>
                      <SelectValidator
                        options={examOptions}
                        placeholder='Exam Options'
                        onChange={this.handleExamOption}
                        value={this.state.examoption}
                        checkBoxStyled={true}
                        isMulti
                        withRequiredValidator
                        validators={['required']}
                        errorMessages={['Exam Option is required']}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      />
                    </div>
                  </div>
                </div> : ""}
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> First Name </FormLabel>
                <TextValidator
                  label="Admin First Name"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="firstname"
                  value={this.state.firstname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Last Name </FormLabel>
                <TextValidator
                  label="Admin Last Name"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="lastname"
                  value={this.state.lastname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Email ID </FormLabel>
                <TextValidator
                  label="Teacher Email ID"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="emailid"
                  value={this.state.emailid}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Contact Number </FormLabel>
                <TextValidator
                  label="Mobile Number"
                  className={classes.inputItem}
                  name="cellnumber"
                  withRequiredValidator
                  onChange={this.handleChange}
                  value={this.state.cellnumber}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />

              </div>
              {!(this.props.accountId && this.props.accountId.length > 0) &&
                <div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Temp Password </FormLabel>
                    <TextValidator
                      label="Temp Password"
                      className={classes.inputItem}
                      type="password"
                      onChange={this.handleChange}
                      name="password"
                      value={this.state.password}
                      withRequiredValidator
                      validators={['required', 'maxStringLength:16']}
                      errorMessages={['this field is required', 'Enter between 8 to 16 characters', 'Enter between 8 to 16 characters']}
                    />
                  </div>
                  <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Retype Temp Password </FormLabel>
                    <TextValidator
                      label="Retype Temp Password"
                      className={classes.inputItem}
                      type="password"
                      onChange={this.handleChange}
                      name="confPassword"
                      value={this.state.confPassword}
                      withRequiredValidator
                      validators={['required', `isStringEqual:${this.state.password}`]}
                      errorMessages={['this field is required', 'Temp Password and Retype Temp Password are different']}
                    />
                  </div></div>}
              <br></br>
            </CardContent>
            <GridContainer>
              <GridItem>
                <CardActions className={classes.pad_15}>
                  <Button type="submit" className={classes.primaryButton}> {this.state.buttonText}</Button>
                </CardActions>
              </GridItem>
            </GridContainer>
          </ValidatorForm>
        </Card>
        {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
        {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
      </div>
    );

  }
}

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(CreateAccount));