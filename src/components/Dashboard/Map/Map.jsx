import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import style from "./Map.module.css";

const center = {
  lat: 25.2048,
  lng: 55.2708,
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={style.map}>
      <div className={`${style.mapContainer}`}>
        <GoogleMap mapContainerClassName={style.mapResponsive} center={center} zoom={12}>
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapComponent;
