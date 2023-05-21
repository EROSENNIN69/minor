import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navbar, ImageSlider } from "../components";
import { publicRequest } from "../request";
import { setAllProperties } from "../store/propertiesSlice";

const RecentlyAddedProperties = () => {
  const { propertyDetails } = useSelector((state) => state.property);
  const newProperties = propertyDetails.slice(0, 10);

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
        <ImageSlider
          swiperData={newProperties}
          imagesView={4}
          // Modify the image click behavior
          onImageClick={(property) => {
            // Redirect to the property details page with the property ID
            window.location.href = `/property/${property.id}`;
          }}
        />
      </div>
    </section>
  );
};

export default RecentlyAddedProperties;
