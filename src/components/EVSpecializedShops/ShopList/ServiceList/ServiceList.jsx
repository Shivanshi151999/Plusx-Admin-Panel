import React, { useEffect, useState } from 'react';
import List from '../../../SharedComponent/List/List'
import styles from '../ShopList/addshoplist.module.css'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    { label: 'Service Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Service", 
    link: "/add-service"
};

const ServiceList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [serviceList, setServiceList] = useState([])
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

        postRequestWithToken('shop-service-list', obj, async(response) => {
            if (response.code === 200) {
                setServiceList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in shop-service-list api', response);
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
        <div className={styles.shoplistContainer}>
         <SubHeader heading = "Ev Specialized Shop Service List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         />
           {serviceList?.length === 0 ? (
                <div className='errorContainer'>No data available</div>
            ) : (
        <List 
        tableHeaders={["Service ID", "Service Name", "Created Time", "Action"]}
          listData = {serviceList}
          keyMapping={[
            { key: 'service_id', label: 'Service ID' }, 
            { key: 'service_name', label: 'Service Name' }, 
            { 
                key: 'created_at', 
                label: 'Created Time', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            
        ]}
        pageHeading="Shop Service List"
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

export default ServiceList;
