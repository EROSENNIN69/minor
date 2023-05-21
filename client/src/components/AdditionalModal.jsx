import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { XIcon } from "@heroicons/react/outline";

import { setExtraModal } from "../store/utilitiesSlice";

const AdditionalModal = ({ type, content }) => {
  const dispatch = useDispatch();

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
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      className="w-screen h-screen grid place-items-center bg-black bg-opacity-25 dark:bg-white dark:bg-opacity-10">
      <motion.div
        variants={modalAfterVariants}
        className='py-4 bg-gray-100 h-52 dark:bg-neutral-800 w-[28rem] rounded-md shadow-inner'>
        <div className='flex flex-col space-y-2'>
          {type === "delete property" && (
            <div className='flex items-center px-6'>
              <button className='modal__close-btn' onClick={() => dispatch(setExtraModal())}>
                <XIcon className='h-4 w-4 dark:text-gray-300' />
              </button>
              <p className='text-xl ml-14 capitalize font-medium dark:text-gray-100'>delete propertyName </p>
            </div>
          )}
          <hr />
          {/* this is the main modal component  */}
          <div className='px-5 w-full h-24 grid place-items-center dark:text-gray-100'>
            <p>{content}...</p>
          </div>
          {type === "delete property" && (
            <div className='ml-auto pr-4'>
              <button className='red--btn'>Delete</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdditionalModal;