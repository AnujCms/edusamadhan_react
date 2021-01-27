import React from 'react';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect, FieldArray } from 'formik';
import { useState, useEffect } from 'react';
import SiblingsUI from './SiblingsUI';

const styles = theme => ({
    seperator: { borderTop: "1.3px solid #f3f4f5", margin: "30px 0", width: "100%" },
    addSuspectDrugBtn: { backgroundColor: "#ffffff", borderRadius: "25px", minWidth: 308, minHeight: 36, border: "1px solid rgba(0, 0, 0, 0.12)", transition: "0.2s", color: "#2262bf", textTransform: "uppercase", minWidth: 308, padding: "5px 20px", marginBottom: 30, '&:hover': { backgroundColor: "#2262bf", color: "#ffffff", border: "1px solid #2262bf" }, [theme.breakpoints.down('1285')]: { '& span': { fontSize: "12px !important" } } },
    noTxtWrap: { padding: "15px 0", width: "100%", fontSize: "15px !important", textAlign: "center" }
});
const SiblingsDetails = (props) => {
    const [siblingsEditData, setSiblingsEditData] = useState(null)

    useEffect(() => {
        if (props.editSiblings) {
            let editSiblongsArray = []
            props.editSiblings.aeDetails.siblingsArray.map((item) => {
                let aeObj = {
                    siblingFirstName: item.siblingFirstName,
                    siblingLastname: item.siblingLastname,
                    siblingClassId: item.siblingClassId
                }
                editSiblongsArray.push(aeObj)
            })
            props.formik.setFieldValue('siblingsArray', editSiblongsArray)
            setSiblingsEditData(editSiblongsArray)
        }
    }, [props.editSiblings])
    const { classes } = props;
    return (
        <>
            {
                <FieldArray
                    name="siblingsArray"
                    render={arrayHelpers => (
                        <>
                            {props.formik.values.siblingsArray.length > 0 && props.formik.values.siblingsArray.map((item, index) =>
                                (
                                    <SiblingsUI index={index} key={index} adverseData={siblingsEditData} arrayHelpers={arrayHelpers} key={'siblings' + index} />
                                )
                            )}
                            {props.formik.values.siblingsArray.length === 0 && <div className={classes.noTxtWrap}><Typography component="h5">No</Typography></div>}
                            <hr className={classes.seperator} />
                            <Grid container>
                                <Grid item md={12} lg={12}>
                                    <Button id="button" className={classes.addSuspectDrugBtn} disabled={props.formik.values.siblingsArray.length > 4} onClick={() => arrayHelpers.push({ siblingFirstName: '', siblingLastname: '', siblingClassId: '' })}>Add More</Button>
                                </Grid >
                            </Grid>
                        </>
                    )}
                />
            }
        </>
    )
}

export default withStyles(styles, { withTheme: true })(AuthenticatedPage()(connect(SiblingsDetails)));