import React, { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const MapBox = ({ latitude, longitude, popup }) => {
  const [popUp, setPopUp] = useState(false);
  const [viewPort, setviewPort] = useState({
    width: "1070px",
    height: "100%",
    latitude,
    longitude,
    zoom: 13.5,
  });
  return (
    <ReactMapGl
      mapStyle="mapbox://styles/raktim/cl2r04hzm001s15l24c7ydntj"
      mapboxApiAccessToken="pk.eyJ1IjoicmFrdGltIiwiYSI6ImNrbzVob2tyaDByMmkydnF3OWZxNDExMHAifQ.k2_GVwKWCkJUIVw1olcrnA"
      {...viewPort}
      onViewportChange={(nextViewPort) => setviewPort(nextViewPort)}
    >
      <Marker
        onClick={() => setPopUp(!popUp)}
        longitude={longitude}
        latitude={latitude}
        offsetTop={-10}
        offsetLeft={-20}
      >
        <p
          className="cursor-pointer text-2xl animate-bounce"
          aria-label="push-pin"
        >
          <LocationMarkerIcon className="h-7 w-7 text-blue-500" />
        </p>
      </Marker>
      {popUp && (
        <Popup
          onClose={() => setPopUp(!popUp)}
          closeOnClick={true}
          latitude={latitude}
          longitude={longitude}
        >
          <p>{popup}</p>
        </Popup>
      )}
    </ReactMapGl>
  );
};

export default MapBox;
