import React, { useEffect, useState } from 'react';
import styles from './chargerbooking.module.css'
import DetailsHeader from '../../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../../SharedComponent/Details/DetailsSection'
import DetailsList from '../../SharedComponent/Details/DetailsList'
import DetailsVehicleList from '../../SharedComponent/Details/DetailsVehicleList'
import { getRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';


const ChargerBookingDetails = () => {
  const {bookingId} = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        booking_id : "PCB0107"
        // booking_id : bookingId
    };

    getRequestWithToken('charger-booking-details', obj, (response) => {
        if (response.code === 200) {
            setBookingDetails(response?.data || {});  
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
      <DetailsHeader headerDetails = {bookingDetails}/>
      {/* <DetailsSection sectionDetails = {bookingDetails}/> */}
      {/* <DetailsList addressList = {riderAddressList}/>
      <DetailsVehicleList vehicleList = {vehicleList} /> */}
    </div>
  )
}

export default ChargerBookingDetails