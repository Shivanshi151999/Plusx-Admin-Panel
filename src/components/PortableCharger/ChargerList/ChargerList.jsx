import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';

const ChargerList = () => {
    const [chargerList, setChargerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const addButtonProps = {
        heading: "Add Charger", 
        link: "/add-charger"
    };
    const fetchChargers = (page) => {
        const obj = {
            userId: "1",
            email: "admin@shunyaekai.com",
            page_no: page
        };

        getRequestWithToken('charger-list', obj, (response) => {
            if (response.code === 200) {
                setChargerList(response?.data || []);  
                setTotalPages(response?.data?.total_pages || 1);  
            } else {
                console.log('error in charger-list API', response);
            }
        });
    };

    useEffect(() => {
        fetchChargers(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <SubHeader heading = "Portable Charger List" addButtonProps={addButtonProps}/>
            <List
                // heading="Charger List"
                tableHeaders={["ID", "Charger Name", "Charger Price", "Status", "Action"]}
                listData={chargerList}
                keyMapping={[
                    { key: 'charger_id', label: 'ID' }, // assuming your data uses 'id' for ID
                    { key: 'charger_name', label: 'Charger Name' }, // or 'charger_name'
                    // { key: 'charger_price', label: 'Charger Price' },
                    { 
                        key: 'charger_price', 
                        label: 'Charger Price', 
                        format: (price) => (price ? `AED ${price}` : '') 
                    },
                    { key: 'status', label: 'Status', format: (status) => (status === 1 ? "Active" : "Un-active") } // Custom formatting
                ]}
                pageHeading="Portable Charger List"
            />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </>
    );
};


export default ChargerList;
