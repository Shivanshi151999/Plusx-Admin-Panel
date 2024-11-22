import React, { useEffect, useState } from 'react';
import styles from './history.module.css';
import Pagination from '../Pagination/Pagination';
import AddZone from '../../../assets/images/AddDriver.svg';
import Modal from './ModalAssign';
import Add from '../../../assets/images/Plus.svg';
import Select from 'react-select';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const PODZoneHistory = ({
    deviceBrandList = [],
    initialPage = 1,
    itemsPerPage = 5, 
    defaultCoordinates = { lat: 25.276987, lng: 55.296249 },
}) => {
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const options = [
        { value: 'Dubai', label: 'Dubai' },
        { value: 'Abu Dhabi', label: 'Abu Dhabi' },
        { value: 'Ajman', label: 'Ajman' },
        { value: 'Umm Al Qaiwain', label: 'Umm Al Qaiwain' },
    ];

    // Assuming `staticVehicleList` is defined somewhere in your code
    const staticVehicleList = []; // Placeholder, replace with your actual data

    useEffect(() => {
        setTotalPages(Math.ceil(staticVehicleList.length / itemsPerPage));
    }, [staticVehicleList, itemsPerPage]);

    const currentItems = staticVehicleList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddZoneClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Load Google Maps
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className={styles.addressListContainer}>
            <div className={styles.brandHistorySection}>
                <span className={styles.sectionTitle}>POD Zone List</span>
                <button
                    className={styles.brandHistoryButton}
                    onClick={handleAddZoneClick}
                >
                    <img className={styles.brandImg} src={Add} alt="Add Brand" />
                    <span>Add Zone</span>
                </button>
            </div>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Zone ID</th>
                        <th>Assigned Date</th>
                        <th>Area Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_number}</td>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_number}</td>
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
                buttonName="Add"
                onAssign={() => {
                    console.log('Add Zone action');
                    handleCloseModal();
                }}
            >
                <div className="modalHeading">Add New Zone</div>
                <div className={styles.modalContainer}>
                    <Select
                        options={options}
                        placeholder="Select Area"
                    />
                    <GoogleMap
                        mapContainerClassName={styles.mapResponsive}
                        center={defaultCoordinates}
                        zoom={12}
                    >
                        <Marker position={defaultCoordinates} />
                    </GoogleMap>
                </div>
            </Modal>
        </div>
    );
};

export default PODZoneHistory;
