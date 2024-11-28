import React, { useState, useEffect } from 'react';
import GenericTable from './GenericTable';
import Pagination from '../Pagination/Pagination';
import styles from './history.module.css';
import { getRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
const PODInput = ({podId}) => {

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    
    const[podInputHistory, setPodInputHistory] = useState([]);
    
    useEffect(() => {
        let AreaObj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            podId   : podId, 
            page_no : currentPage
        }
        getRequestWithToken('all-pod-input-history', AreaObj, (response) => {
            if (response.code === 200) {
                // console.log(response.code)
                setPodInputHistory(response?.data || []);  
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in brand-list API', response);
            }
        });
    }, [currentPage]);
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Table columns
    const columns = [
        { label : 'Date', field: 'date' },
        { label : 'Time', field: 'time' },
        { label : 'Killowatt', field: 'killowatt' },
    ];

    const data = [
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
    ];
    // {
    //     "booking_id": "PCB0196",
    //     "start_charging_level": 9.989999771118164,
    //     "end_charging_level": 9.989999771118164,
    //     "date_time": "2024-11-27T05:13:29.000Z"
    // }
    var tableVal = []
    podInputHistory.map((item) =>{ 
        // console.log( 'item', item.end_charging_level - item.start_charging_level );  //;
        tableVal.push({ 
            date      : moment(item.date_time).format('DD-MM-YYYY'), 
            time      : moment(item.date_time).format('HH:mm:ss'), 
            killowatt : ( item.end_charging_level - item.start_charging_level ) * 0.25 +' kw'
        });
    });
    // console.log(tableVal)
    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>POD Input List</span>
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

export default PODInput;
