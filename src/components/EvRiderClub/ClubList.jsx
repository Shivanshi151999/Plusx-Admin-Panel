import React, { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment';


const dynamicFilters = [
    { label: 'Club Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Club", 
    link: "/add-club"
};

const ClubList = () => {
    const [clubList, setClubList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
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
        <>
         <SubHeader heading = "Club List"
         fetchFilteredData={fetchFilteredData} 
         dynamicFilters={dynamicFilters} filterValues={filters}
         addButtonProps={addButtonProps}
         />
        <List 
        tableHeaders={["Club ID", "Club Name", "Location", "No of Members", "Action"]}
          listData = {clubList}
          keyMapping={[
            { key: 'club_id', label: 'Club ID' }, 
            { key: 'club_name', label: 'Club Name' }, 
            { key: 'location', label: 'Location' }, 
            { key: 'no_of_members', label: 'No of Members' }, 
        ]}
        pageHeading="Club List"
          />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
        </>
    );
};

export default ClubList;
