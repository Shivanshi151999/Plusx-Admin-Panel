import React, { useEffect, useState } from 'react';
import styles from './bookinglist.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import { postRequestWithToken } from '../../../api/Requests';
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
  
const PickAndDropBookingDetails = () => {
  const {requestId} = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        // booking_id : "PCB0107"
        request_id : requestId
    };

    postRequestWithToken('pick-and-drop-booking-details', obj, (response) => {
        if (response.code === 200) {
            setBookingDetails(response?.data[0] || {});  
        } else {
            console.log('error in rider-details API', response);
        }
    });
};

  useEffect(() => {
    fetchDetails();
  }, []);

  const headerTitles = {
    bookingIdTitle: "Booking ID",
    customerDetailsTitle: "Customer Details",
    driverDetailsTitle: "Driver Details",
  };

  const sectionTitles = {
    bookingStatus: "Booking Status",
    price: "Price",
    vehicle: "Vehicle",
    address: "Address",
    slotDate: "Slot Date",
  }

  const content = {
    bookingId: bookingDetails?.request_id,
    createdAt: moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
    customerName: bookingDetails?.name,
    customerContact: `${bookingDetails?.country_code} ${bookingDetails?.contact_no}`,
    driverName: bookingDetails?.driver?.rsa_name,
    driverContact: `${bookingDetails?.driver?.country_code} ${bookingDetails?.driver?.mobile}`,
  };

  const sectionContent = {
    bookingStatus: statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
    price: bookingDetails?.price,
    vehicle: bookingDetails?.vehicle_make,
    parking: bookingDetails?.parking_number,
    address: bookingDetails?.pickup_address,
    slotDate: moment(bookingDetails?.slot_date_time).format('DD MMM YYYY h:mm A'),
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader 
       content={content} titles={headerTitles}
       type = 'pickAndDropBooking'
      />
      <BookingDetailsSection 
        titles = {sectionTitles} content = {sectionContent}
        type = 'pickAndDropBooking'
      />
    </div>
  )
}

export default PickAndDropBookingDetails