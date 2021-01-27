import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { withWidth } from '@material-ui/core';
import { subjectOptions0to5, subjectOptions6to12 } from '../../../components/utilsFunctions';

class ManageSubjectsUI extends React.Component {
 
    setSelectedSubjects = (data) => {
        let subjects = [];
        if (this.props.currentUser.userDetails.userType == 1) {
            data.forEach(subjectObj => {
                subjectOptions0to5.forEach(obj => {
                    if (subjectObj === obj.value) {
                        subjects.push(obj)
                    }
                })
            })
        } else {
            data.forEach(subjectObj => {
                subjectOptions6to12.forEach(obj => {
                    if (subjectObj === obj.value) {
                        subjects.push(obj)
                    }
                })
            })
        }
        return subjects;
    }

    componentDidMount() {
        if (this.props.subjectsData.length > 0) {
            this.props.formik.setFieldValue('selectedSubjects', this.setSelectedSubjects(this.props.subjectsData), false)
        }else{
            this.props.formik.setFieldValue('selectedSubjects', "", false)
        }
    }
    render() {
        return (<></>
        )
    }
}

export default withWidth()(AuthenticatedPage()(connect(ManageSubjectsUI)));