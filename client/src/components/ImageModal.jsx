import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { XIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, A11y, Thumbs, Pagination, Mousewheel, Keyboard, } from "swiper";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { setModal } from '../store/utilitiesSlice';

const ImageModal = ({ swiperData }) => {
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
  }
  console.log(swiperData);
  return (
    <div className='w-screen h-screen fixed bg-black top-0 left-0 grid place-items-center bg-opacity-80'>
      <div className='h-[80vh] w-[80vw] mx-auto'>
        <Swiper
          spaceBetween={10}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar, Navigation, A11y, Pagination, Mousewheel, Keyboard]}
        >
          <div onClick={() => dispatch(setModal())} className='z-50 cursor-pointer absolute left-10 top-4 '>
            <XIcon className='h-6 w-6 text-gray-100' />
          </div>
          <div>
          {
            swiperData.map((data, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img src={data.url} alt={data.filename} className="h-[75vh] w-[80vw] object-contain" />
                </div>
              </SwiperSlide>
            ))
          }
          </div>
        </Swiper>
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
        </Swiper>
      </div>
    </div>
  )
}

export default ImageModal