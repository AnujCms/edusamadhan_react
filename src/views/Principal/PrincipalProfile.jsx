import React, { Component } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Table, TableBody, TableRow, TableCell, Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik, connect } from 'formik';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import * as yup from 'yup';
import ProfileFields from './ProfileFields';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0, marginTop:'10px' },
    },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    table: { minWidth: 500 },
    button: { margin: theme.spacing.unit * 1 },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
    marginLeft: { marginLeft: "20px", [theme.breakpoints.down('md')]: { marginLeft: "0px", marginTop: "20px" } },
    marginTopMobile:{ [theme.breakpoints.down('md')]: { marginTop: "10px" }}

})

const qualificationOptions = [{ value: 1, label: "B.Sc" }, { value: 2, label: "M.Sc" }, { value: 3, label: "B.Tech" }, { value: 4, label: "BA" }];
const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const sectionOptions = [{ value: 1, label: "A" }, { value: 2, label: "B" }, { value: 3, label: "C" }, { value: 4, label: "D" }, { value: 5, label: "E" }]

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const SUPPORTED_FORMAT = ["/", "i", "R"];
const FILE_SIZE = 1024 * 1024 * 1;

class PrincipalProfile extends Component {
    state = {
        firstname: "", lastname: "", cellnumber: "", emailid: "", dob: "", parmanentaddress: "", localaddress: "", classs: "", section: "",
        qualification: "", updateSuccess: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
    }

    setStateForEditProvider = (data) => {
        this.setState({
            firstname: data.firstname,
            lastname: data.lastname,
            cellnumber: data.cellnumber,
            emailid: data.emailid,
            gender: data.gender,
            parmanentaddress: data.parmanentaddress,
            localaddress: data.localaddress
        })

        qualificationOptions.forEach(qualificationObj => {
            if (data.qualification == qualificationObj.value) {
                this.setState({ qualification: qualificationObj.label })
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
        let path = '/api/principalservice/getPrincipalDetails'
        let response = await this.props.authenticatedApiCall('get', path, null);
        if (response.data.status == 1) {
            this.setStateForEditProvider(response.data.statusDescription);
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
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
        let data = {
            image: image,
            changePassword: values.changePassword,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confNewPassword: values.confNewPassword
        }
        let response = await this.props.authenticatedApiCall('post', "/api/teacherservice/updateProfileDetails", data)
        if (response.data.status === 1) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true });
        }
        else if (response.data.status === 2) {
            this.setState({ successMessage: response.data.statusDescription, isSuccess: true });
        }
        else if (response.data.status === 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    }
    changePassword = () => {
        this.props.formik.setFieldValue("changePassword", true, false);
    }

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        this.props.history.push(`./profile`)
    }
    render() {
        const { firstname, lastname, cellnumber, emailid, dob, parmanentaddress, localaddress, qualification, classs, section } = this.state;
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
                <Helmet> <title>Profile</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan="2" className={classes.tableHeading}> <h3>Profile Details</h3> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>First Name  </TableCell>
                                            <TableCell className={classes.tableCell}>{firstname}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Last Name  </TableCell>
                                            <TableCell className={classes.tableCell}>{lastname}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Cell Number  </TableCell>
                                            <TableCell className={classes.tableCell}>{cellnumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Email ID  </TableCell>
                                            <TableCell className={classes.tableCell}>{emailid}</TableCell>
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
                                        <ProfileFields />
                                    </Form>
                                )}
                            </Formik>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(AuthenticatedPage(["Principal"])(connect(PrincipalProfile)));

