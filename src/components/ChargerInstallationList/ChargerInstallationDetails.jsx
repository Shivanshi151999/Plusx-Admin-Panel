import React, { useEffect, useState } from 'react';
import styles from './chargerinstallation.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import BookingDetailsAccordion from '../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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

const ChargerInstallationDetails = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [bookingDetails, setBookingDetails] = useState()
  const [history, setHistory] = useState([])
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

  const fetchDetails = () => {
    const obj = {
      userId: userDetails?.user_id,
      email: userDetails?.email,
      request_id: requestId
    };

    postRequestWithToken('charger-installation-details', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.service_data || {});
        setHistory(response?.order_history)
      } else {
        console.log('error in charger-installation-details API', response);
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

  const headerTitles = {
    bookingIdTitle: "Service ID",
    customerDetailsTitle: "Customer Details",
    // driverDetailsTitle: "Driver Details",
  };

  const sectionTitles = {
    address: "Address",
    description: "Description",
    status: "Satus",
    companyName: "Company Name",
    chargerFor: "Charger For",
    serviceType: "Service Type",
    noOfCharger: "No of Charger",
    coverImage: "Cover Gallery",
    galleryImages: "Station Gallery",
    baseUrl: "Base Url"
    // address: "Address",
    // slotDate: "Slot Date",
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
    address: bookingDetails?.address,
    description: bookingDetails?.description,
    bookingStatus: statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
    companyName: bookingDetails?.company_name,
    chargerFor: bookingDetails?.charger_for,
    serviceType: bookingDetails?.service_type,
    residentType: bookingDetails?.resident_type,
    noOfCharger: bookingDetails?.no_of_charger,
    coverImage: bookingDetails?.station_image,
    galleryImages: bookingDetails?.gallery_data,
    baseUrl: bookingDetails?.base_url,
    slotDate: moment(bookingDetails?.slot_date_time).format('DD MMM YYYY h:mm A'),
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='chargerInstallation'
      />
      {/* <BookingDetailsSection 
        titles = {sectionTitles} content = {sectionContent}
        type = 'chargerInstallation'
      /> */}
      <div className={styles.bookingLeftContainer}>
        <BookingLeftDetails
          titles={sectionTitles} content={sectionContent}
          type='chargerInstallation'
        />
        <BookingDetailsAccordion history={history} />
        </div>
      </div>
      )
}

      export default ChargerInstallationDetails
