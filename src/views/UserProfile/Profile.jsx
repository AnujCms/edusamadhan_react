import React, { Component } from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Table, TableBody, TableRow, TableCell, Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik, connect } from 'formik';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import * as yup from 'yup';
import ProfileFields from './ProfileFields';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import FormHeading from '../../components/FormHeading';
import { handleClassLabel, handleQualificationLabel, handleSectionLabel } from '../../components/utilsFunctions';

const styles = theme => ({
    root: {
        margin: theme.spacing(10),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(11),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: '10px' },
    },
    GridContainer: { [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    table: { minWidth: 500 },
    button: { margin: theme.spacing(1) },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
    marginLeft: { marginLeft: "20px", [theme.breakpoints.down('md')]: { marginLeft: "0px", marginTop: "20px" } },
    marginTopMobile: { backgroundColor: "#DCDCDC", [theme.breakpoints.down('md')]: { marginTop: "10px" } }
})

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const SUPPORTED_FORMAT = ["/", "i", "R"];
const FILE_SIZE = 1024 * 1024 * 1;

class TeacherProfile extends Component {
    constructor(props) {
        super(props)
        this.yupSchema = yup.object().shape({

            file: yup.mixed().required('Image is required.')
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
        this.fieldVariables = { file: "" }
        this.state = {
            firstName: "", lastName: "", cellNumber: "", emailId: "", dob: "", parmanentAddress: "", localAddress: "", classId: "", sectionId: "",
            qualification: "", updateSuccess: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        }
    }


    setStateForEditUser = (data) => {
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            cellNumber: data.cellNumber,
            aadharNumber: data.aadharNumber,
            emailId: data.emailId,
            gender: data.gender,
            parmanentAddress: data.parmanentAddress,
            localAddress: data.localAddress,
            qualification: handleQualificationLabel(data.qualification),
            classId: handleClassLabel(data.classId, this.props.currentUser.userDetails.userType),
            sectionId: handleSectionLabel(data.sectionId)
        });
    }
    componentDidMount = async () => {
        let path = '/api/teacherservice/getTeacherDetails'
        let response = await this.props.authenticatedApiCall('get', path, null);
        if (response.data.status == 1) {
            this.setStateForEditUser(response.data.statusDescription);
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    }
    handleSubmit = async (values) => {
        var image;
        if (values.file == null) {
            image = values.file
        } else if (values.file.base64Rep) {
            image = values.file.base64Rep
        } else {
            image = values.file
        }

        let data = {
            image: image
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

    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
        this.props.history.push(`./profile`)
    }
    handleCancel = () => {
        this.props.history.push('./studentlist')
    }
    render() {
        const { firstName, lastName, cellNumber, emailId, aadharNumber, parmanentAddress, localAddress, qualification, classId, sectionId } = this.state;
        const { classes } = this.props;

        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <FormHeader headerText={`User Profile`} pageTitle={"User Profile"} />
                <FormHeading formHeadingNumber={1} formHeadingText={'User Profile Details, Here you can update your Image.'} />
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
                                            <TableCell className={classes.tableCell}>{firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Last Name  </TableCell>
                                            <TableCell className={classes.tableCell}>{lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Cell Number  </TableCell>
                                            <TableCell className={classes.tableCell}>{cellNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Aadhar Number  </TableCell>
                                            <TableCell className={classes.tableCell}>{aadharNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Email ID  </TableCell>
                                            <TableCell className={classes.tableCell}>{emailId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Local Address  </TableCell>
                                            <TableCell className={classes.tableCell}>{localAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Parmanent Address  </TableCell>
                                            <TableCell className={classes.tableCell}>{parmanentAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Qualification  </TableCell>
                                            <TableCell className={classes.tableCell}>{qualification}</TableCell>
                                        </TableRow>
                                        {this.props.currentUser.userDetails.role == "Teacher" && <TableRow>
                                            <TableCell className={classes.tableCell}>Class Teacher </TableCell>
                                            <TableCell className={classes.tableCell}>{classId} {sectionId}</TableCell>
                                        </TableRow>}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                        <Card className={classes.marginTopMobile}>
                            <CardContent>
                                <Formik initialValues={this.fieldVariables} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}
                                >
                                    {(props) => (
                                        <Form>
                                            <ProfileFields />
                                            <br />
                                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner} />
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
export default withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(TeacherProfile)));

