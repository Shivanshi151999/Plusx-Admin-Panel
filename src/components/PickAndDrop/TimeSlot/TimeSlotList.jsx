import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";


const TimeSlotList = () => {
    const [timeSlotList, setTimeSlotList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refresh, setRefresh] = useState(false)

    const addButtonProps = {
        heading: "Add Slot", 
        link: "/pick-and-drop/add-time-slot"
    };

    const fetchList = (page) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : page
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
        fetchList(currentPage);
    }, [currentPage, refresh]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteSlot = (slotId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this slot?");
        if (confirmDelete) {
            const obj = { 
                userId : "1",
                email : "admin@shunyaekai.com",
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
         <SubHeader heading = "Pick & Drop Time Slot List" addButtonProps={addButtonProps}/>
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
