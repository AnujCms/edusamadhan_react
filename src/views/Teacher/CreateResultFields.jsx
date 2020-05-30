import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles, withWidth } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Field, connect } from 'formik';
import { useState, useEffect } from 'react';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import FormikDateField from "../../components/FormikValidatedComponents/DateField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormikSelectWithLabel from "../../components/FormikValidatedComponents/SelectFieldWithLabel";
import { addDays } from 'date-fns';
import { formatDate } from "../../components/utilFunctions";
const styles = theme => ({
    questionTit: { marginBottom: 6, fontWeight: 600, fontSize: "15px !important", color: "#4a4a4a" },
    q1EgTxt: { color: "rgba(0, 0, 0, 0.6)", paddingLeft: "10px", fontSize: "11.8px !important" },
});
const CreateResultFields = (props) => {
    const { classes, t } = props;

    return (
        <div key={props.index}>
            <GridContainer>
                <GridContainer>
                        <GridItem md={5} lg={5}>
                            <Field
                                name={`suspectDrugArray.${props.index}.casualRelationship`}
                                options={subjectOptions0to5}
                                placeholder={t("aereport.AEREPORT_SUSPECTDRUG_Q3_OPT1")}
                                component={FormikSelectWithLabel}
                                isSearchable={false}
                                variant="filled"
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                            <br />
                        </GridItem>
                        <GridItem md={4} lg={4}>
                        <Field
                            variant="filled"
                            label={t('aereport.AEREPORT_SUSPECTDRUG_Q2_OPT3')}
                            name={`suspectDrugArray.${props.index}.batchNo`}
                            component={FormikTextField}
                        />
                    </GridItem>
                    <GridItem md={4} lg={4}>
                        <Field
                            variant="filled"
                            label={t('aereport.AEREPORT_SUSPECTDRUG_Q2_OPT3')}
                            name={`suspectDrugArray.${props.index}.batchNo`}
                            component={FormikTextField}
                        />
                    </GridItem>
                    <GridItem md={4} lg={4}>
                        <Field
                            variant="filled"
                            label={t('aereport.AEREPORT_SUSPECTDRUG_Q2_OPT3')}
                            name={`suspectDrugArray.${props.index}.batchNo`}
                            component={FormikTextField}
                        />
                    </GridItem>
                    </GridContainer>
            </GridContainer>
        </div>
    )
}

export default withWidth()(withStyles(styles, { withTheme: true })(connect(CreateResultFields)))