import React from 'react';
import styles from './details.module.css';
import '../../../assets/css/main.css';
import Person from '../../../assets/images/Person.svg'
import Mobile from '../../../assets/images/Mobile.svg'
import Email from '../../../assets/images/Email.svg'
import DateofBirth from '../../../assets/images/DateofBirth.svg'
import moment from 'moment';

const RiderInfo = ({headerDetails}) => {
  return (
      <div className={styles.infoCard}>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                <img src={Person} alt="Person" />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Customer Name</span>
                <span className={styles.infoText}> {headerDetails?.rider_name}</span>
              </div>
            </div>
          </div>  
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                <img src={Mobile} alt="Mobile" />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Mobile No</span>
                <span className={styles.infoText}> {headerDetails?.country_code} {headerDetails?.rider_mobile}</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                <img src={Email} alt="Email" />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Email</span>
                <span className={styles.infoText}>{headerDetails?.rider_email}</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className={styles.detailsHeaderSection}>
              <div className={styles.detailsImageSection}>
                <img src={DateofBirth} alt="DateofBirth" />
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>Date of Birth</span>
                <span className={styles.infoText}>{moment(headerDetails?.date_of_birth).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RiderInfo;
