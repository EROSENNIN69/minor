import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HeartIcon } from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import {
  Navbar,
  DetailPageImages,
  MapBox,
  PropertyInfromation,
  OverViewBox,
  Chatbox,
  DeleteModal,
  ImageModal,
} from "../components";
import RecentlyAddedProperties from "./recentlyAddedProperty";
import { pageVariants } from "../data";
import { publicRequest } from "../request";
import { setExtraModal, setModal } from "../store/utilitiesSlice";
import Home from "./Home";

const PropertyDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [property, setProperty] = useState(undefined);
  const { extraModalVisible, modalVisible } = useSelector(
    (state) => state.utils
  );
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const { propertyDetails } = useSelector((state) => state.property);

  useEffect(() => {
    const getOneProperty = async () => {
      const res = await publicRequest.get(`/property/${id}`);
      if (res?.status === 200) {
        setProperty(res?.data);
      }
    };
    const getUser = async () => {
      const res = await publicRequest.get(`/user/${currentUser._id}`, {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      });
      if (res?.status === 200) {
        setUser(res?.data);
        setAppointment(
          res?.data.myAppointment.filter(
            (a) => a.appointmentFor === currentUser._id && a.property === id
          )
        );
      }
    };
    getOneProperty();
    if (currentUser) {
      getUser();
    }
  }, [id, currentUser]);
  console.log(appointment);
  if (property === undefined) return <div></div>;

  const recommendedProperties = propertyDetails.slice(0, 4);
  return (
    <motion.div transition={{ when: "beforeChildren" }}>
      <div>
        <Navbar />
        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className=" pt-5 max-w-[1100px] bg-white dark:bg-neutral-800 mx-auto ring-[0.5px] rounded-b-sm shadow ring-gray-300 dark:ring-gray-700"
        >
          <div className="pt-8 flex justify-between items-center p-3">
            <div>
              <h4 className="capitalize mb-2 px-8 text-3xl font-medium dark:text-gray-100">
                {property.propertyHeading}
              </h4>
              <div className="flex space-x-1 items-center border-b w-max border-gray-500 dark:border-gray-100 px-[0.15rem] ml-8">
                <LocationMarkerIcon className="h-5 w-5 dark:text-gray-500" />
                <p className="text-gray-400 dark:text-gray-300 text-sm tracking-tighter">
                  {property.propertyLocation}
                </p>
              </div>
            </div>
            {currentUser && currentUser?._id === property.Postedby._id && (
              <div className="flex items-center space-x-4 pr-14">
                <Link to={`/allProperties/${property._id}/edit`}>
                  <button className="orange--btn">Edit</button>
                </Link>
                <button
                  onClick={() => dispatch(setExtraModal())}
                  className="red--btn"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* show images */}
          <div className="mt-2 px-8 pt-2">
            <DetailPageImages image={property.images.slice(0, 5)} />
          </div>

          {/* info box  */}
          <div className="flex px-4 relative mt-8">
            {" "}
            {/* Add margin-top of 8 */}
            <div className="basis-[70%] mr-4 flex flex-col space-y-6">
              <PropertyInfromation propertyDetails={property} />
              <OverViewBox propertyDetails={property} />
            </div>
            {appointment.length > 0 ? (
              appointment.map((a) => (
                <div className="w-80 h-max ring-[1px] ring-gray-500 rounded-md">
                  <Chatbox propertyDetails={property} appointment={a} />
                </div>
              ))
            ) : (
              <div>
                {currentUser && currentUser?._id === property.Postedby._id ? (
                  <div></div>
                ) : (
                  <div className="w-80 h-max pb-3 ring-[1px] ring-gray-500 rounded-md">
                    <Chatbox propertyDetails={property} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* mapbox  */}
          <div className="w-[1100px] h-[400px] px-4 bg-white mx-auto mt-6">
            <MapBox
              latitude={property.latitude}
              longitude={property.longitude}
              popup={property.propertyLocation}
            />
          </div>

          {/* recommended extra properties  */}
          <div className="my-8 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Recommended Properties:
            </h2>
            <div className="mb-4 pb-2">
              {/* Iterate over the recommended properties */}
              {recommendedProperties.map((property) => (
                // Render each recommended property card here
                <div key={property.id} className="my-4">
                  {/* Add necessary JSX to display the recommended property */}
                </div>
              ))}
            </div>
          </div>
        </motion.main>
      </div>
      {extraModalVisible && (
        <DeleteModal
          id={property._id}
          name={property.propertyHeading}
          content="Are You Sure You Want To Delete This Property?"
        />
      )}
      {modalVisible && <ImageModal swiperData={property.images} />}
      <div className="mb-4 px-4">
        <RecentlyAddedProperties />
      </div>
    </motion.div>
  );
};

export default PropertyDetail;
