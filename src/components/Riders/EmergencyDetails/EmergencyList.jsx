import React from 'react';
import styles from './emergency.module.css'
import { Link } from 'react-router-dom';
import Eye from '../../../assets/images/ViewEye.svg'
import moment from 'moment';

const portableChargerStatusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'ER': 'Enroute',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'VP': 'Vehicle Pickup',
    'RS': 'Reached Charging Spot',
    'WC': 'Work Completed',
    'DO': 'Drop Off',
    'C': 'Cancel',
};

const pickDropStatusMapping = {
    'CNF': 'Booking Confirmed',
    'A': 'Assigned',
    'RL': 'POD Reached at Location',
    'CS': 'Charging Started',
    'CC': 'Charging Completed',
    'PU': 'POD Picked Up',
    'WC': 'Work Completed',
    'C': 'Cancel'
};

const EmergencyList = ({history, bookingType}) => {

    const statusMapping =
        bookingType === 'Portable Charger'
            ? portableChargerStatusMapping
            : pickDropStatusMapping;
    
    return (
        <div className={styles.addressListContainer}>
            <span className={styles.sectionTitle}>Order Details</span>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Booking ID</th>
                        <th>Customer Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {history && history?.length > 0 ? (
                    history?.map((item, index) => (
                        <tr key={index}>
                             <td>{moment(item?.created_at).format('DD MMM YYYY') }</td>
                            <td>{item?.booking_id || item?.request_id}</td>
                            <td>{item?.name}</td>
                            <td>{item?.price ? `${item?.price} AED` : '' }</td>
                            <td>{statusMapping[item?.order_status] || 'Unknown Status'}</td>
                            <td>
                                <div className={styles.editContent}>
                                    {bookingType === 'Valet Charging' ? (
                                            <Link to={`/pick-and-drop/booking-details/${item?.request_id}`}>
                                                <img src={Eye} alt="View" />
                                            </Link>
                                        ) : (
                                            <Link to={`/portable-charger/charger-booking-details/${item?.booking_id}`}>
                                                <img src={Eye} alt="View" />
                                            </Link>
                                        )}
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