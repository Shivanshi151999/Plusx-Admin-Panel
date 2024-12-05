import React from 'react';
import styles from '../details.module.css';

const BookingDetailsHeader = ({ content, titles, sectionContent1, type, deviceBatteryData }) => {
    
    return (
        <div className={styles.infoCard}>
            <div className="row">
                <div className="col-xl-3 col-lg-6 col-12">
                    <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Person} alt="Person" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles?.bookingIdTitle}</span>
                            <span className={styles.infoHeadText}>{content?.bookingId}</span>
                            <span className={styles.infoText}>{content?.createdAt}</span>
                        </div>
                    </div>
                </div>
                
                {type !== 'publicChargingStation' && type !== 'evGuide' && type !== 'electricCarLeasing'
                 && type !== 'electricBikeLeasing'  && type !== 'buySell' && type !== 'discussionBoard'  && type !== 'shop' &&(
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}></div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.customerDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.customerName}</span>
                            <span className={styles.infoText}>{content.customerContact}</span>
                        </div>
                        </div>
                    </div>
                )}

                { (type === 'portableChargerBooking' || type === 'pickAndDropBooking') && sectionContent1?.bookingStatus !== 'Booking Confirmed' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Email} alt="Email" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.driverDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.driverName}</span>
                            <span className={styles.infoText}>{content.driverContact}</span>
                        </div>
                        </div>
                    </div>
                )}

                {type === 'publicChargingStation' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Email} alt="Email" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.stationDetailsTitle}</span>
                            <span className={styles.infoHeadText}>Station Name: {content.stationName}</span>
                            {/* <span className={styles.infoText}>Charger Type: {content.chargerType}</span>
                            <span className={styles.infoText}>Charging For: {content.chargingFor}</span> */}
                        </div>
                        </div>
                    </div>
                )}

                {type === 'publicChargingStation' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Email} alt="Email" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.feeDetailsTitle}</span>
                            <span className={styles.infoHeadText}>Price: {content.price}</span>
                            <span className={styles.infoText}>Charging Point: {content.chargingPoint}</span>
                        </div>
                        </div>
                    </div>
                )}

                {type === 'evGuide' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.stationDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.stationName}</span>
                        </div>
                        </div>
                    </div>
                )}

               {(type === 'electricCarLeasing' || type === 'electricBikeLeasing') && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.stationDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.stationName}</span>
                        </div>
                        </div>
                    </div>
                )}

               {(type == 'buySell' || type === 'discussionBoard')  &&(
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}></div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.customerDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.customerName}</span>
                            <span className={styles.infoText}>{content.customerContact}</span>
                        </div>
                        </div>
                    </div>
                )}

                {type === 'buySell' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Email} alt="Email" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.vehicleDetailsTitle}</span>
                            <span className={styles.infoHeadText}>{content.vehicleId}</span>
                            <span className={styles.infoText}>{content.vehicleModel}</span>
                            {/* <span className={styles.infoText}>Status: {content.status}</span> */}
                        </div>
                        </div>
                    </div>
                )}

                {type === 'shop' && (
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                        <div className={styles.detailsImageSection}>
                            {/* <img src={Email} alt="Email" /> */}
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoHeading}>{titles.shopDetailsTitle}</span>
                            <span className={styles.infoHeadText}>Shop Name: {content.shopName}</span>
                            <span className={styles.infoHeadText}>Contact No: {content.contact || 'N/A'}</span>
                            {/* <span className={styles.infoText}>Charger Type: {content.chargerType}</span>
                            <span className={styles.infoText}>Charging For: {content.chargingFor}</span> */}
                        </div>
                        </div>
                    </div>
                )}

                { (type === 'PODDeviceDetails' ) && (
                    <>
                
                    {/* { deviceBatteryData.map((value, index) => (
                          
                        <div className="col-xl-3 col-lg-6 col-12">
                            <div className={styles.detailsHeaderSection}>
                                <div className={styles.detailsImageSection}> </div>
                                <div className={styles.infoBlock}>
                                    <span className={styles.infoHeading}>Current1</span>
                                    <span className={styles.infoHeadText}>{value.current}</span>
                                </div>
                            </div>
                        </div>
                    ))} */}

                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                            <div className={styles.detailsImageSection}>
                               
                            </div>
                            <div className={styles.infoBlock}>
                                <span className={styles.infoHeading}>{titles.driverDetailsTitle}</span>
                                <span className={styles.infoHeadText}>{content.driverName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-12">
                        <div className={styles.detailsHeaderSection}>
                            <div className={styles.detailsImageSection}>
                                
                            </div>
                            <div className={styles.infoBlock}>
                                <span className={styles.infoHeading}>{titles.podTemp}</span>
                                <span className={styles.infoHeadText}>{content.podTemp}</span>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};


export default BookingDetailsHeader;
