import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { religionOptions, categoryOptions, localityOptions, classMediumType } from '../../../components/utilsFunctions';
import FormHeading from '../../../components/FormHeading';
import TextField from '../../../CommonComponents/TextField';
import SelectDate from '../../../CommonComponents/SelectDate';
import CellNumber from '../../../CommonComponents/CellNumber';
import AadharNumber from '../../../CommonComponents/AadharNumber';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import RadioButton from '../../../CommonComponents/RadioButton';
import AddressField from '../../../CommonComponents/AddressField';
import CheckBox from '../../../CommonComponents/CheckBox';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    textFieldSize: { padding: '6px' },
    paddingBottom: { padding: "15px" },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class StudentCreatedUI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routeOptions: []
        }
    }

    componentDidMount = async () => {
        let url = '/api/accountantservice/gettransportfee';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status === 1) {
            let routeOptions = []
            response.data.statusDescription.map((item) => {
                let routeObj = { label: item.route, value: item.transportFeeId }
                routeOptions.push(routeObj)
            })
            this.setState({ routeOptions: routeOptions })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'Student Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <TextField fieldLabel={'First Name'} fieldName={'firstName'} />
                        <TextField fieldLabel={'Last Name'} fieldName={'lastName'} />
                        <SelectDate fieldLabel={'Date Of Birth'} fieldName={'dob'} />
                        <TextField fieldLabel={'Mother Name'} fieldName={'motherName'} />
                        <TextField fieldLabel={'Father Name'} fieldName={'fatherName'} />
                        <RadioButton labelText={'Gender'} fieldName={'gender'} fieldLabelOne={'Male'} fieldLabelTwo={'Female'} />
                        <CellNumber fieldLabel={'Mobile Number'} fieldName={'cellNumber'} />
                        <AadharNumber fieldLabel={'AAdhar Number'} fieldName={'aadharNumber'} />
                        <SelectWithLabel fieldLabel={'Select Religion'} fieldName={'religion'} selectOptions={religionOptions} />
                        <SelectWithLabel fieldLabel={'Select Category'} fieldName={'category'} selectOptions={categoryOptions} />
                        <SelectWithLabel fieldLabel={'Select Locality'} fieldName={'locality'} selectOptions={localityOptions} />
                        <SelectWithLabel fieldLabel={'Select Medium Type'} fieldName={'mediumType'} selectOptions={classMediumType} />
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={2} formHeadingText={'Address Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <AddressField fieldLabel={'Parmanent Address'} fieldName={'parmanentAddress'} />
                        <AddressField fieldLabel={'Local Address'} fieldName={'localAddress'} />
                        <CheckBox />
                    </Grid>
                </Card>
                <FormHeading formHeadingNumber={3} formHeadingText={'Other Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <UserImage fieldLabel={'User Image'} fieldName={'file'} />
                        <RadioButton labelText={'Transport'} fieldName={'busService'} fieldLabelOne={'Yes'} fieldLabelTwo={'No'} />
                        {(this.props.formik.values.busService == 1) && <SelectWithLabel fieldLabel={'Select Route'} fieldName={'route'} selectOptions={this.state.routeOptions} />}
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(StudentCreatedUI)));