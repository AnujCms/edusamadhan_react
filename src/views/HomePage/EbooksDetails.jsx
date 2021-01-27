import React from 'react';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";
import FormikSelect from '../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { Formik, Form, Field } from 'formik';
import { eBookClassOptions, handleSubjectOptions, handleNUmberOfBooks } from '../../components/utilsFunctions';
import axios from 'axios';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    topM:{marginTop:"15px"},
    paddingBottom: { padding: "10px" },
    inputSelect: { width: "400px", [theme.breakpoints.down('sm')]: { width: "370px" } },
        selectItemWrapper: { display: 'inline-Flex', alignItems: 'center', margin: "10px" }
});

class EbooksDetails extends React.Component {
    constructor(props){
        super(props)
        this.fieldVariables = { selectedAccount: "", selectedTeacher: "" }
        this.state = {
            classId:'', subjectId:'', subjectObj: [], bookObj: [], teacherArray: [], selectedTeacher: null, students: [], studentName: ''
    };
    }
 
    handleClassChange = async (value) => {
        axios.get('/api/publiccontent/getSubjectsOfClass/' + value.value ).then(response => {
            if (response.data.status === 1) {
                let subjectArray = [];
                response.data.statusDescription.map((item)=>{
                    subjectArray.push(handleSubjectOptions(item.subjectId));
                })
                this.setState({ subjectObj: subjectArray, classId: value.value })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        })
    };

    handleSubjectChange = async (value) => {
        axios.get('/api/publiccontent/getBooksOfSubject/' + this.state.classId +"/" + value.value ).then(response => {
            if (response.data.status === 1) {
                let bookArray = [];
                response.data.statusDescription.map((item)=>{
                    bookArray.push(handleNUmberOfBooks(item.numberOfBook));
                })
                this.setState({ bookObj: bookArray, subjectId: value.value })
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        })
    };
    handleGetBookDetails = async (value) => {
        axios.get('/api/publiccontent/getBookDetails/' + this.state.classId +"/" + this.state.subjectId +"/"+ value.value ).then(response => {
            if (response.data.status === 1) {
                window.open(response.data.statusDescription[0].bookUrl)
            } else if (response.data.status === 0) {
                this.setState({ isError: true, errorMessage: response.data.statusDescription })
            }
        })
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Helmet> <title>E-Books</title></Helmet>
                <Grid Container justify="center">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.formHeader}>
                        <Typography className={classes.center}>Welcome E-Book Portal</Typography>
                    </Paper>
                </Grid>
                    <Grid item md={12}>
                    <Formik onSubmit={this.handleSubmit} validationSchema={this.yupSchema} initialValues={this.fieldVariables}>
                            {(props) => (
                                <Form>
                                    <Paper className={classes.topM}>
                                        <Grid container>
                                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="selectedClass"
                                                    options={eBookClassOptions}
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
                                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="selectedSubject"
                                                    options={this.state.subjectObj}
                                                    placeholder={"Select Subject"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleSubjectChange}
                                                    isSearchable={false}
                                                    variant="filled"
                                                    isClearable={false}
                                                    menuPortalTarget={document.body}
                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                />
                                            </Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                                                <Field
                                                    name="selectedBook"
                                                    options={this.state.bookObj}
                                                    placeholder={"Select Book"}
                                                    className={classes.inputSelect + " " + "selectstyle"}
                                                    component={FormikSelect}
                                                    onChange={this.handleGetBookDetails}
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(EbooksDetails);
