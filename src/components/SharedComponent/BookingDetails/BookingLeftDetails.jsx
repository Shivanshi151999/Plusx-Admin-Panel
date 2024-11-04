import React from 'react';
import styles from './bookingdetails.module.css'

const BookingLeftDetails = () => {
  return (
    <div className='col-xl-4 col-lg-6 col-12'>
    <div className={styles.bookingStatusContainer}>
      <div className={styles.bookingDetails}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Booking Status:</span>
          <span className={styles.value}>Booking Confirmed</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Price:</span>
          <span className={styles.value}>0</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Service Name:</span>
          <span className={styles.value}>E Pod</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Vehicle:</span>
          <span className={styles.value}>Cybertruck-TESLA</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Service Type:</span>
          <span className={styles.value}>On Demand Service</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Service Feature:</span>
          <span className={styles.value}>For AED 0 Per Charger</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>Office, 123, Zabeel2, Dubai</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Slot Date:</span>
          <span className={styles.value}>2024-10-25</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Slot Time:</span>
          <span className={styles.value}>13:00:00</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingLeftDetails;
