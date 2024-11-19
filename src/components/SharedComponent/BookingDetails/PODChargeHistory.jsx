import React from 'react';
import BookingDetailsAccordion from './BookingDetailsAccordion';
import styles from './history.module.css';

const PODChargeHistory = () => {
    const podHistory = [
        { campaign: 'Campaign 1', amount: '₹500', details: 'Details of Campaign 1' },
        { campaign: 'Campaign 2', amount: '₹300', details: 'Details of Campaign 2' },
    ];

    return (
        <div className={styles.addressListContainer}>
            <BookingDetailsAccordion
                history={podHistory}
                title ='POD Data'
                headerText="POD Charge History"
            />
        </div>
    );
};

export default PODChargeHistory;

