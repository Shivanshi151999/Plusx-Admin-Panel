import React, { useEffect, useState } from 'react';
import List from '../../../SharedComponent/List/List'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
import moment from 'moment';


const dynamicFilters = [
    { label: 'Brand Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Brand", 
    link: "/add-brand"
};

const BrandList = () => {
    const [brandList, setBrandList] = useState([])
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

        postRequestWithToken('shop-brand-list', obj, async(response) => {
            if (response.code === 200) {
                setBrandList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in shop-brand-list api', response);
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
         <SubHeader heading = "Shop Brand List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         />
        <List 
        tableHeaders={["Brand ID", "Brand Name", "Action"]}
          listData = {brandList}
          keyMapping={[
            { key: 'brand_id', label: 'Brand ID' }, 
            { key: 'brand_name', label: 'Brand Name' }, 
            
        ]}
        pageHeading="Shop Brand List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default BrandList;
