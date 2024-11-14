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
    'P': 'Placed',
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
    };
    const sectionTitles1 = {
        serviceType: "Service Type",
        chargerFor: "Charger For",
        noOfCharger: "No of Charger",
    }
    const sectionTitles2 = {
        bookingStatus: "Satus",
        vehicleModel: "Satus",
        companyName: "Company Name",
    }
    const sectionTitles3 = {
        residentType: "Resident Type",
        address: "Address",
        region: "Region Specification",
    }
    const sectionTitles4 = {
    description: "Description",
    }
    const content = {
        bookingId: bookingDetails?.request_id,
        createdAt: moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
        customerName: bookingDetails?.name,
        customerContact: `${bookingDetails?.country_code} ${bookingDetails?.contact_no}`,
        driverName: bookingDetails?.driver?.rsa_name,
        driverContact: `${bookingDetails?.driver?.country_code} ${bookingDetails?.driver?.mobile}`,
    };
    const sectionContent1 = {
        serviceType: bookingDetails?.service_type,
        chargerFor: bookingDetails?.charger_for,
        noOfCharger: bookingDetails?.no_of_charger,
    }
    const sectionContent2 = {
        bookingStatus: statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
        vehicleModel: bookingDetails?.vehicle_model,
        companyName: bookingDetails?.company_name,
    }
    const sectionContent3 = {
        residentType: bookingDetails?.resident_type,
        address: bookingDetails?.address,
        region: bookingDetails?.region_specification,
       
    }
    const sectionContent4 = {
        description: bookingDetails?.description,
    }
    return (
        <div className='main-container'>
            <BookingDetailsHeader content={content} titles={headerTitles} type='chargerInstallation' />
            <div className={styles.bookingLeftContainer}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1} 
                  sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
                  sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
                  sectionTitles4={sectionTitles4} sectionContent4={sectionContent4}
                type='chargerInstallation' />
                <BookingDetailsAccordion history={history} />
            </div>
        </div>
    )
}
export default ChargerInstallationDetails
