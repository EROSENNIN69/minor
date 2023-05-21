import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { FormControl } from "../formComponent";
import { publicRequest } from "../request";

const SetAppointmentBox = ({ appointment }) => {
  const { propertyId, requestingId } = appointment;
  const { currentUser } = useSelector((state) => state.user);
  const initialValues = {
    location: "",
    date: "",
    time: "",
  };
  const validationSchema = Yup.object({
    location: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    time: Yup.string().required("Required"),
  });
  const handleSubmit = async (values, onSubmitProps) => {
    let newDate = new Date(values.date).toISOString();
    console.log(values);
    const res = await publicRequest.post(
      `/property/${propertyId._id}/appointment/${appointment._id}`,
      {
        location: values.location,
        date: newDate,
        time: values.time,
      },
      {
        headers: {
          token: `bearer ${currentUser.accesstoken}`,
        },
      }
    );
    if (res?.status === 200) {
      onSubmitProps.resetForm();
      window.location.reload();
    }
  };

  const [boxVisible, setBoxVisible] = useState(true);

  const handleCancelAppointment = () => {
    setBoxVisible(false);
  };

  if (!boxVisible || appointment === undefined) return null;

  return (
    <div className="w-96 rounded-md ring-1 ring-gray-400 dark:text-gray-100 mx-auto mt-4 p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to={`/allproperties/${propertyId._id}`}>
          <div className="flex-1">
            <img
              src={propertyId.images[0].url}
              alt="name"
              className="h-32 w-52 rounded-sm"
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-lg font-semibold">{propertyId.propertyName}</p>
            <p className="text-sm text-gray-500">
              Located at {propertyId.propertyLocation}
            </p>
          </div>
        </Link>
        <div className="flex flex-col items-end ml-4">
          <div className="w-20 h-20 mb-4">
            <img
              src={requestingId.images[0].url}
              alt="name"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <p className="text-sm text-right text-gray-500">Requested By:</p>
          <p className="text-right">{requestingId.username}</p>
          <p className="text-sm text-right font-medium">
            Email: {requestingId.email}
          </p>
        </div>
      </div>

      {/* form  */}
      <div className="mt-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <FormControl
                  e={errors.location}
                  t={touched.location}
                  control="input"
                  type="text"
                  name="location"
                  label="Location"
                  placeholder="Enter location"
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FormControl
                  e={errors.date}
                  t={touched.date}
                  control="input"
                  type="date"
                  name="date"
                  label="Date"
                  placeholder="Select date"
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FormControl
                  e={errors.time}
                  t={touched.time}
                  control="input"
                  type="time"
                  name="time"
                  label="Time"
                  placeholder="Select time"
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-2 py-2 bg-red-500 text-white rounded mr-8"
                  onClick={handleCancelAppointment}
                >
                  Cancel Appointment
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Set Appointment
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetAppointmentBox;
