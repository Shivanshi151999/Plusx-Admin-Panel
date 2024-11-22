import React, { useState } from 'react';
import styles from './bookingdetails.module.css';
import BrandingHistory from './BrandHistory';
import PODChargeHistory from './PODChargeHistory';
import PODZoneHistory from './PODZoneHistory';

const BookingDetailsButtons = ({deviceId, deviceBrandList, currentPage, totalPages, onPageChange}) => {
    const [activeSection, setActiveSection] = useState('brandingHistory');

    return (
        <div>
        <div className={styles.iconContainer}>
            <button 
            className={`${styles.iconButton} ${
                activeSection === 'brandingHistory' ? styles.active : ''
            }`} onClick={() => setActiveSection('brandingHistory')} >
                <span>Branding History</span>
            </button>
            <button
            className={`${styles.iconButton} ${
                activeSection === 'podChargeHistory' ? styles.active : ''
            }`}
            onClick={() => setActiveSection('podChargeHistory')}
            >
                <span>POD Charge History</span>
            </button>
            <button
            className={`${styles.iconButton} ${
                activeSection === 'podZoneHistory' ? styles.active : ''
            }`}
            onClick={() => setActiveSection('podZoneHistory')}
            >
                <span>POD Zone History</span>
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
            {activeSection === 'podChargeHistory' && <PODChargeHistory />}
            {activeSection === 'podZoneHistory' && <PODZoneHistory />}
        </div>
        </div>
    );
};

export default BookingDetailsButtons;
