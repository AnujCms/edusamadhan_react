import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Button } from '@material-ui/core';
import { WithAccount } from '../AccountContext';
import ErrorDialog from '../../components/ErrorDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { Formik, Form } from 'formik';
import TimeTableUI from './TimeTableUI';
import { object, string } from 'yup';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';

const styles = theme => ({
    root: {
        margin: theme.spacing(22),
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('md')]: { margin: 0, paddingTop: '5px' }
    },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        this.fieldVariables = {
            classId: '', sectionId:'', dayName:'', periodName:'', subject:'', teacherName:''
        }
        this.state = {
            successMessage: '', isSuccess: false, students: [], errorMessage: '', isError: false
        };
        this.yupSchema = object().shape({
            classId: string().required("This field is required"),
            sectionId: string().required("This field is required"),
            dayName: string().required("This field is required"),
            periodName: string().required("This field is required"),
            subject: string().required("This field is required"),
            teacherName: string().required("This field is required"),
        });
    }

    handleSubmit = async (values) =>{
        let dataToSend = {
            classId:values.classId.value,
            sectionId: values.sectionId.value,
            dayName: values.dayName.label,
            dayname: values.dayName.value,
            periodId: values.periodName.value,
            subjectName: values.subject.label,
            teacherName: values.teacherName.label
        }
        let response = await this.props.authenticatedApiCall('post', "/api/timetableservice/savetimetable", dataToSend);
        if(response.data.status === 1){
            this.setState({isSuccess:true, successMessage:response.data.statusDescription})
        }else{
            this.setState({isError:true, errorMessage:response.data.statusDescription})
        }

    }
    backDashboard = () => {
        this.setState({ isError: false, isSuccess: false })
    }
    backTimeTableDashboard = () => {
        this.setState({isSuccess:false})
        this.props.history.push(`./create-timetable`);
    }
    handleCancel = () =>{
        this.props.history.push(`./timetable`);
    }
    render() {
        const HeaderText = "Success"
        const { classes } = this.props;
        const OkButton1 = [<Button className={classes.OkButton} onClick={this.backTimeTableDashboard}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div className={classes.root}>
                <FormHeader headerText={"Create Time Table"} pageTitle={"Create | Edit TimeTable"} />
                <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                    {(props) => (
                        <Form>
                            <TimeTableUI />
                            <FormFooter handleCancel={this.handleCancel} startSpinner={this.state.startSpinner}/>
                        </Form>
                    )}
                </Formik>
                {(this.state.isSuccess ? <SuccessDialog successButton={OkButton1} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backTimeTableDashboard} /> : "")}
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(WithAccount(TimeTable)));