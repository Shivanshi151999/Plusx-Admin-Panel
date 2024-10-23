import React from 'react';
import styles from './details.module.css'
import Eye from '../../../assets/images/ViewEye.svg'
import Delete from '../../../assets/images/Delete.svg'

const DeatilsBookingHistory = () => {
  const addresses = [
    {
      id: "123456",
      service_name: "E-POD",
      service_type: "on-demand",
      price: "AED 123",
      datetime: "11 OCT 2024 11:15 AM",
      status: "POP Picked Up"

    },
    {
      id: "123456",
      customer_name: "Husaain ji",
      service_name: "E-POD",
      price: "AED 123",
      datetime: "11 OCT 2024 11:15 AM",
      status: "POP Picked Up"

    },
  ];

  return (
    <div className={styles.addressListContainer}>
      <span className={styles.sectionTitle}>Booking History</span>
      <table className={`table ${styles.customTable}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Service Type</th>
            <th>Price</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>{address.id}</td>
              <td>{address.service_name}</td>
              <td>{address.service_type}</td>
              <td>{address.price}</td>
              <td>{address.datetime}</td>
              <td>{address.status}</td>
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