import React, {useState} from "react";
import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin, } from "@vis.gl/react-google-maps";
import style from './Map.module.css';

const center = { lat: 25.2048, lng: 55.2708 };
const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
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
                item.status === 0 ? "#FFFF00" : // Green for status 0
                item.status === 1 ? "#00FF00" : // Yellow for status 1
                item.status === 2 ? "#FF0000" : // Red for status 2
                "#808080"; 


            return (
                <AdvancedMarker key={item.podId} 
                 position={item.location}
                 onMouseEnter={() => setHoveredMarker(item)} 
                  onMouseLeave={() => setHoveredMarker(null)}
                  className={style.makerSection}
                 >
                <Pin background={backgroundColor} glyphColor={"#000"} borderColor={"#000"} />
                </AdvancedMarker>
            );
            })}

            {hoveredMarker && (
              <div
                className={style.hoverTooltip}
              >
                <p>POD ID: {hoveredMarker.podId}</p>
                <p>Device ID: {hoveredMarker.deviceId}</p>
                <p>POD Name: {hoveredMarker.podName}</p>
                <p>Status: {
                  hoveredMarker.status === 0 ? 'Under Maintenance' :
                  hoveredMarker.status === 1 ? 'In Use' :
                  hoveredMarker.status === 2 ? 'In Service' :
                  'Unknown'
                }</p>
              </div>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

export default MapComponent;