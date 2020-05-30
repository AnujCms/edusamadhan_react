import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, withWidth, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect, FieldArray } from 'formik';
import { useState, useEffect } from 'react';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import CreateResultUI from './CreateResultUI';

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

const CreateResultUI = (props) => {
    const [examinationType, setExaminationType] = useState(null)
    const [subjectsArray, setsubjectsArray] = useState([])
    subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
    subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]
    

    const { classes } = props;
    return (
        <>
            <div className={classes.card1}><Typography component="h5" className={classes.fntSize + " " + classes.fontWeight}><span className={classes.checkWrp}><span className={classes.check}> 1 </span></span>{t('aereport.AEREPORT_MAIN_SUB_TITLE1')}</Typography></div>
            <GridContainer>
                <GridItem md={12} lg={12}>
                    <br />
                    <Typography className={classes.susPctTxt}>Result</Typography>
                    <br />
                </GridItem>
                {
                    <FieldArray
                        name="studentResult"
                        render={arrayHelpers => (
                            <>
                                {subjectsArray.length > 0 && subjectsArray.map((item, index) => 
                                    (
                                        <>
                                            {/* {adverseEditData && <EditAeSuspectDrug index={index} adverseData={adverseEditData}/>} */}
                                            <CreateResultUI index={index} key={index} adverseData={adverseEditData}/>
                                        </>
                                    )
                                )}
                                <hr className={classes.seperator} />
                                <GridContainer>
                                    <GridItem md={12} lg={12}>
                                        <Button className={classes.addSuspectDrugBtn} disabled={props.formik.values.suspectDrugArray.length>4} onClick={() => arrayHelpers.push({ drugDosage: '', drugFrequency: '', therapyStartDate: '', therapyEndDate: '', batchNo: '', casualRelationship: '', indicationUseDrug: '', actionTaken: '', specify: '' })}>Button</Button>
                                    </GridItem>
                                </GridContainer>
                            </>
                        )}
                    />
                }
            </GridContainer>
        </>
    )
}

export default withStyles(styles)(AuthenticatedPage("Teacher")(CreateResultUI));   
