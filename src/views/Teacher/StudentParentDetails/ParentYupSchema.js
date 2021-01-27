import { string, object, array, mixed } from 'yup';

let parentDetails = function () {
    let siblingsObjectsArray = function () {
        return object().shape({ 
            siblingFirstName: string().min(3, 'First Name can not be less than 3 Charecters.').max(100, 'First Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
            siblingLastName: string().min(3, 'Lasr Name can not be less than 3 Charecters.').max(100, 'Lasr Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
            siblingClassId: string().required("This feild is required."),
        })
    }
    
    return object().shape({
        motherFirstName: string().min(3, 'First Name can not be less than 3 Charecters.').max(100, 'First Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        motherLastName: string().min(3, 'Last Name can not be less than 3 Charecters.').max(100, 'Last Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        motherCellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        motherAAdharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        motherOccupation: string().min(2, 'Occupation can not be less than 3 Charecters.').max(100, 'Occupation can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        motherQualification: string().min(2, 'Qualification can not be less than 3 Charecters.').max(200, 'Qualification can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        fatherFirstName: string().min(3, 'First Name can not be less than 3 Charecters.').max(100, 'First Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        fatherLastName: string().min(3, 'Last Name can not be less than 3 Charecters.').max(100, 'Last Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        fatherCellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        fatherAAdharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        fatherOccupation: string().min(2, 'Occupation can not be less than 3 Charecters.').max(100, 'Occupation can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        fatherQualification: string().min(2, 'Qualification can not be less than 3 Charecters.').max(100, 'Qualification can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        localGuardianFirstName: string().min(3, 'First Name can not be less than 3 Charecters.').max(100, 'First Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        localGuardianLastName: string().min(3, 'Last Name can not be less than 3 Charecters.').max(100, 'Last Name can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        localGuardianCellNumber: string().required("Cell Number is required.").min(10, ("Please enter valid 10 digit cell number.")).max(10, ("Please enter valid 10 digit cell number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        localGuardianAAdharNumber: string().required("AAdhar Number is required.").min(12, ("Please enter valid 12 digit AAdhar number.")).max(12, ("Please enter valid 12 digit AAdhar number.")).matches(/^[0-9]+$/, 'This field accepts only number.'),
        localGuardianOccupation: string().min(2, 'Occupation can not be less than 3 Charecters.').max(100, 'Occupation can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        localGuardianQualification: string().min(2, 'Qualification can not be less than 3 Charecters.').max(100, 'Qualification can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
        siblings: string().required("This feild is required."),
        siblingsArray: array().when('siblings', {
            is: '1',
            then: array().required("This feild is required."),
            otherwise: array()
        }),
        physicalDisability: string().required("This feild is required."),
        physicalDisabilityDetails: mixed().when('physicalDisability', {
            is: '1',
            then: string().min(3, 'Disability Details can not be less than 3 Charecters.').max(100, 'Disability Details can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
            otherwise: mixed()
        }),
        currentTreatment: string().required("This feild is required."),
        currentTreatmentDetails: mixed().when('currentTreatment', {
            is: '1',
            then: string().min(3, 'Treatment Details can not be less than 3 Charecters.').max(100, 'Treatment Details can not be greater than 100 Charecters.').typeError("This field will accept only Alphabets.").required("This feild is required."),
            otherwise: mixed()
        }),
        isStaffChild: string().required("This feild is required."),
        studentBloodGroup: string().required("This feild is required."),
        isWeekInSubject: string().required("This feild is required.")
    })

 
}

export default  parentDetails;