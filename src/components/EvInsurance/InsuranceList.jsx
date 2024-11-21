import React, { useEffect, useState } from 'react';
import moment from 'moment';
import List from '../SharedComponent/List/List'
import styles from './insurance.module.css'
import SubHeader from '../SharedComponent/SubHeader/SubHeader'
import Pagination from '../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../SharedComponent/Loader/Loader';

const dynamicFilters = [
    // { label: 'Car Name', name: 'search_text', type: 'text' },
    // { label: 'Emergency Team Name', name: 'rsa_name', type: 'text' },
    // { label: 'Emergency Team Email', name: 'rsa_email', type: 'text' },
    // { label: 'Emergency Team Mobile', name: 'rsa_mobile', type: 'text' },
]

const InsuranceList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const [carList, setCarList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1)
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false);
    const searchTerm = [
        {
            label: 'search',
            name: 'search_text',
            type: 'text'
        }
    ]

    const addButtonProps = {
        heading: "Add Electric Car",
        link: "/add-electric-car"
    };

    const fetchList = (page, appliedFilters = {}) => {
        setLoading(true);
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        }

        postRequestWithToken('ev-insurance-list', obj, async (response) => {
            if (response.code === 200) {
                setCarList(response?.data)
                setTotalPages(response?.total_page || 1);
                setTotalCount(response?.total || 1)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in ev-insurance-list api', response);
            }
            setLoading(false);
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

    const handleDeleteSlot = (rentalId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = {
                userId: userDetails?.user_id,
                email: userDetails?.email,
                rental_id: rentalId
            };
            postRequestWithToken('electric-car-delete', obj, async (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    }, 1000)
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in delete-rider api', response);
                }
            });
        }
    };

    return (
        <div className='main-container'>
            <ToastContainer />
            <SubHeader heading="Ev Insurance List"
                addButtonProps={addButtonProps}
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters} filterValues={filters}
                searchTerm={searchTerm}
                count = {totalCount}
            />
            {loading ? <Loader/> : 
             carList?.length === 0 ? (
                <div className='errorContainer'>No data available</div>
            ) : (
                <>
            <List
                tableHeaders={["Date", "Insurance ID", "Owner Name", "Vehicle", "Regs. Place", "Country", "Action"]}
                listData={carList}
                keyMapping={[
                    {
                        key: 'created_at',
                        label: 'Date',
                        format: (date) => moment(date).format('DD MMM YYYY')
                    },
                    { key: 'insurance_id', label: 'Insurance ID' },
                    { key: 'owner_name', label: 'Owner Name' },
                    {
                        key: 'vehicle',
                        label: 'Vehicle',
                    },
                    { key: 'registration_place', label: 'Regs. Place' },
                    { key: 'country', label: 'Country' },
                ]}
                pageHeading="Insurance List"
                onDeleteSlot={handleDeleteSlot}
            />
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            </>
            )}
        </div>
    );
};

export default InsuranceList;
