import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Typography, Button, CardActions, Link } from '@material-ui/core';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Link as RouterLink } from 'react-router-dom';
import Spinner from '@material-ui/core/CircularProgress';

const styles = theme => ({
    questionContainer: {display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px"},
    inputItem: { width: 350 },
    selectContainer: { width: 350 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right",  '&:hover': { background: theme.palette.button.okButtonHover }},
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right" }
});

const monthOptions = [{ value: "january", label: "January" }, { value: "february", label: "February" }, { value: "march", label: "March" }, { value: "april", label: "April" }, { value: "may", label: "May" }, { value: "june", label: "June" }, { value: "july", label: "July" }, { value: "august", label: "August" }, { value: "september", label: "September" }, { value: "october", label: "October" }, { value: "november", label: "November" }, { value: "december", label: "December" }];

class PayFee extends React.Component {
    state = {
        startSpinner:false,selectedmonthname: "", selectedmonthfee: "", feeObject: '', error: false, success: false
    }
    handleSubmit = async () => {
        this.setState({startSpinner:true})
        let url = '/api/studentfeeservice/paystudentfee' ;
        let response = await this.props.authenticatedApiCall('post', url, {
            monthName: this.state.selectedmonthname.value,
            selectedmonthfee: this.state.selectedmonthfee,
            adharnumber: this.props.adharnumber,
            feeObject: this.state.feeObject
        })
        if (response.data.status == 1) {
            this.setState({startSpinner:false, successMessage: response.data.statusDescription, isSuccess: true });
        } else if (response.data.status == 0) {
            this.setState({startSpinner:false, errorMessage: response.data.statusDescription, isError: true });
        }
    }
    handleSelectedMonth = async (selectedValue) => {
        let transport = 0;
        if(this.props.busservice == 2){
            transport = this.props.transportFee
        }
        this.setState({ selectedmonthname: selectedValue });
        let url = '/api/studentfeeservice/getmonthlyfee/' + this.props.adharnumber + '/' + selectedValue.value ;
        let response = await this.props.authenticatedApiCall('get', url, null);
        var monthValue;
        if (response.data.status == 1) {
            let data = response.data.statusDescription[0] 
            switch (selectedValue.value) {
                case 'january': monthValue = data.january + transport
                    break;
                case 'february': monthValue = data.february + transport
                    break;
                case 'march': monthValue = data.march + transport
                    break;
                case 'april': monthValue = data.april + transport
                    break;
                case 'may': monthValue = data.may + transport
                    break;
                case 'june': monthValue = data.june + transport
                    break;
                case 'july': monthValue = data.july + transport
                    break;
                case 'august': monthValue = data.august + transport
                    break;
                case 'september': monthValue = data.september + transport
                    break;
                case 'october': monthValue = data.october + transport
                    break;
                case 'november': monthValue = data.november + transport
                    break;
                case 'december': monthValue = data.december + transport
                    break;
            }
            this.setState({ selectedmonthfee: monthValue, feeObject: response.data.statusDescription[0] })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        window.location.reload();
    }
    render() {
        const { classes } = this.props;
        const MyLink = (props) => <RouterLink to={`/printfeereciept/${this.props.adharnumber}`} {...props}/>
        const successButton = [
            <Button className={classes.OkButton} onClick={this.backDashboard}>No Print</Button>,
            <Link
                variant="body2"
                component={MyLink}
                target="_blank"
                rel="noopener"
                style={{textDecoration:"none"}}
            ><Button className={classes.OkButton} onClick = {this.backDashboard}>Print</Button></Link>
        ]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div>
                {this.state.startSpinner&&<Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex:'99999' }}/>}
                <Typography style={{ textAlign: "center", fontSize: "20px" }}>Student Fee</Typography>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <GridItem xs={12} sm={6} md={12} className={classes.questionContainer}>
                        <div className={classes.selectContainer}>
                            <SelectValidator
                                options={monthOptions}
                                placeholder='Select Month'
                                onChange={this.handleSelectedMonth}
                                value={this.state.selectedmonthname}
                                withRequiredValidator
                                validators={['required']}
                                fullWidth
                                errorMessages={['Religion is required']}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={12} className={classes.questionContainer}>
                        <div>
                            <TextValidator
                                className={classes.inputItem}
                                label="Fee of This Month"
                                onChange={this.handleChange}
                                name="selectedmonthfee"
                                value={this.state.selectedmonthfee}
                                withRequiredValidator
                                disabled
                                validators={['required']}
                                errorMessages={['First Name is required']}
                            />
                        </div>
                    </GridItem>
                    <GridContainer>
                        <GridItem>
                            <CardActions className={classes.pad_15}>
                                <Button type="submit" disabled={this.state.startSpinner} className={classes.primaryButton}>Submit</Button>
                            </CardActions>
                        </GridItem>
                    </GridContainer>
                </ValidatorForm>
                {(this.state.isSuccess ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}

            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount", "Teacher"])(PayFee));