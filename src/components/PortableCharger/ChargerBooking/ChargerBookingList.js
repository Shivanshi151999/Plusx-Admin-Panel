import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
<<<<<<< Updated upstream
import AddDriver from '../../../assets/images/AddDriver.svg';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
=======
import { AiOutlinePlus } from 'react-icons/ai';  
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AddDriver from '../../../assets/images/AddDriver.svg';
>>>>>>> Stashed changes
import Custommodal from '../../SharedComponent/CustomModal/CustomModal.jsx';

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
    {
        label: 'Status', 
        name: 'status', 
        type: 'select', 
        options: [
            { value: '', label: 'Select Status' },
            { value: 'CNF', label: 'Booking Confirmed' },
            { value: 'A', label: 'Assigned' },
            { value: 'RL', label: 'POD Reached at Location' },
            { value: 'CS', label: 'Charging Started' },
            { value: 'CC', label: 'Charging Completed' },
            { value: 'PU', label: 'POD Picked Up' },
            { value: 'C', label: 'Cancel' },
        ]
    },
];

const ChargerBookingList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    const [rsaList, setRsaList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            // service_type: 'Portable Charger',
            ...appliedFilters,
        };

        postRequestWithToken('charger-booking-list', obj, async (response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data);
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in charger-booking-list api', response);
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

<<<<<<< Updated upstream
    const openModal = (bookingId) => {
        setSelectedBookingId(bookingId);
=======
    const openModal = () => {
>>>>>>> Stashed changes
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
                alert(response.message || response.message[0])
                fetchList(currentPage, filters);
            } else {
                // toast(response.message, {type:'error'})
                alert(response.message || response.message[0])
                console.log('error in/charger-booking-assign api', response);
            }
        })

    }


    return (
        <>
            <SubHeader
                heading="Portable Charger Booking List"
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters}
                filterValues={filters}
            />
            <List
                tableHeaders={["ID", "Name", "Service Name", "Price", "Date & Time", "Status", "Driver Assign", "Action"]}
                listData={chargerBookingList}
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
                    { key: 'service_price', label: 'Price', format: (price) => (price ? `AED ${price}` : '') },
                    { key: 'created_at', label: 'Date & Time', format: (date) => moment(date).format('DD MMM YYYY h:mm A') },
                    { key: 'status', label: 'Status', format: (status) => statusMapping[status] || status },
                    // {
                    //     key: 'booking_id',
                    //     label: 'Driver Assign',
                    //     format: (data) => {
                    //         return (
                    //             <img 
                    //                 src={AddDriver} 
                    //                 className={"logo"} 
                    //                 onClick={() => openModal(data)} 
                    //                 alt="Assign Driver" 
                    //             /> 
                    //         );
                    //     }
                    // }

                    {
                        key: 'driver_assign',
                        label: 'Driver Assign',
                        relatedKeys: ['status'], 
                        format: (data, key, relatedKeys) => {
                            const isBookingConfirmed = data[relatedKeys[0]] === 'CNF'; 
                            
                            return isBookingConfirmed ? (
                                <img 
                                    src={AddDriver} 
                                    className={"logo"} 
                                    onClick={() => openModal(data.booking_id)} 
                                    alt="Assign Driver" 
                                />
                            ) : null;
                        }
                    }
                    
                    
                ]}
                pageHeading="Charger Booking List"
            />

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


export default ChargerBookingList;