import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, FormLabel, CardActions, Typography, FormControlLabel, Radio } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import { Field, connect } from 'formik';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from '../../components/FormikValidatedComponents/DateField';
import FormikSelect from '../../components/FormikValidatedComponents/SelectField';
import CustomImageInput from '../../components/FormikValidatedComponents/ImageInput';
import FormikRadioGroup from '../../components/FormikValidatedComponents/FormikRadioGroup';

const genderOption = [{ value: 1, label: "Male" }, { value: 2, label: "Female" }, { value: 3, label: "Others" }]
const religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
const categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
const localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];

const styles = (theme) => ({
    primaryButton: { color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
    pad_15: { float: "right" },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    textFieldSize: { padding: '6px' },
    inputSelect: { width: "495px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    marginBottom: { marginBottom: "35px" },
    marginBottomSelect: { marginBottom: "35px", marginTop: "10px" },
    marginBottomDob: { marginBottom: "35px", marginTop: "20px" },
    center: { textAlign: "center", fontWeight: "bold !important", fontWeight: 900, fontSize: "20px !important" },
    lineBreak: { borderBottom: "1px solid rgba(213, 213 213, 1)", paddingBottom: "10px", marginBottom: "15px" }
});

class StudentCreatedUI extends React.Component {
    handleCheckBox = (event) =>{
        console.log(event.target.value)
        // this.props.formik.setFieldValue("localaddress", , false);

    } 
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardContent>
                        <GridContainer>
                            <GridItem xs={12} sm={12} >
                                <Typography className={classes.center}>Student Registration</Typography>
                                <div className={classes.lineBreak}></div>
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">First Name</FormLabel>
                                <Field
                                    name="firstname"
                                    fullWidth
                                    placeholder={'First Name'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ style: "width=100%" }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Last Name</FormLabel>
                                <Field
                                    name="lastname"
                                    fullWidth
                                    placeholder={'Last Name'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottomDob}>
                                <FormLabel component="span" className="labelstyle">Date of Birth</FormLabel>
                                <Field
                                    name="dob"
                                    placeholder={'DD/MM/YYYY'}
                                    isClearable={true}
                                    variant="outlined"
                                    showMonthDropdown
                                    showYearDropdown
                                    component={FormikDateField}
                                    className={classes.inputSelect}
                                    dropdownMode="select"
                                    inputProps={{ className: classes.textFieldSize }}
                                />
                            </GridItem>

                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Mother Name</FormLabel>
                                <Field
                                    name="mothername"
                                    fullWidth
                                    placeholder={'Mother Name'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Father Name</FormLabel>
                                <Field
                                    name="fathername"
                                    fullWidth
                                    placeholder={'Father Name'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Mobile Number</FormLabel>
                                <Field
                                    name="cellnumber"
                                    fullWidth
                                    placeholder={'Mobile Number'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Adhar Number</FormLabel>
                                <Field
                                    name="adharnumber"
                                    fullWidth
                                    placeholder={'Adhar Number'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottomSelect}>
                                <FormLabel component="span" className="labelstyle" style={{marginRight:"20px"}}>Gender</FormLabel>
                                <Field
                                component={FormikRadioGroup}
                                name="gender"
                            >
                                <FormControlLabel
                                    value="2"
                                    control={
                                        <Radio color="primary" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="1"
                                    control={
                                        <Radio color="primary" /> }
                                    label="Female"
                                />
                            </Field>
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottomSelect}>
                                <FormLabel component="span" className="labelstyle">Religion</FormLabel>
                                <Field
                                    name="religion"
                                    options={religionOptions}
                                    fullWidth
                                    placeholder={'Select Religion'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikSelect}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottomSelect}>
                                <FormLabel component="span" className="labelstyle">Category</FormLabel>
                                <Field
                                    name="category"
                                    options={categoryOptions}
                                    fullWidth
                                    placeholder={'Select Category'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikSelect}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottomSelect}>
                                <FormLabel component="span" className="labelstyle">Locality</FormLabel>
                                <Field
                                    name="locality"
                                    options={localityOptions}
                                    fullWidth
                                    placeholder={'Select Locality'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikSelect}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Parmanent Address</FormLabel>
                                <Field
                                    name="parmanentaddress"
                                    fullWidth
                                    placeholder={'Parmanent Address'}
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    rowsMax={10}  
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Local Address</FormLabel>
                                <Field
                                    name="localaddress"
                                    fullWidth
                                    placeholder={'Local Address'}
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    rowsMax={10}  
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={FormikTextField}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Image</FormLabel>
                                <Field
                                    name="file"
                                    fullWidth
                                    placeholder={'Student Image'}
                                    variant="outlined"
                                    style={{ borderRadius: "10px !important" }}
                                    inputProps={{ className: classes.textFieldSize }}
                                    component={CustomImageInput}
                                />
                            </GridItem>
                            <GridItem lg={4} md={4} sm={12} xs={12} className={classes.marginBottom}>
                                <FormLabel component="span" className="labelstyle">Parmanent Address and Local Address both are same.</FormLabel>
                                <Field
                                    name="botharesame"
                                    type="checkbox"
                                    onChange={this.handleCheckBox}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardContent>
                    <CardActions className={classes.pad_15}>
                        <Button type="submit" className={classes.primaryButton}> {this.props.buttonText}</Button>
                    </CardActions>
                </Card>
            </div>
        );

    }
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(connect(StudentCreatedUI)));