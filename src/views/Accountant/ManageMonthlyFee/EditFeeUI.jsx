import React from 'react';
import AuthenticatedPage from "../../AuthenticatedPage";
import { WithAccount } from '../../AccountContext';
import { connect } from 'formik';

class EditFeeUI extends React.Component {
    constructor(props) {
        super(props);
        this.classOptions6to12 = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
        this.classOptions0to5 = [{ value: 1, label: "Nursery" }, { value: 2, label: "LKG" }, { value: 3, label: "UKG" }, { value: 4, label: "1st" }, { value: 5, label: "2nd" }, { value: 6, label: "3rd" }, { value: 7, label: "4th" }, { value: 8, label: "5th" }];
        this.classMediumType = [{ value: 1, label: "Hindi" }, { value: 2, label: "English" }];
    }
    getSelectedClass = (value) => {
        let selectedClass = '';
        if(this.props.currentUser.userDetails.accouttype == 1 ){
            this.classOptions0to5.forEach((item) => {
                if (item.value == value) {
                    selectedClass = item;
                }
            })
        }else{
            this.classOptions6to12.forEach((item) => {
                if (item.value == value) {
                    selectedClass = item;
                }
            })
        }

        return selectedClass;
    }
    getSelectedMediumType = (value) =>{
        let mediumType = '';
        this.classMediumType.map((item)=>{
            if(item.value == value){
                mediumType = item;
            }
        })
        return mediumType;
    }
    componentDidMount = () => {
        let data = this.props.feeData;
        this.props.formik.setFieldValue('class', this.getSelectedClass(data.class), false);
        this.props.formik.setFieldValue('mediumType', this.getSelectedMediumType(data.mediumType), false);
        this.props.formik.setFieldValue('january', data.january, false);
        this.props.formik.setFieldValue('february', data.february, false);
        this.props.formik.setFieldValue('march', data.march, false);
        this.props.formik.setFieldValue('april', data.april, false);
        this.props.formik.setFieldValue('may', data.may, false);
        this.props.formik.setFieldValue('june', data.june, false);
        this.props.formik.setFieldValue('july', data.july, false);
        this.props.formik.setFieldValue('august', data.august, false);
        this.props.formik.setFieldValue('september', data.september, false);
        this.props.formik.setFieldValue('october', data.october, false);
        this.props.formik.setFieldValue('november', data.november, false);
        this.props.formik.setFieldValue('december', data.december, false);
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default AuthenticatedPage("FeeAccount")(WithAccount(connect(EditFeeUI)));