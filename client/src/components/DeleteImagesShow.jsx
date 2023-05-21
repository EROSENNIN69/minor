import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setDeleteImages } from '../store/utilitiesSlice';

const Images = (props) => {
  const { images } = props;
  const dispatch = useDispatch();
  const [showChecked, setshowChecked] = useState(false);
  const handleClick = (filename) => {
    setshowChecked(!showChecked);
    dispatch(setDeleteImages(filename));
  };
  return (
    <div className='w-40 h-[10.5rem] mt-2'>
      <img src={images.url} alt={images.filename} className="h-32 w-full rounded-t object-cover" />
      <div className="w-full border-x border-b rounded-b">
        <div className='flex space-x-2 items-center w-max ml-auto pr-1 py-2'>
          <div onClick={() => handleClick(images.filename)} className='h-4 w-4 rounded-full border-2 cursor-pointer grid place-items-center border-gray-800 dark:border-gray-100 p-[1px]'>
            {showChecked && (<div className="h-full w-full bg-gray-700 dark:bg-gray-200 rounded-full" />)}
          </div>
          <button type='button' onClick={() => handleClick(images.filename)} className='red--btn text-sm py-0.5 px-2'>Delete ?</button>
        </div>
      </div>
    </div>
  )
}

const DeleteImagesShow = ({ property }) => {
  return (
    <div>
      <div><p>Delete Images: </p></div>
      <div className='flex items-center space-x-1 justify-start pt-2 flex-wrap'>
        {property.images.map(img => (
          <div key={img._id}>
            <Images images={img} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeleteImagesShow;