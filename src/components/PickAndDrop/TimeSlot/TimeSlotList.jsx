import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const TimeSlotList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [timeSlotList, setTimeSlotList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refresh, setRefresh] = useState(false)
    const [filters, setFilters] = useState({});
    
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const addButtonProps = {
        heading: "Add Slot", 
        link: "/pick-and-drop/add-time-slot"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('pick-and-drop-slot-list', obj, async(response) => {
            if (response.code === 200) {
                setTimeSlotList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in pick-and-drop-slot-list api', response);
            }
        })
    }

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login'); 
            return; 
        }
        fetchList(currentPage, filters);
    }, [currentPage, filters, refresh]);

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteSlot = (slotId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this slot?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                slot_id: slotId 
            };
            postRequestWithToken('pick-and-drop-delete-slot', obj, async (response) => {
                if (response.code === 200) {
                    setRefresh(prev => !prev);
                    toast(response.message[0], { type: "success" });
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in delete-charger-slot api', response);
                }
            });
        }
    };

    return (
        <>
         <SubHeader heading = "Pick & Drop Time Slot List" 
         addButtonProps={addButtonProps}
         filterValues={filters}
         fetchFilteredData={fetchFilteredData} 
         searchTerm = {searchTerm}
         />
        <List 
        tableHeaders={["Slot ID", "Timing", "Total Booking", "Booking Limit", "Status", "Action"]}
        listData = {timeSlotList}
        keyMapping={[
          { key: 'slot_id', label: 'Slot ID' }, 
          { 
            key: 'timing',
            label: 'Timing',
            format: (timing) => {
                const [startTime, endTime] = timing.split(' - ');
    
                const formattedStart = moment(startTime, 'HH:mm:ss').format('HH:mm');
                const formattedEnd = moment(endTime, 'HH:mm:ss').format('HH:mm');
    
                return `${formattedStart} - ${formattedEnd}`;
            }
        },
          { key: 'total_booking', 
              label: 'Total Booking',
              format: (limit) => (limit ? ` ${limit}` : '0') 
          },
          { 
              key: 'booking_limit', 
              label: 'Booking Limit',  
              
          } ,
          { key: 'status', label: 'Status', format: (status) => (status === 1 ? "Active" : "Inactive") } 
      ]}
        pageHeading="Pick & Drop Time Slot List"
        onDeleteSlot={handleDeleteSlot}
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default TimeSlotList;
