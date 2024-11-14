import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import styles from './riderclub.module.css'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const dynamicFilters = [
    { label: 'Club Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Club", 
    link: "/add-club"
};

const ClubList = () => {
    const userDetails                   = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate                      = useNavigate()
    const [clubList, setClubList]       = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [filters, setFilters]         = useState({});
    const [refresh, setRefresh]         = useState(false)
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('club-list', obj, async(response) => {
            if (response.code === 200) {
                setClubList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in club-list api', response);
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

    const handleDeleteSlot = (clubId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId : userDetails?.user_id,
                email : userDetails?.email,
                club_id: clubId 
            };
            postRequestWithToken('club-delete', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    },1000)
                    
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in club-delete api', response);
                }
            });
        }
    };

    return (
        <div className='main-container'>
         <SubHeader heading = "Ev Rider Clubs List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         searchTerm = {searchTerm}
         />
          
        {clubList?.length === 0 ? (
            <div className='errorContainer'>No data available</div>
            ) : (
                <List 
                    tableHeaders={["Club ID", "Club Name", "Location", "No of Members", "Action"]}
                    listData={clubList}
                    keyMapping={[
                        { key: 'club_id', label: 'Club ID' }, 
                        { key: 'club_name', label: 'Club Name' }, 
                        { key: 'location', label: 'Location' }, 
                        { key: 'no_of_members', label: 'No of Members' }, 
                    ]}
                    pageHeading="Club List"
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

export default ClubList;
