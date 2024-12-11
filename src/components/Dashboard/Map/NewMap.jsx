import React, {useState} from "react";
import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin, } from "@vis.gl/react-google-maps";
import TruckIcon from "../../../assets/images/pod and truck icon filled/Truck Filled Icon – 1.png";
import PodRedIcon from "../../../assets/images/pod and truck icon filled/Pod Red Filled Icon – 2.png"
import PodGreenIcon from "../../../assets/images/pod and truck icon filled/Pod Green Filled Icon – 3.png"
import PodYellowIcon from "../../../assets/images/pod and truck icon filled/Pod Yellow Filled Icon – 1.png"
import Cancel from '../../../assets/images/Cancel.svg';
import style from './Map.module.css';

const center = { lat: 25.2048, lng: 55.2708 };
const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
function MapComponent({ coordinates, location, podLocation }) {  

  const mapId = "1";
  const defaultCenter                     = { lat: 25.2048, lng: 55.2708 };
  const mapCenter                         = coordinates?.lat && coordinates?.lng ? coordinates : center; 
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
            
            {location?.map((item) => {
              // If lat or lng are null, fallback to default center
              const markerPosition = item.location?.lat && item.location?.lng
                ? item.location
                : defaultCenter;

              return (
                <AdvancedMarker key={item.key} position={markerPosition}>
                  {/* <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} /> */}
                  <img
                    src={TruckIcon}
                    alt="App Sign Up Icon"
                    className={style.customIcon}
                    style={{ width: "50px", height: "50px" }}
                  />
                </AdvancedMarker>
              );
            })}

              {podLocation?.map((item) => {
              // If lat or lng are null, fallback to default center
              const markerPosition = item.location?.lat && item.location?.lng
                ? item.location
                : defaultCenter;

              const backgroundColor =
                item.status === 0 ? "#FFFF00" :
                item.status === 1 ? "#00FF00" :
                item.status === 2 ? "#FF0000" :
                "#808080"; 

                let podIcon;
                if (item.status === 0) {
                  podIcon = PodYellowIcon;  
                } else if (item.status === 1) {
                  podIcon = PodGreenIcon;  
                } else if (item.status === 2) {
                  podIcon = PodRedIcon;  
                } 

              return (
                <AdvancedMarker
                  key={item.podId}
                  position={markerPosition}
                  // onMouseEnter={() => setHoveredMarker(item)} 
                  // onMouseLeave={() => setHoveredMarker(null)}
                  onClick={() => setHoveredMarker(item)}
                  className={style.makerSection}
                >
                  {/* <Pin background={backgroundColor} glyphColor={"#000"} borderColor={"#000"} /> */}
                  <img
                    src={podIcon}
                    alt="Charger Installation Icon"
                    className={style.customIcon}
                    style={{ width: "50px", height: "50px" }}
                  />
                </AdvancedMarker>
              );
            })}

            {hoveredMarker && (
              <div
                className={style.hoverTooltip}
              >
                 <img
                  src={Cancel}
                  alt="Close"
                  className={style.closeIcon}
                  onClick={() => setHoveredMarker(null)}
                />
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