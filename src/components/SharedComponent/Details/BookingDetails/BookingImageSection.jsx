import React from 'react'
import styles from '../details.module.css'
import Image1 from '../../../../assets/images/Offer 1.png'
import Image2 from '../../../../assets/images/Offer 2_1x.png'
import Image3 from '../../../../assets/images/Frame 1.png'
import moment from 'moment';

const BookingImageSection = () => {
    return (
       <div className={styles.ImageMainSection}>
        <div className="container-fluid">
            <div className={styles.infoSection}>
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>Cover Image</span>
                            <div className={styles.galleryImages}>

                                <img
                                    src={Image1}
                                    className={styles.galleryImage}
                                />

                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={styles.infoContainer}>
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>Station Gallary</span>
                            <div className={styles.galleryImages}>

                                <img
                                    src={Image1}
                                    className={styles.galleryImage}
                                />
                                <img
                                    src={Image2}
                                    className={styles.galleryImage}
                                />
                                <img
                                    src={Image3}
                                    className={styles.galleryImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            )
}

            export default BookingImageSection