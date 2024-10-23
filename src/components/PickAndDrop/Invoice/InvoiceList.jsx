import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const statusMapping = {
    'WC': 'Work Completed',
    'A': 'Assigned',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'C': 'Cancel'
};

const InvoiceList = () => {
    const [invoiceList, setInvoiceList] = useState([])

    useEffect(() => {
        const obj = {
            userId : "1",
            email : "admin@shunyaekai.com",
            page_no : "1"
        }

        postRequestWithToken('pick-and-drop-invoice-list', obj, async(response) => {
            if (response.code === 200) {
                setInvoiceList(response?.data)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in charger-booking-list api', response);
            }
        })
    }, [])

    return (
        <>
         <SubHeader heading = "Pick & Drop Invoice List"/>
        <List 
        tableHeaders={["Invoice ID", "Rider Data", "Amount", "Invoice Date", "Status", "Action"]}
          listData = {invoiceList}
          keyMapping={[
            { key: 'invoice_id', label: 'ID' }, 
            { key: 'riderDetails', label: 'Rider Data' }, 
            { 
                key: 'amount', 
                label: 'Amount', 
                format: (price) => (price ? `AED ${price}` : 'AED 0') 
            },
            { 
                key: 'invoice_date', 
                label: 'Invoice Date', 
                format: (date) => moment(date).format('DD MMM YYYY h:mm A') 
            } ,
            { 
                key: 'payment_status', 
                label: 'Status',
            },
        ]}
        pageHeading="Pick & Drop Invoice List"
          />
           
        <Pagination />
        </>
    );
};

export default InvoiceList;
