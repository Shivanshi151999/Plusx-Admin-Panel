import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsBookingHistory from '../SharedComponent/Details/DeatilsBookingHistory'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
import { getRequestWithToken } from '../../api/Requests';
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

  const portableChargerHeaders = [
    'Date','ID', 'Service Name', 'Price', , 'Status', 'Driver Assign', 'Action' 
  ];

  const pickAndDropHeaders = [
    'Date','ID',  'Price',  'Status', 'Action'
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
      />
    </div>
  )
}

export default RiderDetails