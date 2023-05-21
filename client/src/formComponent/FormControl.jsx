import React from 'react';
import { FormInput, FormFile, PropertyInput, FormMultipleFile, TextFormik } from "./index";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch(control) {
    case "input":
      return <FormInput { ...rest } />
    case "propertyInput":
      return <PropertyInput { ...rest } />
    case "file":
      return <FormFile { ...rest } />
    case "textarea":
      return <TextFormik { ...rest } />
    case "propertyMultipleFile":
      return <FormMultipleFile { ...rest } />
    default:
      return null;
  }
}

export default FormControl