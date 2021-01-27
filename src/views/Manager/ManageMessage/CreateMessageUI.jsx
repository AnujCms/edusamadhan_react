import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { messageUserOption, handleMessageUser } from '../../../components/utilsFunctions';
import SelectWithFunction from '../../../CommonComponents/SelectWithFunction';
import FormHeading from '../../../components/FormHeading';
import MultiLineText from '../../../CommonComponents/MultiLineText';
import UserImage from '../../../CommonComponents/UserImage';

const styles = (theme) => ({
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" }
});

class CreateMessageUI extends React.Component {
    handleChangeUser = async (value) => {
        let response = await this.props.authenticatedApiCall('get', '/api/managerservice/getUsersMessage/' + value.value, null);
        if (response.data.status === 1) {
            let messageDetails = response.data.statusDescription[0];
            this.props.formik.setFieldValue('messageUser', handleMessageUser(messageDetails.messageUser));
            this.props.formik.setFieldValue('userMessage', JSON.parse(messageDetails.userMessage).message);
            this.props.formik.setFieldValue('file', messageDetails.images);
            this.props.formik.setFieldValue('msgId', messageDetails.msgId);

        } else if (response.data.status === 0) {
            this.setState({ isError: true, errorMessage: response.data.statusDescription })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <FormHeading formHeadingNumber={1} formHeadingText={'User Message Details'} />
                <Card className={classes.backgroundColor}>
                    <Grid container className={classes.questionContainer}>
                        <SelectWithFunction fieldLabel={'Select User'} fieldName={'messageUser'} selectOptions={messageUserOption} handleChangeOption={this.handleChangeUser} />
                        <MultiLineText fieldLabel={'User Message ...'} fieldName={'userMessage'} />
                        <UserImage fieldLabel={'User Image'} fieldName={'file'} />
                    </Grid>
                </Card>
            </>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(CreateMessageUI)));