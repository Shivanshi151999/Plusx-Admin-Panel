import React, { useEffect, useState } from 'react';
import styles from './emergency.module.css'
import { Link } from 'react-router-dom';
import Eye from '../../../assets/images/ViewEye.svg'
import moment from 'moment';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { postRequestWithToken } from '../../../api/Requests'; 
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Filter from '../../../assets/images/Filter.svg';
import AccordionFilter from '../../SharedComponent/Accordion/Accordions';

    const pickDropStatusMapping = {
        'CNF': 'Booking Confirmed',
        'A'  : 'Assigned',
        'ER' : 'Enroute',
        'RL' : 'POD Reached at Location',
        'CS' : 'Charging Started',
        'CC' : 'Charging Completed',
        'PU' : 'POD Picked Up',
        // 'PU' : 'Completed',
        'C'  : 'Cancelled'
    };
    const EmergencyList = ({rsaId, bookingType}) => {
        
        const userDetails                                       = JSON.parse(sessionStorage.getItem('userDetails')); 
        const [history, setHistory]                             = useState([]);
        const [currentPage, setCurrentPage]                     = useState(1);
        const [totalPages, setTotalPages]                       = useState(1);
        const [totalCount, setTotalCount]                       = useState(1);
        const [filters, setFilters]                             = useState({start_date: null,end_date: null});
        const [scheduleFilters, setScheduleFilters]             = useState({start_date: null,end_date: null});
        const [isFilterAccordionOpen, setIsFilterAccordionOpen] = useState(false);

        const driverBookingList = (page_no = 1) => {
            const bookingObj = {
                userId     : userDetails?.user_id,
                email      : userDetails?.email,
                rsa_id     : rsaId,
                driverType : bookingType, 
                page_no    : page_no,

                // rsa_id, bookingTypeValue, page_no, order_status, start_date, end_date, search_text = '', scheduleFilters 
    
            };  
            postRequestWithToken('rsa-booking-list', bookingObj, (response) => {
                if (response.code === 200) {
                    console.log(response.data)
                    setHistory(response?.data || []);
                    setTotalPages(response?.total_page || 1);
                    // setTotalPages(response?.total_page || 1);
                } else {
                    console.log('error in rider-details API', response);
                }
            });
        };
        useEffect(() => {
            driverBookingList(currentPage);

        }, [currentPage, filters, scheduleFilters]);

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };
        const fetchFilteredData = (newFilters = {}) => {
            setFilters(newFilters);
            setCurrentPage(1);
        };
        const scheduleFilteredData = (newFilters = {}) => {
            setScheduleFilters(newFilters);
            setCurrentPage(1);
        };

        const toggleFilterAccordion = () => {
            setIsFilterAccordionOpen((prev)=> !prev);
        };
        return (
            <div className={styles.addressListContainer}>
                <div className={styles.headerCharger}>
                    <span className={styles.sectionTitle}>Booking Details</span>
                    <div className={styles.addButtonSection} onClick={toggleFilterAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Filter} alt='Filter' />
                            </div>
                            <div className={styles.addButtonText}>Filter</div>
                        </div>
                </div>

                {isFilterAccordionOpen && (
                <AccordionFilter
                    type={"heading"}
                    isOpen={isFilterAccordionOpen}
                    fetchFilteredData={fetchFilteredData}
                    // dynamicFilters={dynamicFilters}
                    // filterValues={filterValues}
                    // scheduleDateChange={scheduleDateChange}
                    // scheduleFilters={scheduleFilters}
                />
                )}
                
                <table className={`table ${styles.customTable}`}>
                    <thead>
                        <tr>
                            <th>Booking Date</th>
                            <th>Schedule Date</th>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            {/* <th>Price</th> */}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history && history?.length > 0 ? (
                            history?.map((item, index) => (
                                <tr key={index}>
                                    <td>{moment(item?.created_at).format('DD MMM YYYY') }</td>
                                    <td>{moment(item?.slot_date_time).format('DD MMM YYYY') }</td>
                                    <td>{item?.booking_id }</td>
                                    <td>{item?.user_name}</td>
                                    {/* <td>{item?.price ? `${item?.price} AED` : '' }</td> */}
                                    <td>{pickDropStatusMapping[item?.status] || 'Confirmed'}</td>
                                    <td>
                                        <div className={styles.editContent}>
                                            {bookingType === 'Valet Charging' ? (
                                                    <Link to={`/pick-and-drop/booking-details/${item?.booking_id}`}>
                                                        <img src={Eye} alt="View" />
                                                    </Link>
                                                ) : (
                                                    <Link to={`/portable-charger/charger-booking-details/${item?.booking_id}`}>
                                                        <img src={Eye} alt="View" />
                                                    </Link>
                                                )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'start', padding: '10px' }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        );
    };
    export default EmergencyList;