import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsBookingHistory from '../SharedComponent/Details/DeatilsBookingHistory'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';

  const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'WC': 'Work Completed',
    'C': 'Cancel'
  };

const RiderDetails = () => {
  const {riderId} = useParams()
  const [riderDetails, setRiderDetails] = useState()
  const [riderAddressList, setRiderAddressList] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  const [portableChargerBookings, setPortableChargerBookings] = useState([])
  const [pickAndDropBookings, setPickAndDropBookings] = useState([])

  const [chargerRsaList, setChargerRsaList] = useState([])
  const [valetRsaList, setValetRsaList] = useState([])

  const portableChargerHeaders = [
    'Date','Booking ID', 'Price',  'Status', 'Assigned Driver', 'Vehicle Type', 'Action' 
  ];

  const pickAndDropHeaders = [
    'Date','Booking ID',  'Price',  'Status', 'Assigned Driver','Vehicle Type',  'Action'
  ];

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        riderId : riderId
    };

    getRequestWithToken('rider-details', obj, (response) => {
        if (response.code === 200) {
          setRiderDetails(response?.data || {});  
          setRiderAddressList(response?.data?.riderAddress)
          setVehicleList(response?.data?.riderVehicles)
          setPortableChargerBookings(response?.data?.portableChargerBookings)
          setPickAndDropBookings(response?.data?.pickAndDropBookings)
        } else {
            console.log('error in rider-details API', response);
        }
    });
obj.service_type = 'Portable Charger'
    postRequestWithToken('rsa-list', obj, async(response) => {
      if (response.code === 200) {
        setChargerRsaList(response?.data)
          // setTotalPages(response?.total_page || 1); 
      } else {
          // toast(response.message, {type:'error'})
          console.log('error in rsa-listt api', response);
      }
  })

  obj.service_type = 'Valet Charging'
    postRequestWithToken('rsa-list', obj, async(response) => {
      if (response.code === 200) {
        setValetRsaList(response?.data)
          // setTotalPages(response?.total_page || 1); 
      } else {
          // toast(response.message, {type:'error'})
          console.log('error in rsa-listt api', response);
      }
  })
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
      <div className={styles.DetailsMainHeading}>Booking History</div>
      <DetailsBookingHistory
        title="Portable Charger"
        headers={portableChargerHeaders}
        bookingData={portableChargerBookings.map((booking) => ({
          id: booking.booking_id,
          service_name: booking.service_name,
          service_type: booking.service_type,
          price: `AED ${booking.service_price || 'AED 0'}`,
          datetime:  moment(booking.created_at).format('DD MMM YYYY h:mm A'),
          status: statusMapping[booking.order_status] || '',
        }))}
        bookingType="portableCharger"
        chargerRsaList = {chargerRsaList}
      />

       <DetailsBookingHistory
        title="Pick and Drop"
        headers={pickAndDropHeaders}
        bookingData={pickAndDropBookings.map((booking) => ({
          id: booking.request_id,
          price: `AED ${booking.price || 'AED 0'}`,
          datetime: moment(booking.created_at).format('DD MMM YYYY h:mm A') ,
          status: statusMapping[booking.status] || '',
        }))}
        bookingType="pickAndDrop"
        valetRsaList = {valetRsaList}
      />
    </div>
  )
}

export default RiderDetails