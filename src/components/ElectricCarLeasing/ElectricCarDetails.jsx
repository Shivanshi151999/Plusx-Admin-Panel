import React, { useEffect, useState } from 'react';
import styles from './electriccar.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingImageSection from '../SharedComponent/Details/BookingDetails/BookingImageSection'
import { postRequestWithToken } from '../../api/Requests';
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const ElectricCarDetails = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const navigate = useNavigate()
  const { rentalId } = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  const [imageGallery, setImageGallery] = useState()
  const [baseUrl, setBaseUrl] = useState()


  const fetchDetails = () => {
    const obj = {
      userId     : userDetails?.user_id,
      email      : userDetails?.email,
      rental_id : rentalId
    };

    postRequestWithToken('electric-car-detail', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.car || {});
        setImageGallery(response.galleryData)
        setBaseUrl(response.base_url)
      } else {
        console.log('error in electric-car-detail API', response);
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
    bookingIdTitle      : "Rental ID",
    stationDetailsTitle : "Car Name",
  };
  const content = {
    bookingId   : bookingDetails?.rental_id,
    stationName : bookingDetails?.car_name,
  };

  const sectionTitles1 = {
    carType     : "Car Type",
    availableOn : "Available On",
    contract    : "Contract",
  }
  const sectionContent1 = {
    carType     : bookingDetails?.car_type,
    availableOn : bookingDetails?.available_on,
    contract    : bookingDetails?.contract,

  }

  const sectionTitles2 = {
    feature  : "Feature",
    price    : "Price",
    leaseUrl : "Lease URL"
  }
  const sectionContent2 = {
    feature  : bookingDetails?.feature,
    price    : bookingDetails?.price,
    leaseUrl : bookingDetails?.lease_url
  }

  const sectionTitles3 = {
   status: 'Status'
  }
  const sectionContent3 = {
    status: bookingDetails?.status === 1 ? 'Active' : "Inactive"
  }

  const sectionTitles4 = {
    description: "Description"
  }
  const sectionContent4 = {
    description: bookingDetails?.description,
  }

  const imageTitles = {
    coverImage    : "Cover Gallery",
    galleryImages : "Vehicle Gallery",
  }

  const imageContent = {
    coverImage: bookingDetails?.image,
    galleryImages: imageGallery,
    baseUrl: baseUrl,
  }

  return (
    <div className='main-container'>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='electricCarLeasing'
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
      </div>
    </div>
  )
}

export default ElectricCarDetails