import React from 'react';
import styles from './emergency.module.css'
import { Link } from 'react-router-dom';
import Eye from '../../../assets/images/ViewEye.svg'
import moment from 'moment';
import { getAddressFromLatLong } from '../../../api/Requests'; 

const DriverLocationList = ({history}) => {  // postRequest

    // const getAddrea = (latitude, longitude) => {
    //     getAddressFromLatLong(latitude, longitude, (response) => {
    //         let resp =  response ? response : 'No address found';
    //         console.log(resp)
    //         return resp;
    //     });
    // }
    return (
        <div className={styles.addressListContainer}>
            <span className={styles.sectionTitle}>Location Details</span>
            <table className={`table ${styles.customTable}`}>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Date </th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history?.length > 0 ? (
                        history?.map((item, index) => (
                            <tr key={index}>
                                <td>{ index+1 }</td>
                                <td>{moment(item?.created_at).format('DD MMM YYYY') }</td>
                                <td>{moment(item?.created_at).format('HH:mm A') }</td>
                                <td>
                                    <a href={`https://www.google.com/maps?q=${item?.latitude},${item?.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='linkSection'
                                    >
                                        {'Location View on Map'}
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'start', padding: '10px' }}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    );
};

export default DriverLocationList;