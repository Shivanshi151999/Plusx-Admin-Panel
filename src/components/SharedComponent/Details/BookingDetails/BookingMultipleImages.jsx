import React from 'react'
import styles from '../details.module.css'
import { AiOutlineClose } from 'react-icons/ai';

const BookingMultipleImages = ({ titles, content, type, onDeleteImage }) => {
  const baseUrl = content.baseUrl;
  
  const galleryImagesWithIds =
  Array.isArray(content?.galleryImages) && Array.isArray(content?.galleryImagesId)
    ? content.galleryImages.map((image, index) => ({
        image,
        id: content.galleryImagesId[index],
      }))
    : []; 

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
                  {/* {content.galleryImages.map((image, index) => (
                    <div className={styles.imageContainer}  key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Gallery img ${index + 1}`}
                        className={styles.gallerymultipleImage}
                      />  
                      <button type="button" className={styles.galleryImagesCloseButton}>
                        <AiOutlineClose size={20} style={{ padding: '2px' }} />
                      </button>
                    </div>
                  ))}*/}

                  {galleryImagesWithIds.length > 0 ? (
                    galleryImagesWithIds.map(({ image, id }, index) => (
                      <div className={styles.imageContainer} key={index}>
                        <img
                          src={`${baseUrl}${image}`}
                          alt={`Gallery img ${index + 1}`}
                          className={styles.gallerymultipleImage}
                        />
                        <button type="button" className={styles.galleryImagesCloseButton} onClick={() => onDeleteImage(id)}>
                          <AiOutlineClose size={20} style={{ padding: '2px' }} />
                        </button>
                      </div>
                    ))
                  ) : (
                    content.galleryImages.map((image, index) => (
                      <div className={styles.imageContainer} key={index}>
                        <img
                          src={`${baseUrl}${image}`}
                          alt={`Gallery img ${index + 1}`}
                          className={styles.gallerymultipleImage}
                        />
                        <button type="button" className={styles.galleryImagesCloseButton}>
                          <AiOutlineClose size={20} style={{ padding: '2px' }} />
                        </button>
                      </div>
                    ))
                  )}
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
                     <div className={styles.imageContainer} key={index}>
                        <img
                          key={index}
                          src={`${baseUrl}${image}`}
                          alt={`Gallery img ${index + 1}`}
                        className={styles.gallerymultipleImage}
                        />
                      </div>
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
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Gallery img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
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
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Gallery img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
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
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Gallery img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
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
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Gallery img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conditionally render Tyre Images section if content.tyreImages is an array */}
          {Array.isArray(content.tyreImages) && content.tyreImages.length > 0 && (
            <div className="col-12">
              <div className={styles.multipleinfoBlock}>
                <span className={styles.multipleinfoHeading}>{titles.tyreImages}</span>
                <div className={styles.multiplegalleryImages}>
                  {content.tyreImages.map((image, index) => (
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Tyre img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
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
                    <div className={styles.imageContainer} key={index}>
                      <img
                        key={index}
                        src={`${baseUrl}${image}`}
                        alt={`Other img ${index + 1}`}
                      className={styles.gallerymultipleImage}
                      />
                    </div>
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

export default BookingMultipleImages;
