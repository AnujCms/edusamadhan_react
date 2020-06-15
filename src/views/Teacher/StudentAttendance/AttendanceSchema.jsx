import { string, object, array, number, ref } from 'yup';

var AttendanceSchema = function(t)
{
    return object().shape({
        attendanceDate: string().required("This field is required."),
        studentAttendanceArray : array().of(
            object().shape({
                studentname: string().required('This field is required'),
                attendance: string().required('This field is required')
            })
        ),
    })
}

export default AttendanceSchema;