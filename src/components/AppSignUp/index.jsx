import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
<<<<<<< Updated upstream
import { getRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';


const RiderDetails = () => {
  const {riderId} = useParams()
  const [riderDetails, setRiderDetails] = useState()
  const [riderAddressList, setRiderAddressList] = useState([])
  const [vehicleList, setVehicleList] = useState([])

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        // riderId : "ER0108"
        riderId : riderId
    };

    getRequestWithToken('rider-details', obj, (response) => {
        if (response.code === 200) {
          setRiderDetails(response?.data || {});  
          setRiderAddressList(response?.data?.riderAddress)
          setVehicleList(response?.data?.riderVehicles)
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
      <DetailsList addressList = {riderAddressList}/>
      <DetailsVehicleList vehicleList = {vehicleList} />
=======
import DeatilsBookingHistory from '../SharedComponent/Details/DeatilsBookingHistory'
const index = () => {
  return (
    <div className={styles.appSignupSection}>
      <DetailsHeader />
      <DetailsSection />
      <DetailsList />
      <DetailsVehicleList />
      <DeatilsBookingHistory/>
>>>>>>> Stashed changes
    </div>
  )
}

export default RiderDetails