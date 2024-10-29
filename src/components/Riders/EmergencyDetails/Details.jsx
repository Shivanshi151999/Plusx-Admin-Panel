import React, { useEffect, useState } from 'react';
import styles from './emergency.module.css'
import EmergencyCards from './EmergencyCards'
import EmergencyDetails from './EmergencyDetails'
import EmergencyList from './EmergencyList'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Details = () => {
    const {rsaId} = useParams()
    const [details, setDetails] = useState()
    
    const fetchDetails = () => {
      const obj = {
          userId: "1",
          email: "admin@shunyaekai.com",
          // booking_id : "PCB0107"
          rsa_id : rsaId
      };
  
      postRequestWithToken('rsa-data', obj, (response) => {
          if (response.code === 200) {
            setDetails(response?.rsaData || {});  
          } else {
              console.log('error in rider-details API', response);
          }
      });
  };
  
    useEffect(() => {
      fetchDetails();
    }, []);

  return (
    <div className={styles.emergencyContainer}>
      <EmergencyCards details = {details}/>
      {/* <EmergencyDetails/> */}
      <EmergencyList detail = {details}/>
    </div>
  )
}

export default Details