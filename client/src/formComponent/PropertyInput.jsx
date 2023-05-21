import React from 'react';
import { Field, ErrorMessage } from 'formik';

const PropertyInput = (props) => {
  const { e, t, label, name, ...rest } = props;
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <label className='form__label dark:text-gray-100' htmlFor={name}>{label}:</label>
        <div>
          <Field id={name} name={name} {...rest} className={`login__input py-[5px] w-[26rem] ${(e && t) && "error__login--input"}`} />
          <ErrorMessage name={name} component="div" className='error__login--message' />
        </div>
      </div>
    </div>
  )
}

export default PropertyInput;