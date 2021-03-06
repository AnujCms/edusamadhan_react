import { string, object, array, number, ref } from 'yup';

var StudentResultValidator = function(t)
{
    return object().shape({
        examinationType: string().required("This field is required"),
        subjectResultArray : array().of(
            object().shape({
                subjectName: string().required('This field is required'),
                totalMarks: number().positive().typeError('This field is required').required("This field is required").min(1, "Total Marks can not be less than 1."),
                obtainMarks: number().positive().typeError('This field is required').lessThan(ref('totalMarks'),'Obtained marks can not be greater than Total Marks').required("This field is required").min(0, "Obtain Marks can not be less than 0."),
                grade:string().required("This field is required")
            })
        ),
    })
}

export default StudentResultValidator;