import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Select from 'mui-select-with-search-vivek';
import { Button, FormLabel, FormControl, withStyles } from '@material-ui/core';
import ErrorDialog from '../../components/ErrorDialog';

const examOptions = [{ value: 1, label: '3 Monthly' }, { value: 2, label: '6 Monthly' }, { value: 3, label: '9 Monthly' }, { value: 4, label: 'Yearly' }]

const styles = theme => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    labelContainer: {
        width: "550px", textAlign: "right", marginRight: "25px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'", fontWeight: "bold", fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            width: "100px"
        }
    },
    selectContainer: { width: 200 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
});

class SelectExamType extends React.Component {
    state = { examinationid: { value: 1, label: '3 Monthly' }, examinations: [], isError: false, errorMessage: '' }

    handleExamination = async (selectedExamination) => {
        this.setState({ examinationid: selectedExamination });
        this.props.handleExaminationType(selectedExamination);
    }

    async componentDidMount() {
        let examinationType = await this.props.authenticatedApiCall('get', '/api/teacherservice/'+this.props.teacherid+'/getconfigdetails', null);
        if (examinationType.data.status == 1) {
            var arr = [];
            examinationType.data.statusDescription.examoption.map((item) => {
                examOptions.forEach(examObj => {
                    if (item == examObj.value) {
                        arr.push(examObj)
                    }
                })
            })
            this.setState({ examinations: arr })
        } else if (examinationType.data.status == 0) {
            this.setState({ errorMessage: examinationType.data.statusDescription, isError: true })
        }
    }
    backDashboard = () => {
        this.setState({ isError: false })
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        return (
            <div>
                <div className={classes.questionContainer}>
                    <FormLabel className={classes.labelContainer} component="span">Select Examination Type</FormLabel>
                    <FormControl className={classes.selectContainer}>
                        <Select
                            value={this.state.examinationid}
                            onChange={this.handleExamination}
                            options={this.state.examinations}
                            placeholder="Select Examination Type"
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        >
                        </Select>
                    </FormControl>
                </div>
                {(this.state.isError ? <ErrorDialog successButton={OkButton} HeaderText={this.state.errorMessage} dismiss={this.backDashboard} /> : "")}
            </div>
        );
    }
}


export default withStyles(styles)(AuthenticatedPage()(SelectExamType));   
