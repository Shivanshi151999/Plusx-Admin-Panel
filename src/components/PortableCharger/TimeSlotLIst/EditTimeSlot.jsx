import React, { useEffect, useState } from 'react';
import styles from './addtimeslot.module.css';
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';

const EditPortableChargerTimeSlot = () => {

    const {slotId} = useParams()
    const [slotDetails, setSlotDetails] = useState()
  
  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        slot_id : slotId
    };

    postRequestWithToken('charger-slot-details', obj, (response) => {
        if (response.code === 200) {
            setSlotDetails(response?.data || {});  
        } else {
            console.log('error in charger-slot-details API', response);
        }
    });
};

  useEffect(() => {
    fetchDetails();
  }, []);

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Edit Slot</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <input className={styles.inputCharger} type="text" placeholder="Start Time" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            <input className={styles.inputCharger} type="text" placeholder="End Time" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Booking Limit</label>
                            <input className={styles.inputCharger} type="text" placeholder="Enter Booking Limit" />
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.cancelBtn} type="button">Cancel</button>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPortableChargerTimeSlot;
