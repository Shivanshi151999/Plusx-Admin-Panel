import React from 'react'
import styles from '../details.module.css'
import moment from 'moment';

// const BookingDetailsSection = ({titles,content, type }) => {
//   return (
//     <div className="container-fluid">
//       <div className={styles.infoSection}>
//         <div className="row">
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.bookingStatus}</span>
//               <span className={styles.Detailshead}> {content.bookingStatus}</span>
//             </div>
//           </div>
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.price}</span>
//               <span className={styles.Detailshead}> {content.price}</span>
//             </div>
//           </div>
        

//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}> {titles.serviceName}</span>
//               <span className={styles.Detailshead}>{content.serviceName}</span>
//             </div>
//           </div>
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}> {titles.serviceType}</span>
//               <span className={styles.Detailshead}>{content.serviceType}</span>
//             </div>
//           </div>
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.serviceFeature}</span>
//               <span className={styles.Detailshead}>{content.serviceFeature}</span>
//             </div>
//           </div>
         
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}> {titles.vehicle}</span>
//               <span className={styles.Detailshead}>{content.vehicle}</span>
//             </div>
//           </div>
          
          
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.address}</span>
//               <span className={styles.Detailshead}>{content.address}</span>
//             </div>
//           </div>
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.slotDate}</span>
//               <span className={styles.Detailshead}>{content?.slotDate}</span>
//             </div>
//           </div>
//           <div className="col-xl-3 col-lg-6 col-12">
//             <div className={styles.infoBlock}>
//               <span className={styles.infoHeading}>{titles.slotTime}</span>
//               <span className={styles.Detailshead}>{content?.slotTime}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

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