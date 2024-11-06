import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import AddDriver from '../../../assets/images/AddDriver.svg';
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import Custommodal from '../../SharedComponent/CustomModal/CustomModal';
import { postRequestWithToken } from '../../../api/Requests';
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

const dynamicFilters = [
    { label: 'Booking ID', name: 'request_id', type: 'text' },
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Mobile', name: 'contact_no', type: 'text' },
    {
        label: 'Status', 
        name: 'order_status', 
        type: 'select', 
        options: [
            { value: '', label: 'Select Status' },
            { value: 'CNF', label: 'Confirmed' },
            { value: 'A', label: 'Assigned' },
            { value: 'VP', label: 'Vehicle Pickup' },
            { value: 'RS', label: 'Reached Charging Spot' },
            { value: 'CC', label: 'Charging Completed' },
            { value: 'DO', label: 'Drop Off' },
            { value: 'WC', label: 'Work Completed' },
            { value: 'C', label: 'Cancel' },
        ]
    },
]

const BookingList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [chargerBookingList, setChargerBookingList] = useState([])
    const [rsaList, setRsaList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            service_type: 'Valet Charging',
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('pick-and-drop-booking-list', obj, async(response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in pick-and-drop-booking-list api', response);
            }
        })

        postRequestWithToken('rsa-list', obj, async(response) => {
            if (response.code === 200) {
                setRsaList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in public-charger-station-list api', response);
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

    const openModal = (bookingId) => {
        setSelectedBookingId(bookingId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBookingId(null);
    };

    const handleDriverSelect = (driver) => {
        console.log(`Driver selected: ${driver}`);
        setSelectedDriverId(driver);
    };

    const assignDriver = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            rsa_id: selectedDriverId, 
            booking_id: selectedBookingId
        }
        postRequestWithToken('/pick-and-drop-assign', obj, async(response) => {
            if (response.code === 200) {
                
                setIsModalOpen(false);
                alert(response.message || response.message[0])
                fetchList(currentPage, filters);
            } else {
                // toast(response.message, {type:'error'})
                alert(response.message || response.message[0])
                console.log('error in /pick-and-drop-assign api', response);
            }
        })

    }

    return (
        <>
         <SubHeader heading = "Pick & Drop Booking List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         />
         {chargerBookingList.length === 0 ? (
                <div  style={{color: 'red'}}>No data available</div>
            ) : (
        <List 
        tableHeaders={["Date", "Booking ID", "Customer Name", "Price", "Status", "Driver Assign", "Action"]}
          listData = {chargerBookingList}
          keyMapping={[
            { 
                key: 'created_at', 
                label: 'Invoice Date', 
                format: (date) => moment(date).format('DD MMM YYYY ') 
            } ,
            { key: 'request_id', label: 'ID' }, 
            // { 
            //     key: 'name', 
            //     label: 'Name',
            //     relatedKeys: ['country_code', 'contact_no'], 
            //     format: (data, key, relatedKeys) => (
            //         <>
            //             {data[key]}<br />
            //             {relatedKeys.map((relatedKey) => data[relatedKey]).join(" ")}
            //         </>
            //     )
            // }, 
            { key: 'name', label: 'Customer Name' }, 
            { 
                key: 'price', 
                label: 'Price', 
                format: (price) => (price ? `AED ${price}` : 'AED 0') 
            },
            
            {   key: 'order_status',
                label: 'Status',
                format: (status) => statusMapping[status] || status 

            },
           
            {
                key: 'driver_assign',
                label: 'Driver Assign',
                relatedKeys: ['order_status'], 
                format: (data, key, relatedKeys) => {
                    const isBookingConfirmed = data[relatedKeys[0]] === 'CNF'; 
                    
                    return isBookingConfirmed ? (
                        <img 
                            src={AddDriver} 
                            className={"logo"} 
                            onClick={() => openModal(data.request_id)} 
                            alt="Assign Driver" 
                        />
                    ) : null;
                }
            }
        ]}
        pageHeading="Pick & Drop Booking List"
          />
        )}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />

             <Custommodal
                isOpen={isModalOpen}
                onClose={closeModal}
                driverList={rsaList}
                bookingId = {selectedBookingId}
                onSelectDriver={handleDriverSelect}
                onAssignDriver={assignDriver}
            />
        </>
    );
};

export default BookingList;
