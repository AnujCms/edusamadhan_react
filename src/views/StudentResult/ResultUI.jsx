import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, withWidth } from '@material-ui/core';
import { connect, FieldArray } from 'formik';
import ResultFields from './ResultFields';

const styles = theme => ({
    card1: { padding: 20, borderBottom: "2px solid #f3f4f5", fontWeight: 600 },
    fntSize: { fontSize: 17 },
    fontWeight: { color: "rgba(74, 74, 74, 1)", fontWeight: 800 },
    checkWrp: { width: "30px", height: "30px", display: "inline-block", padding: "5px 11px", background: "rgba(238, 242, 243, 1)", marginRight: "20px", borderRadius: "50%" },
    check: { color: "rgba(75, 122, 226, 1)", fontSize: "15px !important", fontWeight: 600, lineHeight: "21px" },
    susPctTxt: { fontSize: "15px !important", color: "#737373" },
    seperator: { borderTop: "1.3px solid #f3f4f5", margin: "30px 0", width: "100%" },
    addSuspectDrugBtn: { backgroundColor: "#ffffff", borderRadius: "25px", border: "1px solid rgba(0, 0, 0, 0.12)", transition: "0.2s", color: "#2262bf", textTransform: "uppercase", padding: "5px 20px", marginBottom: 30, '&:hover': { backgroundColor: "#2262bf", color: "#ffffff", border: "1px solid #2262bf" }, [theme.breakpoints.down('1285')]: { '& span': { fontSize: "12px !important" } } }
});

class ResultUI extends React.Component {
    constructor() {
        super()
    }
    state = {
        isRender: false
    }

    render() {console.log('sub',this.props.formik.errors)
        return (
            <>
                {
                    <FieldArray
                        name="subjectResultArray"
                        render={arrayHelpers => (
                            <>
                                {this.props.formik.values.subjectResultArray.length > 0 && this.props.formik.values.subjectResultArray.map((item, index) =>
                                    (
                                        <>
                                            <ResultFields index={index} key={index} /><br></br>
                                        </>
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