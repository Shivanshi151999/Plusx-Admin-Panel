import React, { useState, useEffect } from 'react';
import GenericTable from './GenericTable';
import Pagination from '../Pagination/Pagination';
import styles from './history.module.css';
import { getRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const PODBookingList = ({podId}) => {
    const userDetails                            = JSON.parse(sessionStorage.getItem('userDetails'));
    const [currentPage, setCurrentPage]          = useState(1);
    const [totalPages, setTotalPages]            = useState(1);
    const[podOutputHistory, setPodOutputHistory] = useState([]);

    useEffect(() => {
        let AreaObj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            podId   : podId, 
            page_no : currentPage
        }
        getRequestWithToken('pod-output-history', AreaObj, (response) => {
            if (response.code === 200) {
                // console.log(response.code)
                setPodOutputHistory(response?.data || []);  
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in brand-list API', response);
            }
        });
    }, [currentPage]);

    const itemsPerPage  = 3;
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // Table columns
    const columns = [
        { label : 'Booking ID', field: 'booiking_id' },
        { label : 'Order Date', field: 'order_date' },
        { label : 'Kilowatt', field: 'kilowatt' },
    ];
    var tableVal = []
    podOutputHistory.map((item) =>{ 
        // console.log( 'item', item.end_charging_level - item.start_charging_level );  //;
        tableVal.push({ 
            booiking_id : item.booking_id, 
            order_date  : moment(item.date_time).format('DD-MM-YYYY HH:mm A'), 
            kilowatt    : ( item.end_charging_level - item.start_charging_level ) * 0.25 +' kw'
        });
    });
    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>POD Booking List</span>
            </div>
            <GenericTable columns={columns} data={tableVal} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PODBookingList;
