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
const CreateResul = (props) => {
    const [examinationType, setExaminationType] = useState(null)
    const [subjectsArray, setsubjectsArray] = useState([])

    setSelectedSubjects6to12 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            this.subjectOptions6to12.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj)
                }
            })
        })
        setsubjectsArray(subjects)
    }

    setSelectedSubjects0to5 =(data) =>{
        let subjects = [];
        data.forEach(subjectObj => {
            this.subjectOptions0to5.forEach(obj => {
                if (subjectObj === obj.value) {
                    subjects.push(obj)
                }
            })
        })
        setsubjectsArray(subjects)
    }

    useEffect(()=>{
        let examinationArray = [];
        JSON.parse(props.currentUser.userDetails.configdata).examoption.map((item) => {
            this.examOptions.forEach(examObj => {
                if (item == examObj.value) {
                    examinationArray.push(examObj)
                }
            })
        })
        this.setState({ examinationType: examinationArray })
        let response = await props.authenticatedApiCall('get', '/api/teacherservice/assignsubjects', null);
        if (response.data.status == 1) {
            if(props.currentUser.userDetails.accouttype == 1){
                setSelectedSubjects0to5(response.data.statusDescription)
            }else{
                setSelectedSubjects6to12(response.data.statusDescription)
            }
        } else if (response.data.status == 0) {
            // this.setState({ errorMessage: response.data.statusDescription, isError: true })
        }
    })
    const { classes, t } = props;
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

export default withStyles(styles)(AuthenticatedPage("Teacher")(CreateResul));   
