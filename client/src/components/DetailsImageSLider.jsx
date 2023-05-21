import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as Heart } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { setModal, setLikedProperties } from '../store/utilitiesSlice';
import { pageVariants } from '../data';
import { CustomImageSlider } from "./";

const DetailsImageSLider = (props) => {
  const { propertyDetail } = props;
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { likedProperties } = useSelector(state => state.utils);
  let a = likedProperties.filter(a => a._id === propertyDetail._id);
  const [liked, setLiked] = useState(a.length === 1 ? true: false);

  const handleClick = (data) => {
    if (currentUser) {
      setLiked(!liked);
      dispatch(setLikedProperties(propertyDetail));
    } else {
      dispatch(setModal());
    }
  }

  function handleUnlike() {
    setLiked(!liked);
    dispatch(setLikedProperties({ _id: propertyDetail._id }));
  }

  return (
    <motion.div
      variants={pageVariants} initial="hidden" animate="visible"
    >
      <hr />
      <div className='flex items-stretch justify-between mb-3 mt-1'>
        <div className='shrink-0 cursor-pointer'>
          <CustomImageSlider showImages={propertyDetail.images.slice(0, 5)} />
        </div>
        <div className='basis-[70%] self-stretch rounded-r-md flex flex-col justify-between px-4'>
          <div className='flex justify-between items-center'>
            <Link to={`/allProperties/${propertyDetail._id}`}>
              <div className='flex flex-col space-y-2'>
                <p className='text-sm -mb-4 text-gray-500 dark:text-gray-400 itlaic py-3'>{propertyDetail.category === "apartment" ? "An" : "A"} {propertyDetail.category} available at <span className='capitalize'>{propertyDetail.propertyLocation}</span></p>
                <p className='capitalize text-xl -mt-8'>{propertyDetail.propertyHeading || propertyDetail.propertyName}</p>
                <hr className='w-16' />
                <div className='flex space-x-2 items-center text-sm text-gray-600 dark:text-gray-400 italic'>
                  {(propertyDetail.category === "room" || propertyDetail.category === "shutter") && (
                    <p>{propertyDetail.rooms} rooms</p>
                  )}
                  {propertyDetail.bedRoom && (
                    <p>{propertyDetail.bedRoom} bedrooms . </p>
                  )}
                  {propertyDetail.hall && (
                    <p>{propertyDetail.hall} hall . </p>
                  )}
                  {propertyDetail.kitchen && (
                    <p>{propertyDetail.kitchen} kitchen . </p>
                  )}
                </div>
              </div>
            </Link>
            <div className='flex grow flex-col h-full justify-around'>
              <button className="details__like-btn self-end">
                {liked ?
                  <Heart onClick={() => handleUnlike()} className='h-6 w-6 text-gray-600 dark:text-gray-300 font-light' /> :
                  <HeartIcon onClick={() => handleClick()} className='h-6 w-6 text-gray-600 dark:text-gray-300 font-light' />
                }
              </button>
              <div className='flex space-x-3 items-center self-end ml-auto w-max'>
                <p className='text-xl font-medium'>Rs</p>
                <p className='text-xl font-medium'>{propertyDetail.price}</p>
              </div>
            </div>
          </div>
          <div className='self-end ml-auto w-max'>
            <p className='capitalize text-lg font-medium'>{propertyDetail.propertyType}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default DetailsImageSLider;