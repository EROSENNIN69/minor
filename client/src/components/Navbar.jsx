import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/themeSlice";
import Merokotha from "../public/images/merokotha_1m.png";
import { useNavigate, createSearchParams } from "react-router-dom";
import { publicRequest } from "../request";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const handleSunClick = () => {
    localStorage.setItem("rental-theme", "light");
    dispatch(setTheme("light"));
  };

  const handleMoonClick = () => {
    localStorage.setItem("rental-theme", "dark");
    dispatch(setTheme("dark"));
  };

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getUser() {
      const res = await publicRequest.get(`/user/${currentUser._id}`, {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      });

      if (res.status === 200) {
        setUser(res?.data);
      }
    }

    if (currentUser) {
      getUser();
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/allProperties",
      search: `?${createSearchParams({
        q: search,
      })}`,
    });
    setSearch("");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-[-4] bg-white shadow-lg dark:bg-gray-800 dark:text-white">
      {/* Left section */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={Merokotha}
          alt="merokotha"
          style={{ height: "70px", width: "70px" }}
        />
        <p className="text-base font-semibold text-2xl ">MeroKotha</p>
        <p className="font-serif text-gray-600 text-sm">
          - A Rental Place for All Your Needs.
        </p>
      </Link>

      {/* Center section */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-gray-200 rounded-md"
      >
        <SearchIcon className="h-5 w-5 text-gray-500 ml-2" />
        <input
          type="text"
          onChange={handleSearchChange}
          value={search}
          placeholder="Search..."
          className="w-64 bg-transparent focus:outline-none text-gray-600 placeholder-gray-500 py-2 focus:ring-0 border-b-2 border-gray-200 rounded-md"
        />
      </form>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        <Link
          to="/addProperty"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          Add Property
        </Link>
        <Link
          to="/allProperties"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          All Properties
        </Link>

        {currentUser && (
          <Link to="/profile/appointment" className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center">
              {user !== undefined ? (
                <p className="text-xs text-white">
                  {user?.pendingAppointment?.length}
                </p>
              ) : (
                <p className="text-xs text-white">0</p>
              )}
            </div>
          </Link>
        )}

        <div className="flex items-center space-x-2">
          {mode === "dark" ? (
            <SunIcon
              onClick={handleSunClick}
              className="h-6 w-6 text-yellow-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            />
          ) : (
            <MoonIcon
              onClick={handleMoonClick}
              className="h-6 w-6 text-gray-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            />
          )}
        </div>

        {currentUser ? (
          <Link to="/profile/profile" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-9 h-9 border-2 border-gray-300 rounded-full">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={currentUser.images[0].url}
                alt={currentUser.username}
              />
            </div>
            <p className="capitalize">{currentUser.username}</p>
          </Link>
        ) : (
          <Link to="/register">
            <button className="text-lg font-medium text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
