import React, { useEffect, useState } from 'react';
import List from '../../../SharedComponent/List/List';
import styles from '../ShopList/addshoplist.module.css'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    // { label: 'Brand Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Brand", 
    link: "/add-shop-list"
};

const BrandList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [brandList, setBrandList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
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
        <div className='main-container'>
         <SubHeader heading = "Ev Specialized Shop Brand List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         searchTerm = {searchTerm}
         />
         {brandList?.length === 0 ? (
                <div className='errorContainer'>No data available</div>
            ) : (
        <List 
        tableHeaders={["Brand ID", "Brand Name", "Action"]}
          listData = {brandList}
          keyMapping={[
            { key: 'brand_id', label: 'Brand ID' }, 
            { key: 'brand_name', label: 'Brand Name' }, 
            
        ]}
        pageHeading="Shop Brand List"
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

export default BrandList;
