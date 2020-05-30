import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { connect } from 'formik';
import { withWidth } from '@material-ui/core';

class ManageSubjectsUI extends React.Component {
    constructor(props) {
        super(props)
        this.subjectOptions6to12 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Science' }, { value: 5, label: 'Social Science' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }, { value: 9, label: 'Biology' }, { value: 10, label: 'Moral Science' }, { value: 11, label: 'Drawing' }, { value: 12, label: 'Computer' }, { value: 13, label: 'EVS' }, { value: 14, label: 'Sanskrat' }]
        this.subjectOptions0to5 = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Mathematics' }, { value: 4, label: 'Social Science' }, { value: 5, label: 'GK' }, { value: 6, label: 'Moral Science' }, { value: 7, label: 'Drawing' }, { value: 8, label: 'EVS' }, { value: 9, label: 'Computer' }, { value: 10, label: 'Sanskrat' }]
    }
    setSelectedSubjects = (data) => {
        let subjects = [];
        if (this.props.currentUser.userDetails.accouttype == 1) {
            data.forEach(subjectObj => {
                this.subjectOptions0to5.forEach(obj => {
                    if (subjectObj === obj.value) {
                        subjects.push(obj)
                    }
                })
            })
        } else {
            data.forEach(subjectObj => {
                this.subjectOptions6to12.forEach(obj => {
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

export default withWidth()(AuthenticatedPage(["Principal"])(connect(ManageSubjectsUI)));