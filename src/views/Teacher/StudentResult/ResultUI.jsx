import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { withStyles, withWidth } from '@material-ui/core';
import { connect, FieldArray } from 'formik';
import ResultFields from './ResultFields';

const styles = theme => ({
});

class ResultUI extends React.Component {
    constructor() {
        super()
        this.state = {
            isRender: false
        }
    }

    render() {
        return (
            <>
                {
                    <FieldArray
                        name="subjectResultArray"
                        render={arrayHelpers => (
                            <>
                                {this.props.formik.values.subjectResultArray.length > 0 && this.props.formik.values.subjectResultArray.map((item, index) =>
                                    (
                                        <div key={'result' + index}>
                                            <ResultFields index={index} /><br></br>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    />
                }
            </>
        )
    }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(ResultUI))));