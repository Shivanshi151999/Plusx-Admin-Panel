import React, { useState } from 'react';
import styles from './bookingdetails.module.css';
import BrandingHistory from './BrandHistory';
import PODInput from './PODInput';
import PODOutput from './PODOutput';
import PODBookingList from './PODBookingList';
import PODZoneHistory from './PODZoneHistory';

const BookingDetailsButtons = ({ deviceId, deviceBrandList, currentPage, totalPages, onPageChange }) => {
    const [activeSection, setActiveSection] = useState('brandingHistory');

    return (
        <div className={styles.brandButtonContainer}>
            <span className={styles.brandMainHeading}>History</span>
            <div className={styles.iconContainer}>
                <button
                    className={`${styles.iconButton} ${activeSection === 'brandingHistory' ? styles.active : ''
                        }`} onClick={() => setActiveSection('brandingHistory')} >
                    <span>Branding</span>
                </button>
                <button
                    className={`${styles.iconButton} ${activeSection === 'podInputHistory' ? styles.active : ''}`}
                    onClick={() => setActiveSection('podInputHistory')}
                >
                    <span>POD Input</span>
                </button>
                <button
                    className={`${styles.iconButton} ${activeSection === 'podOutputHistory' ? styles.active : ''}`}
                    onClick={() => setActiveSection('podOutputHistory')}
                >
                    <span>POD Output</span>
                </button>
                <button
                    className={`${styles.iconButton} ${activeSection === 'podZoneHistory' ? styles.active : ''
                        }`}
                    onClick={() => setActiveSection('podZoneHistory')}
                >
                    <span>POD Zone</span>
                </button>
                <button
                    className={`${styles.iconButton} ${activeSection === 'podBookingList' ? styles.active : ''}`}
                    onClick={() => setActiveSection('podBookingList')}
                >
                    <span>Booking List</span>
                </button>
            </div>
            <div className={styles.sectionContent}>
                {activeSection === 'brandingHistory' &&
                    <BrandingHistory
                        deviceId={deviceId}
                        deviceBrandList={deviceBrandList}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                }
                {activeSection === 'podInputHistory' && <PODInput />}
                {activeSection === 'podOutputHistory' && <PODOutput />}
                {activeSection === 'podZoneHistory' && <PODZoneHistory />}
                {activeSection === 'podBookingList' && <PODBookingList />}
            </div>
        </div>
    );
};

export default BookingDetailsButtons;
