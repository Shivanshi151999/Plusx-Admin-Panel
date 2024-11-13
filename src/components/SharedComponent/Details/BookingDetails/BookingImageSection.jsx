import React from 'react'
import styles from '../details.module.css'


const BookingImageSection = ({ titles, content, type }) => {
    const baseUrl = content.baseUrl;
  
    return (
      <div className={styles.ImageMainSection}>
        <div className={styles.imageMainContainer}>
          {/* <div className={styles.infoSection}>
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
                      className={styles.galleryImages}
                    />
                  )}
                </div>
              </div>
            </div>
          </div> */}
 <div className={styles.infoSection}>
  {/* Check if coverImages is an array and has elements */}
  {Array.isArray(content.coverImages) && content.coverImages.length > 0 ? (
    <div className="col-xl-3 col-lg-6 col-12">
      <div className={styles.infoBlock}>
        <span className={styles.infoHeading}>{titles.coverImage}</span>
        <div className={styles.galleryImages}>
          {content.coverImages.map((image, index) => (
            <img
              key={index}
              src={`${baseUrl}${image}`}
              alt={`Cover Image ${index + 1}`}
              className={styles.galleryImage}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null}

  {/* Check if coverImage exists and show it if present */}
  {content.coverImage ? (
    <div className="col-xl-3 col-lg-6 col-12">
      <div className={styles.infoBlock}>
        <span className={styles.infoHeading}>{titles.coverImage}</span>
        <div className={styles.galleryImages}>
          <img
            src={`${baseUrl}${content.coverImage}`}
            alt="Cover"
            className={styles.galleryImage}
          />
        </div>
      </div>
    </div>
  ) : null}
</div>

          <div className={styles.infoContainer}>
            {/* Display gallery images only if it's an array */}
            {Array.isArray(content.galleryImages) && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>{titles.galleryImages}</span>
                  <div className={styles.galleryImages}>
                    {content.galleryImages.map((image, index) => (
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
            )}

           {Array.isArray(content.vehicleRegImages) && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>{titles.vehicleRegImages}</span>
                  <div className={styles.galleryImages}>
                    {content.vehicleRegImages.map((image, index) => (
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
            )}

{Array.isArray(content.carImages) && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>{titles.carImages}</span>
                  <div className={styles.galleryImages}>
                    {content.carImages.map((image, index) => (
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
            )}

           {Array.isArray(content.licenseImages) && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>{titles.licenseImages}</span>
                  <div className={styles.galleryImages}>
                    {content.licenseImages.map((image, index) => (
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
            )}

{Array.isArray(content.typeImages) && content.typeImages.length > 0 ? (
  <div className="col-xl-3 col-lg-6 col-12">
    <div className={styles.infoBlock}>
      <span className={styles.infoHeading}>{titles.typeImages}</span>
      <div className={styles.galleryImages}>
        {content.typeImages.map((image, index) => (
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
) : (
  // If no images are available, show the dummy image
  <div className="col-xl-3 col-lg-6 col-12">
    <div className={styles.infoBlock}>
      <span className={styles.infoHeading}>{titles.typeImages}</span>
      <div className={styles.galleryImages}>
        {/* <img
          src="" 
          alt="no image"
          className={styles.galleryImage}
        /> */}
        {/* <p>Image not available</p> */}
      </div>
    </div>
  </div>
)}


            {Array.isArray(content.emiratesImages) && (
              <div className="col-xl-3 col-lg-6 col-12">
                <div className={styles.infoBlock}>
                  <span className={styles.infoHeading}>{titles.emiratesImages}</span>
                  <div className={styles.galleryImages}>
                    {content.emiratesImages.map((image, index) => (
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
            )}
            
  
            {/* Conditionally render Tyre Images section if content.tyreImages is an array */}
            {Array.isArray(content.tyreImages) && content.tyreImages.length > 0 && (
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
  
            {/* Conditionally render Other Images section if content.otherImages is an array */}
            {Array.isArray(content.otherImages) && content.otherImages.length > 0 && (
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



