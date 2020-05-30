import React, { Component } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Table, TableBody, TableRow, TableCell, Button, Grid, Card, CardContent } from '@material-ui/core';
import { Form, Formik, connect } from 'formik';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import * as yup from 'yup';
import ProfileFields from './ProfileFields';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 10, paddingBottom: theme.spacing.unit * 1, marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: '10px' }
    },
    marginTop: { marginLeft: "15px", [theme.breakpoints.down('md')]: { marginTop: '10px', marginLeft: 0 } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px", width: "100px" },
    table: { minWidth: 500 },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'left' },
    button: { margin: theme.spacing.unit * 1 },
    marginTopMobile:{ [theme.breakpoints.down('md')]: { marginTop: "10px" }}

})

const religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
const categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
const localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];
const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]
const genderOptions = [{ value: 1, label: "Female" }, { value: 2, label: "Male" }]

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const SUPPORTED_FORMAT = ["/", "i", "R"];
const FILE_SIZE = 1024 * 1024 * 1;
class StudentProfile extends Component {
    state = {
        firstname: "", lastname: "", mothername: "", fathername: "", cellnumber: "", emailid: "", image: '',
        dob: "", gender: "", religion: "", locality: "", parmanentaddress: "", localaddress: "", classs: "", section: "",
        updateSuccess: false, isError: false, errorMessage: '', isSuccess: false, successMessage: '', isRender: false
    }

    setStateForEditStudent = (data) => {
        this.setState({
            firstname: data.firstname,
            lastname: data.lastname,
            mothername: data.mothername,
            fathername: data.fathername,
            cellnumber: data.cellnumber,
            emailid: data.emailid,
            dob: data.dob,
            gender: data.gender,
            parmanentaddress: data.parmanentaddress,
            localaddress: data.localaddress,
            image: data.image,
            isRender: true
        })
        genderOptions.forEach((gender) => {
            if (data.gender == gender.value) {
                this.setState({ gender: gender.label })
            }
        })
        categoryOptions.forEach(categoryObj => {
            if (data.category == categoryObj.value) {
                this.setState({ category: categoryObj.label })
            }
        })
        religionOptions.forEach(religionObj => {
            if (data.religion == religionObj.value) {
                this.setState({ religion: religionObj.label })
            }
        })
        localityOptions.forEach(localityObj => {
            if (data.locality == localityObj.value) {
                this.setState({ locality: localityObj.label })
            }
        })
        classOptions.forEach(classObj => {
            if (data.class == classObj.value) {
                this.setState({ classs: classObj.label })
            }
        })
        sectionOptions.forEach(sectionObj => {
            if (data.section == sectionObj.value) {
                this.setState({ section: sectionObj.label })
            }
        })
    }
    componentDidMount = async () => {
        let path = '/api/studentservice/getstudentdetails'
        let response = await this.props.authenticatedApiCall('get', path, null);
        if (response.data.status == 1) {
            this.setStateForEditStudent(response.data.statusDescription);
        } else if (response.data.status == 0) { this.setState({ errorMessage: response.data.statusDescription, isError: true }) }
    }
    handleSubmit = async (values) => {
        console.log("images")
        console.log(values)
        var image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }
        let response = await this.props.authenticatedApiCall('post', "/api/studentservice/updateProfileDetails", {
            image: image,
            changePassword: values.changePassword,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        })
        console.log(response.data)
        if (response.data.status === 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription })
        }
        else if (response.data.status === 2) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
        else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    changePassword = () => {
        this.props.formik.setFieldValue("changePassword", true, false);
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        this.props.history.push(`./studentsdetails`)
    }
    render() {
        const { firstname, lastname, mothername, fathername, cellnumber, dob, gender, category, religion, locality, parmanentaddress, localaddress, qualification, classs, section } = this.state;
        const { classes } = this.props;
        const yupSchema = yup.object().shape({
            oldPassword: yup.mixed().when('changePassword', changePassword => {
                if (changePassword) {
                    return yup.string().required("This field is required.")
                }
                else {
                    return yup.mixed()
                }
            }),
            newPassword: yup.mixed().when('changePassword', changePassword => {
                if (changePassword) {
                    return yup.string().required("This field is required.").min(8, ("This field is required.")).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#_?&^+=-])[A-Za-z\d$@$!%*#_?&^+=-]{8,}$/, ("This field is required."))
                }
                else {
                    return yup.mixed()
                }
            }),
            confNewPassword: yup.mixed().when('changePassword', changePassword => {
                if (changePassword) {
                    return yup.string().required(("This field is required.")).test('isEqual', ("This field is required."), function (value) {
                        if (value == this.parent.newPassword) {
                            return true
                        } else {
                            return false
                        }
                    })
                }
                else {
                    return yup.mixed()
                }
            }),
            file: yup.mixed()
                .test("fileSize", "File too large", (value) => {

                    if (Buffer.byteLength(value, 'base64') <= FILE_SIZE) {
                        return true
                    } else if (value.size <= FILE_SIZE) {
                        return true
                    }

                    else {
                        return false
                    }
                })
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (value) {
                        if (SUPPORTED_FORMATS.includes(value.type)) {
                            return true
                        }
                        else if (value.type == "") {
                            return false
                        }
                        else if (value.length > 0) {
                            if (SUPPORTED_FORMAT.includes(value.charAt(0))) {
                                return true
                            } else {
                                return false
                            }
                        }
                        else {
                            return false
                        }
                    } else {
                        return true
                    }
                })
        });
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Student Name  </TableCell>
                                            <TableCell className={classes.tableHeading}>{firstname} {lastname}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Mother Name  </TableCell>
                                            <TableCell className={classes.tableHeading}>{mothername}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Father Name  </TableCell>
                                            <TableCell className={classes.tableHeading}>{fathername}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Cell Number  </TableCell>
                                            <TableCell className={classes.tableHeading}>{cellnumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>DOB  </TableCell>
                                            <TableCell className={classes.tableHeading}>{dob}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Gender  </TableCell>
                                            <TableCell className={classes.tableHeading}>{gender}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Category  </TableCell>
                                            <TableCell className={classes.tableHeading}>{category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Class </TableCell>
                                            <TableCell className={classes.tableHeading}>{classs} {section}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Religion  </TableCell>
                                            <TableCell className={classes.tableHeading}>{religion}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Locality  </TableCell>
                                            <TableCell className={classes.tableHeading}>{locality}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Local Address  </TableCell>
                                            <TableCell className={classes.tableHeading}>{localaddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Parmanent Address  </TableCell>
                                            <TableCell className={classes.tableHeading}>{parmanentaddress}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <Card className = {classes.marginTopMobile}>
                            <CardContent>
                                <Formik initialValues={{ oldPassword: "", newPassword: "", confNewPassword: "", base64: "", file: "", changePassword: false }} onSubmit={this.handleSubmit} validationSchema={yupSchema}
                                >
                                    {(props) => (
                                        <Form>
                                            {this.state.isRender && <ProfileFields image={this.state.image} />}
                                        </Form>
                                    )}
                                </Formik>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.OkButton} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.OkButton} /> : "")}
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(AuthenticatedPage(['Student'])(connect(StudentProfile)));

