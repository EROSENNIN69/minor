import React from 'react';
import { InboxIcon } from '@heroicons/react/outline';

import { PropertyRoomsInfo } from "./";

const PropertyInformaion = (props) => {
  const { propertyDetails } = props;
  return (
    <div className="w-full ring-[1px] ring-gray-500 dark:ring-gray-300 py-2 rounded-sm flex">
      <div className='basis-[30%] border-r px-4 dark:text-gray-200 border-gray-500 flex flex-col space-y-3'>
        <p className='capitalize text-xl font-light'>price</p>
        <p>
          <span className='pr-3'>Rs</span>
          <span className='text-lg font-medium'>{propertyDetails.price}</span>
        </p>
        <div className='bg-red-500 dark:bg-red-600 dark:shadow-gray-800 w-max px-4 py-1 shadow-lg rounded text-white capitalize'>
          negotiable
        </div>
      </div>

      {/* basic info box  */}
      <div className='basis-[70%] text-lg font-medium dark:text-gray-200'>
        {(propertyDetails.category === "house" || propertyDetails.category === "apartment") ? (
          <PropertyRoomsInfo
            area={propertyDetails.propertyArea}
            halls={propertyDetails.hall}
            rooms={propertyDetails.rooms}
          />
        ) : (
          <div className='h-full w-full grid place-items-center'>
            <div className='flex items-center space-x-3'>
              <InboxIcon className='h-7 w-7 text-gray-800 dark:text-gray-300' />
              <div className='flex flex-col'>
                <p>Rooms</p>
                <p>{propertyDetails.rooms}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* additional info box  */}

    </div>
  )
}

export default PropertyInformaion;
