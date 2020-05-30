import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, Typography } from '@material-ui/core';
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
        [theme.breakpoints.down('md')]: { margin: 0, padding:0, paddingBottom:'10px', marginTop:'5px' }
    },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: { width: "200px", textAlign: "right", marginRight: "35px" },
    inputItem: { width: 400 },
    selectContainer: { width: 200 },
    cardRoot: { marginLeft: "450px", padding: "15px", marginTop: "10px", width: "450px", textAlign: "center",  [theme.breakpoints.down('md')]: { margin: 0, padding:0, paddingBottom:'10px', marginTop:'5px' }},
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: {
        color: "#fff",
        background: "#f5bc53",
        width: "150px",
        borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" }
    },
    pad_15: { float: "right" },
});

const classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];

class ManageFee extends React.Component {
    state = {
        createteacher: false, january: '', february: '', march: '', april: '', may: '', june: '', july: '', august: '', september: '', october: '', november: '', december: '', class: ''
        , isError: false, errorMessage: '', isSuccess: false, successMessage: '', buttonText: ''
    };

    //handle class
    handleClass = value => {
        this.setState({ class: value })
    }

    //handle Subject
    handleSubject = value => {
        this.setState({ subject: value })
    }
    handleUserRole = value => {
        this.setState({ userrole: value })
    }
    //set the provider value for update
    setStateForEditFeeStructure = (data) => {
        this.setState({
            class: data.class,
            january: data.january,
            february: data.february,
            march: data.march,
            april: data.april,
            may: data.may,
            june: data.june,
            july: data.july,
            august: data.august,
            september: data.september,
            october: data.october,
            november: data.november,
            december: data.december
        })
        if(this.props.currentUser.userDetails.accouttype == 1){
            classOptions0to5.forEach(qualificationObj => {
                if (data.class == qualificationObj.value) {
                    this.setState({ class: qualificationObj })
                }
            })
        }else{
            classOptions6to12.forEach(qualificationObj => {
                if (data.class == qualificationObj.value) {
                    this.setState({ class: qualificationObj })
                }
            })
        }

    }
    async  componentDidMount() {
        let classs = this.props.classs;
        if (classs) {
            this.setState({ buttonText: 'Update' })
            let response = await this.props.authenticatedApiCall('get', '/api/studentfeeservice/getfeedetailbyclass/'+ classs, null);
            if (response.data.status == 1) {
                this.setStateForEditFeeStructure(response.data.statusDescription[0]);
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            this.setState({ buttonText: 'Create' })
        }
    }
    //Handle the form submit event
    handleSubmit = async event => {
        let dataToSend = {
            class: this.state.class.value,
            january: this.state.january,
            february: this.state.february,
            march: this.state.march,
            april: this.state.april,
            may: this.state.may,
            june: this.state.june,
            july: this.state.july,
            august: this.state.august,
            september: this.state.september,
            october: this.state.october,
            november: this.state.november,
            december: this.state.december
        }
        if (this.props.classs) {
            let response = await this.props.authenticatedApiCall('put', '/api/studentfeeservice/updatefeedetails', dataToSend)
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        } else {
            let response = await this.props.authenticatedApiCall('post', "/api/studentfeeservice/createfeeforselectedclass", dataToSend)
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true })
            } else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true })
            }
        };
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    backDashboard = () => {
        if (this.props.classs) {
            this.props.history.push(`../studentfee`)
        } else {
            this.props.history.push(`./studentfee`)
        }
        this.setState({ isError: false, isSuccess: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Card className={classes.cardRoot}>
                    <Typography><b>Manage Class Fee</b></Typography>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                        <CardContent>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Select Class: </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={this.props.currentUser.userDetails.accouttype == 1 ? classOptions0to5 : classOptions6to12}
                                        placeholder='Select Class'
                                        onChange={this.handleClass}
                                        value={this.state.class}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Class is required']}
                                    />
                                </div>
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">January Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="January Fee"
                                    onChange={this.handleChange}
                                    name="january"
                                    value={this.state.january}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">February Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="February Fee"
                                    onChange={this.handleChange}
                                    name="february"
                                    value={this.state.february}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">March Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="March Fee"
                                    onChange={this.handleChange}
                                    name="march"
                                    value={this.state.march}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">April Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="April Fee"
                                    onChange={this.handleChange}
                                    name="april"
                                    value={this.state.april}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">May Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="May Fee"
                                    onChange={this.handleChange}
                                    name="may"
                                    value={this.state.may}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">June Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="June Fee"
                                    onChange={this.handleChange}
                                    name="june"
                                    value={this.state.june}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">July Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="July Fee"
                                    onChange={this.handleChange}
                                    name="july"
                                    value={this.state.july}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">August Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="August Fee"
                                    onChange={this.handleChange}
                                    name="august"
                                    value={this.state.august}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">Sepetember Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Sepetember Fee"
                                    onChange={this.handleChange}
                                    name="september"
                                    value={this.state.september}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">October Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="October Fee"
                                    onChange={this.handleChange}
                                    name="october"
                                    value={this.state.october}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">November Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="November Fee"
                                    onChange={this.handleChange}
                                    name="november"
                                    value={this.state.november}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">December Fee: </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="December Fee"
                                    onChange={this.handleChange}
                                    name="december"
                                    value={this.state.december}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
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
export default withStyles(styles)(AuthenticatedPage("FeeAccount")(WithAccount((ManageFee))));