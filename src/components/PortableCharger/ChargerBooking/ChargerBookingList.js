import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import styles from './chargerbooking.module.css'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import CustomModal from '../../SharedComponent/CustomModal/CustomModal';
import moment from 'moment';
<<<<<<< Updated upstream
import { AiOutlinePlus } from 'react-icons/ai';  
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
=======
import AddDriver from '../../../assets/images/AddDriver.svg'
>>>>>>> Stashed changes

const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'C': 'Cancel'
};

const dynamicFilters = [
    { label: 'Booking ID', name: 'booking_id', type: 'text' },
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Mobile', name: 'contact_no', type: 'text' },
]

const ChargerBookingList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [chargerBookingList, setChargerBookingList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
<<<<<<< Updated upstream
    const [filters, setFilters] = useState({});

    
        const fetchList = (page, appliedFilters = {}) => {
=======
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [driverList, setDriverList] = useState([]);
    useEffect(() => {
        setDriverList([
            { name: 'Driver 1', isUnavailable: false },
            { name: 'Driver 2', isUnavailable: false },
            { name: 'Driver 3', isUnavailable: false }
        ]);
    }, []);
        const fetchList = (page) => {
>>>>>>> Stashed changes
            const obj = {
                userId : userDetails?.user_id,
                email : userDetails?.email,
                page_no : page,
                ...appliedFilters,
            }
    
            postRequestWithToken('charger-booking-list', obj, async(response) => {
                if (response.code === 200) {
                    setChargerBookingList(response?.data)
                    setTotalPages(response?.total_page || 1); 
                } else {
                    // toast(response.message, {type:'error'})
                    console.log('error in charger-booking-list api', response);
                }
            })
        }
        

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login'); 
            return; 
        }
     fetchList(currentPage, filters);
    }, [currentPage, filters]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    const handleDriverClick = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };
    const handleSelectDriver = (driverName) => {
        console.log(`Selected Driver: ${driverName}`);
        closeModal();
    };
    return (
        <>
         <SubHeader heading = "Portable Charger Booking List" 
        //  filterFields = {filterFields}
        fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         
         />
        <List 
        tableHeaders={["ID", "Name", "Service Name", "Price", "Date & Time", "Status", "Driver Assign", "Action"]}
          listData = {chargerBookingList}
          keyMapping={[
            { key: 'booking_id', label: 'ID' },  
            { 
                key: 'user_name', 
                label: 'Name',
                relatedKeys: ['country_code', 'contact_no'], 
                format: (data, key, relatedKeys) => (
                    <>
                        {data[key]}<br />
                        {relatedKeys.map((relatedKey) => data[relatedKey]).join(" ")}
                    </>
                )
            }, 
            { key: 'service_name', label: 'Service Name' },
            { 
                key: 'service_price', 
                label: 'Price', 
                format: (price) => (price ? `AED ${price}` : '') 
            },
            { 
                key: 'created_at', 
                label: 'Date & Time', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            { 
                key: 'status', 
                label: 'Status',
                format: (status) => statusMapping[status] || status 
            },
            {
                key: 'driver_assign', 
                label: 'Driver Assign',
                format: () =>  <img src={AddDriver} className={styles.addDriver} onClick={handleDriverClick}/>
            },
        ]}
        pageHeading="Charger Booking List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
         <CustomModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            driverList={driverList} 
            onSelectDriver={handleSelectDriver} 
          />
        </>
    );
};

export default ChargerBookingList;
