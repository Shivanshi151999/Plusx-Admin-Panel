import React, { useEffect, useState } from 'react';
import styles from './bookinglist.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';


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
    // serviceName: "Service Name",
    vehicle: "Vehicle",
    // serviceType: "Service Type",
    // serviceFeature: "Service Type",
    address: "Address",
    slotDate: "Slot Date",
    // slotTime: "Slot Time"
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
    bookingStatus: bookingDetails?.order_status,
    // serviceName: bookingDetails?.booking?.service_name,
    price: bookingDetails?.price,
    vehicle: bookingDetails?.vehicle_make,
    parking: bookingDetails?.parking_number,
    // serviceFeature: bookingDetails?.booking?.service_feature,
    address: bookingDetails?.pickup_address,
    slotDate: moment(bookingDetails?.slot_date_time).format('DD MMM YYYY h:mm A'),
    // slotTime: bookingDetails?.booking?.slot_time
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader 
    //   headerDetails = {bookingDetails}
    content={content} titles={headerTitles}
      />
      <BookingDetailsSection 
    //   details = {bookingDetails}
    titles = {sectionTitles} content = {sectionContent}
    type = 'pickAndDropBooking'
      />
    </div>
  )
}

export default PickAndDropBookingDetails