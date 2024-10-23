import React, { useState } from 'react';
import styles from './list.module.css';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
import { useNavigate } from 'react-router-dom';


const List = ({tableHeaders, listData, keyMapping, pageHeading}) => {
    const chargers = [
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868g', name: 'Mega Charger', price: 'AED 200', status: 'Active' },
        { id: 'OFR664ae8b54868h', name: 'Ultra Charger', price: 'AED 250', status: 'Active' },
        { id: 'OFR664ae8b54868i', name: 'Power Charger', price: 'AED 180', status: 'Active' },
        { id: 'OFR664ae8b54868j', name: 'Fast Charger', price: 'AED 300', status: 'Un-active' }
    ];

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const chargersPerPage = 5;
    const offset = currentPage * chargersPerPage;
    const currentChargers = chargers.slice(offset, offset + chargersPerPage);
    const pageCount = Math.ceil(chargers.length / chargersPerPage);
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSignupDetails = (id) => {
        navigate(`/rider-details/${id}`)
    }

    const handleBookingDetails = (id) => {
        navigate(`/portable-charger/charger-booking-details/${id}`)
    }

    return (
        <div className={styles.containerCharger}>
            
            <table className={styles.table}>
                <thead>
                <tr>
                        {tableHeaders?.map((header, i) => (
                            <th key={i}>{header}</th> 
                        ))}
                    </tr>
                    
                </thead>
                <tbody>
                    {listData.map((data, index) => (
                        <tr key={index}>
                           {keyMapping.map((keyObj, keyIndex) => (
                                <td key={keyIndex}>
                                    {keyObj.format 
                                        ? keyObj.format(data[keyObj.key]) 
                                        : data[keyObj.key]
                                    }
                                </td>
                            ))}
                            <td>
                                <div className={styles.editContent}>

                                {pageHeading === 'Charger Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleBookingDetails(data.booking_id)}/>
                                            <img src={Cancel} alt='cancel' />
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger List' && (
                                        <>
                                            <img src={Edit} alt='edit' />
                                            <img src={Cancel} alt='cancel' />
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger Invoice List' && (
                                        <img src={View} alt="view" />
                                    )}
                                    {pageHeading === 'Portable Charger Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}
                                    {pageHeading === 'App Signup List' && (
                                        <>
                                            <img src={View} alt="view" 
                                            onClick={() => handleSignupDetails(data.rider_id)}
                                            />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Pick & Drop Booking List' && (
                                        <>
                                            <img src={View} alt="view" />
                                            <img src={Cancel} alt='cancel' />
                                        </>
                                    )}
                                   {pageHeading === 'Pick & Drop Invoice List' && (
                                        <>
                                            <img src={View} alt="view" />
                                        </>
                                    )}
                                    {pageHeading === 'Pick & Drop Time Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}


                                    {pageHeading === 'Public Chargers List' && (
                                        <>
                                         <img src={View} alt="view" />
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                   {pageHeading === 'Charger Installation List' && (
                                        <>
                                            <img src={View} alt="view" />
                                        </>
                                    )}
                                    
                                {/* <img src={View} alt="view" />
                                    <img src={Edit} alt='edit' />
                                    <img src={Cancel} alt='cancel' />
                                    <img src={Delete} alt='delete' /> */}
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
