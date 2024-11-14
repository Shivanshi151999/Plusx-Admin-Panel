import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import styles from './coupon.module.css'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const dynamicFilters = [
    // { label: 'Bike Name', name: 'search_text', type: 'text' }
]

const CouponList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const [carList, setCarList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(false)
    const searchTerm = [
        {
            label: 'search',
            name: 'search_text',
            type: 'text'
        }
    ]

    const addButtonProps = {
        heading: "Add Coupon",
        link: "/add-coupon"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        }

        postRequestWithToken('coupon-list', obj, async (response) => {
            if (response.code === 200) {
                setCarList(response?.data)
                setTotalPages(response?.total_page || 1);
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in coupon-list api', response);
            }
        })
    }

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchList(currentPage, filters);
    }, [currentPage, filters, refresh]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleDeleteSlot = (code) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                // coupon_id: couponId ,
                coupan_code: code
            };
            postRequestWithToken('delete-coupan', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    }, 1000)
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in electric-bike-delete api', response);
                }
            });
        }
    };

    return (
        <div className={styles.electricBikeSection}>
            <ToastContainer />
            <SubHeader heading="Coupon List"
                addButtonProps={addButtonProps}
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters} filterValues={filters}
                searchTerm={searchTerm}
            />
            <List
                tableHeaders={["Coupon ID", "Coupon Name", "Coupon Code", "Service Name", "Per User", "Coupon %", "End Date", "Status", "Action"]}
                listData={carList}
                keyMapping={[
                    { key: 'id', label: 'Coupon ID' },
                    { key: 'coupan_name', label: 'Coupon Name' },
                    { key: 'coupan_code', label: 'Coupon Code' },
                    {
                        key: 'booking_for',
                        label: 'Service Name',
                    },
                    { key: 'user_per_user', label: 'Per User' },
                    { key: 'coupan_percentage', label: 'Coupon %' },
                    // { key: 'end_date', label: 'End Date' },
                    { key: 'end_date', label: 'End Date', format: (date) => moment(date).format('DD MMM YYYY') },
                    { key: 'status', label: 'Status', format: (status) => (status === "1" ? "Active" : "Inactive") }
                ]}
                pageHeading="Coupon List"
                onDeleteSlot={handleDeleteSlot}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CouponList;