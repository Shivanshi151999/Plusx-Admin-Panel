import React, { useEffect, useState } from 'react';
import styles from './poddetails.module.css'
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import BookingDetailsAccordion from '../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import BookingDetailsButtons from '../SharedComponent/BookingDetails/BookingDetailsButtons.jsx';


const statusMapping = {
    // 'CNF': 'Booking Confirmed',
    // 'A': 'Assigned',
    // 'ER': 'Enroute',
    // 'RL': 'POD Reached at Location',
    // 'CS': 'Charging Started',
    // 'CC': 'Charging Completed',
    // 'PU': 'POD Picked Up',
    // 'VP': 'Vehicle Pickup',
    // 'RS': 'Reached Charging Spot',
    // 'WC': 'Work Completed',
    // 'DO': 'Drop Off',
    // 'C': 'Cancel',
};

const PodDetails = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const { bookingId } = useParams()
    const [bookingDetails, setBookingDetails] = useState()
    const [history, setHistory] = useState([])

    const fetchDetails = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            booking_id: bookingId
        };
        // postRequestWithToken('charger-booking-details', obj, (response) => {
        //     // console.log(response?.data?.bookingHistory)
        //     if (response.code === 200) {
        //         setBookingDetails(response?.data?.booking || {});
        //         setHistory(response?.data?.history)
        //     } else {
        //         console.log('error in rider-details API', response);
        //     }
        // });
    };
    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchDetails();
    }, []);

    const headerTitles = {
        iotId: "IOT ID",
        deviceName: "POD Name",
        podCharging: "Pod Charging Cost",
        podChargeDetails: "Pod Charge Details",
    };
    const sectionTitles1 = {
        podID: "POD ID",
        modalName: "Modal Name",
        podDesignVersion: "POD Design Version",
    }
    const sectionTitles2 = {
        killoWatt: "Kilowatt",
        capacity: "Capacity",
        inverterType: "Inverter Type",

    }
    const sectionTitles3 = {
        chargeBrand: "Charge Brand",
        dateOfManufacturing: "Date of Manufacturing",
        // slotTime: "Slot Time"
    }
    let rsa_data = bookingDetails?.rsa_data.split(",") || [];
    const content = {
        iotId: "IOT12345",
        deviceName: "PowerPod X",
        podCharging: "$15",
        podChargeDetails: "Charged for 3 hours",
        bookingId: "BK00123",
        createdAt: moment().format('DD MMM YYYY h:mm A'),
        customerName: "John Doe",
        customerContact: "+1 123-456-7890",
        driverName: "Mike Johnson",
        driverContact: "+1 987-654-3210",
        imageUrl: "https://via.placeholder.com/150",
    };
    const sectionContent1 = {
        podID: statusMapping[bookingDetails?.status] || bookingDetails?.status,
        modalName: bookingDetails?.service_name,
        podDesignVersion: bookingDetails?.service_price,

    }
    const sectionContent2 = {
        killoWatt: bookingDetails?.vehicle_data,
        capacity: bookingDetails?.service_type,
        inverterType: bookingDetails?.service_feature,
    }
    const sectionContent3 = {
        chargeBrand: bookingDetails?.address,
        dateOfManufacturing: moment(bookingDetails?.slot_date).format('DD MMM YYYY'),
        slotTime: bookingDetails?.slot_time
    }
    return (
        <div className='main-container'>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent={sectionContent1}
                type='podDetails'
            />
            <div className={styles.bookingDetailsSection}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
                    sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
                    sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
                    type='podDetails' />
                <BookingDetailsButtons />
                {/* <BookingDetailsAccordion history={history} rsa={content} /> */}
            </div>
        </div>
    )
}

export default PodDetails

