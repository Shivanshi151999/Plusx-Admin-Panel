import React, { useEffect, useState } from 'react';
import styles from './addpickanddroptimeslot.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

dayjs.extend(isSameOrAfter);

const EditPickAndDropTimeSlot = () => {
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
                setStartTime(dayjs(data.start_time, "HH:mm:ss"));
                setEndTime(dayjs(data.end_time, "HH:mm:ss"));
                setBookingLimit(data.booking_limit || "");
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
        navigate('/pick-and-drop/time-slot-list');
    };

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
        setErrors((prev) => ({ ...prev, startTime: "" }));
    };

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
        setErrors((prev) => ({ ...prev, endTime: "" }));
    };

    const handleBookingLimitChange = (e) => {
        setBookingLimit(e.target.value);
        setErrors((prev) => ({ ...prev, bookingLimit: "" }));
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};
        const now = dayjs();

        if (!startTime) {
            newErrors.startTime = "Start time is required";
            formIsValid = false;
        } else if (startTime && !dayjs(startTime).isSameOrAfter(now)) {
            newErrors.startTime = "Start time must be in the future";
            formIsValid = false;
        }

        if (!endTime) {
            newErrors.endTime = "End time is required";
            formIsValid = false;
        } else if (startTime && endTime && !dayjs(endTime).isAfter(startTime)) {
            newErrors.endTime = "End time must be after start time";
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
                start_time: startTime ? dayjs(startTime).format("HH:mm") : '',
                end_time: endTime ? dayjs(endTime).format("HH:mm") : '',
                booking_limit: bookingLimit
            };

            postRequestWithToken('charger-edit-time-slot', obj, (response) => {
                if (response.code === 200) {
                    toast(response.message, { type: "success" });
                    navigate('/pick-and-drop/time-slot-list');
                } else {
                    console.log('error in charger-edit-time-slot API', response);
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
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <input
                                type="text"
                                className={styles.inputCharger}
                                value={startTime ? dayjs(startTime).format("HH:mm") : ""}
                                onChange={(e) => handleStartTimeChange(dayjs(e.target.value, "HH:mm"))}
                                placeholder="HH:MM"
                            />
                            {errors.startTime && <span className={styles.error} style={{ color: 'red' }}>{errors.startTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            <input
                                type="text"
                                className={styles.inputCharger}
                                value={endTime ? dayjs(endTime).format("HH:mm") : ""}
                                onChange={(e) => handleEndTimeChange(dayjs(e.target.value, "HH:mm"))}
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

export default EditPickAndDropTimeSlot;
