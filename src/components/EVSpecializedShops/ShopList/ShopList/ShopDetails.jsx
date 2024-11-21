import React, { useEffect, useState } from 'react';
import styles from './shop.module.css'
import BookingDetailsHeader from '../../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingImageSection from '../../../SharedComponent/Details/BookingDetails/BookingImageSection'
import { postRequestWithToken } from '../../../../api/Requests';
import BookingLeftDetails from '../../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import AddressList from '../../../SharedComponent/Details/AddressList.jsx'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const formatTime = (timeStr) => {
  if (timeStr === "Closed") return "Closed";
  const [start, end] = timeStr?.split('-');

  const format12Hour = (time) => {
    const [hour, minute] = time?.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    
    // Format the time to always show two digits for minute and ensure AM/PM
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(':', ':'); 
  };

  return `${format12Hour(start)} - ${format12Hour(end)}`;
};


const getFormattedOpeningHours = (details) => {
  if (details?.always_open === 1) {
    return "Always Open";
  }

  if (!details?.open_days || !details?.open_timing) {
    return "No opening hours available";
  }

  let days, timings;

  // Handle JSON array format or concatenated string format for open_days
  if (details.open_days.includes("_")) {
    // Parse concatenated string format
    days = details.open_days
      .split("_")
      .map(day =>
        day.charAt(0).toUpperCase() + day.slice(1)
      );
  } else {
    // Parse JSON array
    days = JSON.parse(details.open_days).map(day =>
      day.charAt(0).toUpperCase() + day.slice(1)
    );
  }

  // Split the open_timing string by underscores to get individual time ranges
  timings = details.open_timing.split("_").map(timeRange => {
    const [start, end] = timeRange.split("-");
    return `${formatToAmPm(start)} - ${formatToAmPm(end)}`;
  });

  // Check if all timings are the same
  const allSameTimings = timings.every(time => time === timings[0]);

  if (allSameTimings) {
    return `${days.join(', ')}: ${timings[0]}`;
  }

  // Group consecutive days with the same timings
  const formattedOpeningHours = [];
  let i = 0;
  while (i < days.length) {
    const startDay = days[i];
    const currentTiming = timings[i];
    let j = i;

    // Find consecutive days with the same timing
    while (j < days.length - 1 && timings[j + 1] === currentTiming) {
      j++;
    }

    const dayRange = startDay + (i === j ? "" : ` - ${days[j]}`);
    formattedOpeningHours.push(`${dayRange}: ${currentTiming}`);
    i = j + 1;
  }

  return formattedOpeningHours.join(', ');
};

const formatToAmPm = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

  
const ShopDetails = () => {
  const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
  const navigate                            = useNavigate()
  const { shopId }                          = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  const [address, setAddress]               = useState()
  const [imageGallery, setImageGallery]     = useState()
  const [baseUrl, setBaseUrl]               = useState()


  const fetchDetails = () => {
    const obj = {
      userId  : userDetails?.user_id,
      email   : userDetails?.email,
      shop_id : shopId
    };

    postRequestWithToken('shop-data', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.shop || {});
        setImageGallery(response?.shop?.shop_gallery)
        setBaseUrl(response.base_url)

        postRequestWithToken('shop-view', obj, (response) => {
          if (response.code === 200) {
            setBookingDetails(response?.store || {});
            setAddress(response?.address || [])
            setImageGallery(response?.galleryData)
            setBaseUrl(response.base_url)
          } else {
            console.log('error in public-charger-station-details API', response);
          }
        });
      } else {
        console.log('error in public-charger-station-details API', response);
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
    bookingIdTitle   : "Shop ID",
    shopDetailsTitle : "Shop Details",
  };
  const content = {
    bookingId : bookingDetails?.shop_id,
    createdAt : moment(bookingDetails?.created_at).format('DD MMM YYYY'),
    shopName  : bookingDetails?.shop_name,
    contact   : bookingDetails?.contact_no,
  };

  const sectionTitles1 = {
    openingDetails : "Opening Details",
    email  : "Email",
    brands   : "Brands",
    // address        : "Address",
    // location       : "Location",
  }
  const sectionContent1 = {
    openingDetails : getFormattedOpeningHours(bookingDetails),
    email  : bookingDetails?.store_email,
    brands   : bookingDetails?.brands,
    // address        : bookingDetails?.address,
    // location       : bookingDetails?.location,
  }

  const sectionTitles2 = {
    // latitude  : "Latitude",
    // longitude : "Longitude",
    services : "Services",
    status : "Status"
    // estYear   : "Established Year"
  }
  const sectionContent2 = {
    services : bookingDetails?.services,
    status : bookingDetails?.status === 1 ? 'Active' : 'Inactive'
    // estYear   : bookingDetails?.establishment_year
  }

  const sectionTitles3 = {
    // brands   : "Brands",
    // services : "Services",
    // estYear  : "Established Year"
  }
  const sectionContent3 = {
    // brands   : bookingDetails?.brands,
    // services : bookingDetails?.services,
  }

  const sectionTitles5 = {
    // email  : "Email",
    // area   : "Area",
    // status : "Status"
  }
  const sectionContent5 = {
    // email  : bookingDetails?.store_email,
    // area   : bookingDetails?.area_name,
    // status : bookingDetails?.status === 1 ? 'Active' : 'Inactive'
  }

  const sectionTitles4 = {
    description : "Description"
  }
  const sectionContent4 = {
    description : bookingDetails?.description,
  }

  const imageTitles = {
    coverImage    : "Cover Gallery",
    galleryImages : "Station Gallery",
  }
  const imageContent = {
    coverImage    : bookingDetails?.cover_image,
    galleryImages : imageGallery,
    baseUrl       : baseUrl,
  }

  return (
    <div className='main-container'>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='shop'
      />
      <div className={styles.ChargerDetailsSection}>
        
        <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
          sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
          sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
          sectionTitles4={sectionTitles4} sectionContent4={sectionContent4}
          sectionTitles5={sectionTitles5} sectionContent5={sectionContent5}
          type='portableChargerBooking'
        />

        <AddressList addressList={address}/> 
        <BookingImageSection
          titles={imageTitles} content={imageContent}
          type='publicChargingStation'
        />
      </div>
    </div>
  )
}

export default ShopDetails