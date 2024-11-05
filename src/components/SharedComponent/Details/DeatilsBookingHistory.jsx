import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './details.module.css';
import Eye from '../../../assets/images/ViewEye.svg';
import Pagination from '../Pagination/Pagination';
<<<<<<< Updated upstream

=======
import AddAssign from '../../../assets/images/AddDriver.svg';
import Custommodal from '../CustomModal/CustomModal';
>>>>>>> Stashed changes

const DeatilsBookingHistory = ({ title, headers, bookingData, bookingType }) => {
  const navigate = useNavigate();

<<<<<<< Updated upstream
  const navigate = useNavigate(); 

  const handleViewClick = (id) => {
    if (bookingType === 'portableCharger') {
      navigate(`/portable-charger/charger-booking-details/${id}`); 
    } else if (bookingType === 'pickAndDrop') {
      navigate(`/pick-and-drop/${id}`); 
    }

  };

=======
>>>>>>> Stashed changes
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const itemsPerPage = 3;

  const driverList = [
    { name: 'Driver 1', isUnavailable: false },
    { name: 'Driver 2', isUnavailable: true },
    { name: 'Driver 3', isUnavailable: false },
  ];

  useEffect(() => {
    if (bookingData) {
      setTotalPages(Math.ceil(bookingData.length / itemsPerPage));
    }
  }, [bookingData]);

  const currentItems = bookingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewClick = (id) => {
    if (bookingType === 'portableCharger') {
      navigate(`/portable-charger/charger-booking-details/${id}`);
    } else if (bookingType === 'pickAndDrop') {
      navigate(`/pick-and-drop/${id}`);
    }
  };

  const handleAddDriverClick = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleSelectDriver = (driverName) => {
    console.log(`Selected driver: ${driverName} for booking ID: ${selectedBookingId}`);
    handleCloseModal();
  };

  return (
    <div className={styles.addressListContainer}>
      <span className={styles.sectionTitle}>{title}</span>
      <table className={`table ${styles.customTable}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((booking, index) => (
            <tr key={index}>
<<<<<<< Updated upstream
=======
              <td>{booking.datetime}</td>
>>>>>>> Stashed changes
              <td>{booking.id}</td>
              {bookingType === 'portableCharger' ? (
                <>
                  <td>{booking.service_name}</td>
<<<<<<< Updated upstream
                  <td>{booking.service_type}</td>
                </>
              ) : null}
              <td>{booking.price}</td>
              <td>{booking.datetime}</td>
=======
                </>
              ) : null}
              <td>{booking.price}</td>
>>>>>>> Stashed changes
              <td>{booking.status}</td>
              <td>
                <div className={styles.editContent}>
                  <img
                    src={AddAssign}
                    alt="AddAssign"
                    onClick={() => handleAddDriverClick(booking.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </td>
              <td>
                <div className={styles.editContent}>
                  <img
                    src={Eye}
                    alt="Eye"
                    onClick={() => handleViewClick(booking.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Custom Modal for Driver Selection */}
      <Custommodal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        driverList={driverList}
        onSelectDriver={handleSelectDriver}
      />
    </div>
  );
};

export default DeatilsBookingHistory;
