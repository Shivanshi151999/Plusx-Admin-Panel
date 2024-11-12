import React, { useEffect, useState } from 'react';
import styles from './roadassistance.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection'
import BookingLeftDetails from '../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import BookingDetailsAccordion from '../../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'ER': 'Enroute',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'VP': 'Vehicle Pickup',
    'RS': 'Reached Charging Spot',
    'WC': 'Work Completed',
    'DO': 'Drop Off',
    'C': 'Cancel',
};

const RoadAssistanceBookingDetails = () => {
    const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                            = useNavigate()
    const { requestId }                       = useParams()
    const [bookingDetails, setBookingDetails] = useState()
    const [history, setHistory]               = useState([])

    const fetchDetails = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            request_id : requestId
        };
        postRequestWithToken('ev-road-assistance-booking-details', obj, (response) => {
            // console.log(response?.data?.bookingHistory)
            if (response.code === 200) {
                setBookingDetails(response?.result?.booking || {});
                setHistory(response?.data?.history)
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
        bookingIdTitle: "Request ID",
        customerDetailsTitle: "Customer Details",
    };
    const content = {
        bookingId: bookingDetails?.request_id,
        createdAt: moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
        customerName: bookingDetails?.name,
        customerContact: `${bookingDetails?.country_code} ${bookingDetails?.contact_no}`,
        imageUrl: bookingDetails?.imageUrl,
    };
    const sectionTitles1 = {
        bookingStatus: "Booking Status",
        price: "Price",
        typeOfIssue: "Type of Issue",
    }
    const sectionContent1 = {
        bookingStatus: statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
        typeOfIssue: bookingDetails?.types_of_issue,
        price: bookingDetails?.price,
    }
    
    const sectionTitles2 = {
        pickupAddress: "Pick Up Address",
        dropAddress: "Drop Address",
    }
    const sectionContent2 = {
        pickupAddress: bookingDetails?.pickup_address,
        dropAddress: bookingDetails?.drop_address,
    }
   // const sectionTitles3 = {
    //     vehicle: "Vehicle",
    //     serviceType: "Service Type",
    //     serviceFeature: "Service Feature",
    // }
   
    // const sectionContent3 = {
    //     vehicle: bookingDetails?.vehicle_data,
    //     serviceType: bookingDetails?.service_type,
    //     serviceFeature: bookingDetails?.service_feature,
    // }
  
    return (
        <div className={styles.appSignupSection}>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent={sectionContent1}
                type='evRoadAssitanceBooking'
            />
            <div className={styles.bookingDetailsSection}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
                    sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
                    // sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
                    type='evRoadAssitanceBooking' />
                <BookingDetailsAccordion history={history} rsa={content} />
            </div>
        </div>
    )
}

export default RoadAssistanceBookingDetails