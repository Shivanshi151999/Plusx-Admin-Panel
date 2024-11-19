import React from 'react';
import styles from './bookingdetails.module.css';

const BookingDetailsButtons = () => {
  return (
    <div className={styles.iconContainer}>
      <button className={styles.iconButton}>
        <span>Branding History</span>
      </button>
      <button className={styles.iconButton}>
        <span>POD Charge History</span>
      </button>
      <button className={styles.iconButton}>
        <span>POD Zone History</span>
      </button>
    </div>
  );
};

export default BookingDetailsButtons;
