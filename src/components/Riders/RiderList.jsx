import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import styles from './addemergency.module.css'

const dynamicFilters = [
    { label: 'RSA ID', name: 'rsa_id', type: 'text' },
    { label: 'Emergency Team Name', name: 'rsa_name', type: 'text' },
    { label: 'Emergency Team Email', name: 'rsa_email', type: 'text' },
    { label: 'Emergency Team Mobile', name: 'rsa_mobile', type: 'text' },
]

const RiderList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [rsaList, setRsaList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(false)

    const addButtonProps = {
        heading: "Add Driver", 
        link: "/add-emergency-team"
    };

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('rsa-list', obj, async(response) => {
            if (response.code === 200) {
                setRsaList(response?.data)
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
        <div className={styles.ridersContainer}>
         <SubHeader heading = "Emergency Team List" 
         addButtonProps={addButtonProps}
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         />
        <List 
        tableHeaders={["ID", "Driver Name", "Driver Email", "Service Type", "Status", "Action"]}
          listData = {rsaList}
          keyMapping={[
            { key: 'rsa_id', label: 'ID' }, 
            
            // { 
            //     key: 'rsa_name', 
            //     label: 'RSA Name',
            //     relatedKeys: ['country_code', 'mobile'], 
            //     format: (data, key, relatedKeys) => (
            //         <>
            //             {data[key]}<br />
            //             {relatedKeys.map((relatedKey) => data[relatedKey]).join(" ")}
            //         </>
            //     )
            // }, 
            { key: 'rsa_name', label: 'RSA Name' },
            { key: 'email', label: '"RSA Email' },
            { 
                key: 'booking_type', 
                label: 'Service Type', 
                
            },
            { 
                key: 'status', 
                label: 'Status',
                format: (status) => {
                    if (status === 0) return "Inactive";
                    if (status === 1 || status === 3) return "Un-Available";
                    if (status === 2) return "Available";
                    return "Unknown";
                }
            },
        ]}
        pageHeading="Emergency Team List"
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

export default RiderList;
