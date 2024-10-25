import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const PortableChargerTimeSlotList = () => {
    const [timeSlotList, setTimeSlotList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const addButtonProps = {
        heading: "Add Slot", 
        link: '/portable-charger/add-time-slot'
    };

    const fetchList = (page) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : page
        }

        postRequestWithToken('charger-slot-list', obj, async(response) => {
            if (response.code === 200) {
                setTimeSlotList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-slot-list api', response);
            }
        })
    }

    useEffect(() => {
        fetchList(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
         <SubHeader heading = "Portable Charger Slot List" addButtonProps={addButtonProps}/>
        <List 
        tableHeaders={["Slot ID", "Timing", "Total Booking", "Booking Limit", "Status", "Action"]}
          listData = {timeSlotList}
          keyMapping={[
            { key: 'slot_id', label: 'Slot ID' }, 
            { 
                key: 'timing',
                label: 'Timing',  
            }, 
            { key: 'total_booking', 
                label: 'Total Booking',
                format: (limit) => (limit ? ` ${limit}` : '0') 
            },
            { 
                key: 'booking_limit', 
                label: 'Booking Limit',  
                
            } ,
            { key: 'status', label: 'Status', format: (status) => (status === 1 ? "Active" : "Un-active") } 
        ]}
        pageHeading="Portable Charger Slot List"
          />
           
           <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
        />
        </>
    );
};

export default PortableChargerTimeSlotList;
