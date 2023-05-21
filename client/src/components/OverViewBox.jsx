import React from 'react';

const SmallInfoBox = ({ data, text }) => {
  return <div>
    <div className='flex items-center space-x-3 mb-2'>
      <p className='font-medium text-lg'>{text}: </p>
      <p className='text-xl'>{data}</p>
    </div>
  </div>
};

const OverViewBox = ({ propertyDetails }) => {
  return (
    <div className='ring-[1px] ring-gray-500 dark:ring-gray-200 rounded-sm px-7 py-4 pt-6 dark:text-gray-100'>
      <SmallInfoBox data={propertyDetails.rooms} text="Rooms" />
      {propertyDetails.category && (<SmallInfoBox data={propertyDetails.category} text="PropertyType" />)}
      {propertyDetails.propertyFacing && (
        <SmallInfoBox  data={propertyDetails.propertyFacing} text="Property Facing" />
      )}
      <div>
        <h2 className="text-2xl capitalize mt-6">more information:</h2>
        {propertyDetails.additionalFeatures.split(".").map((value, index) => (
          <div key={index}>
            <span className='font-medium inline-block mr-3'>{index+1}. </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverViewBox;