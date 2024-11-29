import React from 'react'
import styles from '../details.module.css'

const BookingMultipleImages = ({ titles, content, type }) => {
  const baseUrl = content.baseUrl;
  return (
    <div className={styles.multipleImageMainSection}>
      <div className={styles.multipleimageMainContainer}>
        <div className={styles.multipleinfoContainer}>
          {/* Display gallery images only if it's an array */}
          {Array.isArray(content.galleryImages) && (
            <div className="col-12">
              <div className={styles.multiplemultipleinfoBlock}>
                <span className={styles.multiplemultipleinfoHeading}>{titles.galleryImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                      className={styles.gallerymultipleImage}
                    />  
                  ))}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(content.vehicleRegImages) && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.vehicleRegImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.vehicleRegImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(content.carImages) && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.carImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.carImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(content.licenseImages) && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.licenseImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.licenseImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(content.typeImages) && content.typeImages.length > 0 ? (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.typeImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.typeImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // If no images are available, show the dummy image
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.typeImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {/* <img
          src="" 
          alt="no image"
         className={styles.gallerymultipleImage}
        /> */}
                  {/* <p>Image not available</p> */}
                </div>
              </div>
            </div>
          )}


          {Array.isArray(content.emiratesImages) && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.emiratesImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.emiratesImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Gallery Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* Conditionally render Tyre Images section if content.tyreImages is an array */}
          {Array.isArray(content.tyreImages) && content.tyreImages.length > 0 && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>Tyre Images</span>
                <div className={styles.multiplegalleryImages}>
                  {content.tyreImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Tyre Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conditionally render Other Images section if content.otherImages is an array */}
          {Array.isArray(content.otherImages) && content.otherImages.length > 0 && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>Other Images</span>
                <div className={styles.multiplegalleryImages}>
                  {content.otherImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`Other Image ${index + 1}`}
                     className={styles.gallerymultipleImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingMultipleImages
