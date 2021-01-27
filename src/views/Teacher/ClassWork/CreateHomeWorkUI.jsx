import React from 'react';
import { withStyles, Card, Grid} from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { classOptions6to12, classOptions0to5, sectionOptions, classMediumType, subjectOptions } from '../../../components/utilsFunctions';
import SelectWithLabel from '../../../CommonComponents/SelectWithLabel';
import MultiLineText from '../../../CommonComponents/MultiLineText';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateHomeWorkUI extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithLabel fieldLabel={'Select Class'} fieldName={'classId'} selectOptions={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12} />
                        <SelectWithLabel fieldLabel={'Select Section'} fieldName={'sectionId'} selectOptions={sectionOptions} />
                        <SelectWithLabel fieldLabel={'Select Medium'} fieldName={'mediumType'} selectOptions={classMediumType} />
                        <SelectWithLabel fieldLabel={'Select Subject'} fieldName={'subjectId'} selectOptions={subjectOptions} />
                        <MultiLineText fieldLabel={'Home Work Details ...'} fieldName={'homeWorkDetails'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateHomeWorkUI)));