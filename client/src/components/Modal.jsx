import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { XIcon } from "@heroicons/react/outline";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router';

import { setModal } from '../store/utilitiesSlice';
import { FormControl } from '../formComponent';
import { login } from '../store/apiCalls';

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalVariants = {
    hidden: {
      opacity: 0.2
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const modalAfterVariants = {
    hidden: {
      y: 300,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut"
      }
    }
  };

  const initalValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (values, onSubmitProps) => {
    login(dispatch, values);
    onSubmitProps.resetForm();
    dispatch(setModal());
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      className="w-screen h-screen grid place-items-center bg-black bg-opacity-25 dark:bg-white dark:bg-opacity-10">
      <motion.div
        variants={modalAfterVariants}
        className='py-4 bg-gray-100 dark:bg-neutral-800 w-[28rem] rounded-md shadow-inner'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center px-6'>
            <button className='modal__close-btn' onClick={() => dispatch(setModal())}>
              <XIcon className='h-4 w-4 dark:text-gray-300' />
            </button>
            <p className='text-xl ml-14 capitalize font-medium dark:text-gray-100'>login </p>
          </div>
          <hr />
          {/* this is the main modal component  */}
          <div className='px-5'>
            <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
                <Form className='flex flex-col -space-y-2'>
                  <div className='flex flex-col -space-y-7'>
                    <FormControl e={errors.email} t={touched.email} control="input" type="text" name="email" label="email" placeholder="enter email" />
                    <FormControl e={errors.password} t={touched.password} control="input" type="password" name="password" label="password" placeholder="enter password" />
                  </div>
                  <div className='flex items-center justify-between px-5'>
                    <p className='text-sm dark:text-gray-300'>don't have account
                      <span onClick={() => { navigate("/register") }} className='font-medium inline-block ml-2 cursor-pointer tracking-wide dark:text-white'>Register</span>
                    </p>
                    <button type='submit' className='green--btn'>Login</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal;