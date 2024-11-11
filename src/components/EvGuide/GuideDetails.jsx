import React, { useEffect, useState } from 'react';
import styles from './evguide.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingImageSection from '../SharedComponent/Details/BookingDetails/BookingImageSection'
import { postRequestWithToken } from '../../api/Requests';
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
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

  const days = details?.open_days.split('_').map((day) => {
    // Capitalize the first letter of each day
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  });

  const timings = details?.open_timing.split('_').map(formatTime);

  // Check if all the timings are the same
  const allSameTimings = timings.every(time => time === timings[0]);

  if (allSameTimings) {
    // If all days have the same timings, return a consolidated range for the whole week
    return `${days[0]}-${days[days.length - 1]}: ${timings[0]}`;
  }

  // Otherwise, show each day with its corresponding timings
  const formattedOpeningHours = [];
  let i = 0;
  while (i < days.length) {
    let startDay = days[i];
    let currentTiming = timings[i];
    let j = i;

    while (j < days.length - 1 && timings[j + 1] === currentTiming) {
      j++;
    }

    const dayRange = startDay + (i === j ? "" : `-${days[j]}`);
    formattedOpeningHours.push(`${dayRange}: ${currentTiming}`);
    i = j + 1;
  }

  return formattedOpeningHours.join(', ');
};


const GuideDetails = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const navigate = useNavigate()
  const { vehicleId } = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  const [imageGallery, setImageGallery] = useState()
  const [baseUrl, setBaseUrl] = useState()


  const fetchDetails = () => {
    const obj = {
      userId     : userDetails?.user_id,
      email      : userDetails?.email,
      vehicle_id : vehicleId
    };

    postRequestWithToken('ev-guide-details', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.data || {});
        setImageGallery(response.gallery_data)
        setBaseUrl(response.base_url)
      } else {
        console.log('error in ev-guide-details API', response);
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
    bookingIdTitle: "Vehicle ID",
    stationDetailsTitle: "Vehicle Name",
  };
  const content = {
    bookingId: bookingDetails?.vehicle_id,
    stationName: bookingDetails?.vehicle_name,
  };

  const sectionTitles1 = {
    vehicleType : "Vehicle Type",
    modelName   : "Model Name",
    engine      : "Engine",
  }
  const sectionContent1 = {
    vehicleType: bookingDetails?.vehicle_type,
    modelName: bookingDetails?.vehicle_model,
    engine: bookingDetails?.engine,

  }

  const sectionTitles2 = {
    horsePower: "Horse Power",
    maxSpeed: "Max Speed",
    status : "Status"
  }
  const sectionContent2 = {
    horsePower: bookingDetails?.horse_power,
    maxSpeed: bookingDetails?.max_speed,
    status: bookingDetails?.status === 1 ? 'Active' : "Inactive"
  }

  const sectionTitles3 = {
   bestFeature: 'Best Feature'
  }
  const sectionContent3 = {
    bestFeature: bookingDetails?.best_feature
  }

  const sectionTitles4 = {
    description: "Description"
  }
  const sectionContent4 = {
    description: bookingDetails?.description,
  }

  const imageTitles = {
    coverImage: "Cover Gallery",
    galleryImages: "Vehicle Gallery",
  }

  const imageContent = {
    coverImage: bookingDetails?.image,
    galleryImages: imageGallery,
    baseUrl: baseUrl,
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='evGuide'
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

export default GuideDetails