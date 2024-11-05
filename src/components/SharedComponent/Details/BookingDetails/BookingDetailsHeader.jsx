import React from 'react';
import styles from '../details.module.css';
import moment from 'moment';
const BookingDetailsHeader = ({ content, titles, sectionContent, type }) => {
  console.log('sectionContent',sectionContent);
  
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
              <span className={styles.infoHeadText}>{content?.bookingId}</span>
              <span className={styles.infoText}>{content?.createdAt}</span>
            </div>
          </div>
        </div>
        
        {type !== 'publicChargingStation' && (
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}></div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.customerDetailsTitle}</span>
                <span className={styles.infoHeadText}>{content.customerName}</span>
                <span className={styles.infoText}>{content.customerContact}</span>
              </div>
            </div>
          </div>
        )}

        {type === 'portableChargerBooking' && sectionContent?.bookingStatus !== 'Booking Confirmed' && (
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Email} alt="Email" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.driverDetailsTitle}</span>
                <span className={styles.infoHeadText}>{content.driverName}</span>
                <span className={styles.infoText}>{content.driverContact}</span>
              </div>
            </div>
          </div>
        )}

        {type === 'publicChargingStation' && (
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Email} alt="Email" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.stationDetailsTitle}</span>
                <span className={styles.infoHeadText}>Station Name: {content.stationName}</span>
                <span className={styles.infoText}>Charger Type: {content.chargerType}</span>
                <span className={styles.infoText}>Charging For: {content.chargingFor}</span>
              </div>
            </div>
          </div>
        )}

        {type === 'publicChargingStation' && (
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                {/* <img src={Email} alt="Email" /> */}
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.feeDetailsTitle}</span>
                <span className={styles.infoHeadText}>Price: {content.price}</span>
                <span className={styles.infoText}>Charging Point: {content.chargingPoint}</span>
                <span className={styles.infoText}>Status: {content.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default BookingDetailsHeader;
