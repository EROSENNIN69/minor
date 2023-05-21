import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Navbar, ProfileSidebar, SetAppointmentBox } from "../components";
import { publicRequest } from "../request";

function ActiveAppointment({ appointment }) {
  return (
    <div className="w-[29rem] p-4 rounded-md ring-[1px] ring-gray-400 dark:text-gray-100 mx-auto mt-4">
      <div className="flex items-center space-x-4">
        <img
          src={appointment.appointmentFor.images[0].url}
          alt="app"
          className="h-40 w-40 rounded"
        />
        <div>
          <p className="text-lg font-semibold">
            {appointment.appointmentFor.username}
          </p>
          <div className="flex flex-col mt-2">
            <div className="flex items-center">
              <p className="mr-2">Appointment date:</p>
              <p>{appointment?.appointmentDate.substring(0, 10)}</p>
            </div>
            <div className="flex items-center">
              <p className="mr-2">Appointment location:</p>
              <p>{appointment?.location}</p>
            </div>
            <div className="mt-3">
              <Link to={`/allProperties/${appointment?.property}`}>
                <p className="orange--btn text-sm py-1 px-2">Show Property</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileAppointment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [foundUser, setFoundUser] = useState(undefined);
  const [appointment, setAppointment] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      const res = await publicRequest.get(`/user/${currentUser._id}`, {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      });
      if (res?.status === 200) {
        setFoundUser(res.data);
      }
    };
    const getappointment = async () => {
      const res = await publicRequest.get(`/appointment/`, {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      });
      if (res?.status === 200) {
        setAppointment(res.data);
      }
    };
    getUser();
    getappointment();
  }, [currentUser.accesstoken]);
  return (
    <div>
      <Navbar />
      <main className="flex items-center">
        <ProfileSidebar user={currentUser} />
        {foundUser === undefined ? (
          <div></div>
        ) : (
          <div className="w-[1120px] pb-4 flex space-x-2 min-h-[91vh] ml-64 bg-white shadow-inner ring-[1px] ring-gray-300 dark:ring-gray-700 dark:bg-neutral-800">
            <div className="basis-1/2 border-r dark:border-r dark:border-gray-300">
              <h3
                className="text-2xl text-center mt-4 dark:text-gray-100 font-bold underline"
                style={{ fontFamily: "Times New Roman" }}
              >
                Active Appointments
              </h3>
              {(appointment === undefined || appointment.length === 0) && (
                <p className="w-100 mx-auto mt-3 h-48 grid place-items-center ring-[1px] ring-gray-300 rounded dark:text-gray-100">
                  Looks Like You Have No Appointments to Deal With.
                </p>
              )}
              {appointment !== undefined &&
                appointment.map((app, index) => (
                  <ActiveAppointment key={index} appointment={app} />
                ))}
            </div>
            <div className="basis-1/2">
              <h3
                className="text-2xl text-center mt-4 dark:text-gray-100 font-bold underline"
                style={{ fontFamily: "Times New Roman" }}
              >
                Manage Appointments
              </h3>
              {foundUser?.pendingAppointment.length === 0 && (
                <p className="w-100 mx-auto mt-3 h-48 grid place-items-center ring-[1px] ring-gray-300 rounded dark:text-gray-100">
                  Looks Like You Have No Appointments to Deal With
                </p>
              )}
              {foundUser?.pendingAppointment.map((app, index) => (
                <div key={index}>
                  <SetAppointmentBox appointment={app} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileAppointment;
