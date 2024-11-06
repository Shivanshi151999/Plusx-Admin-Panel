import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

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
]

const SignupList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [signupList, setSignupList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(false)

    const fetchChargers = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
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
        if (!userDetails || !userDetails.access_token) {
            navigate('/login'); 
            return; 
        }
        fetchChargers(currentPage, filters);
    }, [currentPage, filters, refresh]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchFilteredData = (newFilters = {}) => {
        console.log('asdasd')
        setFilters(newFilters);  
        setCurrentPage(1); 
    };

    const handleDeleteSlot = (riderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                rider_id: riderId 
            };
            postRequestWithToken('delete-rider', obj, async (response) => {
                if (response.code === 200) {
                    setRefresh(prev => !prev);
                    toast(response.message[0], { type: "success" });
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in delete-rider api', response);
                }
            });
        }
    };

    return (
        <div className={styles.appSignupContainer}>
            <SubHeader heading = "App Signup List" 
            fetchFilteredData={fetchFilteredData} 
            dynamicFilters={dynamicFilters} filterValues={filters}/>
            {signupList.length === 0 ? (
                <div className={styles.appSignupContainer} style={{color: 'red'}}>No data available</div>
            ) : (
                <List
                    tableHeaders={["Date", "Customer ID", "Customer Name", "Email", "Emirate", "Action"]}
                    listData={signupList}
                    keyMapping={[
                        { 
                            key: 'created_at', 
                            label: 'Date', 
                            format: (date) => moment(date).format('DD MMM YYYY') 
                        },
                        { key: 'rider_id', label: 'Customer ID' },
                        { key: 'rider_name', label: 'Customer Name' },
                        { key: 'rider_email', label: 'Email' },
                        { key: 'emirates', label: 'Emirate' },
                    ]}
                    pageHeading="App Signup List"
                    onDeleteSlot={handleDeleteSlot}
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


export default SignupList;
