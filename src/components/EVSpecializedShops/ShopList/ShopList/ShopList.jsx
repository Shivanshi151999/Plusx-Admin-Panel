import React, { useEffect, useState } from 'react';
import List from '../../../SharedComponent/List/List'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
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

const dynamicFilters = [
    { label: 'Shop Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Shop", 
    link: "/add-shop"
};

const ShopList = () => {
    const [shopList, setShopList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('shop-list', obj, async(response) => {
            if (response.code === 200) {
                setShopList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in shop-list api', response);
            }
        })
    }

    useEffect(() => {
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
         <SubHeader heading = "Shop List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         />
        <List 
        tableHeaders={["ID", "Shop Name", "Location", "Action"]}
          listData = {shopList}
          keyMapping={[
            { key: 'shop_id', label: 'ID' }, 
            { key: 'shop_name', label: 'Shop Name' }, 
            { key: 'location', label: 'Location' }, 
            
        ]}
        pageHeading="Shop List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default ShopList;
