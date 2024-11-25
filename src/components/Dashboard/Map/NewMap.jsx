import React, {useState} from "react";
import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin, } from "@vis.gl/react-google-maps";
import style from './Map.module.css';

const center = { lat: 25.2048, lng: 55.2708 };
const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const location = [
//   { key: "1", location: {lat: 25.20707635425504, lng: 55.27097166137693 } },
//   { key: "2", location: {lat: 25.20906873599594, lng: 55.26959837036131 } },
//   { key: "3", location: {lat: 25.211320136647174, lng: 55.26811779098509 } },
//   { key: "4", location: {lat: 25.21049975436963, lng: 55.27375042991636 } },
// ];

function MapComponent({ coordinates, location, podLocation }) {  

  const mapId = "1";
  const mapCenter = coordinates?.lat && coordinates?.lng ? coordinates : center; 
  const [hoveredMarker, setHoveredMarker] = useState(null);

  return (
    <div className={style.map}>
      <div className={`${style.mapContainer}`}>
        <APIProvider apiKey={googleMapApiKey}>
          <Map
            defaultZoom={12}
            defaultCenter={center}
            mapId={mapId}
            // onCameraChanged={handleCameraChanged}
            className={style.mapResponsive}
          >
            {!location?.length && <AdvancedMarker position={mapCenter} />}
            {/* <AdvancedMarker position={mapCenter} /> */}
            {location?.map((item) => (
              <AdvancedMarker key={item.key} position={item.location}>
                <Pin background={"#FBBC04"} glyphColor={"#000"}borderColor={"#000"} />
              </AdvancedMarker>
            ))}

            {podLocation?.map((item) => {
            
            const backgroundColor =
                item.status === 1 ? "#00FF00" : // Green for status 1
                item.status === 2 ? "#FFFF00" : // Yellow for status 2
                item.status === 3 ? "#FF0000" : // Red for status 3
                "#808080"; 

            return (
                <AdvancedMarker key={item.podId} 
                 position={item.location}
                 onMouseEnter={() => setHoveredMarker(item)} 
                  onMouseLeave={() => setHoveredMarker(null)}
                 >
                <Pin background={backgroundColor} glyphColor={"#000"} borderColor={"#000"} />
                </AdvancedMarker>
            );
            })}

            {hoveredMarker && (
              <div
                className={style.tooltip}
                style={{
                  position: "absolute",
                  top: `${hoveredMarker.location.lat}px`,
                  left: `${hoveredMarker.location.lng}px`,
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                <p>POD ID: {hoveredMarker.podId}</p>
                <p>Device ID: {hoveredMarker.deviceId}</p>
                <p>POD Name: {hoveredMarker.podName}</p>
                <p>Status: {hoveredMarker.status}</p>
              </div>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

export default MapComponent;