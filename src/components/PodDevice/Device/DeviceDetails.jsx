import React, { useEffect, useState } from 'react';
import styles from './chargerbooking.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader.jsx'
// import BookingDetailsSection from '../../SharedComponent/Details/BookingDetails/BookingDetailsSection.jsx'
import BookingLeftDetails from '../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
// import BookingDetailsAccordion from '../../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../../api/Requests.js';
import moment from 'moment';
// import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import BookingDetailsButtons from '../../SharedComponent/BookingDetails/BookingDetailsButtons.jsx';
import BookingStatusSection from '../../SharedComponent/BookingDetails/BookingStatusSection.jsx';
    
const DeviceDetails = () => {
    const userDetails                       = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                          = useNavigate()
    const { podId }                         = useParams()
    const [deviceDetails, setDeviceDetails] = useState({})
    // Static data for the table
    const [currentPage, setCurrentPage]         = useState(1);
    const [totalPages, setTotalPages]           = useState(1);
    const [deviceBrandList, setdeviceBrandList] = useState([]);
    const [brandImagePath, setBrandImagePath]   = useState('');

    const [deviceBatteryData, setDeviceBatteryData] = useState([
        { id : '', batteryId : '', capacity : '' }
    ]);

    const handlePageChange = (pageNumber) => {
        
        setCurrentPage(pageNumber);
    };
    const fetchBrandList = (page) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            podId,
        };
        postRequestWithToken('device-brand-list', obj, async (response) => {
            if (response.code === 200) {
                setdeviceBrandList(response?.data);
                setBrandImagePath(response?.base_url)
                setTotalPages(response?.total_page || 1);

            } else {
                // console.log('error in charger-booking-list api', response);
            }
        });
    };

    const fetchDetails = () => {
        const obj = {
            userId : userDetails?.user_id,
            email  : userDetails?.email,
            pod_id : podId
        };
        postRequestWithToken('pod-device-details', obj, (response) => {

            if (response.status === 1) {
                const data = response?.data || {};

                setDeviceDetails(data);
                setDeviceBatteryData(response?.batteryData);
            } else {
                // console.error('Error in electric-bike-detail API', response);
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
    useEffect(() => {
        fetchBrandList(currentPage);

    }, [currentPage]);

    const headerTitles = {
        bookingIdTitle       : "Current",
        customerDetailsTitle : "Voltage",
        driverDetailsTitle   : "Percentage",
        podTemp              : "Temperature",
    };
    const content = {  
        bookingId    : deviceBatteryData[0].current+" Volt", 
        createdAt    : '',        
        customerName : deviceBatteryData[0].voltage +" V",
        driverName   : deviceBatteryData[0].percentage ? deviceBatteryData[0].percentage.toFixed(2)+" %" : '',
        podTemp      : deviceBatteryData[0].temp1 +" C", 
    };
    const sectionTitles1 = {
        bookingStatus : "POD ID",
        price         : "Pod Name",
        serviceName   : "Device ID",
        // design_model  : "Modal",
    }
    const sectionContent1 = {
        bookingStatus : deviceDetails?.pod_id,
        serviceName   : deviceDetails?.pod_name,  
        price         : deviceDetails?.device_id,
        // design_model  : deviceDetails?.design_model,
    }
    const sectionTitles2 = {
        vehicle        : "Modal",
        serviceType    : "Capacity",
        serviceFeature : "Inverter",
    }
    const sectionContent2 = {
        vehicle        : deviceDetails?.design_model,
        serviceType    : deviceDetails?.capacity,
        serviceFeature : deviceDetails?.inverter,
    }
    const sectionTitles3 = {
        charger               : "Charger",
        date_of_manufacturing : "Date Of Manufacturing",
    }
    const sectionContent3 = {
        charger               : deviceDetails?.charger,
        date_of_manufacturing : moment(deviceDetails?.date_of_manufacturing).format('DD MMMM YYYY'),
    }
    
    return (
        <div className='main-container'>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent={sectionContent1}
                type='PODDeviceDetails'  deviceBatteryData={deviceBatteryData}
            />
            <div className={styles.bookingDetailsSection}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
                    sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
                    sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
                    type='PODDeviceDetails'
                />
                <BookingStatusSection
                    deviceId={podId}
                    podStatus={deviceDetails?.status}
                />
                <BookingDetailsButtons
                    deviceId={podId}
                    deviceBrandList={deviceBrandList}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    brandImagePath={brandImagePath} 
                />
            </div>
        </div>
    )
}

export default DeviceDetails