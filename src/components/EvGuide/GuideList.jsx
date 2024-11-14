import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List';
import styles from './evguide.module.css'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    // { label: 'Club Name', name: 'search', type: 'text' },
]
const addButtonProps = {
    heading: "Add", 
    link: "/add-ev-guide"
};

const GuideList = () => {
    const userDetails                   = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate                      = useNavigate()
    const [vehicleList, setVehicleList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [refresh, setRefresh]         = useState(false)
    const [filters, setFilters]         = useState({});
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('ev-guide-list', obj, async(response) => {
            if (response.code === 200) {
                setVehicleList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in ev-guide-list api', response);
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    const handleDeleteSlot = (vehicleId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId     : userDetails?.user_id,
                email      : userDetails?.email,
                vehicle_id : vehicleId 
            };
            postRequestWithToken('ev-guide-delete', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    },1000)
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in delete-rider api', response);
                }
            });
        }
    };

    return (
        <div className={styles.guideListContainer}>
            <ToastContainer />
         <SubHeader heading = "EV Guide List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         searchTerm = {searchTerm}
         />
           {vehicleList.length === 0 ? (
               <div className='errorContainer'>No data available</div>
            ) : (
        <List 
        tableHeaders={["Vehicle ID", "Vehicle / Model Name", "Vehicle Type", "Horse Power", "Price", "Action"]}
          listData = {vehicleList}
          keyMapping={[
            { key: 'vehicle_id', label: 'Vehicle ID' }, 
            // { key: 'vehicle_name', label: 'Vehicle / Model Name' }, 
             { 
                key: 'vehicle_name', 
                label: 'Vehicle / Model Name',
                relatedKeys: [ 'vehicle_model'], 
                format: (data, key, relatedKeys) => (
                    <>
                        {data[key]}<br />
                        {relatedKeys.map((relatedKey) => data[relatedKey]).join(" ")}
                    </>
                )
            }, 
            { key: 'vehicle_type', label: 'Vehicle Type' }, 
            { key: 'horse_power', label: 'Horse Power' }, 
            { key: 'price', label: 'Price' }, 
        ]}
        pageHeading="EV Guide List"
        onDeleteSlot={handleDeleteSlot}
          />
    )}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </div>
    );
};

export default GuideList;
