import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Navbar, ProfileSidebar } from '../components';
import { publicRequest } from '../request';

const ProfileInfo = () => {
  const { currentUser } = useSelector(state => state.user);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function getUser() {
      const res = await publicRequest.get(`/user/${currentUser._id}`, {
        headers: {
          "token": `bearer ${currentUser.accesstoken}`
        }
      });
      if (res.status === 200) {
        setUser(res?.data);
      }
    };
    if (currentUser) {
      getUser();
    }
  }, []);
  console.log(user);
  return (
    <div>
      <Navbar />
      <div className="pt-7">
      <main className='flex items-center'>
        <ProfileSidebar user={currentUser} />
        {user !== undefined ? (
          <div className='w-[1120px] ml-64 min-h-[90vh] bg-white shadow-inner ring-[1px] ring-gray-300 dark:ring-gray-700 dark:bg-neutral-800 dark:text-gray-100 self-start'>
            <h4 className='w-max mx-auto text-2xl mt-3'>Welcome {currentUser.username}</h4>
            <div className="flex mt-8 items-start">
              <div className="basis-1/2 border-[2px] rounded-md mx-4 border-gray-300">
                <div className='w-max mx-auto my-4'>
                  <img className='h-36 object-contain' src={currentUser.images[0].url} alt={currentUser.username} />
                </div>
                <div className='profile__info--box'>
                  <span className='font-medium'>First Name: </span>
                  <span>{currentUser.firstName}</span>
                </div>
                <div className='profile__info--box'>
                  <span className='font-medium'>Last Name: </span>
                  <span>{currentUser.lastName}</span>
                </div>
                <div className='profile__info--box'>
                  <span className='font-medium'>Username: </span>
                  <span>{currentUser.username}</span>
                </div>
                <div className='profile__info--box'>
                  <span className='font-medium'>Email: </span>
                  <span>{currentUser.email}</span>
                </div>
                <div className='profile__info--box'>
                  <span className='font-medium'>Phone No: </span>
                  <span>{currentUser.phoneNumber}</span>
                </div>
              </div>
              <div className="basis-1/2 border-l-[1px] h-[78vh] overflow-x-hidden overflow-y-scroll mr-4 border-gray-300 listbox__sidebar flex flex-col space-y-3 px-3 pt-3">
                {user !== undefined && (
                  user?.propertyid.map(a => (
                    <div className='ring-[1px] flex items-center rounded ring-gray-300' key={a._id}>
                      <div className='h-28 w-40 flex-shrink-0 mr-6'>
                        <img src={a.images[0].url} alt="name" className='h-full w-full object-cover rounded-sm' />
                      </div>
                      <div>
                        <Link to={`/allProperties/${a._id}`}>
                          <div className='flex flex-col self-stretch space-y-2 w-[28rem]'>
                            <p className='text-sm -mb-4 text-gray-500 dark:text-gray-400 itlaic py-3'>{a.category === "apartment" ? "An" : "A"} {a.category} available at <span className='capitalize'>{a.propertyLocation}</span></p>
                            <p className='capitalize text-xl -mt-8'>{a.propertyHeading || a.propertyName}</p>
                            <hr className='w-16' />
                            <div className='flex space-x-2 items-center text-sm text-gray-600 dark:text-gray-400 italic'>
                              {a.category === "room" && (
                                <p>{a.rooms} rooms</p>
                              )}
                              {a.bedRoom && (
                                <p>{a.bedRoom} bedrooms . </p>
                              )}
                              {a.hall && (
                                <p>{a.hall} hall . </p>
                              )}
                              {a.kitchen && (
                                <p>{a.kitchen} kitchen . </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        ) : (
          <div></div>
        )}
      </main>
    </div>
    </div>
  )
}

export default ProfileInfo;