import React, { useEffect, useState } from 'react';
import styles from './addslot.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

dayjs.extend(isSameOrAfter);

const EditEvPreSaleTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const { slotId } = useParams();
    const navigate = useNavigate();
    
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");
    const [errors, setErrors] = useState({});
    const [slotDetails, setSlotDetails] = useState();

    const fetchDetails = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            slot_id: slotId
        };

        postRequestWithToken('pick-and-drop-slot-details', obj, (response) => {
            if (response.code === 200) {
                const data = response.data || {};
                setSlotDetails(data);
                setStartDate(data.slot_date);
                setStartTime(moment(data.start_time, 'HH:mm:ss').format('HH:mm'));
                setEndTime(moment(data.end_time, 'HH:mm:ss').format('HH:mm'));
                setBookingLimit(data.booking_limit || "");
                setIsActive(data.status)
            } else {
                console.log('error in pick-and-drop-slot-details API', response);
            }
        });
    };

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchDetails();
    }, []);

    const handleCancel = () => {
        navigate('/ev-pre-sales-testing/time-slot-list');
    };

    const handleStartTimeChange = (e) => {
        const formattedTime = e.target.value; 
        setStartTime(formattedTime);
        setErrors((prev) => ({ ...prev, startTime: "" }));
    };

    const handleEndTimeChange = (e) => {
        const formattedTime = e.target.value; 
        setEndTime(formattedTime);
        setErrors((prev) => ({ ...prev, endTime: "" }));
    };

    const handleBookingLimitChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setBookingLimit(value);
            setErrors((prev) => ({ ...prev, bookingLimit: "" }));
        }
    };
    

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};
        const now = dayjs();

        if (!startDate) {
            newErrors.startDate = "Date is required";
            formIsValid = false;
        } 
        if (!startTime) {
            newErrors.startTime = "Start time is required";
            formIsValid = false;
        } 
        if (!endTime) {
            newErrors.endTime = "End time is required";
            formIsValid = false;
        } 

        if (!bookingLimit) {
            newErrors.bookingLimit = "Booking limit is required";
            formIsValid = false;
        } else if (isNaN(bookingLimit) || bookingLimit <= 0) {
            newErrors.bookingLimit = "Booking limit must be a positive number";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const obj = {
                userId: userDetails?.user_id,
                email: userDetails?.email,
                slot_id: slotId,
                status: isActive ? "1" : "0",
                slot_date: moment(startDate).format('DD-MM-YYYY'),
                // slot_date: startDate,
                start_time: startTime ,
                end_time: endTime ,
                booking_limit: bookingLimit
            };

            postRequestWithToken('ev-pre-sale-edit-time-slot-list', obj, (response) => {
                if (response.code === 200) {
                    toast(response.message[0] || response.message, { type: "success" });
                   
                    setTimeout(() => {
                        navigate('/ev-pre-sales-testing/time-slot-list');
                    },2000)
                } else {
                    console.log('error in ev-pre-sale-edit-time-slot-list API', response);
                }
            });
        }
    };

    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.containerCharger}>
             <ToastContainer/>
            <h2 className={styles.title}>Edit Slot</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Date Picker</label>
                            <DatePicker
                                className={styles.inputCharger}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            {errors.startDate && <span className={styles.error} style={{ color: 'red' }}>{errors.startDate}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <input
                                type="text"
                                className={styles.inputCharger}
                                value={startTime}
                                onChange={handleStartTimeChange}
                                placeholder="HH:MM"
                            />
                            {errors.startTime && <span className={styles.error} style={{ color: 'red' }}>{errors.startTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            <input
                                type="text"
                                className={styles.inputCharger}
                                value={endTime}
                                onChange={handleEndTimeChange}
                                placeholder="HH:MM"
                            />
                            {errors.endTime && <span className={styles.error} style={{ color: 'red' }}>{errors.endTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Booking Limit</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Enter Booking Limit"
                                value={bookingLimit}
                                onChange={handleBookingLimitChange}
                            />
                            {errors.bookingLimit && <span className={styles.error} style={{ color: 'red' }}>{errors.bookingLimit}</span>}
                        </div>
                    </div>
                    <div className={styles.toggleContainer}>
                        <label className={styles.statusLabel}>Status</label>
                        <div className={styles.toggleSwitch} onClick={handleToggle}>
                            <span className={`${styles.toggleLabel} ${!isActive ? styles.inactive : ''}`}>
                            In-Active
                            </span>
                            <div className={`${styles.toggleButton} ${isActive ? styles.active : ''}`}>
                                <div className={styles.slider}></div>
                            </div>
                            <span className={`${styles.toggleLabel} ${isActive ? styles.active : ''}`}>
                                Active
                            </span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.cancelBtn} type="button" onClick={handleCancel}>Cancel</button>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvPreSaleTimeSlot;