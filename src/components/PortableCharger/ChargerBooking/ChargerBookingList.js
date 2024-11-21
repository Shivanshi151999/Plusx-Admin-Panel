import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import styles from './chargerbooking.module.css'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment'; 
import AddDriver from '../../../assets/images/AddDriver.svg';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
import ModalAssign from '../../SharedComponent/BookingDetails/ModalAssign.jsx'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Custommodal from '../../SharedComponent/CustomModal/CustomModal.jsx';
import Loader from '../../SharedComponent/Loader/Loader.jsx';


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

const ChargerBookingList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                    = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    const [rsaList, setRsaList]                       = useState([])
    const [currentPage, setCurrentPage]               = useState(1);
    const [totalPages, setTotalPages]                 = useState(1);
    const [totalCount, setTotalCount]                 = useState(1)
    const [filters, setFilters]                       = useState({});
    const [isModalOpen, setIsModalOpen]               = useState(false);
    const [selectedBookingId, setSelectedBookingId]   = useState(null);
    const [selectedDriverId, setSelectedDriverId]     = useState(null);
    const [selectedRiderId, setSelectedRiderId]       = useState(null);
    const [loading, setLoading]                       = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [reason, setReason] = useState("");

  const handleCancelClick = (bookingId, riderId) => {
    setSelectedBookingId(bookingId);
    setSelectedRiderId(riderId)
    console.log(bookingId,riderId);
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
    setSelectedBookingId(null);
    setSelectedRiderId(null)
    setReason("");
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value); 
  };

  const handleConfirmCancel = () => {
    if (!reason.trim()) {
        toast("Please enter a reason for cancellation.", {type:'error'})
        return;
      }
    console.log("Canceling item with ID:", selectedBookingId, selectedDriverId);
    const obj = {
        userId     : userDetails?.user_id,
        email      : userDetails?.email,
        booking_id : selectedBookingId,
        rider_id   : selectedRiderId,
        reason     : reason
    };

    postRequestWithToken('portable-charger-cancel', obj, async (response) => {
        if (response.code === 200) {
            toast(response.message[0], {type:'success'})
                setTimeout(() => {
                    fetchList(currentPage, filters);
                }, 1500);
            setShowPopup(false);
            setSelectedBookingId(null);
            setSelectedRiderId(null)
        } else {
            toast(response.message, {type:'error'})
            console.log('error in charger-booking-list api', response);
        }
    });
    
  };

  const handleBookingDetails = (id) => navigate(`/portable-charger/charger-booking-details/${id}`)

    const fetchList = (page, appliedFilters = {}) => {
        setLoading(true);
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
                setTotalCount(response?.total || 1)
            } else {
                console.log('error in charger-booking-list api', response);
            }
            setLoading(false);
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
        <div className='main-container'>
            <SubHeader
                heading="Portable Charger Booking List"
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters}
                filterValues={filters}
                searchTerm = {searchTerm}
                count = {totalCount}
            />
            <ToastContainer />
            {loading ? <Loader /> : 
            chargerBookingList.length === 0 ? (
                <div className={styles.errorContainer}>No data available</div>
            ) : (
                <>
            <List
                tableHeaders={["Date","Booking ID", "Customer Name", "Service Name", "Price",  "Status", "Driver Assign", "Action",""]}
                listData={chargerBookingList}
                keyMapping={[
                    { key: 'created_at', label: 'Date & Time', format: (date) => moment(date).format('DD MMM YYYY') },
                    { key: 'booking_id', label: 'ID' },
                    { key: 'user_name', label: 'Customer Name' },
                    { key: 'service_name', label: 'Service Name' },
                    { key: 'service_price', label: 'Price', format: (price) => (price ? `AED ${price}` : '') },   
                    { key: 'status', label: 'Status', format: (status) => statusMapping[status] || status },                    

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
                    },
                    {
                        key: 'action',
                        label: 'Action',
                        relatedKeys: ['status'], 
                        format: (data, key, relatedKeys) => {
                            const isCancelable = data[relatedKeys[0]] !== 'C'; 
                    
                            return (
                                <div className="editButtonSection">
                                    {/* View Button (Always Displayed) */}
                                    <img 
                                        src={View} 
                                        alt="view" 
                                        onClick={() => handleBookingDetails(data.booking_id)} 
                                       className="viewButton"
                                    />
                    
                                    {/* Cancel Button (Displayed Conditionally) */}
                                    {isCancelable && (
                                        <img 
                                            src={Cancel} 
                                            alt="cancel" 
                                            onClick={() => handleCancelClick(data.booking_id, data.rider_id)} 
                                            className="viewButton"
                                        />
                                    )}
                                </div>
                            );
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
            </>
            )}

            <Custommodal
                isOpen={isModalOpen}
                onClose={closeModal}
                driverList={rsaList}
                bookingId = {selectedBookingId}
                onSelectDriver={handleDriverSelect}
                onAssignDriver={assignDriver}
            />

            {showPopup && (
                <ModalAssign
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onAssign={handleConfirmCancel}
                    buttonName = 'Submit'
                >
                    <div className="modalHeading">Reason for Cancellation</div>
                    <textarea
                        id="reason"
                        placeholder="Enter reason"
                        className="modal-textarea"
                        rows="4"
                        value={reason} 
                        onChange={handleReasonChange}
                                
                    />
                </ModalAssign>
                
            )}
        </div>
    );
};


export default ChargerBookingList;