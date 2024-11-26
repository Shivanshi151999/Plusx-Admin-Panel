import React, { useState } from "react";
import styles from "./history.module.css";

const statusMapping = {
    '0': 'Under Maintenance',
    '1': 'In Use',
    '2': 'In Service'
};

const BookingStatusSection = ({deviceId, podStatus}) => {
    
    const [selectedStatus, setSelectedStatus] = useState("In Use");

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    // //statusMapping[deviceDetails?.status] || deviceDetails?.status,
    return (
        <div className={styles.bookingStatusContainer}>
            <div className={styles.bookingStatusHead}>Status</div>
            <div className={styles.statusOptions}>
                {["In Use", "Under Maintenance", "In Service"].map((status) => (
                    <div
                        key={status}
                        className={`${styles.statusOption} ${
                            selectedStatus === status ? styles.active : ""
                        }`}
                        onClick={() => handleStatusChange(status)}
                    >
                        <span
                            className={`${styles.radioSection} ${
                                selectedStatus === status
                                    ? styles.radioSectionActive
                                    : ""
                            }`}
                        >
                            <span
                                className={`${styles.radio} ${
                                    selectedStatus === status
                                        ? styles.radioActive
                                        : ""
                                }`}
                            ></span>
                        </span>
                        <span className={`${styles.statusHead} ${
                                    selectedStatus === status
                                        ? styles.statusHeadActive
                                        : ""
                                }`}>{status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingStatusSection;
