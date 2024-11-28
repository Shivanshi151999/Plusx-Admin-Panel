import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import styles from './chargerbooking.module.css'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';

import AddDriver from '../../../assets/images/AddDriver.svg';
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

    const statusMapping = {
        '0' : 'Under Maintenance',
        '1' : 'In Use',
        '2' : 'In Service'
    };
    const searchTerm = [
        {
            label : 'search', 
            name  : 'search_text', 
            type  : 'text'
        }
    ]

const PodDeviceList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                    = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    
    const [currentPage, setCurrentPage]               = useState(1);
    const [totalPages, setTotalPages]                 = useState(1);
    const [filters, setFilters]                       = useState({}); 

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        };

        postRequestWithToken('pod-device-list', obj, async (response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data);
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
    const addButtonProps = {
        heading: "Add Device", 
        link: "/pod-device/add-device"
    };
    return (
        <div className='main-container'>
            <SubHeader
                heading="POD Device List"
                addButtonProps={addButtonProps}
                filterValues={filters}
                searchTerm = {searchTerm}
            />
            {chargerBookingList.length === 0 ? (
                <div className={styles.errorContainer}>No data available</div>
            ) : (
            <List
                tableHeaders={[ "POD ID", "POD Name", "Device ID", "Modal Name", "Inverter", "Charger", "Status", "Action"]}
                listData={chargerBookingList}
                keyMapping={[
                    { key: 'pod_id', label: 'POD ID' },
                    { key: 'pod_name', label: 'POD Name' },
                    { key: 'device_id', label: 'Device ID' },
                    { key: 'design_model', label: 'Modal Name' },
                    { key: 'inverter', label: 'Inverter' },
                    { key: 'charger', label: 'Charger' },
                    { key: 'status', label: 'Status', format: (status) => statusMapping[status] || status },
                ]}
                pageHeading="POD Device List"
            />
        )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};


export default PodDeviceList;