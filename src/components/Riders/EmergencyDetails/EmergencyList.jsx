import React from 'react';
import styles from './emergency.module.css'
import Eye from '../../../assets/images/ViewEye.svg'
import Delete from '../../../assets/images/Delete.svg'

const EmergencyList = ({details}) => {
    const addresses = [
        {
            id: "RIOT Experience Center",
            date: "Production City",
            vehiclename: "Production City",
            status: "0000",
        },
        {
            id: "RIOT Experience Center",
            date: "Production City",
            vehiclename: "Production City",
            status: "0000",
        },

    ];
    return (
        <div className={styles.addressListContainer}>
            <span className={styles.sectionTitle}>Order Details</span>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Vehicle Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) => (
                        <tr key={index}>
                            <td>{address.id}</td>
                            <td>{address.date}</td>
                            <td>{address.vehiclename}</td>
                            <td>{address.status}</td>
                            <td>
                                <div className={styles.editContent}>
                                   <img src={Eye} alt="Eye" />
                                    <img src={Delete} alt='delete' />

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmergencyList;