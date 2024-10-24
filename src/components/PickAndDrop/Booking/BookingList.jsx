import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

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

const BookingList = () => {
    const [chargerBookingList, setChargerBookingList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchList = (page) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : page
        }

        postRequestWithToken('pick-and-drop-booking-list', obj, async(response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-booking-list api', response);
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
         <SubHeader heading = "Pick & Drop Booking List"/>
        <List 
        tableHeaders={["ID", "Name", "Price", "Date & Time", "Status", "Driver Assign", "Action"]}
          listData = {chargerBookingList}
          keyMapping={[
            { key: 'request_id', label: 'ID' }, 
            { key: 'name', label: 'Name' }, 
            { 
                key: 'price', 
                label: 'Price', 
                format: (price) => (price ? `AED ${price}` : 'AED 0') 
            },
            { 
                key: 'created_at', 
                label: 'Date & Time', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            {   key: 'order_status',
                label: 'Status',
                format: (status) => statusMapping[status] || status 

            },
            {
                key: 'driver_assign', 
                label: 'Driver Assign',
                format: () => <img src="/path/to/logo.png" alt="Drive Assign Logo" className={"logo"} /> 
            },
        ]}
        pageHeading="Pick & Drop Booking List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default BookingList;
