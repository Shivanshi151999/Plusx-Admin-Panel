import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styles from './chargerinstallation.module.css'

const statusMapping = {
    'P': 'Placed',
    'A': 'Assigned',
    'ER': 'Enroute',
    'AR': 'Arrived',
    'WC': 'Work Complete',
    'CR': `Can't Repair`,
    'ES': `Order Completed`,
    'C': 'Cancelled'
};

const ChargerInstallationList = () => {
    const userDetails                                           = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate                                              = useNavigate()
    const [chargerInstallationList, setChargerInstallationList] = useState([])
    const [currentPage, setCurrentPage]                         = useState(1);
    const [totalPages, setTotalPages]                           = useState(1);
    const [filters, setFilters]                                 = useState({});
    
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
        postRequestWithToken('charger-installation-list', obj, async(response) => {
            if (response.code === 200) {
                setChargerInstallationList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-installation-list api', response);
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

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.chargerInstallationSection}>
            <SubHeader heading = "Charger Installation List"
            filterValues={filters}
            fetchFilteredData={fetchFilteredData} 
            searchTerm = {searchTerm}
            />
            <List 
                tableHeaders={["Date","Request ID", "Customer Name", "Service Type", "Vehicle Model",  "Status", "Action"]}
                listData = {chargerInstallationList}
                keyMapping = {[
                    { 
                        key: 'created_at', 
                        label: 'Date & Time', 
                        format: (date) => moment(date).format('DD MMM YYYY') 
                    },
                    { key: 'request_id', label: 'Station Name' }, 
                    { key: 'name', label: 'Customer Name' }, 
                    { key: 'service_type', label: 'Charging Type' },
                    { key: 'vehicle_model', label: 'Vehicle Model' },
                    { 
                        key    : 'order_status', 
                        label  : 'Status', 
                        format : (status) => statusMapping[status] || status 
                    },
                ]}
                pageHeading = "Charger Installation List"
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ChargerInstallationList;
