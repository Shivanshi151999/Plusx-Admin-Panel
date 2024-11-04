import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './details.module.css'
import Eye from '../../../assets/images/ViewEye.svg'
import Pagination from '../Pagination/Pagination';


const DeatilsBookingHistory = ({ title, headers, bookingData, bookingType }) => {

  const navigate = useNavigate(); 

  const handleViewClick = (id) => {
    if (bookingType === 'portableCharger') {
      navigate(`/portable-charger/charger-booking-details/${id}`); 
    } else if (bookingType === 'pickAndDrop') {
      navigate(`/pick-and-drop/${id}`); 
    }

  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (bookingData) {
      setTotalPages(Math.ceil(bookingData.length / itemsPerPage));
    }
  }, [bookingData]);

  const currentItems = bookingData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <td>{booking.id}</td>
              {bookingType === 'portableCharger' ? (
                <>
                  <td>{booking.service_name}</td>
                  <td>{booking.service_type}</td>
                </>
              ) : null}
              <td>{booking.price}</td>
              <td>{booking.datetime}</td>
              <td>{booking.status}</td>
              <td>
                <div className={styles.editContent}>
                  <img src={Eye} alt="Eye" 
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
    </div>
  );
};

export default DeatilsBookingHistory;
