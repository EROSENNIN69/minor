import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import { Navbar, ListBox, DetailsImageSLider } from "../components";
import { categoryOptions, roomOptions, priceOptions } from '../data';
import { Modal } from '../components';
import { pageVariants } from '../data';
import { setAllProperties } from '../store/propertiesSlice';
import { publicRequest } from '../request';

const Details = () => {
  const dispatch = useDispatch();
  const { propertyDetails } = useSelector(state => state.property);
  const { price, category, rooms } = useSelector(state => state.filter);
  const { modalVisible } = useSelector(state => state.utils);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || undefined;
  console.log(searchTerm);

  useEffect(() => {
    const getAllProperties = async () => {
      let url = `/property`;
      if(searchTerm) {
        url=`/property/?q=${searchTerm}`
      };
      const res = await publicRequest.get(url);
      if (res?.status === 200) {
        console.log(res?.data);
        dispatch(setAllProperties(res?.data));
      }
    };
    getAllProperties();
  }, [searchTerm]);

  // property filtering and sorting codes 
  const iteratees = obj => obj.price;
  let sortedProperty = [];
  let a = [];
  const sortByRooms = (x, rooms) => {
    a = _.filter(x, { rooms });
    sortedProperty = a;
  }
  function filterCategory (x,category) {
    a = _.filter(x, { category });
    sortedProperty = a;
  } 
  function filterPrice(x,price) {
    a = _.sortBy(x, iteratees);
    if (price === "asc") {
      sortedProperty = a;
    } else if (price === "desc") {
      sortedProperty = _.reverse(a);
    }
  }

  if (rooms && category && price) {
    sortByRooms(propertyDetails, rooms);
    filterCategory(a, category);
    filterPrice(a, price);
  } else if (rooms && category) {
    sortByRooms(propertyDetails, rooms);
    filterCategory(a, category);
  } else if (category && price) {
    filterCategory(propertyDetails, category);
    filterPrice(a, price);
  } else if (rooms && price) {
    sortByRooms(propertyDetails, rooms);
    filterPrice(a, price);
  }
  else if(rooms) {
    sortByRooms(propertyDetails, rooms);
  } else if(category) {
    filterCategory(propertyDetails, category)
  } else if (price) {
    filterPrice(propertyDetails, price)
  }
  if(propertyDetails.length === 0) return <div></div>;
  return (
    <motion.div  transition={{ when: "beforeChildren" }}>
      <Navbar />
      <motion.main variants={pageVariants} initial="hidden" animate="visible" className='flex space-x-4 dark:text-gray-50 items-center max-w-screen-xl mt-5 mx-auto lg:relative pr-3 lg:pr-0'>
        {/* filter box  */}
        <div className='fixed lg:top-20 right-14 w-1/4 dark:bg-neutral-900 bg-white self-start rounded-md shadow-md p-8'>
          <div className="flex flex-col space-y-4">
            <div>
              <h4 className='text-2xl font-medium capitalize'>Category</h4>
              <hr />
            </div>
            <div className='flex flex-col space-y-3'>
              <h4 className="lg:text-lg capitalize">Select by Rooms</h4>
              <ListBox options={roomOptions} type="room" />
            </div>
            <div className='flex flex-col space-y-3'>
              <h4 className="lg:text-lg capitalize">Select Category</h4>
              <ListBox options={categoryOptions} type="category" />
            </div>
            <div className='flex flex-col space-y-3'>
              <h4 className="lg:text-lg">Sort By Price</h4>
              <ListBox options={priceOptions} type="price" />
              <hr />
            </div>
          </div>
        </div>

        {/* properties box  */}
        <div className='w-full lg:w-[70%] ml-0 bg-white dark:bg-neutral-800 rounded-md shadow-md px-8 py-4 self-start'>
          {(rooms || category || price) ?
            sortedProperty.map((a) => (
              <div key={a._id}>
                <DetailsImageSLider propertyDetail={a} />
              </div>
            )) : (
              propertyDetails.map((a) => (
                <div key={a._id}>
                  <DetailsImageSLider propertyDetail={a} />
                </div>
              ))
            )
          }
        </div>
      </motion.main>
      {modalVisible && (
        <div className='fixed top-0 left-0 z-20'>
          <Modal />
        </div>
      )}
    </motion.div>
  )
};

export default Details;