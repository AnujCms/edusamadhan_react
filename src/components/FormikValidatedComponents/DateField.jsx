import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { TextField, FormHelperText } from '@material-ui/core';
import { getIn } from 'formik';

class CustomTextField extends React.Component {
  render() {
    const { onClick, value, textFieldProps,...other } = this.props;
    return (<TextField
      onClick={onClick}
      value={value}
      {...textFieldProps}
      {...other} />
    )
  }
}

export default function ({maxDate,minDate, field, form, value, onChange, onBlur, helperText, textFieldProps,displayErrorMessage=true, locale, ...other }) {
  const changeHandler = function (date) {
    form.setFieldValue(field.name, date, true);
    form.setFieldTouched(field.name);

    if (onChange) {
      onChange(date);
    }

  }

  const blurHandler = (event) => {
    form.setFieldTouched(field.name);
    if (onBlur) {
      onBlur(event);
    }
  }
  const touch = getIn(form.touched, field.name);
  const errorText = getIn(form.errors, field.name);

  return (
    <>
      <DatePicker
        customInput={<CustomTextField textFieldProps={textFieldProps} />}
        selected={field.value}
        onChange={changeHandler}
        onBlur={blurHandler}
        {...other}
        maxDate = {maxDate}
        minDate = {minDate}
      />
      {displayErrorMessage?<FormHelperText error={Boolean(touch && errorText)}>{(touch && errorText) || helperText}</FormHelperText>:helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );

};