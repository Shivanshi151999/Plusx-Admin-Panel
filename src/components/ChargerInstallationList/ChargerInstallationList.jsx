import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';

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
    const [chargerInstallationList, setChargerInstallationList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchList = (page) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
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
        fetchList(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
         <SubHeader heading = "Charger Installation List"/>
        <List 
        tableHeaders={["Request ID", "Name", "Service Type", "Vehicle Model", "Date & Time", "Status", "Action"]}
          listData = {chargerInstallationList}
          keyMapping={[
            { key: 'request_id', label: 'Station Name' }, 
            { key: 'name', label: 'Name' }, 
            { key: 'service_type', label: 'Charging Type' },
            { key: 'vehicle_model', label: 'Vehicle Model' },
            { 
                key: 'created_at', 
                label: 'Date & Time', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
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
