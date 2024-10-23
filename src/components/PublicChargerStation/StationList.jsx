import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';


const StationList = () => {
    const [stationList, setStationList] = useState([])

    useEffect(() => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : "1"
        }

        postRequestWithToken('public-charger-station-list', obj, async(response) => {
            if (response.code === 200) {
                setStationList(response?.data)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in public-charger-station-list api', response);
            }
        })
    }, [])

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
           
        <Pagination />
        </>
    );
};

export default StationList;
