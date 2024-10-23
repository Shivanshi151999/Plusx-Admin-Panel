import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';


const StationList = () => {
    const [stationList, setStationList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchList = (page) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : page
        }

        postRequestWithToken('public-charger-station-list', obj, async(response) => {
            if (response.code === 200) {
                setStationList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in public-charger-station-list api', response);
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
         <SubHeader heading = "Public Chargers List"/>
        <List 
        tableHeaders={["Station Name", "Charging For", "Charging Type", "Price", "Address", "Action"]}
          listData = {stationList}
          keyMapping={[
            { key: 'station_name', label: 'Station Name' }, 
            { key: 'charging_for', label: 'Charging For' }, 
            { key: 'charger_type', label: 'Charging Type' },
            { 
                key: 'price', 
                label: 'Price', 
                format: (price) => (price ? `AED ${price}` : '') 
            },
            { 
                key: 'address', 
                label: 'Address', 
            } ,
        ]}
        pageHeading="Public Chargers List"
          />
           
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default StationList;
