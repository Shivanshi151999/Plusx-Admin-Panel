import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import styles from './chargerbooking.module.css'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { postRequestWithToken, postRequest } from '../../../api/Requests';
import moment from 'moment'; 
import AddDriver from '../../../assets/images/AddDriver.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import View from '../../../assets/images/ViewEye.svg'
import ModalAssign from '../../SharedComponent/BookingDetails/ModalAssign.jsx'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Custommodal from '../../SharedComponent/CustomModal/CustomModal.jsx';
import Loader from "../../SharedComponent/Loader/Loader";
import EmptyList from '../../SharedComponent/EmptyList/EmptyList.jsx';
import { utils, writeFile } from 'xlsx';
import axios from 'axios';

const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A'  : 'Assigned',
    'ER' : 'Enroute',
    'RL' : 'POD Reached at Location',
    'CS' : 'Charging Started',
    'CC' : 'Charging Completed',
    // 'PU' : 'POD Picked Up',
    'PU' : 'Completed',
    'C'  : 'Cancelled'
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
            // { value : 'PU',  label : 'POD Picked Up' },
            { value : 'PU',  label : 'Completed' },
            { value : 'C',   label : 'Cancelled' },
        ]
    },
];
const searchTerm = [
    {
        label : 'search', 
        name  : 'search_text', 
        type  : 'text'
    }
]

const ChargerBookingList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                    = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    const [rsaList, setRsaList]                       = useState([]);
    const [currentPage, setCurrentPage]               = useState(1);
    const [totalPages, setTotalPages]                 = useState(1);
    const [totalCount, setTotalCount]                 = useState(1);
    const [filters, setFilters]                       = useState({start_date: null,end_date: null});
    const [isModalOpen, setIsModalOpen]               = useState(false);
    const [selectedBookingId, setSelectedBookingId]   = useState(null);
    const [selectedDriverId, setSelectedDriverId]     = useState(null);
    const [selectedRiderId, setSelectedRiderId]       = useState(null);
    const [showPopup, setShowPopup]                   = useState(false);
    const [reason, setReason]                         = useState("");
    const [loading, setLoading]                       = useState(false);
    const [downloadClicked, setDownloadClicked]       = useState(false)

  const handleCancelClick = (bookingId, riderId) => {
    setSelectedBookingId(bookingId);
    setSelectedRiderId(riderId)
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
        if (page === 1 && Object.keys(appliedFilters).length === 0) {
            setLoading(false);
        } else {
            setLoading(true);
        } 

        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
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

        const rsaObj = {
            userId       : obj.userId,
            email        : obj.email,
            page_no      : obj.page_no,
            service_type : 'Portable Charger',
        };
    
        postRequestWithToken('rsa-list', rsaObj, async(response) => {
            if (response.code === 200) {
                setRsaList(response?.data) 
            } else {
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
        setSelectedRiderId(null)
    };

    const handleDriverSelect = (driver) => {
        setSelectedDriverId(driver);
    };

    const assignDriver = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            rsa_id     : selectedDriverId, 
            booking_id : selectedBookingId
        }
        postRequestWithToken('/charger-booking-assign', obj, async(response) => {
            if (response.code === 200) {
                setSelectedBookingId(null);
                setSelectedRiderId(null)
                setIsModalOpen(false);
                toast(response.message || response.message[0], {type:'success'})
                setTimeout(() => {
                    fetchList(currentPage, filters);
                }, 1000);
            } else {
                toast(response.message || response.message[0], {type:'error'})
                // alert(response.message || response.message[0])
                console.log('error in/charger-booking-assign api', response);
            }
        })
    }

    const exportToExcel = () => {
        // Prepare data for Excel
        const dataToExport = chargerBookingList.map(item => ({
            "Date & Time": moment(item.created_at).format('DD MMM YYYY'),
            "Booking ID": item.booking_id,
            "Customer Name": item.user_name,
            "Service Name": item.service_name,
            "Price": item.service_price ? `AED ${item.service_price}` : '',
            "Status": statusMapping[item.status] || item.status,
        }));

        // Create a worksheet
        const worksheet = utils.json_to_sheet(dataToExport);

        // Create a workbook
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Charger Booking List");

        // Download the Excel file
        writeFile(workbook, `Charger_Booking_List_${new Date().toISOString()}.xlsx`);
    };

    // if(downloadClicked) {
    //     const obj = {
    //         start_date: filters.start_date,
    //         end_date: filters.end_date,
    //         status: filters.status,
    //         search_text: filters.search_text,
    //     }
    //     const response  = await axios.post(URL, requestData);
    //     console.log(';objobj',obj);
        
    // }

    const handleDownloadClick = async() => {
        const { start_date, end_date, status, search_text } = filters;

        // Construct the base URL
        let url = `http://192.168.1.94:3000/admin/pod-booking-list-download`;
    
        // Append query parameters only if they are not null or undefined
        const params = new URLSearchParams();
        if (start_date) params.append('start_date', start_date);
        if (end_date) params.append('end_date', end_date);
        if (status) params.append('status', status);
        if (search_text) params.append('search_text', search_text);
    
        // If any query parameters were added, append them to the URL
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
    
        console.error('URL:', url); 
        try {
            const response = await axios.get(url,  { responseType: 'blob' });
    

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
        
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'pod_booking_list.xlsx';
              link.click(); 
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        
        
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
                setDownloadClicked = {setDownloadClicked}
                handleDownloadClick = {handleDownloadClick}
            />
            <ToastContainer />
            {/* <button className="export-button" onClick={exportToExcel}>
                Download Excel
            </button> */}

            {loading ? <Loader /> :
                chargerBookingList.length === 0 ? (
                    <EmptyList
                        tableHeaders={["Date","Booking ID", "Customer Name", "Service Name", "Price",  "Status", "Driver Assign", "Action",""]}
                        message="No data available"
                    />
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
                                    // const isCancelable = data[relatedKeys[0]] !== 'C'; 
                                    const isCancelable = !['C', 'PU'].includes(data[relatedKeys[0]]);
                            
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