import React, { useEffect, useState } from 'react';
import styles from './history.module.css';
import Pagination from '../Pagination/Pagination';
import Edit from '../../../assets/images/Pen.svg';
import Delete from '../../../assets/images/Delete.svg';
import Add from '../../../assets/images/Plus.svg'
import { Link } from 'react-router-dom';
//device-brand-list
const BrandHistory = ({deviceBrandList, currentPage, totalPages, onPageChange}) => {
   
    
    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>Brand History List</span>
                <Link to='/pod-device/add-brand'>
                    <button className={styles.brandHistoryButton}>
                        <img className={styles.brandImg} src={Add} alt="Plus" />
                        <span> Add Brand</span>
                    </button>
                </Link>
            </div>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        
                        <th>Brand Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceBrandList?.length > 0 && deviceBrandList?.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.brand_name}</td>
                            <td>{vehicle.start_date}</td>
                            <td>{vehicle.end_date}</td>
                            <td>Active</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default BrandHistory;
