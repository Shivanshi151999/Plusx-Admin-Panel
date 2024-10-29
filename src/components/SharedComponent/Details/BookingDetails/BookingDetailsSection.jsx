import React from 'react'
import styles from '../details.module.css'
import moment from 'moment';


const BookingDetailsSection = ({ titles, content, type }) => {
  return (
    <div className="container-fluid">
      <div className={styles.infoSection}>
        <div className="row">
          {Object.keys(content).map((key) => {
            if (titles[key] && content[key]) {
              return (
                <div className="col-xl-3 col-lg-6 col-12" key={key}>
                  <div className={styles.infoBlock}>
                    <span className={styles.infoHeading}>{titles[key]}</span>
                    <span className={styles.Detailshead}>{content[key]}</span>
                  </div>
                </div>
              );
            }
            return null; // Return null if title or content is missing for this key
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSection