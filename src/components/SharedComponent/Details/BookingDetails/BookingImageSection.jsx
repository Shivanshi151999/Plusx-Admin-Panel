import React from 'react'
import styles from '../details.module.css'


// const BookingImageSection = ({ titles, content, type }) => {
//     const baseUrl = content.baseUrl;
    
//     return (
//         <div className={styles.ImageMainSection}>
//             <div className={styles.imageMainContainer}>
//                 <div className={styles.infoSection}>
//                     <div className="col-xl-3 col-lg-6 col-12">
//                         <div className={styles.infoBlock}>
//                             <span className={styles.infoHeading}>{titles.coverImage}</span>
//                             <div className={styles.galleryImages}>
//                                 <img
//                                     src={`${baseUrl}${content.coverImage}`} 
//                                     alt="Cover"
//                                     className={styles.galleryImage}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.infoContainer}>
//                     <div className="col-xl-3 col-lg-6 col-12">
//                         <div className={styles.infoBlock}>
//                             <span className={styles.infoHeading}>{titles.galleryImages}</span>
//                             <div className={styles.galleryImages}>
//                                 {content.galleryImages && content.galleryImages.map((image, index) => (
//                                     <img
//                                         key={index}
//                                         src={`${baseUrl}${image}`}
//                                         alt={`Gallery Image ${index + 1}`}
//                                         className={styles.galleryImage}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


const BookingImageSection = ({ titles, content, type }) => {
    const baseUrl = content.baseUrl;
  
    return (
      <div className={styles.ImageMainSection}>
        <div className={styles.imageMainContainer}>
          <div className={styles.infoSection}>
            <div className="col-xl-3 col-lg-6 col-12">
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.coverImage}</span>
                <div className={styles.galleryImages}>
                  {Array.isArray(content.coverImages) ? (
                    content.coverImages.map((image, index) => (
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Cover Image ${index + 1}`}
                        className={styles.galleryImage}
                      />
                    ))
                  ) : (
                    <img
                      src={`${baseUrl}${content.coverImage}`}
                      alt="Cover"
                      className={styles.galleryImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
  
          <div className={styles.infoContainer}>
            <div className="col-xl-3 col-lg-6 col-12">
              <div className={styles.infoBlock}>
                <span className={styles.infoHeading}>{titles.galleryImages}</span>
                <div className={styles.galleryImages}>
                  {content.galleryImages && content.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                      className={styles.galleryImage}
                    />
                  ))}
                </div>
              </div>
            </div>
  
            {/* Conditionally render Tyre Images section if content.tyreImages exists */}
            {content.tyreImages && content.tyreImages.length > 0 && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>Tyre Images</span>
                  <div className={styles.galleryImages}>
                    {content.tyreImages.map((image, index) => (
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Tyre Image ${index + 1}`}
                        className={styles.galleryImage}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
  
            {/* Conditionally render Other Images section if content.otherImages exists */}
            {content.otherImages && content.otherImages.length > 0 && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>Other Images</span>
                  <div className={styles.galleryImages}>
                    {content.otherImages.map((image, index) => (
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Other Image ${index + 1}`}
                        className={styles.galleryImage}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  

export default BookingImageSection;

