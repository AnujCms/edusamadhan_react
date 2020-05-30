import React from 'react';
import {FormHelperText} from '@material-ui/core';
import {getIn} from 'formik'


export default function ({field,form,onChange,onBlur,helperText,error,children,displayErrorMessage = true,...otherProps})
{

    let arrayValue  = field.value||[];
    const changeHandler = (event) =>
    {
        let target = event.target;
        let valuesArray =  [...field.value]||[];
        if(target.checked){
            valuesArray.push(target.name)
        }
        else{
            valuesArray.splice(valuesArray.indexOf(target.name),1);
        }

        form.setFieldValue(field.name,valuesArray);
        if(onChange)
        {
            onChange(valuesArray);
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
        <div>
            {
                children.map((child,index)=>{
                    return React.cloneElement(child,{
                        field:{
                            name: child.props.name,
                            value:arrayValue.includes(child.props.name),
                            checked:arrayValue.includes(child.props.name),
                            onChange: changeHandler,
                            onBlur: blurHandler
                        }
                    })
                }
                )
            }
                        </div>
                        {displayErrorMessage?<FormHelperText error = {Boolean(touch && errorText)}>{(touch && errorText)|| helperText}</FormHelperText>:helperText && <FormHelperText>{helperText}</FormHelperText>}
                        </>

    )
    
}