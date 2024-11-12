import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';  
import AddDriver from '../../../assets/images/AddDriver.svg';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Custommodal from '../../SharedComponent/CustomModal/CustomModal.jsx';

const statusMapping = {
    'CNF' : 'Booking Confirmed',
    'A'  : 'Assigned',
    'ER' : 'Enroute',
    'RL' : 'POD Reached at Location',
    'CS' : 'Charging Started',
    'CC' : 'Charging Completed',
    'PU' : 'POD Picked Up',
    'C'  : 'Cancel'
};

const dynamicFilters = [
    // { label : 'Booking ID', name: 'booking_id', type: 'text' },
    // { label : 'Name', name: 'name', type: 'text' },
    // { label : 'Mobile', name: 'contact_no', type: 'text' },
    {
        label : 'Status', 
        name  : 'status', 
        type  : 'select', 
        options : [
            { value : '',    label : 'Select Status' },
            { value : 'CNF', label : 'Booking Confirmed' },
            { value : 'A',   label : 'Assigned' },
            { value : 'ER',  label : 'Enroute' },
            { value : 'RL',  label : 'POD Reached at Location' },
            { value : 'CS',  label : 'Charging Started' },
            { value : 'CC',  label : 'Charging Completed' },
            { value : 'PU',  label : 'POD Picked Up' },
            { value : 'C',   label : 'Cancel' },
        ]
    },
];
const searchTerm = [
    {
        label: 'search', 
        name: 'search_text', 
        type: 'text'
    }
]

const RoadAssistanceBookingList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                    = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    const [rsaList, setRsaList]                       = useState([])
    const [currentPage, setCurrentPage]               = useState(1);
    const [totalPages, setTotalPages]                 = useState(1);
    const [filters, setFilters]                       = useState({});
    const [isModalOpen, setIsModalOpen]               = useState(false);
    const [selectedBookingId, setSelectedBookingId]   = useState(null);
    const [selectedDriverId, setSelectedDriverId]     = useState(null);

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            // service_type: 'Portable Charger',
            ...appliedFilters,
        };

        postRequestWithToken('ev-road-assistance-booking-list', obj, async (response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data);
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in ev-road-assistance-booking-list', response);
            }
        });
        obj.service_type = 'Portable Charger'

        postRequestWithToken('rsa-list', obj, async(response) => {
            if (response.code === 200) {
                setRsaList(response?.data)
                // setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in rsa-listt api', response);
            }
        })
    };

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
        postRequestWithToken('/charger-booking-assign', obj, async(response) => {
            if (response.code === 200) {
                
                setIsModalOpen(false);
                toast(response.message || response.message[0], {type:'success'})
                setTimeout(() => {
                    fetchList(currentPage, filters);
                }, 2000);
            } else {
                toast(response.message[0], {type:'error'})
                // alert(response.message || response.message[0])
                console.log('error in/charger-booking-assign api', response);
            }
        })
    }
    return (
        <>
            <SubHeader
                heading="Ev Road Assitance Booking List"
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters}
                filterValues={filters}
                searchTerm = {searchTerm}
            />
            <ToastContainer />
            {chargerBookingList.length === 0 ? (
                <div  style={{color: 'red'}}>No data available</div>
            ) : (
            <List
                tableHeaders={["Date","Order ID", "Customer Name", "Price",  "Status", "Action"]}
                listData={chargerBookingList}
                keyMapping={[
                    { key: 'created_at', label: 'Date & Time', format: (date) => moment(date).format('DD MMM YYYY') },
                    { key: 'request_id', label: 'Order ID' },
                    { key: 'name', label: 'Customer Name' },
                    { key: 'price', label: 'Price', format: (price) => (price ? `AED ${price}` : '') },
                    { key: 'order_status', label: 'Status', format: (status) => statusMapping[status] || status },
                
                    // {
                    //     key: 'driver_assign',
                    //     label: 'Driver Assign',
                    //     relatedKeys: ['status'], 
                    //     format: (data, key, relatedKeys) => {
                    //         const isBookingConfirmed = data[relatedKeys[0]] === 'CNF'; 
                            
                    //         return isBookingConfirmed ? (
                    //             <img 
                    //                 src={AddDriver} 
                    //                 className={"logo"} 
                    //                 onClick={() => openModal(data.booking_id)} 
                    //                 alt="Assign Driver" 
                    //             />
                    //         ) : null;
                    //     }
                    // }
                    
                    
                ]}
                pageHeading="Ev Road Assitance Booking List"
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


export default RoadAssistanceBookingList;