import React from "react";
import {
  ArrowsExpandIcon,
  TruckIcon,
  TableIcon,
  InboxIcon,
} from "@heroicons/react/outline";

const PropertyRoomsInfo = ({ area, halls, rooms }) => {
  return (
    <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-y-5 gap-x-2 px-6">
      <div className="flex items-center space-x-3">
        <ArrowsExpandIcon className="h-7 w-7 text-gray-800 dark:text-gray-300" />
        <div className="flex flex-col">
          <p>Area</p>
          <p>
            {area} <span>Sq. feet</span>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <TruckIcon className="h-7 w-7 text-gray-800 dark:text-gray-300" />
        <div className="flex flex-col">
          <p>Parking</p>
          <p>Available</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <TableIcon className="h-7 w-7 text-gray-800 dark:text-gray-300" />
        <div className="flex flex-col">
          <p>Hall</p>
          <p>{halls}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <InboxIcon className="h-7 w-7 text-gray-800 dark:text-gray-300" />
        <div className="flex flex-col">
          <p>Rooms</p>
          <p>{rooms}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyRoomsInfo;
