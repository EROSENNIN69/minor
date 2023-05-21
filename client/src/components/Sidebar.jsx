import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';

import { setSidebarVisible } from "../store/utilitiesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className=''>
      <button onClick={() => dispatch(setSidebarVisible())}
        className='h-7 w-7 mt-2 ml-3 rounded-full grid place-items-center hover:bg-gray-200'>
        <XIcon className='h-6 w-6 text-gray-700' />
      </button>
    </div>
  )
}

export default Sidebar;