import React from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "../store/userSlice";
import { setLikedProperties } from "../store/utilitiesSlice";

const ProfileSidebar = ({ user }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setLikedProperties());
  };

  return (
    <div className="h-[91vh] w-60 fixed left-0 top-15.5 mt-12 shadow-inner ring-[1px] ring-gray-300 bg-white dark:bg-neutral-800 dark:ring-gray-700 dark:text-gray-200">
      <div className="w-max mx-auto pt-5">
        <img
          src={user.images[0].url}
          className="rounded-full object-cover h-20 w-20"
        />
      </div>
      <div className="w-52 mx-auto px-2 truncate">
        <p>{user.email}</p>
      </div>
      <div className="mt-4">
        <Link to="/profile/profile">
          <div
            className={`sidebar__navs ${
              path === "profile" && "bg-blue-500 dark:bg-blue-600 text-gray-100"
            }`}
          >
            <p>Profile</p>
          </div>
        </Link>
        <Link to="/profile/appointment">
          <div
            className={`sidebar__navs ${
              path === "appointment" &&
              "bg-blue-500 dark:bg-blue-600 text-gray-100"
            }`}
          >
            <p>Appointment</p>
          </div>
        </Link>
        <Link to="/profile/likedProperty">
          <div
            className={`sidebar__navs ${
              path === "likedProperty" &&
              "bg-blue-500 dark:bg-blue-600 text-gray-100"
            }`}
          >
            <p>Wishlist</p>
          </div>
        </Link>
        <div
          onClick={() => handleLogout()}
          className={`sidebar__navs ${
            path === "logout" && "bg-red-500 dark:bg-red-600 text-gray-100"
          }`}
        >
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
