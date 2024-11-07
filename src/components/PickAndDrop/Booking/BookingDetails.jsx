import React, { useEffect, useState } from 'react';
import styles from './bookinglist.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingLeftDetails from '../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import BookingDetailsAccordion from '../../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../../api/Requests';
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
  
const PickAndDropBookingDetails = () => {
    const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate                            = useNavigate()
    const {requestId}                         = useParams()
    const [bookingDetails, setBookingDetails] = useState()
    const [history, setHistory]               = useState([])
    const [imageUrl, setImageUrl]               = useState('')

    const fetchDetails = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            request_id : requestId
        };

        postRequestWithToken('pick-and-drop-booking-details', obj, (response) => {
            
            if (response.code === 200) {
                setBookingDetails(response?.data[0] || {});  
                setHistory(response?.history)
                setImageUrl(response.imageUrl)
            } else {
                console.log('error in rider-details API', response);
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
        bookingIdTitle       : "Booking ID",
        customerDetailsTitle : "Customer Details",
        driverDetailsTitle   : "Driver Details",
    };
    const sectionTitles = {
        bookingStatus : "Booking Status",
        price         : "Price",
        vehicle       : "Vehicle",
        parking       : "Parking Number",
        parkingFloor  : "Parking Floor",
        address       : "Address",
        slotDate      : "Slot Date & Time",
        vehicle_data  : "Vehicle",
    }
    let rsa_data = bookingDetails?.rsa_data.split(",") || []; 
    const content = {
        bookingId       : bookingDetails?.request_id,
        createdAt       : moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
        customerName    : bookingDetails?.name,
        customerContact : `${bookingDetails?.country_code} ${bookingDetails?.contact_no}`,
        driverName      : rsa_data ? rsa_data[0] : '',
        driverContact   : rsa_data ? rsa_data[1] : '',
        
    };
    const sectionContent = {
        bookingStatus : statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
        price         : bookingDetails?.price,
        vehicle       : bookingDetails?.vehicle_make,
        parking       : bookingDetails?.parking_number,
        parkingFloor  : bookingDetails?.parking_floor,
        address       : bookingDetails?.pickup_address,
        slotDate      : moment(bookingDetails?.slot_date_time).format('DD MMM YYYY h:mm A'),
        vehicle_data  : bookingDetails?.vehicle_data,
    }
    return (
        <div className={styles.appSignupSection}>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent = {sectionContent} type = 'pickAndDropBooking' />
            <div className={styles.pickBookingContainer}>
                <BookingLeftDetails titles = {sectionTitles} content = {sectionContent} type = 'pickAndDropBooking' />
                <BookingDetailsAccordion history = {history} rsa = {content} imageUrl ={imageUrl} />
            </div>
        </div>
    )
}
export default PickAndDropBookingDetails