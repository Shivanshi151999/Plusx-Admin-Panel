import React, { useEffect, useState } from 'react';
import styles from './chargerbooking.module.css'
import DetailsHeader from '../../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../../SharedComponent/Details/DetailsSection'
import DetailsList from '../../SharedComponent/Details/DetailsList'
import DetailsVehicleList from '../../SharedComponent/Details/DetailsVehicleList'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';


const ChargerBookingDetails = () => {
  const {bookingId} = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        // booking_id : "PCB0107"
        booking_id : bookingId
    };

    postRequestWithToken('charger-booking-details', obj, (response) => {
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

  const headerTitles = {
    bookingIdTitle: "Booking ID",
    customerDetailsTitle: "Customer Details",
    driverDetailsTitle: "Driver Details",
  };

  const sectionTitles = {
    bookingStatus: "Booking Status",
    price: "Price",
    serviceName: "Service Name",
    vehicle: "Vehicle",
    serviceType: "Service Type",
    serviceFeature: "Service Type",
    address: "Address",
    slotDate: "Slot Date",
    slotTime: "Slot Time"
  }

  const content = {
    bookingId: bookingDetails?.booking?.booking_id,
    createdAt: moment(bookingDetails?.booking?.created_at).format('DD MMM YYYY h:mm A'),
    customerName: bookingDetails?.rider?.rider_name,
    customerContact: `${bookingDetails?.rider?.country_code} ${bookingDetails?.rider?.rider_mobile}`,
    driverName: bookingDetails?.driver?.rsa_name,
    driverContact: `${bookingDetails?.driver?.country_code} ${bookingDetails?.driver?.mobile}`,
  };

  const sectionContent = {
    bookingStatus: bookingDetails?.booking?.status,
    serviceName: bookingDetails?.booking?.service_name,
    price: bookingDetails?.booking?.service_price,
    vehicle: bookingDetails?.vehicle?.vehicle_model,
    serviceType: bookingDetails?.booking?.service_type,
    serviceFeature: bookingDetails?.booking?.service_feature,
    address: bookingDetails?.booking?.address,
    slotDate: moment(bookingDetails?.booking?.slot_date).format('DD MMM YYYY h:mm A'),
    slotTime: bookingDetails?.booking?.slot_time
  }


  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader 
      // headerDetails = {bookingDetails}
      content={content} titles={headerTitles}
      type = 'portableChargerBooking'
      />
      <BookingDetailsSection 
      // details = {bookingDetails}
      titles = {sectionTitles} content = {sectionContent}
      type = 'portableChargerBooking'
      />
      {/* <DetailsSection sectionDetails = {bookingDetails}/> */}
      {/* <DetailsList addressList = {riderAddressList}/>
      <DetailsVehicleList vehicleList = {vehicleList} /> */}
    </div>
  )
}

export default ChargerBookingDetails