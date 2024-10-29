import React, { useEffect, useState } from 'react';
import styles from './publiccharger.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import { postRequestWithToken } from '../../api/Requests';
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

  const formatTime = (timeStr) => {
    if (timeStr === "Closed") return "Closed";
    const [start, end] = timeStr?.split('-');
    const format12Hour = (time) => {
        const [hour, minute] = time?.split(':');
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    const days = details?.open_days.split(', ');
    const timings = details?.open_timing.split(', ').map(formatTime);
    let formattedHours = [];

    for (let i = 0; i < days?.length; i++) {
        let startDay = days[i];
        let currentTiming = timings[i];
        let j = i;

        while (j < days?.length - 1 && timings[j + 1] === currentTiming) {
            j++;
        }

        const dayRange = startDay + (i === j ? "" : `-${days[j]}`);
        formattedHours.push(`${dayRange}: ${currentTiming}`);
        i = j;
    }

    return formattedHours.join("\n");
};
  
const StationDetails = () => {
  const {stationId} = useParams()
  const [bookingDetails, setBookingDetails] = useState()
  

  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        station_id : stationId
    };

    postRequestWithToken('public-charger-station-details', obj, (response) => {
        if (response.code === 200) {
            setBookingDetails(response?.data || {});  
        } else {
            console.log('error in public-charger-station-details API', response);
        }
    });
};

  useEffect(() => {
    fetchDetails();
  }, []);

  const headerTitles = {
    bookingIdTitle: "Service ID",
    stationDetailsTitle: "Station Details",
    feeDetailsTitle: "Fee Details Details",
  };

  const sectionTitles = {
    address: "Address",
    description: "Description",
    openingDetails: "Opening Details"
  }

  const content = {
    bookingId: bookingDetails?.station_id,
    createdAt: moment(bookingDetails?.created_at).format('DD MMM YYYY'),
    stationName: bookingDetails?.station_name,
    chargerType: bookingDetails?.charger_type ,
    chargingFor: bookingDetails?.charging_for,
    price: bookingDetails?.price,
    chargingPoint: bookingDetails?.charging_point,
    status: bookingDetails?.status === 1 ? "Active" : "Un-Active",
  };

  const sectionContent = {
    openingDetails: getFormattedOpeningHours(bookingDetails),
    address: bookingDetails?.address,
    description: bookingDetails?.description,
    
    slotDate: moment(bookingDetails?.slot_date_time).format('DD MMM YYYY h:mm A'),
  }

  return (
    <div className={styles.appSignupSection}>
      <BookingDetailsHeader 
       content={content} titles={headerTitles}
       type = 'publicChargingStation'
      />
      <BookingDetailsSection 
        titles = {sectionTitles} content = {sectionContent}
        type = 'publicChargingStation'
      />
    </div>
  )
}

export default StationDetails