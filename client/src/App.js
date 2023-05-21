import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { motion } from 'framer-motion';

import { sidebarVariants } from './data';
import { Home, Details, Login, PropertyDetail, AddProperty, EditProperty, ProfilePage, ProfileInfo, ProfileAppointment, LikedProperties } from "./pages";
import { Sidebar } from "./components";

function App() {
  const { mode } = useSelector(state => state.theme);
  const { currentUser } = useSelector(state => state.user);
  const { sidebarVisible } = useSelector(state => state.utils);

  return (
    <div className={`${mode==="dark" ? "dark" : ""}`}>
      <div className="min-h-screen dark:bg-black dark:bg-opacity-95 bg-slate-100 font-Roboto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allProperties" element={<Details />} />
            <Route path="/allProperties/:id" element={ <PropertyDetail /> } />
            <Route path="/addProperty" element={ currentUser ? <AddProperty /> : <Navigate to="/" /> } />
            <Route path="/allProperties/:id/edit" element={ currentUser ? <EditProperty /> : <Navigate to="/" /> } />
            <Route path="/register" element={<Login />} />
            <Route path="/profile/profile" element={ currentUser ? <ProfileInfo /> : <Navigate to="/" /> } />
            <Route path="/profile/appointment" element={ currentUser ? <ProfileAppointment /> : <Navigate to="/" /> } />
            <Route path="/profile/likedProperty" element={ currentUser ? <LikedProperties /> : <Navigate to="/" /> } />
          </Routes>
        </BrowserRouter>
        {sidebarVisible && (
          <motion.div variants={sidebarVariants} initial="hidden" animate="visible"
          className="h-screen z-20 bg-white w-60 rounded-l-md shadow-inner ring-[1px] ring-gray-400 fixed right-0 top-0">
            <Sidebar />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
