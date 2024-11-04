import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    { label: 'Club Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add", 
    link: "/add-vehicle"
};

const GuideList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [vehicleList, setVehicleList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('vehicle-list', obj, async(response) => {
            if (response.code === 200) {
                setVehicleList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in vehicle-list api', response);
            }
        })
    }

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

    return (
        <>
         <SubHeader heading = "EV Guide List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         />
        <List 
        tableHeaders={["Vehicle ID", "Vehicle / Model Name", "Vehicle Type", "Horse Power", "Price", "Action"]}
          listData = {vehicleList}
          keyMapping={[
            { key: 'vehicle_id', label: 'Vehicle ID' }, 
            { key: 'vehicle_name', label: 'Vehicle / Model Name' }, 
            { key: 'vehicle_type', label: 'Vehicle Type' }, 
            { key: 'horse_power', label: 'Horse Power' }, 
            { key: 'price', label: 'Price' }, 
        ]}
        pageHeading="EV Guide List"
          />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default GuideList;
