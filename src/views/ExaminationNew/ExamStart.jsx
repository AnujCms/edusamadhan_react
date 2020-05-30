
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles } from '@material-ui/core/styles';
import ExaminationMain from './ExaminationMain';
import ExamCompleted from './ExamCompleted';

const styles = () => ({
});
class ExamStart extends React.Component {
    state = {
        rigthAnswer: null, con: 0, answer: '', time: 60, fullquestion: [], question: '', optiona: '', optionb: '', optionc: '', optiond: '',
        optione: '', number: 0, examCompleted: false, rightAnswer: null, startTest: false
    }

    handleChange = (event) => {
        this.props.handleAnswer(event.target.value)
        this.setState({ con: this.state.con + 1, answer: event.target.value });
    }

    async componentDidMount() {
        var response = await this.props.authenticatedApiCall('get', '/api/entranceexamservice/getclassforquestion', null);
        if (response.data.status == 1) {
            this.setState({ fullquestion: response.data.statusDescription })
        } else if (response.data.status == 0) {

        }
        this.handleNextQuestion();
    }

    handleNextQuestion = () => {
        if (this.state.fullquestion.length === this.state.number) {
            this.setState({ examCompleted: true })
        }
        var num = this.state.number;
        if (this.state.fullquestion.length > num) {
            let d = this.state.fullquestion[num]
            this.setState({ question: d.question, optiona: d.optiona, optionb: d.optionb, optionc: d.optionc, optiond: d.optiond, optione: d.optione, answer: d.answer })
            if ((this.state.fullquestion.length) > (this.state.number)) {
                num = num + 1;
            } else {
            }
            this.setState({ number: num })
        }
    }
    handlePreviousQuestion = () => {
        var num = this.state.number;
        if (this.state.fullquestion.length > num) {
            let d = this.state.fullquestion[num - 2]
            this.setState({ question: d.question, optiona: d.optiona, optionb: d.optionb, optionc: d.optionc, optiond: d.optiond, optione: d.optione, answer: d.answer })
            if ((this.state.fullquestion.length) > (this.state.number)) {
                num = num - 1;
            } else {
            }
            this.setState({ number: num })
        }
    }

    right = 0;
    handleAnswer = (ans) => {
        if (ans == this.state.answer) {
            this.right = this.right + 1;
        }
        this.setState({ rightAnswer: this.right })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                {this.state.examCompleted ? <ExamCompleted rightAnswer={this.state.rightAnswer} totalQuestion={this.state.fullquestion} /> :
                    <><ExaminationMain length={this.state.fullquestion.length} number={this.state.number} question={this.state.question} optiona={this.state.optiona} optionb={this.state.optionb} optionc={this.state.optionc} optiond={this.state.optiond} optione={"None of these"} handleAnswer={this.handleAnswer} handleNextQuestion={this.handleNextQuestion} handlePreviousQuestion={this.handlePreviousQuestion} />
                    </>}
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(['EntranceStudent'])(ExamStart));