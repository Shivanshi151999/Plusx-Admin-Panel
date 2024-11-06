import React from 'react';
import styles from './bookingdetails.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingLeftDetails = ({ titles, content }) => {
    return (
        <div className="col-xl-12">
            <div className={styles.bookingStatusContainer}>
                <div className="row"> {/* Added Bootstrap row here */}
                {Object.keys(content).map((key) => (
                    <div className={`${styles.detailItem} col-xl-4 col-md-6 col-12`} key={key}>
                    <span className={styles.label}>{titles[key] || key}</span>
                    <span className={styles.value}>{content[key] || 'N/A'}</span>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};
export default BookingLeftDetails;
