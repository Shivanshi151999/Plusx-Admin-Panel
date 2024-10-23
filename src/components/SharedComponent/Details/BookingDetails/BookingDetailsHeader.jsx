import React from 'react';
import styles from '../details.module.css';
import moment from 'moment';

const BookingDetailsHeader = ({headerDetails}) => {
  console.log('headerDetails',headerDetails);
  
  return (
      <div className={styles.infoCard}>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Person} alt="Person" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Booking ID</span>
                <span className={styles.infoText}> {headerDetails?.booking?.booking_id}</span>
                <span className={styles.infoText}> {moment(headerDetails?.booking?.created_at).format('DD MMM YYYY h:mm A')}</span>
              </div>
            </div>
          </div>  
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Mobile} alt="Mobile" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Customer Details</span>
                <span className={styles.infoText}> {headerDetails?.rider?.rider_name}</span>
                <span className={styles.infoText}> {headerDetails?.rider?.country_code} {headerDetails?.rider?.rider_mobile}</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Email} alt="Email" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Driver Details</span>
                <span className={styles.infoText}>{headerDetails?.driver?.rsa_name}</span>
                <span className={styles.infoText}>{headerDetails?.driver?.country_code} {headerDetails?.driver?.mobile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BookingDetailsHeader;
