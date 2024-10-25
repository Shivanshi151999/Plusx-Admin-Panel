import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';

const dynamicFilters = [
    { label: 'Name', name: 'riderName', type: 'text' },
    { label: 'Email', name: 'riderEmail', type: 'email' },
    { label: 'Mobile', name: 'riderMobile', type: 'text' },
    {
        label: 'Device By', 
        name: 'addedFrom', 
        type: 'select', 
        options: [
            { value: 'Select Device', label: 'Select Device' },
            { value: 'Android', label: 'Android' },
            { value: 'IOS', label: 'IOS' }
        ]
    },
    // Add more filters as needed
]

const SignupList = () => {
    const [signupList, setSignupList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const fetchChargers = (page, appliedFilters = {}) => {
        const obj = {
            userId: "1",
            email: "admin@shunyaekai.com",
            page_no: page,
            ...appliedFilters,
        };

        postRequestWithToken('rider-list', obj, (response) => {
            if (response.code === 200) {
                setSignupList(response?.data || []);  
                setTotalPages(response?.total_page || 1);  
            } else {
                console.log('error in charger-list API', response);
            }
        });
    };

    useEffect(() => {
        fetchChargers(currentPage, filters);
    }, [currentPage, filters]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    return (
        <div className={styles.appSignupContainer}>
            <SubHeader heading = "App Signup List" 
            fetchFilteredData={fetchFilteredData} 
            dynamicFilters={dynamicFilters} filterValues={filters}/>
            <List
                tableHeaders={["Customer ID", "Customer Name", "Email", "Emirate", "Date", "Action"]}
                listData={signupList}
                keyMapping={[
                    { key: 'rider_id', label: 'Customer ID' },
                    { key: 'rider_name', label: 'Customer Name' },
                    { key: 'rider_email', label: 'Email' },
                    { key: 'emirates', label: 'Emirate' },
                    { 
                        key: 'created_at', 
                        label: 'Date', 
                        format: (date) => moment(date).format('DD MMM YYYY') 
                    } ,
                ]}
                pageHeading="App Signup List"
            />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};


export default SignupList;
