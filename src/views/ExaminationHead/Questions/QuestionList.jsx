import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, Paper, Button, Grid, Typography } from '@material-ui/core';
import ActionButton from './ActionButtonForQuestion';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import { classOptions6to12, classOptions0to5 } from '../../../components/utilsFunctions';
import { Helmet } from "react-helmet";

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(9),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    cstmprotoBtnWrap: { margin: "10px 0", textAlign: "right",[theme.breakpoints.down('md')]: { textAlign: "left" }},
    paddingBottom: { padding: "10px" },
    inputSelect: { width: "610px", [theme.breakpoints.down('sm')]: { width: "370px" } },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class QuestionList extends React.Component {
    state = {
        questions: [], students: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
    };

    tableheads1 = [
        {
            name: "serialNumber",
            label: "S.No.",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "question",
            label: "Question",
            options: {
                filter: false,
                sort: false,
                searchable: true,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "optiona",
            label: "Option A",
            options: {
                filter: false,
                sort: false,
                searchable: true,
            }
        },

        {
            name: "optionb",
            label: "Option B",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "optionc",
            label: "Option C",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "optiond",
            label: "Option D",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "answer",
            label: "Answer",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton questionId={value.questionId} editQuestion={this.onEditQuestion} deleteQuestion={this.onDeleteQuestion} />
                    )
                }
            }
        }
    ];
    onEditQuestion = (questionId) => {
        this.props.history.push('./edit-question/' + questionId);
    }
    onDeleteQuestion = async (questionId) => {
        let url = "/api/examinationservice/deleteQuestion/" + questionId;
        let response = await this.props.authenticatedApiCall('delete', url, null)
        if (response.data.status == 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription });
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription });
        }
    }

    handleClassChange = async selectedValue => {
        let url = "/api/examinationservice/getQuestionForClass/" + selectedValue.value;
        var response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item, index) => {
                item.serialNumber = index + 1;
                item.Action = { questionId: item.questionId }
                if (item.answer === 1) { item.answer = item.optiona }
                else if (item.answer === 2) { item.answer = item.optionb }
                else if (item.answer === 3) { item.answer = item.optionc }
                else if (item.answer === 4) { item.answer = item.optiond }
                else if (item.answer === 5) { item.answer = item.optione }
            });
            this.setState({ questions: response.data.statusDescription })
        } else if (response.data.status == 0) {
            this.setState({ errorMessage: response.data.statusDescription, isError: true });
        }
    };
    backDashboard = () => {
        this.setState({ isSuccess: false, isError: false })
        this.props.history.push(`./create-question`);
    }
    backQuestionList = () => {
        this.setState({ isSuccess: false, isError: false })
        this.props.history.push(`./create-question`);
    }
    displayQuestionDetailsForMobileView = (rowData, rowMeta) => {
        this.props.history.push('./questiondetails/' + this.state.questions[rowMeta.dataIndex].questionId, this.state.questions[rowMeta.dataIndex])
    }

    handleCreateQuestion = () => {
        this.props.history.push(`./create-question`);
    }
    render() {
        const { classes } = this.props;
        const OkButtonQuestionList = [<Button className={classes.OkButton} onClick={this.backQuestionList}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
                <Helmet> <title>Question List</title></Helmet>
                <Grid container className={classes.GridContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.pad0}>
                        <Typography variant="h4" className={classes.evenetsTitle}>Entrance Questions</Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={classes.cstmprotoBtnWrap}>
                            <Button onClick={this.handleCreateQuestion} className={classes.primaryBtn}>Create Question</Button>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={{ class: "", section: "" }}>
                            {(props) => (
                                <Form>
                                    <Paper>
                                        <Grid container>
                                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="class"
                                                    options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12}
                                                    placeholder={"Select Class"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleClassChange}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Form>
                            )}
                        </Formik>
                        <MuiThemeDataTable title={'Question List of selected class'} rows={this.state.questions} columns={this.tableheads1} rowDetailsRedirectFunctionQuestion={this.displayQuestionDetailsForMobileView} tableContent="entranceQuestionList" />
                        {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.isError ? <ErrorDialog successButton={OkButtonQuestionList} HeaderText={this.state.errorMessage} dismiss={this.backQuestionList} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(QuestionList));