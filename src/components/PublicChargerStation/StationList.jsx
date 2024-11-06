import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import styles from './publiccharger.module.css'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    { label: 'Name', name: 'search', type: 'text' },
]

const StationList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const [stationList, setStationList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const addButtonProps = {
        heading: "Add Public Charger",
        link: "/add-charger-station"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        }

        postRequestWithToken('public-charger-station-list', obj, async (response) => {
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
        <div className={styles.stationContainer}>
            <SubHeader heading="Public Chargers List"
                addButtonProps={addButtonProps}
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters} filterValues={filters}
            />
            {stationList.length === 0 ? (
                <div className={styles.stationContainer} style={{color: 'red'}}>No data available</div>
            ) : (
            <List
                tableHeaders={["Station Name", "Charging For", "Charging Type", "Price", "Address", "Action"]}
                listData={stationList}
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
                    },
                ]}
                pageHeading="Public Chargers List"
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

export default StationList;
