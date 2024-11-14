import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import styles from './offer.module.css'
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

const OfferList = () => {
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
        heading: "Add Offer", 
        link: "/add-offer"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('offer-list', obj, async(response) => {
            if (response.code === 200) {
                setCarList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in offer-list api', response);
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

    const handleDeleteSlot = (offerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                offer_id: offerId ,
            };
            postRequestWithToken('delete-offer', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    },1000)
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
         <SubHeader heading = "Offer List" 
         addButtonProps={addButtonProps}
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         searchTerm = {searchTerm}
         />
        <List 
          tableHeaders={["Offer ID", "Offer Name", "Expiry Date", "Status", "Action"]}
          listData = {carList}
          keyMapping={[
            { key: 'offer_id', label: 'Offer ID' }, 
            { key: 'offer_name', label: 'Offer Name' },
          
            { key: 'offer_exp_date', label: 'Expiry Date', format: (date) => moment(date).format('DD MMM YYYY') },
            { key: 'status', label: 'Status', format: (status) => (status === 1 ? "Active" : "Expired") } 
        ]}
        pageHeading="Offer List"
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

export default OfferList;