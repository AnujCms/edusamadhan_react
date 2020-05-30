import React from 'react';
import {Checkbox,FormControlLabel} from '@material-ui/core';

export default function ({field:{value,name,onChange, onBlur,checked},label,...otherProps})
{

    return(
        <>
        <FormControlLabel name={name} label = {label} control = {
        <Checkbox name={name} value={value} checked={checked} onChange={onChange} onBlur={onBlur}/>} {...otherProps}/>
                        </>

    )
    
}