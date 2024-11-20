import React, { useEffect, useState } from 'react';
import styles from './emergency.module.css'
import EmergencyCards from './EmergencyCards'
import EmergencyDetails from './EmergencyDetails'
import EmergencyList from './EmergencyList'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MapComponent from "../../Dashboard/Map/Map";

const Details = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const {rsaId} = useParams()
    const [details, setDetails] = useState()
    const [history, setHistory] = useState([])
    const [coordinates, setCoordinates] = useState({ lat: 25.2048, lng: 55.2708 });
    
    const fetchDetails = () => {
      const obj = {
          userId : userDetails?.user_id,
          email : userDetails?.email,
          rsa_id : rsaId
      };
  
      postRequestWithToken('rsa-data', obj, (response) => {
          if (response.code === 200) {
            setDetails(response?.rsaData || {});  
            setHistory(response?.bookingHistory || {})

            const lat = parseFloat(response?.rsaData?.latitude)
            const lng = parseFloat(response?.rsaData?.longitude) 
            if (!isNaN(lat) && !isNaN(lng)) {
              setCoordinates({ lat, lng });
            }
          } else {
              console.log('error in rider-details API', response);
          }
      });
  };
  
    useEffect(() => {
      if (!userDetails || !userDetails.access_token) {
        navigate('/login'); 
        return; 
    }
      fetchDetails();
    }, []);

   

  return (
    <div className='main-container'>
      <EmergencyCards details = {details}/>
      {/* <EmergencyDetails/> */}
      <div className={`col-12`} style={{padding:'20px',}}>
              <MapComponent className={styles.mapContainer} coordinates={coordinates}/>
            </div>
      <EmergencyList history = {history}/>
    </div>
  )
}

export default Details