import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, Paper, Button, Grid, Typography } from '@material-ui/core';
import ActionButton from './ActionButtonForQuestion';
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';

const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];

const styles = theme => ({
    // root: {
    //     marginTop: theme.spacing.unit * 2,
    //     ...theme.mixins.gutters(),
    //     paddingTop: theme.spacing.unit * 1,
    //     paddingBottom: theme.spacing.unit * 1,
    //     [theme.breakpoints.down('md')]: { marginTop: 0 }
    // },
    root: {
        margin: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 11,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    cstmprotoBtnWrap: {
        margin: "10px 0",
        textAlign: "right",
        [theme.breakpoints.down('md')]: { textAlign: "left" }
    },
    pad0: { padding: 0 },
    evenetsTitle: { fontWeight: 500, marginLeft: "5px", marginTop: "15px" },
    primaryBtn: { color: theme.palette.text.textPrimaryColor, backgroundColor: theme.palette.primary.main, textTransform: "uppercase", border: "1px solid " + theme.palette.border.primaryBorder, borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", '&:hover': { backgroundColor: theme.palette.hoverPrimaryColor.main, color: theme.palette.text.hoverTextPrimaryColor, border: "1px solid " + theme.palette.border.hoverPrimaryBorder } },
    widthSelect:{width:350,[theme.breakpoints.down('md')]: { width: 300 }},
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});

class QuestionList extends React.Component {
    state = {
        questions: [], students: [], isError: false, errorMessage: '', isSuccess: false, successMessage: ''
    };

    tableheads1 = [
        {
            name: "qid",
            label: "SR. No.",
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
                        <ActionButton questionid={value.qid} editQuestion={this.onEditQuestion} deleteQuestion={this.onDeleteQuestion} />
                    )
                }
            }
        }
    ];
    onEditQuestion = (questionid) => {
        this.props.history.push('./edit-question/' + questionid);
    }
    onDeleteQuestion = async (questionid) => {
        let url = "/api/entranceexamservice/deletequestion/" + questionid;
        let response = await this.props.authenticatedApiCall('delete', url, null)
        if (response.data.status == 1) {
            this.setState({ isSuccess: true, successMessage: response.data.statusDescription });
        } else if (response.data.status == 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription });
        }
    }

    handleClassChange = async selectedValue => {
        let url = "/api/entranceexamservice/getclassforquestion/" + selectedValue.value ;
        var response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.status == 1) {
            response.data.statusDescription.forEach((item) => {
                item.Action = { qid: item.qid }
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
        this.props.history.push('./questiondetails/' + this.state.questions[rowMeta.dataIndex].qid, this.state.questions[rowMeta.dataIndex])
    }

    handleCreateQuestion = () =>{
        this.props.history.push(`./create-question`);
    }
    render() {
        const { classes } = this.props;
        const OkButtonQuestionList = [<Button className={classes.OkButton} onClick={this.backQuestionList}>Ok</Button>]
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        return (
            <div className={classes.root}>
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
                        <Paper style={{padding:'10px'}}>
                            <div>
                                <InputLabel>Class</InputLabel>
                                <FormControl className={classes.widthSelect} >
                                    <Select
                                        value={this.state.class}
                                        onChange={this.handleClassChange}
                                        options={classOptions}
                                        placeholder='Select Class'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >

                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                        <MuiThemeDataTable title={'Question List of selected class'} rows={this.state.questions} columns={this.tableheads1} rowDetailsRedirectFunctionQuestion={this.displayQuestionDetailsForMobileView} tableContent="entranceQuestionList"/>
                        {(this.state.isSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={this.state.successMessage} dismiss={this.backDashboard} /> : "")}
                        {(this.state.isError ? <ErrorDialog successButton={OkButtonQuestionList} HeaderText={this.state.errorMessage} dismiss={this.backQuestionList} /> : "")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("ExamHead")(QuestionList));