import React, { useState } from 'react';
import GenericTable from './GenericTable';
import Pagination from '../Pagination/Pagination';
import styles from './history.module.css';

const PODInput = () => {
    // Mock data
    const data = [
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
        { date: "11-12-2024", time: '11:14 AM', killowatt: '50' },
       
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
        { label: 'Date', field: 'date' },
        { label: 'Time', field: 'time' },
        { label: 'Killowatt', field: 'killowatt' },
    ];

    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>POD Input List</span>
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

export default PODInput;
