import React, { useEffect, useState } from 'react';
import styles from './addshoplist.module.css'
import List from '../../../SharedComponent/List/List'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const dynamicFilters = [
    // { label: 'Shop Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Shop",
    link: "/ev-specialized/add-shop"
};

const ShopList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const [shopList, setShopList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh]           = useState(false)
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        }

        postRequestWithToken('shop-list', obj, async (response) => {
            if (response.code === 200) {
                setShopList(response?.data)
                setTotalPages(response?.total_page || 1);
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in shop-list api', response);
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

    const handleDeleteSlot = (shopId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                shop_id: shopId 
            };
            postRequestWithToken('shop-delete', obj, async (response) => {
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
        <div className='main-container'>
            <SubHeader heading="Ev Specialized Shop List"
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters} filterValues={filters}
                addButtonProps={addButtonProps}
                searchTerm = {searchTerm}
            />
            {shopList?.length === 0 ? (
                <div className='errorContainer'>No data available</div>
            ) : (
                <List
                    tableHeaders={["ID", "Shop Name", "Location", "Action"]}
                    listData={shopList}
                    keyMapping={[
                        { key: 'shop_id', label: 'ID' },
                        { key: 'shop_name', label: 'Shop Name' },
                        { key: 'location', label: 'Location' },

                    ]}
                    pageHeading="Shop List"
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

export default ShopList;
