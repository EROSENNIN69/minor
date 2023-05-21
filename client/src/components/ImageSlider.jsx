import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, A11y } from "swiper";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

import { setModal, setLikedProperties } from "../store/utilitiesSlice";

const LikedButton = ({ data }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { likedProperties } = useSelector(state => state.utils);
  let a = likedProperties.filter(a => a._id === data._id);
  const [liked, setLiked] = useState(a.length === 1 ? true: false);
  const handleClick = async () => {
    if (currentUser) {
      setLiked(!liked);
      dispatch(setLikedProperties(data));
    } else {
      dispatch(setModal());
    }
  }
  function handleUnlike() {
    setLiked(!liked);
    dispatch(setLikedProperties({ _id: data._id }));
  }

  return <>
    {(liked) ? (
      <HeartIcon onClick={handleUnlike} className='h-5 w-5 text-gray-600 dark:text-gray-100 hover:scale-110 transition-all duration-200 ease-out' />
    ) : (
      <HeartIconOutline onClick={handleClick} className='h-5 w-5 text-gray-600 dark:text-gray-100 hover:scale-110 transition-all duration-200 ease-out' />
    )}
  </>
};

const ImageSlider = (props) => {
  const { swiperData } = props;

  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        type: "progressbar"
      }}
      slidesPerView={props.imagesView}
      navigation
      scrollbar={{ draggable: true }}
      modules={[Scrollbar, Navigation, A11y]}
    >
      {
        swiperData.map(data => (
          <SwiperSlide key={data._id}>
            <div className='overflow-hidden pb-8'>
              <div className="cursor-pointer relative rounded-t-md">
                <img src={data.images[0].url} alt={data.propertyName} className="h-[15vw] w-full object-cover rounded-t-md" />
                <div className="absolute top-2 right-2 h-8 w-8 rounded-full cursor-pointer bg-white dark:bg-neutral-700 flex items-center justify-center z-20">
                 <LikedButton data={data} />
                </div>
                <div className="absolute rounded-t-md top-0 left-0 h-full w-full opacity-0 bg-black bg-opacity-20 hover:opacity-100 dark:bg-white dark:bg-opacity-20"></div>
              </div>
              <div className='border-[1px] border-t-0 dark:border-neutral-500 flex flex-col space-y-3 rounded-b-md border-gray-400 px-4 py-2 dark:bg-neutral-800'>
                <Link to={`/allProperties/${data._id}`}>
                  <h5 className='text-xl font-medium capitalize hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 ease-out cursor-pointer'>{data.propertyHeading}</h5>
                </Link>
                <div className='flex items-center space-x-3'>
                  {(data.category === "room" || data.category === "shutter") && (
                    <div>
                      <p className="capitalize font-medium">Room</p>
                      <p>{data.rooms}</p>
                    </div>
                  )}
                  {data.bedRoom && (
                    <div>
                      <p className='capitalize font-medium'>bedroom</p>
                      <p>{data.bedRoom}</p>
                    </div>
                  )}
                  {data.hall && (
                    <div>
                      <p className='capitalize font-medium'>Kitchen</p>
                      <p>{data.kitchen}</p>
                    </div>
                  )}
                  {data.kitchen && (
                    <div>
                      <p className='capitalize font-medium'>Hall</p>
                      <p>{data.hall}</p>
                    </div>
                  )}
                </div>
                <div className='flex justify-between'>
                  <p className='capitalize text-lg font-medium'>{data.propertyType}</p>
                  <p><span className='font-medium'>Rs</span> {data.price}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default ImageSlider;