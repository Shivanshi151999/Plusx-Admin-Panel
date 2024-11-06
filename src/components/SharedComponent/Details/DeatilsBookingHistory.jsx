import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './details.module.css';
import Eye from '../../../assets/images/ViewEye.svg';
import Pagination from '../Pagination/Pagination';
import { postRequestWithToken } from '../../../api/Requests';

import AddAssign from '../../../assets/images/AddDriver.svg';
import Custommodal from '../CustomModal/CustomModal';

const DeatilsBookingHistory = ({ title, headers, bookingData, bookingType, chargerRsaList, valetRsaList }) => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
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
      navigate(`/pick-and-drop/booking-details/${id}`);
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

  const handleSelectDriver = (driver) => {
    console.log(`Selected driver: ${driver} for booking ID: ${selectedBookingId}`);
    // handleCloseModal();
    setSelectedDriverId(driver);
  };

  const assignDriver = () => {
    const obj = {
        userId: userDetails?.user_id,
        email: userDetails?.email,
        rsa_id: selectedDriverId, 
        booking_id: selectedBookingId
    }
    if(bookingType === 'portableCharger') {
      postRequestWithToken('/charger-booking-assign', obj, async(response) => {
        if (response.code === 200) {
            
            setIsModalOpen(false);
            alert(response.message || response.message[0])
            // fetchList(currentPage, filters);
        } else {
            // toast(response.message, {type:'error'})
            alert(response.message || response.message[0])
            console.log('error in/charger-booking-assign api', response);
        }
      })
    } else {
      postRequestWithToken('/pick-and-drop-assign', obj, async(response) => {
        if (response.code === 200) {
            
            setIsModalOpen(false);
            alert(response.message || response.message[0])
            // fetchList(currentPage, filters);
        } else {
            // toast(response.message, {type:'error'})
            alert(response.message || response.message[0])
            console.log('error in /pick-and-drop-assign api', response);
        }
    })
    }
    

}

  return (
    <div className={styles.addressListContainer}>
      <span className={styles.sectionsTitle}>{title}</span>
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
              <td>{booking.datetime}</td>
              <td>{booking.id}</td>
              {/* {bookingType === 'portableCharger' ? (
                <>
                  <td>{booking.service_name}</td>
                </>
              ) : null} */}
              <td>{booking.price}</td>
              <td>{booking.status}</td>
              <td>{booking?.rsa_name}</td>
              <td>Porsche</td>
              {/* <td>
                <div className={styles.editContent}>
                  <img
                    src={AddAssign}
                    alt="AddAssign"
                    onClick={() => handleAddDriverClick(booking.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </td> */}
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
        driverList={bookingType === 'portableCharger' ? chargerRsaList : valetRsaList}
        bookingId = {selectedBookingId}
        onSelectDriver={handleSelectDriver}
        onAssignDriver={assignDriver}
      />
    </div>
  );
};

export default DeatilsBookingHistory;
