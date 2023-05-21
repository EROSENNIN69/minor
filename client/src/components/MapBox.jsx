import React, { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const MapBox = ({ onSavePinpoint }) => {
  const [popUp, setPopUp] = useState(false);
  const [viewPort, setViewPort] = useState({
    width: "1070px",
    height: "100%",
    latitude: 28.2595, // Update latitude with the desired value
    longitude: 83.9762, // Update longitude with the desired value
    zoom: 13.5,
  });

  const handleMapClick = (event) => {
    const clickedLatitude = event.lngLat[1];
    const clickedLongitude = event.lngLat[0];
    onSavePinpoint(clickedLatitude, clickedLongitude);
  };

  return (
    <ReactMapGl
      mapStyle="mapbox://styles/raktim/cl2r04hzm001s15l24c7ydntj"
      mapboxApiAccessToken="pk.eyJ1IjoicmFrdGltIiwiYSI6ImNrbzVob2tyaDByMmkydnF3OWZxNDExMHAifQ.k2_GVwKWCkJUIVw1olcrnA"
      {...viewPort}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
      onClick={handleMapClick}
    >
      <Marker
        longitude={viewPort.longitude}
        latitude={viewPort.latitude}
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
          latitude={viewPort.latitude}
          longitude={viewPort.longitude}
        >
          <p>Lamachaur, Pokhara</p>
        </Popup>
      )}
    </ReactMapGl>
  );
};

export default MapBox;
