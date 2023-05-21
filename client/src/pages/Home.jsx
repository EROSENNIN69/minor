import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navbar, ImageSlider } from "../components";
import { publicRequest } from "../request";
import { setAllProperties } from "../store/propertiesSlice";

const Home = () => {
  const { propertyDetails } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProperties = async () => {
      const res = await publicRequest.get("/property");
      if (res?.status === 200) {
        dispatch(setAllProperties(res?.data));
      }
    };
    getAllProperties();
  }, [dispatch]);

  const newProperties = propertyDetails.slice(0, 10);
  const houses = propertyDetails
    .filter((property) => property.category === "house")
    .slice(0, 10);
  const rooms = propertyDetails
    .filter((property) => property.category === "room")
    .slice(0, 10);
  const apartments = propertyDetails
    .filter((property) => property.category === "apartment")
    .slice(0, 10);
  const shutters = propertyDetails
    .filter((property) => property.category === "shutter")
    .slice(0, 10);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-6 px-4">
        <section className="mb-12 text-center">
          <h1 className="text-6xl font-serif text-gray-800 mt-20 ">
            Welcome to MeroKotha
          </h1>
        </section>
        {propertyDetails.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-semibold  text-gray-800 mb-1 mt-6"
              style={{ fontFamily: "Times New Roman" }}
            >
              Recently Added Properties:
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <ImageSlider swiperData={newProperties} imagesView={4} />
            </div>
          </section>
        )}
        {houses.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-semibold   text-gray-800 mb-1"
              style={{ fontFamily: "Times New Roman" }}
            >
              Available Houses for Rent or Sale:
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <ImageSlider swiperData={houses} imagesView={4} />
            </div>
          </section>
        )}
        {rooms.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-semibold  text-gray-800 mb-1"
              style={{ fontFamily: "Times New Roman" }}
            >
              Available Rooms for Rent or Sale:
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <ImageSlider swiperData={rooms} imagesView={4} />
            </div>
          </section>
        )}
        {apartments.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-semibold  text-gray-800 mb-1"
              style={{ fontFamily: "Times New Roman" }}
            >
              Available Apartments for Rent or Sale:
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <ImageSlider swiperData={apartments} imagesView={4} />
            </div>
          </section>
        )}
        {shutters.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-semibold  text-gray-800 mb-1"
              style={{ fontFamily: "Times New Roman" }}
            >
              Available Shutters for Rent or Sale:
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <ImageSlider swiperData={shutters} imagesView={4} />
            </div>
          </section>
        )}
        {propertyDetails.length === 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              No Properties Available
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <p className="text-gray-600">
                Sorry, currently there are no properties for sale or rent.
              </p>
            </div>
          </section>
        )}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            About Us
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
            <p className="text-gray-600">
              Nepal is a developing country and the opportunities served on the
              plate of one citizen from one part of the country and another
              citizen from another part of the country can be at a difference of
              day and night. It's the sad reality of the country that a citizen
              from a rather rural area must go to a different place just so s/he
              can pursue a quality level of basic things including health,
              education, jobs, or even business. Even families are forced to
              move out of their villages to the popular cities so their children
              can pursue a quality education they didn't get to pursue while
              growing up, hence they move out for the sake of their children's
              future. Besides this, many people are forced to move out to the
              city areas in search of good jobs to survive and save some if
              possible. In addition to this, many companies are in constant need
              of flats for rental purposes either as a startup or a branch of
              that successful company.
              <br></br>
              <br></br>
              Merokotha.com is a web-based application that connects landlords
              and tenants in a commonplace. This web application provides a
              platform for people or an organization that search for a
              provisional solution for their offices or place of accommodation.
              A well-designed user-friendly interface can help both landlords
              and tenants by setting up their terms and conditions beforehand
              and making the tedious agreement process to be as fluent as
              possible. This application aims to solve the existing problem of
              finding a rental space or renting a vacant space.
              <br></br>
              <br></br>
              <p className=" font-bold">Contact:</p>+977-9807441628 <br></br>
              <p className=" font-bold">E-mail:</p> MeroKotha1122@gmail.com
              <br></br>
              <p className=" font-bold">We are Located at:</p>
            </p>
            <div className="embed-responsive aspect-w-69 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.7027032546039!2d83.97944538755519!3d28.255075784305486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995947e93943543%3A0x400cf272840e539b!2sanesha%20hotel!5e0!3m2!1sen!2snp!4v1684560069656!5m2!1sen!2snp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
