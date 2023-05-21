import React from 'react';
import { Field } from 'formik';

const TextFormik = props => {
  const { label, name, rows, ...rest } = props;

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-start justify-between">
        <label className='form__label dark:text-gray-100' htmlFor={name}>{label}:</label>
        <div>
          <Field as="textarea" id={name} name={name} rows={`${rows}`} {...rest} className="login__input w-[26rem]" />
        </div>
      </div>
    </div>
  )
}

export default TextFormik;