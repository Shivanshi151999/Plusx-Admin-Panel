import React, { useEffect, useState } from 'react';
import styles from './addtimeslot.module.css';
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

dayjs.extend(isSameOrAfter);

const EditPortableChargerTimeSlot = () => {
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

        postRequestWithToken('charger-slot-details', obj, (response) => {
            if (response.code === 200) {
                const data = response?.data || {};
                setSlotDetails(data);
                setStartDate(data.slot_date);
                setStartTime(moment(data.start_time, 'HH:mm:ss').format('HH:mm'));
                setEndTime(moment(data.end_time, 'HH:mm:ss').format('HH:mm'));
                setBookingLimit(data.booking_limit || "");
                setIsActive(data.status)
            } else {
                console.log('error in charger-slot-details API', response);
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
        navigate('/portable-charger/charger-booking-time-slot-list');
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
                // slot_date: moment(startDate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                slot_date: moment(startDate).format('DD-MM-YYYY'),
                start_time: startTime,
                end_time: endTime,
                booking_limit: bookingLimit
            };

            postRequestWithToken('charger-edit-time-slot', obj, (response) => {
                if (response.code === 200) {
                    toast(response.message[0] || response.message, { type: "success" });
                    setTimeout(() => {
                        navigate('/portable-charger/charger-booking-time-slot-list');
                    }, 2000)

                } else {
                    console.log('error in charger-edit-time-slot API', response);
                }
            });
        }
    };

    const [isActive, setIsActive] = useState(true);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.containerCharger}>
            <ToastContainer />
            <h2 className={styles.title}>Edit Slot</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Select Date</label>
                            <DatePicker
                                className={styles.inputCharger}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            {errors.startDate && <span className="error">{errors.startDate}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <InputMask
                                mask="99:99"
                                className={styles.inputCharger}
                                value={startTime}
                                // onChange={(e) => handleStartTimeChange(dayjs(e.target.value, "HH:mm"))}
                                onChange={handleStartTimeChange}
                                placeholder="HH:MM"
                            />
                            {errors.startTime && <span className="error">{errors.startTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            <InputMask
                                mask="99:99"
                                className={styles.inputCharger}
                                value={endTime}
                                // onChange={(e) => handleEndTimeChange(dayjs(e.target.value, "HH:mm"))}
                                onChange={handleEndTimeChange}
                                placeholder="HH:MM"
                            />
                            {errors.endTime && <span className="error">{errors.endTime}</span>}
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
                            {errors.bookingLimit && <span className="error">{errors.bookingLimit}</span>}
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

export default EditPortableChargerTimeSlot;

