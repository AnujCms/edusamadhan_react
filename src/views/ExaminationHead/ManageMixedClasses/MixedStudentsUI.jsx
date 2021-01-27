import React from 'react';
import { withStyles, Card, Grid } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { Field, connect } from 'formik';
import FormikSelectWithCheckBox from '../../../components/FormikValidatedComponents/SelectFieldWithCheckBox';
import FormikSelect from '../../../components/FormikValidatedComponents/SelectFieldWithLabel';
import { classOptions0to5, classOptions6to12, mixedOptions } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    paddingBottom: { padding: "15px" },
    inputSelect: { width: "350px", [theme.breakpoints.down('sm')]: { width: "350px" } },
    questionContainer: { display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    backgroundColor: { background: theme.palette.formcolor.backgroundFullPage, width: "100%" },
});

class MixedStudentsUI extends React.Component {

    handleChangeMixedType = async (values) => {
        let response = await this.props.authenticatedApiCall('get', '/api/examinationservice/getmixedstudentslist/' + values.value, null);
        if (response.data.status == 1) {
            let classNameArray = []
            JSON.parse(response.data.statusDescription[0].classArray).map((item1) => {
                classOptions6to12.map((item2) => {
                    if (item1 == item2.value) {
                        classNameArray.push(item2)
                    }
                })
            })
            this.props.formik.setFieldValue('mixedClassStudentId', response.data.statusDescription[0].mixedClassStudentId, false)
            this.props.formik.setFieldValue('selectedClass', classNameArray, false)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.backgroundColor}>
                <Grid container className={classes.questionContainer}>
                    <Grid item lg={3} md={3} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="mixedOptions"
                            options={mixedOptions}
                            placeholder={"Select Mixed Options"}
                            className={classes.inputSelect + " " + "selectstyle"}
                            component={FormikSelect}
                            onChange={this.handleChangeMixedType}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                        <Field
                            name="selectedClass"
                            component={FormikSelectWithCheckBox}
                            checkboxProps={{ color: "primary" }}
                            placeholder="Select Class"
                            options={this.props.currentUser.userDetails.userType == 1 ? classOptions0to5 : classOptions6to12}
                            className={classes.inputSelect + " " + "selectstyle"}
                            isSearchable={false}
                            variant="filled"
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12} className={classes.paddingBottom} style={{ zIndex: '1000' }}>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage()(connect(MixedStudentsUI)));