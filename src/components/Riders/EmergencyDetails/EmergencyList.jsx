import React from 'react';
import styles from './emergency.module.css'
import { Link } from 'react-router-dom';
import Eye from '../../../assets/images/ViewEye.svg'
import moment from 'moment';

    const pickDropStatusMapping = {
        'PU' : 'POD Picked Up',
        'WC' : 'Work Completed',
        'C'  : 'Cancel'
    };
    const EmergencyList = ({history, bookingType}) => {

        return (
            <div className={styles.addressListContainer}>
                <span className={styles.sectionTitle}>Booking Details</span>
                <table className={`table ${styles.customTable}`}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            {/* <th>Price</th> */}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history && history?.length > 0 ? (
                            history?.map((item, index) => (
                                <tr key={index}>
                                    <td>{moment(item?.created_at).format('DD MMM YYYY') }</td>
                                    <td>{item?.request_id }</td>
                                    <td>{item?.user_name}</td>
                                    {/* <td>{item?.price ? `${item?.price} AED` : '' }</td> */}
                                    <td>{pickDropStatusMapping[item?.order_status] || 'Confirmed'}</td>
                                    <td>
                                        <div className={styles.editContent}>
                                            {bookingType === 'Valet Charging' ? (
                                                    <Link to={`/pick-and-drop/booking-details/${item?.request_id}`}>
                                                        <img src={Eye} alt="View" />
                                                    </Link>
                                                ) : (
                                                    <Link to={`/portable-charger/charger-booking-details/${item?.request_id}`}>
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