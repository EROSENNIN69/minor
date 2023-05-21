import React from 'react';
import { PhotographIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';

import { setModal } from '../store/utilitiesSlice';

const DetailPageImages = ({ image, imageTitle }) => {
  const dispatch = useDispatch();
  return (
    <div className='grid grid-rows-4 grid-cols-4 gap-2 h-[21.5rem]'>
      {image.map((img, index) => (
        <div key={img._id} className={`${index === 0 ? "row-span-4 col-span-2" : "row-span-2 col-span-1"} relative`}>
          <img loading="lazy" src={img.url} alt={img._id}
            className={`object-cover h-full w-full ${index === 0 && "rounded-l-xl"} ${index === 2 && "rounded-tr-xl"} ${index === 4 && "rounded-br-xl"}`}
          />
          <div className={`hover-details-image rounded-br-xl ${index === 0 && "rounded-l-xl"} ${index === 2 && "rounded-tr-xl"} ${index === 4 && "rounded-br-xl"}`} />
          {index === 4 && (
            <>
              <button className='absolute right-4 bottom-3 images-more-btn'>
                <div onClick={() => dispatch(setModal())} className="flex space-x-2 items-center">
                  <PhotographIcon className='h-5 w-5' />
                  <p className='text-sm'>Show all Photos</p>
                </div>
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default DetailPageImages;