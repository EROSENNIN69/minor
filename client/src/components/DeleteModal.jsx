import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from 'react-router';

import { setExtraModal } from "../store/utilitiesSlice";
import { publicRequest } from '../request';

const DeleteModal = ({ name, id, content }) => {
  const dispatch = useDispatch();
  const { accesstoken } = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const res = await publicRequest.delete(`http://localhost:5000/api/property/${id}`, {
      headers: {
        "token": `bearer ${accesstoken}`
      }
    });
    if(res.status === 200) {
      dispatch(setExtraModal());
      console.log("deleted successfully");
    }
    navigate("/")
  };

  const modalVariants = {
    hidden: {
      opacity: 0.2,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };
  return (
    <div
      className="w-screen h-screen fixed bg-black dark:bg-white dark:bg-opacity-10 top-0 left-0 grid place-items-center bg-opacity-10">
      <motion.div
        variants={modalVariants} initial="hidden" animate="visible"
        className='py-4 bg-gray-100 h-52 dark:bg-neutral-800 w-[28rem] rounded-md shadow-inner'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center px-6'>
            <button className='modal__close-btn' onClick={() => dispatch(setExtraModal())}>
              <XIcon className='h-4 w-4 dark:text-gray-300' />
            </button>
            <p className='text-xl ml-14 capitalize font-medium dark:text-gray-100'>delete </p>
          </div>
          <hr />
          {/* this is the main modal component  */}
          <div className='px-5 w-full h-24 grid place-items-center dark:text-gray-100'>
            <p>{content} ... </p>
          </div>
          <div className='ml-auto pr-4'>
            <button onClick={handleDelete} className='red--btn'>Delete</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteModal;