import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import room1 from "../public/images/room1.jpeg";
import room2 from "../public/images/room2.jpeg";
import forrent from "../public/images/forrent.jpg";
import housing from "../public/images/housing.jpg";

const SliderImage = (props) => {
  return (
    <div className='h-[90vh] w-screen relative'>
      <img src={props.img} alt={props.name} className="h-full w-full object-cover" />
      <div className='absolute top-0 left-0 h-full w-full bg-black bg-opacity-50'></div>
    </div>
  )
};

const Banner = () => {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        loop={Infinity}
        autoplay={{ delay: 7000, disableOnInteraction: false }}>
        <SwiperSlide>
          <SliderImage img={forrent} alt="forrent" />
        </SwiperSlide>
        <SwiperSlide>
          <SliderImage img={room1} alt="room1" />
        </SwiperSlide>
        <SwiperSlide>
          <SliderImage img={room2} alt="room2" />
        </SwiperSlide>
        <SwiperSlide>
          <SliderImage img={housing} alt="housing" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner;