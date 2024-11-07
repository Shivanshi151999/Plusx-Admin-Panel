import React from 'react'
import styles from '../details.module.css'


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
                                <img
                                    src={`${baseUrl}${content.coverImage}`} 
                                    alt="Cover"
                                    className={styles.galleryImage}
                                />
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
                </div>
            </div>
        </div>
    );
};

export default BookingImageSection;

