import React, { useEffect, useState } from 'react';
import styles from './history.module.css';
import Pagination from '../Pagination/Pagination';
import AddZone from '../../../assets/images/AddDriver.svg';
import Modal from './ModalAssign';

const PODZoneHistory = () => {
    const staticVehicleList = [
        { vehicle_type: 'Car', vehicle_number: 'ABC123', vehicle_code: 'B123' },
        { vehicle_type: 'Truck', vehicle_number: 'DEF456', vehicle_code: 'T456' },
        { vehicle_type: 'Bike', vehicle_number: 'GHI789', vehicle_code: 'B789' },
        { vehicle_type: 'Bus', vehicle_number: 'JKL012', vehicle_code: 'B012' },
        { vehicle_type: 'Van', vehicle_number: 'MNO345', vehicle_code: 'V345' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
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

    const handleAddClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleAssign = () => {
        console.log('Assign button clicked!');
        setIsModalOpen(false); // Close modal after assigning
    };

    return (
        <div className={styles.addressListContainer}>
            <span className={styles.sectionTitle}>POD Zone History List</span>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Zone ID</th>
                        <th>Assigned Date</th>
                        <th>Area Name</th>
                        <th>Status</th>
                        <th>Zone Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_number}</td>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_number}</td>
                            <td>
                                <div className={styles.editContent}>
                                    <img
                                        src={AddZone}
                                        alt='add'
                                        onClick={handleAddClick} // Open modal on click
                                    />
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
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAssign={handleAssign} // Assign button callback
            >
                <div className={styles.modalHeading}>Add Zone</div>
                <input
                    type="text"
                    placeholder="Enter Zone ID"
                    className={styles.inputField}
                />
            </Modal>
        </div>
    );
};

export default PODZoneHistory;
