import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../api/Requests';
import moment from 'moment';

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
            <SubHeader heading = "App Signup List" fetchFilteredData={fetchFilteredData}/>
            <List
                tableHeaders={["Customer ID", "Customer Name", "Email", "Emirate", "Date & Time", "Action"]}
                listData={signupList}
                keyMapping={[
                    { key: 'rider_id', label: 'Customer ID' },
                    { key: 'rider_name', label: 'Customer Name' },
                    { key: 'rider_email', label: 'Email' },
                    { key: 'emirates', label: 'Emirate' },
                    { 
                        key: 'created_at', 
                        label: 'Date & Time', 
                        format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
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
