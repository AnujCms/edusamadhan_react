import React, { useState } from "react";
import Select from "../MultiSelect";
import { FormHelperText } from "@material-ui/core";
import { getIn, Field } from "formik";
import FormControl from "@material-ui/core/FormControl";

export default function({
  field,
  form,
  onChange,
  onBlur,
  variant,
  options,
  isClearable,
  placeholder,
  value,
  helperText,
  displayErrorMessage = true,
  ...otherProps
}) {
  const changeHandler = evt => {
    form.setFieldValue(field.name, evt);

    if (onChange) {
      onChange(evt);
    }
  };
  const touch = getIn(form.touched, field.name);
  const errorText = getIn(form.errors, field.name);

  return (
    <>
      <FormControl variant="filled">
        <Select
          {...otherProps}
          value={field.value}
          onChange={changeHandler}
          options={options}
          textFieldProps={{
            variant: variant,
            label: placeholder
          }}
          placeholder=""
          isClearable={isClearable}
        />
      </FormControl>

      {displayErrorMessage ? (
        <FormHelperText error={Boolean(touch && errorText)}>
          {(touch && errorText) || helperText}
        </FormHelperText>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </>
  );
}
