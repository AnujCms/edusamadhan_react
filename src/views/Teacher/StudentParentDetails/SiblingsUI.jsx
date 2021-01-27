import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { connect } from 'formik';
import TextField from '../../../CommonComponents/TextField';

const styles = theme => ({
});
const SiblingsUI = (props) => {
    return (
        <div key={"drugWrap" + props.index}>
            <Grid container key={props.index}>
                <TextField fieldLabel={'First Name'} fieldName={`siblingsArray.${props.index}.siblingFirstName`} />
                <TextField fieldLabel={'Last Name'} fieldName={`siblingsArray.${props.index}.siblingLastname`} />
                <TextField fieldLabel={'Sibling Class'} fieldName={`siblingsArray.${props.index}.siblingClassId`} />
            </Grid>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(connect(SiblingsUI));