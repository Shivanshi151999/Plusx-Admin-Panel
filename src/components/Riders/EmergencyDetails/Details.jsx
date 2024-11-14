import React, { useEffect, useState } from 'react';
import styles from './emergency.module.css'
import EmergencyCards from './EmergencyCards'
import EmergencyDetails from './EmergencyDetails'
import EmergencyList from './EmergencyList'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const {rsaId} = useParams()
    const [details, setDetails] = useState()
    
    const fetchDetails = () => {
      const obj = {
          userId : userDetails?.user_id,
          email : userDetails?.email,
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
      <EmergencyList detail = {details}/>
    </div>
  )
}

export default Details