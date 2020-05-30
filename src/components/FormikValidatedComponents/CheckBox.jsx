import React from 'react';
import {Checkbox,FormControlLabel, FormHelperText} from '@material-ui/core';
import {getIn} from 'formik'

export default function ({field,form,name,helperText,error,checkboxProps,displayErrorMessage =true,...otherProps})
{
    const checkProps = checkboxProps ? checkboxProps:{};
    const {checked,name:cbname,onChange,onBlur,...otherCheckBoxProps} = checkProps;
    const changeHandler = (event,checked) =>
    {
        form.setFieldValue(field.name,checked);
        if(onChange)
        {
            onChange(event,checked);
        }
    }
    const blurHandler = (event) =>
    {
        form.setFieldTouched(field.name);
        if(onBlur)
        {
            onBlur(event);
        }
    }
    const touch = getIn(form.touched, field.name);
    const errorText = getIn(form.errors, field.name);

    return(
        <>
        <FormControlLabel control = {
        <Checkbox name={field.name} checked={field.value} onChange = {changeHandler} onBlur={blurHandler} {...otherCheckBoxProps}  />} {...otherProps}/>
                        {displayErrorMessage ? <FormHelperText error = {Boolean(touch && errorText)}>{(touch && errorText)|| helperText}</FormHelperText>: helperText && <FormHelperText> {helperText} </FormHelperText>}
                        </>

    )
    
}