import React from 'react';
import styles from './emergency.module.css'
import Eye from '../../../assets/images/ViewEye.svg'
import Delete from '../../../assets/images/Delete.svg'

const EmergencyList = ({history}) => {
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
                {history && history.length > 0 ? (
                    history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.vehiclename}</td>
                            <td>{item.status}</td>
                            <td>
                                <div className={styles.editContent}>
                                    <img src={Eye} alt="Eye" />
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'start', padding: '10px' }}>
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>

            </table>
        </div>
    );
};

export default EmergencyList;