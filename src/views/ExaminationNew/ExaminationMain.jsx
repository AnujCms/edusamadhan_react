
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { ValidatorForm, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import { withStyles, FormControlLabel, Radio, Typography, Button } from '@material-ui/core';

const styles = () => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    primaryButton: { marginLeft: "10px", color: "#fff", background: "#f5bc53", width: "150px", borderRadius: "25px", '&:hover': { background: "#f5b505", border: "1px solid #6b4f01" } },
});
class ExaminationMain extends React.Component {
    state = { answer: '' }

    reset = () => {
        this.setState({ answer: '' })
    }
    handleChange = (event) => {
        this.props.handleAnswer(event.target.value)
        this.setState({ answer: event.target.value });
    }

    handleNextQuestion = () => {
        this.setState({ answer: '' })
        this.props.handleNextQuestion();
    }

    handlePreviousQuestion = () =>{
        this.props.handlePreviousQuestion();
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <ValidatorForm>
                    <Typography variant="h4">{"Question number : " + this.props.number + " out of " + this.props.length}</Typography>
                    <br />
                    <div className={classes.questionContainer}>
                        {this.props.number + ". " + this.props.question}
                    </div>
                    <div className={classes.questionContainer}>
                        <RadioGroupValidator
                            name="answer"
                            withRequiredValidator
                            value={this.state.answer}
                            onChange={this.handleChange} row>
                            <FormControlLabel
                                value="1"
                                control={
                                    <Radio
                                        color="primary"
                                    />
                                }
                                label={this.props.optiona}
                            /><br></br>
                            <FormControlLabel
                                value="2"
                                control={
                                    <Radio
                                        color="primary"
                                    />
                                }
                                label={this.props.optionb}
                            /><br></br>
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        color="primary"
                                    />
                                }
                                label={this.props.optionc}
                            /><br></br>
                            <FormControlLabel
                                value="4"
                                control={
                                    <Radio
                                        color="primary"
                                    />
                                }
                                label={this.props.optiond}
                            /><br></br>
                            <FormControlLabel
                                value="5"
                                control={
                                    <Radio
                                        color="primary"
                                    />
                                }
                                label={this.props.optione}
                            />
                        </RadioGroupValidator>
                    </div>
                    <Button onClick={this.handleNextQuestion} className={classes.primaryButton} > {(this.props.length === this.props.number) ? "Submit" : "Next"} </Button>
                </ValidatorForm>
            </>
        );

    }

}
export default withStyles(styles)(AuthenticatedPage(['EntranceStudent'])(ExaminationMain));