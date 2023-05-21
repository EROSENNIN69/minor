import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormMultipleFile = (props) => {
  const { label, name, e, t, ...rest } = props;
  return (
    <div className="flex flex-col space-y-1">
       <div className="flex items-center justify-between">
        <label className='form__label dark:text-gray-100' htmlFor={name}>{label}:</label>
        <div>
          <Field id={name} name={name} {...rest} className={`login__input p-0 w-[26rem] ${(e && t) && "error__login--input"}`} />
          <ErrorMessage name={name} component="div" className='error__login--message' />
        </div>
      </div>
    </div>
  )
}

export default FormMultipleFile;