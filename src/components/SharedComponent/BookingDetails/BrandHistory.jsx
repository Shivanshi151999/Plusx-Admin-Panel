import React, { useEffect, useState } from 'react';
import styles from './history.module.css';
import Pagination from '../Pagination/Pagination';
import Edit from '../../../assets/images/Pen.svg';
import Delete from '../../../assets/images/Delete.svg';
import Add from '../../../assets/images/Plus.svg'
import { Link } from 'react-router-dom';

const BrandHistory = () => {
    // Static data for the table
    const staticVehicleList = [
        { vehicle_type: 'Car', vehicle_number: 'ABC123', vehicle_code: 'B123' },
        { vehicle_type: 'Truck', vehicle_number: 'DEF456', vehicle_code: 'T456' },
        { vehicle_type: 'Bike', vehicle_number: 'GHI789', vehicle_code: 'B789' },
        { vehicle_type: 'Bus', vehicle_number: 'JKL012', vehicle_code: 'B012' },
        { vehicle_type: 'Van', vehicle_number: 'MNO345', vehicle_code: 'V345' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        setTotalPages(Math.ceil(staticVehicleList.length / itemsPerPage));
    }, [staticVehicleList]);

    const currentItems = staticVehicleList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>Brand History List</span>
                <Link to='/add-brand-form'>
                    <button className={styles.brandHistoryButton}>
                        <img className={styles.brandImg} src={Add} alt="Plus" />
                        <span> Add Brand</span>
                    </button>
                </Link>
            </div>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Brand ID</th>
                        <th>Brand Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_number}</td>
                            <td>
                                <div className={styles.editContent}>
                                    <Link to='/edit-brand-form'>
                                    <img src={Edit} alt='edit' />
                                    </Link>
                                    <img src={Delete} alt='delete' />
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BrandHistory;
