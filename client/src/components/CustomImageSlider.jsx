import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline';

const CustomImageSlider = ({ showImages }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== showImages.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === showImages.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(showImages.length);
    }
  };

  const moveDot = index => {
    setSlideIndex(index)
  }

  return (
    <div className='slider-container shadow-inner'>
      {showImages.map((img, index) => (
        <div key={img._id} className={slideIndex === index + 1 ? "slide opacity-100" : "slide"}>
          <img src={img.url} alt={`image + ${index}`} className="object-cover w-full h-full" />
        </div>
      ))}
      {showImages.length > 1 && (
        <>
          <BtnSlider moveSlide={nextSlide} direction={"next"} />
          <BtnSlider moveSlide={prevSlide} direction={"prev"} />
        </>
      )}

      {/* dots  */}
      {showImages.length > 1 && (
        <div className="absolute bottom-1 flex left-[4rem] transform translate-x-1/2 slider__dots">
          {Array.from({ length: showImages.length }).map((_, index) => (
            <div
              key={index}
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot bg-gray-800 transform scale-[1.2]" : "dot"}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
};

const BtnSlider = ({ moveSlide, direction }) => {
  return (
    <div className='slider__btns'>
      <button
        onClick={moveSlide}
        className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
        {direction === "next" ?
          <ChevronRightIcon className='w-[0.9rem] h-[0.9rem] dark:text-gray-200' /> :
          <ChevronLeftIcon className='w-[0.9rem] h-[0.9rem] dark:text-gray-200' />
        }
      </button>
    </div>
  );
};

export default CustomImageSlider