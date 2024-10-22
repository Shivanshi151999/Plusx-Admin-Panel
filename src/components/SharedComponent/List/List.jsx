import React, { useState } from 'react';
import styles from './list.module.css';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
const List = () => {
    const chargers = [
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868f', name: 'Super Charger', price: 'AED 150', status: 'Un-active' },
        { id: 'OFR664ae8b54868g', name: 'Mega Charger', price: 'AED 200', status: 'Active' },
        { id: 'OFR664ae8b54868h', name: 'Ultra Charger', price: 'AED 250', status: 'Active' },
        { id: 'OFR664ae8b54868i', name: 'Power Charger', price: 'AED 180', status: 'Active' },
        { id: 'OFR664ae8b54868j', name: 'Fast Charger', price: 'AED 300', status: 'Un-active' }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const chargersPerPage = 5;
    const offset = currentPage * chargersPerPage;
    const currentChargers = chargers.slice(offset, offset + chargersPerPage);
    const pageCount = Math.ceil(chargers.length / chargersPerPage);
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className={styles.containerCharger}>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Charger Name</th>
                        <th>Charger Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentChargers.map((charger, index) => (
                        <tr key={index}>
                            <td>{charger.id}</td>
                            <td>{charger.name}</td>
                            <td>{charger.price}</td>
                            <td>{charger.status}</td>
                            <td>
                                <div className={styles.editContent}>
                                <img src={View} alt="view" />
                                    <img src={Edit} alt='edit' />
                                    <img src={Cancel} alt='cancel' />
                                    <img src={Delete} alt='delete' />
                                    
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
