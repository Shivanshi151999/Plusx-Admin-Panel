import React, { useEffect, useState } from 'react';
import styles from './insurance.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingImageSection from '../SharedComponent/Details/BookingDetails/BookingImageSection'
import { postRequestWithToken } from '../../api/Requests';
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const InsuranceDetails = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const navigate = useNavigate()
  const { insuranceId } = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  const [imageGallery, setImageGallery] = useState()
  const [baseUrl, setBaseUrl] = useState()


  const fetchDetails = () => {
    const obj = {
      userId     : userDetails?.user_id,
      email      : userDetails?.email,
      insurance_id : insuranceId
    };

    postRequestWithToken('ev-insurance-detail', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.data || {});
        setImageGallery(response.galleryData)
        setBaseUrl(response.base_url)
      } else {
        console.log('error in ev-insurance-detail API', response);
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
    bookingIdTitle      : "Insurance ID",
    customerDetailsTitle: "Customer Details",
    driverDetailsTitle: "Vehicle Details",
  };
  const content = {
    bookingId   : bookingDetails?.insurance_id,
    createdAt: moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
    customerName: bookingDetails?.owner_name,
    customerContact: `${bookingDetails?.country_code} ${bookingDetails?.mobile_no}`,
    driverName: bookingDetails?.vehicle,
    driverContact:  '',
  };

  const sectionTitles1 = {
    email     : "Email",
    regPlace : "Registration Place",
    dob    : "Date Of Birth",
  }
  const sectionContent1 = {
    email     : bookingDetails?.email,
    regPlace : bookingDetails?.registration_place,
    dob    : bookingDetails?.date_of_birth,

  }

  const sectionTitles2 = {
    country  : "Country",
    insuranceExpiry    : "Insurance Expiry",
    insuranceType : "Type Of Insurance"
  }
  const sectionContent2 = {
    country  : bookingDetails?.country, 
    insuranceExpiry    : moment(bookingDetails?.insurance_expiry).format('DD MMM YYYY h:mm A'),
    insuranceType : bookingDetails?.type_of_insurance
  }

  const sectionTitles3 = {
   insuranceExpired: 'Insurance Expired'
  }
  const sectionContent3 = {
    insuranceExpired: bookingDetails?.insurance_expired
  }

  const sectionTitles4 = {
    description: "Description"
  }
  const sectionContent4 = {
    description: bookingDetails?.description,
  }

  const imageTitles = {
    coverImage    : "Vehicle Registration Images",
    galleryImages : "Car Images",
  }

  const imageContent = {
    coverImage: bookingDetails?.image,
    galleryImages: imageGallery,
    baseUrl: baseUrl,
  }

  const imageTitles1 = {
    coverImage    : "Vehicle Driving Licence",
    galleryImages : "Emirates Id",
  }

  const imageContent1 = {
    coverImage: bookingDetails?.image,
    galleryImages: imageGallery,
    baseUrl: baseUrl,
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='portableChargerBooking'
      />
      <div className={styles.ChargerDetailsSection}>
        <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
          sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
          sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
          sectionTitles4={sectionTitles4} sectionContent4={sectionContent4}
          type='evGuide' />

        <BookingImageSection
          titles={imageTitles} content={imageContent}
          type='evGuide'
        />

        <BookingImageSection
          titles={imageTitles1} content={imageContent1}
          type='evGuide'
        />
      </div>
    </div>
  )
}

export default InsuranceDetails