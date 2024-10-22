import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
import { getRequestWithToken } from '../../api/Requests';


const RiderDetails = () => {
  const [riderDetails, setRiderDetails] = useState()


  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        "riderId" : "ER0001"
    };

    getRequestWithToken('rider-details', obj, (response) => {
        if (response.code === 200) {
          setRiderDetails(response?.data || {});  
        } else {
            console.log('error in rider-details API', response);
        }
    });
};

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className={styles.appSignupSection}>
      <DetailsHeader headerDetails = {riderDetails}/>
      <DetailsSection sectionDetails = {riderDetails}/>
      <DetailsList addressList/>
      <DetailsVehicleList />
    </div>
  )
}

export default RiderDetails