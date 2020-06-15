import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Grid, FormControlLabel, Radio, Typography } from '@material-ui/core';
import FormikSelectWithCheckBox from '../../../components/FormikValidatedComponents/SelectFieldWithCheckBox';
import { connect, Field } from 'formik';
import FormikTextField from '../../../components/FormikValidatedComponents/TextField';
import FormikRadioGroup from '../../../components/FormikValidatedComponents/FormikRadioGroup';

const styles = theme => ({
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    paddingBottom: { marginLeft: "0px", marginTop: "10px", marginBottom: "15px", [theme.breakpoints.down('md')]: { marginLeft: "0px" } },
    inputSelect: { width: "300px", [theme.breakpoints.down('sm')]: { width: "250px" } },
});

const monthOptions = [{ value: "january", label: "January" }, { value: "february", label: "February" }, { value: "march", label: "March" }, { value: "april", label: "April" }, { value: "may", label: "May" }, { value: "june", label: "June" }, { value: "july", label: "July" }, { value: "august", label: "August" }, { value: "september", label: "September" }, { value: "october", label: "October" }, { value: "november", label: "November" }, { value: "december", label: "December" }];

class PayFeeUI extends React.Component {
    state = {
        monthName: [], feeStructure: '', selectedmonthname: "", selectedmonthfee: "", feeObject: '', error: false, success: false
    }
    handleBothFee = (selectedValue) =>{
            let transport = 0;
            var sumOfFee = 0;
            if (this.props.busservice == 2) {
                transport = this.props.transportFee
            }
            let monthName = selectedValue[0].value
            this.setState({ monthName })
            selectedValue.map((item, index) => {
                let data = this.props.feeStructure;
                switch (item.value) {
                    case 'january': sumOfFee = sumOfFee + data.jan + transport
                        item.schoolFee = [{schoolFee:data.jan}]
                        break;
                    case 'february': sumOfFee = sumOfFee + data.feb + transport
                        item.schoolFee =  [{schoolFee:data.feb}]
                        break;
                    case 'march': sumOfFee = sumOfFee + data.mar + transport
                        item.schoolFee =  [{schoolFee:data.mar}]
                        break;
                    case 'april': sumOfFee = sumOfFee + data.apr + transport
                        item.schoolFee =  [{schoolFee:data.apr}]
                        break;
                    case 'may': sumOfFee = sumOfFee + data.may + transport
                        item.schoolFee =  [{schoolFee:data.may}]
                        break;
                    case 'june': sumOfFee = sumOfFee + data.jun + transport
                        item.schoolFee =  [{schoolFee:data.jun}]
                        break;
                    case 'july': sumOfFee = sumOfFee + data.jul + transport
                        item.schoolFee =  [{schoolFee:data.jul}]
                        break;
                    case 'august': sumOfFee = sumOfFee + data.aug + transport
                        item.schoolFee =  [{schoolFee:data.aug}]
                        break;
                    case 'september': sumOfFee = sumOfFee + data.sep + transport
                        item.schoolFee =  [{schoolFee:data.dep}]
                        break;
                    case 'october': sumOfFee = sumOfFee + data.oct + transport
                        item.schoolFee =  [{schoolFee:data.oct}]
                        break;
                    case 'november': sumOfFee = sumOfFee + data.nov + transport
                        item.schoolFee =  [{schoolFee:data.nov}]
                        break;
                    case 'december': sumOfFee = sumOfFee + data.dec + transport
                        item.schoolFee =  [{schoolFee:data.dec}]
                        break;
                }
                item.transportFee = [{transportFee: transport}]
            })
            return sumOfFee;
    }
    handleOnlySchoolFee = (selectedValue) =>{
            var sumOfFee = 0;
            let monthName = selectedValue[0].value
            this.setState({ monthName })
            selectedValue.map((item, index) => {
                let data = this.props.feeStructure;
                switch (item.value) {
                    case 'january': sumOfFee = sumOfFee + data.jan
                        item.schoolFee = [{schoolFee:data.jan}]
                        break;
                    case 'february': sumOfFee = sumOfFee + data.feb
                        item.schoolFee = [{schoolFee:data.feb}]
                        break;
                    case 'march': sumOfFee = sumOfFee + data.mar
                        item.schoolFee = [{schoolFee:data.mar}]
                        break;
                    case 'april': sumOfFee = sumOfFee + data.apr
                        item.schoolFee = [{schoolFee:data.apr}]
                        break;
                    case 'may': sumOfFee = sumOfFee + data.may
                        item.schoolFee = [{schoolFee:data.may}]
                        break;
                    case 'june': sumOfFee = sumOfFee + data.jun
                        item.schoolFee = [{schoolFee:data.jun}]
                        break;
                    case 'july': sumOfFee = sumOfFee + data.jul
                        item.schoolFee = [{schoolFee:data.jul}]
                        break;
                    case 'august': sumOfFee = sumOfFee + data.aug
                        item.schoolFee = [{schoolFee:data.aug}]
                        break;
                    case 'september': sumOfFee = sumOfFee + data.sep
                        item.schoolFee = [{schoolFee:data.sep}]
                        break;
                    case 'october': sumOfFee = sumOfFee + data.oct
                        item.schoolFee = [{schoolFee:data.oct}]
                        break;
                    case 'november': sumOfFee = sumOfFee + data.nov
                        item.schoolFee = [{schoolFee:data.nov}]
                        break;
                    case 'december': sumOfFee = sumOfFee + data.dec
                        item.schoolFee = [{schoolFee:data.dec}]
                        break;
                }
            })
            return sumOfFee;
    } 
    handleOnlyTransportFee = (selectedValue) =>{
        if (this.props.busservice == 2) {
            let transport = 0;
            var sumOfFee = 0;
            if (this.props.busservice == 2) {
                transport = this.props.transportFee
            }
            let monthName = selectedValue[0].value
            this.setState({ monthName })
            selectedValue.map((item, index) => {
                switch (item.value) {
                    case 'january': sumOfFee = sumOfFee + transport
                        break;
                    case 'february': sumOfFee = sumOfFee + transport
                        break;
                    case 'march': sumOfFee = sumOfFee + transport
                        break;
                    case 'april': sumOfFee = sumOfFee + transport
                        break;
                    case 'may': sumOfFee = sumOfFee + transport
                        break;
                    case 'june': sumOfFee = sumOfFee + transport
                        break;
                    case 'july': sumOfFee = sumOfFee + transport
                        break;
                    case 'august': sumOfFee = sumOfFee + transport
                        break;
                    case 'september': sumOfFee = sumOfFee + transport
                        break;
                    case 'october': sumOfFee = sumOfFee + transport
                        break;
                    case 'november': sumOfFee = sumOfFee + transport
                        break;
                    case 'december': sumOfFee = sumOfFee + transport
                        break;
                }
                item.transportFee = [{transportFee:transport}]
            })
            return sumOfFee
        }
    }
    handleSelectedMonth = async (selectedValue) => {
        if(selectedValue.length>0){
            let sumOfFee;
        if(this.props.formik.values.payfeetype == "1"){
            sumOfFee = this.handleBothFee(selectedValue);
        }else if(this.props.formik.values.payfeetype == "2"){
            sumOfFee = this.handleOnlySchoolFee(selectedValue);
        }else if(this.props.formik.values.payfeetype == "3"){
            sumOfFee = this.handleOnlyTransportFee(selectedValue);
        }
        this.props.formik.setFieldValue('selectedmonthfee', sumOfFee, false)
    }else{
        this.props.formik.setFieldValue('selectedmonthfee', '', false)
    }
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        window.location.reload();
    }
    handlePayfeeType = (event) =>{
        this.props.formik.setFieldValue('payfeetype', event.target.value, false)
        this.props.formik.setFieldValue('selectedmonthfee', '', false)
        this.props.formik.setFieldValue('selectedMonthName', '', false)
    }
   
    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                    <Field
                            component={FormikRadioGroup}
                            name="payfeetype"
                            onClick={this.handlePayfeeType}
                        >
                            <Grid container>
                            {(this.props.busservice == 2) && <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <FormControlLabel
                                        value="1"
                                        control={
                                            <Radio color="secondary" />}
                                        label="Monthly and Transport Fee Both"
                                    />
                                </Grid>}
                               {(this.props.busservice == 1 || this.props.busservice == 2)&& <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio color="secondary" />}
                                        label="Only Monthly Fee"
                                    />
                                </Grid>}
                               {(this.props.busservice == 2) &&<Grid item lg={4} md={4} sm={12} xs={12}>
                                    <FormControlLabel
                                        value="3"
                                        control={
                                            <Radio color="secondary" />}
                                        label="Only Transport Fee"
                                    />
                                </Grid>}
                            </Grid>
                        </Field>
                    </Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="selectedMonthName"
                            component={FormikSelectWithCheckBox}
                            checkboxProps={{ color: "primary" }}
                            onChange={this.handleSelectedMonth}
                            placeholder="Select Month"
                            options={monthOptions}
                            className={classes.inputSelect + " " + "selectstyle"}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '999' }}>
                        <Field
                            variant="filled"
                            type="number"
                            label="Total Marks"
                            name='selectedmonthfee'
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikTextField}
                        />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount", "Teacher"])(connect(PayFeeUI)));