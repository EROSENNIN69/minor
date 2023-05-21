import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { publicRequest } from "../request";

const Chatbox = ({ propertyDetails, appointment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = async () => {
    const res = await publicRequest.post(
      `/property/${propertyDetails._id}/appointment`,
      {
        name: "appointment",
      },
      {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      }
    );
    window.location.reload();
  };
  let a = [];
  if (currentUser) {
    a = propertyDetails.Postedby.pendingAppointment.filter(
      (a) => a?.requestingId === currentUser._id
    );
  }
  return (
    <div className="h-96 pb-4">
      <div className="p-1.5 dark:text-gray-100">
        <div className="w-max mx-auto mb-4">
          <img
            src={propertyDetails.Postedby.images[0].url}
            alt="name"
            className="h-32 w-[6.5rem] rounded-md object-cover"
          />
        </div>
        <div>
          <span>Posted By: </span>
          <span className="capitalize text-lg font-medium pl-3">
            {propertyDetails.Postedby.username}
          </span>
        </div>
        <div>
          <span>Phone Number: </span>
          <span className="capitalize text-lg font-medium pl-3">
            {propertyDetails.Postedby.phoneNumber}
          </span>
        </div>
        <div>
          <span>Email: </span>
          <span className="capitalize text-lg font-medium pl-3">
            {propertyDetails.Postedby.email}
          </span>
        </div>
      </div>

      {appointment && (
        <div className="mt-4 px-2">
          <div>
            <span>Appointment date: </span>
            <span>{appointment.appointmentDate.substring(0, 10)}</span>
          </div>
          <div>
            <span>Location: </span>
            <span>{appointment.location}</span>
          </div>
          {appointment.appointmentTime && (
            <div>
              <span className="capitalize">Time: </span>
              <span>{appointment.appointmentTime}</span>
            </div>
          )}
        </div>
      )}
      {!currentUser && (
        <div className="mt-5 w-max mx-auto">
          <p>Request appointment</p>
          <Link to="/register">
            <p className="green--btn w-max">Please login first</p>
          </Link>
        </div>
      )}
      {!appointment && currentUser && (
        <div>
          {a.length > 0 ? (
            <div className="px-4 mt-4">
              <button
                disabled
                className="green--btn capitalize cursor-not-allowed"
              >
                Pending appointment
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="green--btn capitalize mt-4 ml-4"
            >
              request appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbox;
