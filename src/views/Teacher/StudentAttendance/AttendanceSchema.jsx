import { string, object, array, mixed, ref } from 'yup';

let AttendanceSchema = function()
{
    return object().shape({
        attendanceDate: string().required("This field is required."),
        studentAttendanceArray : array().of(
            object().shape({
                studentname: string().required('This field is required'),
                attendance: string().required('This field is required'),
                reason: mixed().when('attendance', { is: (value) => value == 2 || value == 3, then: string().min(3, 'Reason can not be less than 3 charecters.').max(200, 'Reason can not be greater than 200 charecters.').required("This field is required.") })
            })
        ),
    })
}

export default AttendanceSchema;