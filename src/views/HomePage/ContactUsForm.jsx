import React from 'react';
import { withStyles, Card, Typography, Button, Grid, Paper } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { Formik, Form, Field } from 'formik';
import { object, string, number } from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import Spinner from '@material-ui/core/CircularProgress';
import axios from 'axios';

const styles = theme => ({
    textStyle: { marginTop: "40px", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: "36px" },
    headerStyle: { height: "50px", backgroundColor: '#800000' },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "14px" },
    createUser: { width: "242px", height: "36px", textTransform: "uppercase", backgroundColor: "rgba(75, 123, 227, 1)", color: '#fff', borderRadius: "25px", border: "1px solid " + theme.palette.border.hoverThirdBorder, marginLeft: 25, fontWeight: "500 !important", [theme.breakpoints.down('md')]: { width: "100px", marginLeft: '10px' } },
    formHeader: { margin: "0px", height: "50px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%", textAlign: "center" },
    paddingBottom: { padding: "5px" },
    btnStyle:{width: '100%', marginTop: "17px", marginBottom: "10px", marginLeft: "120px", [theme.breakpoints.down('md')]: { marginLeft: '90px' }  },
    inputItem: { width: "50%", [theme.breakpoints.down('md')]: { width: '100%' } },
});

class ContactUsForm extends React.Component {
    constructor(props) {
        super(props)
        this.yupSchema = object().shape({
            name: string().required("This field is required"),
            cellnumber: string().required("Cellnumber is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")),
            emailid: string().required("Email id is required.").email('Enter proper Email Id'),
            message: string().required("This field is required").min(1, ("Please enter alteast one Charecter.")).max(500, ("Please enter less than 500 Charecters.")),
        })
        this.monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]
        this.state = {
            startSpinner: false, subjects: [], subjectid: null, selectedMonth: null, presentClasses: '', otalClasses: '', createAttendanceMsg: '',
            createAttendance: false, isError: false, errorMessage: '', isSuccess: false, successMessage: ''
        }
    }

    handleSubmit = async (values) => {
            this.setState({ startSpinner: true })
            let response = await axios.post("/api/emailservice/contactus" , {
                name: values.name,
                cellnumber: values.cellnumber,
                message: values.message,
                emailid: values.emailid
            })
            if (response.data.status == 1) {
                this.setState({ successMessage: response.data.statusDescription, isSuccess: true, startSpinner: false });
            }
            else if (response.data.status == 0) {
                this.setState({ errorMessage: response.data.statusDescription, isError: true, startSpinner: false });
            }
    }
    backDashboard = () =>{
        this.setState({isError:false, isSuccess:false})
    }
    render() {
        const { match, classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <>
            <div className={classes.headerStyle}>
                    <Typography className={classes.textStyle}><b>CREATE ENQUIRY</b></Typography>
                </div>
            <div>
                <Formik initialValues={{ name: '', cellnumber: '', message: '', emailid:'' }} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}>
                    {(props) => (
                        <>
                            <Form>
                                <Card className={classes.backgroundColor}>
                                    {this.state.startSpinner && <Spinner style={{ position: "absolute", top: "40%", left: "45%", zIndex: '99999' }} />}
                                    <Grid container>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                        <Field
                                                name="name"
                                                className={classes.inputItem}
                                                variant="filled"
                                                label="Name"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="cellnumber"
                                                type="number"
                                                className={classes.inputItem}
                                                variant="filled"
                                                label="Cell Number"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="emailid"
                                                className={classes.inputItem}
                                                variant="filled"
                                                label="Email Id"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.paddingBottom}>
                                            <Field
                                                name="message"
                                                className={classes.inputItem}
                                                variant="filled"
                                                multiline
                                                rows={3}
                                                rowsMax={10}                                                
                                                label="Type your message here"
                                                component={FormikTextField}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.btnStyle}>
                                            <Button type="submit" disabled={this.state.startSpinner} className={classes.createUser}>Send</Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Form>
                        </>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
            </>
        )
    }
}

export default (withStyles(styles)(ContactUsForm));
