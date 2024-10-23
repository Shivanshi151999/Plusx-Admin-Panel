import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';


const ChargerInstallationList = () => {
    const [chargerInstallationList, setChargerInstallationList] = useState([])

    useEffect(() => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : "1"
        }

        postRequestWithToken('charger-installation-list', obj, async(response) => {
            if (response.code === 200) {
                setChargerInstallationList(response?.data)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-installation-list api', response);
            }
        })
    }, [])

    return (
        <>
         <SubHeader heading = "Charger Installation List"/>
        <List 
        tableHeaders={["Request ID", "Name", "Service Type", "Vehicle Model", "Date & Time", "Status", "Action"]}
          listData = {chargerInstallationList}
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
                key: 'created_at', 
                label: 'Date & Time', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            { 
                key: 'address', 
                label: 'Address', 
            } ,
        ]}
        pageHeading="Charger Installation List"
          />
           
        <Pagination />
        </>
    );
};

export default ChargerInstallationList;
