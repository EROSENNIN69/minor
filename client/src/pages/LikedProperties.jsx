import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsImageSLider, Navbar, ProfileSidebar } from '../components';

const LikedProperties = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { likedProperties } = useSelector(state => state.utils);

  return (
    <div>
      <Navbar />
      <main className='flex items-center'>
        <ProfileSidebar user={currentUser} />
        <div className='w-[1120px] min-h-[91vh] ml-64 bg-white shadow-inner ring-[1px] ring-gray-300 dark:ring-gray-700 dark:bg-neutral-800'>
          <div className='mt-5'></div>
          {likedProperties.map(prop => (
            <div className='w-[60vw] mb-2 flex items-center ring-[1px] mx-10 rounded-md dark:text-gray-100 ring-gray-300 pt-3 px-3' key={prop._id}>
              <DetailsImageSLider propertyDetail={prop} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default LikedProperties;