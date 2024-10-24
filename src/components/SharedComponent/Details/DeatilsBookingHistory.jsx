import React from 'react';
import styles from './details.module.css'
import Eye from '../../../assets/images/ViewEye.svg'
import Delete from '../../../assets/images/Delete.svg'



const DeatilsBookingHistory = ({ title, headers, bookingData, bookingType }) => {
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
          {bookingData.map((booking, index) => (
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
                  <img src={Eye} alt="Eye" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DeatilsBookingHistory;