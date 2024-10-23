import React from "react";
import styles from './BookingList/bookinglist.module.css'
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <div className={styles.pdBookingListContainer}>
      <Outlet />
    </div>
  );
};

export default index;
