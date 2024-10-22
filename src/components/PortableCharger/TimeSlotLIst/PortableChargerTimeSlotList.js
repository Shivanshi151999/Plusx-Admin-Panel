import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'C': 'Cancel'
};

const PortableChargerTimeSlotList = () => {
    const [timeSlotList, setTimeSlotList] = useState([])

    useEffect(() => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : "1"
        }

        postRequestWithToken('charger-slot-list', obj, async(response) => {
            if (response.code === 200) {
                setTimeSlotList(response?.data)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-booking-list api', response);
            }
        })
    }, [])

    return (
        <>
         <SubHeader heading = "Portable Charger Slot List"/>
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
           
        <Pagination />
        </>
    );
};

export default PortableChargerTimeSlotList;
