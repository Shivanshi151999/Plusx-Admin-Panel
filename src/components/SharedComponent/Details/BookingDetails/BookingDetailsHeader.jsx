import React from 'react';
import styles from '../details.module.css';
import moment from 'moment';

const BookingDetailsHeader = ({content, titles, type}) => {
  
  return (
      <div className={styles.infoCard}>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Person} alt="Person" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles?.bookingIdTitle}</span>
                <span className={styles.infoText}> {content?.bookingId}</span>
                <span className={styles.infoText}> {content?.createdAt}</span>
              </div>
            </div>
          </div>  
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Mobile} alt="Mobile" /> */}
              </div>
              
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.customerDetailsTitle}</span>
                <span className={styles.infoText}> {content.customerName}</span>
                <span className={styles.infoText}> {content.customerContact}</span>
              </div>
            </div>
          </div>
          {
                type === 'portableChargerBooking' && (
                <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Email} alt="Email" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.driverDetailsTitle}</span>
                <span className={styles.infoText}>{content.driverName}</span>
                <span className={styles.infoText}>{content.driverContact}</span>
              </div>
            </div>
          </div>
              )}
          
        </div>
      </div>
  );
};

export default BookingDetailsHeader;
