import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ChargerBookingInvoiceList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [invoiceList, setInvoiceList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchList = (page) => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page
        }

        postRequestWithToken('charger-booking-invoice-list', obj, async(response) => {
            if (response.code === 200) {
                setInvoiceList(response?.data)
                setTotalPages(response?.total_page || 1); 
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-booking-invoice-list api', response);
            }
        })
    }

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login'); 
            return; 
        }
        fetchList(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
         <SubHeader heading = "Portable Charger Invoice List"/>
        <List 
        tableHeaders={["Invoice Date", "Invoice ID", "Customer Name", "Amount", "Status", "Action"]}
          listData = {invoiceList}
          keyMapping={[
            { 
                key: 'invoice_date', 
                label: 'Invoice Date', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            { key: 'invoice_id', label: 'Invoice ID' }, 
            { key: 'riderDetails', label: 'Customer Name' },
            { 
                key: 'amount', 
                label: 'Amount', 
                format: (amount) => (amount ? `AED ${amount}` : amount) 
            },
            { key: 'payment_status', label: 'Status', format: (status) => (status === "succeeded" ? "Completed" : "") }
           
        ]}
        pageHeading="Portable Charger Invoice List"
          />
           
           <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
            />
        </>
    );
};

export default ChargerBookingInvoiceList;
