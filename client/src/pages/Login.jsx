import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Merokotha from "../public/images/merokotha_1m.png";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FormControl } from "../formComponent";
import { loginInitialValues } from "../data";
import { login, signUp } from "../store/apiCalls";
import { loginStart, loginSuccess, loginFailed } from "../store/userSlice";
import { publicRequest } from "../request";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  let validationSchema;
  if (isSignUp) {
    validationSchema = Yup.object({
      username: Yup.string().required("Username Required"),
      password: Yup.string().required("Password Required"),
      firstName: Yup.string().required("First Name Required"),
      phoneNumber: Yup.number().required("Phone Number Required"),
      lastName: Yup.string().required("Last Name Required"),
      email: Yup.string()
        .required("Email Required")
        .email("Invalid email format"),
    });
  } else {
    validationSchema = Yup.object({
      email: Yup.string().required("Required").email("Invalid email format"),
      password: Yup.string().required("Required"),
    });
  }

  const handleSubmit = async (values, onSubmitProps) => {
    if (isSignUp) {
      console.log(values);
      console.log("New user added and signed up into the app");
      const fd = new FormData();
      Object.entries(values).forEach((value) => {
        fd.append(value[0], value[1]);
      });
      fd.append("image", selectedImage);
      // signUp(dispatch, fd);
      dispatch(loginStart());
      const res = await publicRequest.post("/register", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 200) {
        dispatch(loginSuccess(res?.data));
        navigate(-1);
        setSelectedFile(null);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
      } else {
        dispatch(loginFailed());
      }
    } else {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      login(dispatch, credentials);
      navigate(-1);
      setSelectedFile(null);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }
  };

  const addImageToPost = (e, setFieldValue) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
    setFieldValue("profile", e.target.value);
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black dark:bg-opacity-80 dark:text-gray-200">
      <div className="w-full max-w-md px-10 py-4 bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <div className="flex flex-col  pr-60">
            <button
              onClick={() => navigate(-1)}
              className="text-white px-2 bg-orange-500 hover:bg-red-600 text-m rounded-md"
            >
              Go Back
            </button>
          </div>
          <img
            src={Merokotha}
            alt="merokotha"
            style={{ height: "120px", width: "120px" }}
          />
          <h1 className="text-xl font-bold mt-2">Signup/Login</h1>
        </div>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="">
              <FormControl
                e={errors.email}
                t={touched.email}
                control="input"
                type="email"
                name="email"
                label="Email"
                placeholder="Enter email"
                className="text-sm"
              />
              {isSignUp && (
                <>
                  <FormControl
                    e={errors.firstName}
                    t={touched.firstName}
                    control="input"
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    className="text-sm p-[4px]"
                  />
                  <FormControl
                    e={errors.lastName}
                    t={touched.lastName}
                    control="input"
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    className="text-sm p-[4px]"
                  />
                  <FormControl
                    e={errors.username}
                    t={touched.username}
                    control="input"
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Enter Username"
                    className="text-sm p-[4px]"
                  />
                  <FormControl
                    e={errors.phoneNumber}
                    t={touched.phoneNumber}
                    control="input"
                    type="number"
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    className="text-sm p-[4px]"
                  />
                  <FormControl
                    e={errors.profile}
                    t={touched.profile}
                    control="file"
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={(e) => addImageToPost(e, setFieldValue)}
                    label="Profile Image"
                    placeholder="Select file from device"
                    className="text-sm"
                    multiple
                  />
                  {selectedFile && (
                    <div className="flex flex-col space-y-[-30px]">
                      <img
                        src={selectedFile}
                        alt={values.username}
                        className="h-24 w-16 rounded-md object-cover cursor-pointer"
                        onClick={() => {
                          setSelectedFile(null);
                          setFieldValue("profile", "");
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              <div className="relative">
                <FormControl
                  e={errors.password}
                  t={touched.password}
                  control="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  className="text-sm mb-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 focus:outline-none mt-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-8">
                <p className="text-xs pt-4 pb-4 text-gray-700 dark:text-gray-500  ">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </p>
                <button
                  className="w-full py-1 px-1 text-white bg-green-500 hover:bg-green-600 rounded-md"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login" : "Signup"}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                {isSignUp ? "SignUp" : "LogIn"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
