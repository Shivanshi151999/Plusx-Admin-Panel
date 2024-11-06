import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const statusMapping = {
    'P': 'Open',
    'A': 'Assigned',
    'ER': 'Enroute',
    'AR': 'Arrived',
    'WC': 'Work Complete',
    'CR': `Can't Repair`,
    'ES': `Order Completed`,
    'C': 'Cancelled'
};

const ChargerInstallationList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [chargerInstallationList, setChargerInstallationList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchList = (page) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page
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
        fetchList(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
         <SubHeader heading = "Charger Installation List"/>
        <List 
        tableHeaders={["Date","Request ID", "Customer Name", "Service Type", "Vehicle Model",  "Status", "Action"]}
          listData = {chargerInstallationList}
          keyMapping={[
            { 
                key: 'created_at', 
                label: 'Date & Time', 
                format: (date) => moment(date).format('DD MMM YYYY') 
            } ,
            { key: 'request_id', label: 'Station Name' }, 
            { key: 'name', label: 'Customer Name' }, 
            { key: 'service_type', label: 'Charging Type' },
            { key: 'vehicle_model', label: 'Vehicle Model' },
            
            { 
                key: 'order_status', 
                label: 'Status', 
                format: (status) => statusMapping[status] || status 
            } ,
        ]}
        pageHeading = "Charger Installation List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default ChargerInstallationList;
