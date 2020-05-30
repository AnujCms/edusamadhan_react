import Select from 'mui-select-with-search-vivek';
import React from 'react';
import {FormHelperText} from '@material-ui/core';
import {getIn} from 'formik';

export default function ({field,form,onChange,onBlur,value,helperText,displayErrorMessage=true,...otherProps})
{
    const changeHandler = (value) =>
    {
        form.setFieldValue(field.name,value);
        if(onChange)
        {
            onChange(value);
        }
    }
    const blurHandler = (value) =>
    {
        form.setFieldTouched(field.name);
        if(onBlur)
        {
            onBlur(value);
        }
    }

    const touch = getIn(form.touched, field.name);
    const errorText = getIn(form.errors, field.name);


    return(
<>
    <Select {...otherProps}
    onChange = {changeHandler}
    onBlur = {blurHandler}
    closeMenuOnSelect = {false}
    checkBoxStyled={true}
    value = {field.value}
    />
    {displayErrorMessage ? <FormHelperText error={Boolean(touch && errorText)}>{(touch && errorText)|| helperText}</FormHelperText>:helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
    )
}