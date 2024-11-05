import React from 'react';
import styles from './bookingdetails.module.css'


const BookingLeftDetails = ({ titles, content }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-12">
      <div className={styles.bookingStatusContainer}>
        <div className={styles.bookingDetails}>
          {Object.keys(content).map((key) => (
            <div className={styles.detailItem} key={key}>
              <span className={styles.label}>{titles[key] || key}:</span>
              <span className={styles.value}>{content[key] || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

//     <div className="col-xl-4 col-lg-6 col-12">
//     <div className={styles.bookingStatusContainer}>
//         <div className={styles.bookingDetails}>
//             {Object.keys(content).map((key) => (
//                 <div className={styles.detailItem} key={key}>
//                     <span className={styles.label}>{titles[key] || key}:</span>
//                     {key === 'coverImage' ? (
//                         <img src={content[key]} alt="Cover Gallery" className={styles.image} />
//                     ) : key === 'galleryImages' ? (
//                         <div className={styles.galleryContainer}>
//                             {content[key] && content[key].map((image, index) => (
//                                 <img key={index} src={image} alt={`Station Gallery ${index + 1}`} className={styles.image} />
//                             ))}
//                         </div>
//                     ) : (
//                         <span className={styles.value}>{content[key] || 'N/A'}</span>
//                     )}
//                 </div>
//             ))}
//         </div>
//     </div>
// </div>
  );
};


export default BookingLeftDetails;
