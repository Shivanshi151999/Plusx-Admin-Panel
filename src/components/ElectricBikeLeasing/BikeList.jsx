import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import styles from './electricbike.module.css'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    { label: 'Bike Name', name: 'search_text', type: 'text' },
    // { label: 'Emergency Team Name', name: 'rsa_name', type: 'text' },
    // { label: 'Emergency Team Email', name: 'rsa_email', type: 'text' },
    // { label: 'Emergency Team Mobile', name: 'rsa_mobile', type: 'text' },
]

const BikeList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [carList, setCarList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(false)

    const addButtonProps = {
        heading: "Add Electric Bike", 
        link: "/add-electric-bike"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('electric-bikes-list', obj, async(response) => {
            if (response.code === 200) {
                setCarList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in electric-bikes-list api', response);
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

    const handleDeleteSlot = (rsaId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                rsa_id: rsaId 
            };
            postRequestWithToken('rsa-delete', obj, async (response) => {
                if (response.code === 200) {
                    setRefresh(prev => !prev);
                    toast(response.message[0], { type: "success" });
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in rsa-delete api', response);
                }
            });
        }
    };

    return (
        <div className={styles.electricBikeSection}>
         <SubHeader heading = "Electric Bikes Leasing List" 
         addButtonProps={addButtonProps}
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         />
        <List 
        tableHeaders={["ID", "Bike Name", "Available On", "Bike Type", "Price", "Contract", "Action"]}
          listData = {carList}
          keyMapping={[
            { key: 'rental_id', label: 'ID' }, 
            { key: 'bike_name', label: 'Bike Name' },
            { 
                key: 'available_on', 
                label: 'Available On',  
            },
            { key: 'bike_type', label: 'Bike Type' },
            { key: 'price', label: 'Price' },
            { key: 'contract', label: 'Contract' },
        ]}
        pageHeading="Electric Bikes Leasing List"
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

export default BikeList;
