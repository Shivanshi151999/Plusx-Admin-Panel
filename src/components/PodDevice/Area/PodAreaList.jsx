import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import styles from '../Device/chargerbooking.module.css'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';

import AddDriver from '../../../assets/images/AddDriver.svg';
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const searchTerm = [
    {
        label: 'search', 
        name: 'search_text', 
        type: 'text'
    }
]

const PodAreaList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                      = useNavigate();
    const [areaList, setAreaList]       = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [filters, setFilters]         = useState({});

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        };
        postRequestWithToken('pod-area-list', obj, async (response) => {
            if (response.code === 200) {
                setAreaList(response?.data);
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in charger-booking-list api', response);
            }
        });
    };

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
    const addButtonProps = {
        heading : "Add Area", 
        link    : "/pod-device/add-area"
    };
    return (
        <div className='main-container'>
            <SubHeader
                heading="POD Area List"
                addButtonProps={addButtonProps}
                filterValues={filters}
                searchTerm = {searchTerm}
            />
            {areaList.length === 0 ? (
                <div className={styles.errorContainer}>No data available</div>
            ) : (
            <List
                tableHeaders={[ "Area ID", "Area Name", "Created Date", "Status", "Action"]}
                listData={areaList}
                keyMapping={[
                    { key: 'area_id', label: 'Area ID' },
                    { key: 'area_name', label: 'Area Name' },
                    { key: 'created_at', label: 'Created Date', format: (date) => moment(date).format('DD MMM YYYY')  },
                    { key: 'status', label: 'Status', format: (status) => status == 1 ? 'Active' : 'Inactive' },
                ]}
                pageHeading="POD Area List"
            />
        )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default PodAreaList;