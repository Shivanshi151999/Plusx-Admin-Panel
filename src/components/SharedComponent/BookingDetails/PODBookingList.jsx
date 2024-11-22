import React, { useState } from 'react';
import GenericTable from './GenericTable';
import Pagination from '../Pagination/Pagination';
import styles from './history.module.css';

const PODBookingList = () => {
    // Mock data
    const data = [
        { id: 1, name: 'Input 1', description: 'Description 1' },
        { id: 2, name: 'Input 2', description: 'Description 2' },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get paginated data
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Table columns
    const columns = [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Description', field: 'description' },
    ];

    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>POD Booking List</span>
            </div>
            <GenericTable columns={columns} data={paginatedData} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PODBookingList;
