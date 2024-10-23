import React from 'react'
import styles from '../details.module.css'
import moment from 'moment';

const BookingDetailsSection = ({details}) => {
  return (
    <div className="container-fluid">
      <div className={styles.infoSection}>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Booking Status</span>
              <span className={styles.Detailshead}> {details?.booking?.status}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Price</span>
              <span className={styles.Detailshead}> {details?.booking?.service_price}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}> Service Name</span>
              <span className={styles.Detailshead}>{details?.booking?.service_name}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}> Vehicle</span>
              <span className={styles.Detailshead}>{details?.vehicle?.vehicle_model}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}> Service Type</span>
              <span className={styles.Detailshead}>{details?.booking?.service_type}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Service Feature</span>
              <span className={styles.Detailshead}>{details?.booking?.service_feature}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Address</span>
              <span className={styles.Detailshead}>{details?.booking?.address}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Slot Date</span>
              <span className={styles.Detailshead}>{moment(details?.booking?.slot_date).format('DD MMM YYYY h:mm A')}</span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>Slot Time</span>
              <span className={styles.Detailshead}>{details?.booking?.slot_time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsSection