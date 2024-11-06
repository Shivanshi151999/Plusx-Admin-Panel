import React, { useEffect, useState } from 'react';
import styles from './addtimeslot.module.css';
import TimePicker from 'react-time-picker';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Add from '../../../assets/images/Add.svg';
import { FaTimes } from 'react-icons/fa';

dayjs.extend(isSameOrAfter);

const AddPortableChargerTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([{ startTime: null, endTime: null, bookingLimit: "" }]);
    const [startDate, setStartDate] = useState(new Date());
    const [errors, setErrors] = useState([]);

    const handleCancel = () => {
        navigate('/portable-charger/charger-booking-time-slot-list');
    };

    const handleStartTimeChange = (index, newTime) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].startTime = newTime;
        setTimeSlots(newTimeSlots);
    };

    const handleEndTimeChange = (index, newTime) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].endTime = newTime;
        setTimeSlots(newTimeSlots);
    };

    const handleBookingLimitChange = (index, e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            const newTimeSlots = [...timeSlots];
            newTimeSlots[index].bookingLimit = value;
            setTimeSlots(newTimeSlots);
        }
    };

    const handleBookingLimitKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { startTime: null, endTime: null, bookingLimit: "" }]);
    };

    const removeTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    };

    const validateForm = () => {
        const newErrors = timeSlots.map((slot, index) => {
            const errors = {};
            const now = dayjs();

            if (!slot.startTime) {
                errors.startTime = "Start time is required";
            } else if (!dayjs(slot.startTime).isSameOrAfter(now)) {
                errors.startTime = "Start time must be in the future";
            }

            if (!slot.endTime) {
                errors.endTime = "End time is required";
            } else if (!dayjs(slot.endTime).isAfter(slot.startTime)) {
                errors.endTime = "End time must be after start time";
            }

            if (!slot.bookingLimit) {
                errors.bookingLimit = "Booking limit is required";
            } else if (isNaN(slot.bookingLimit) || slot.bookingLimit <= 0) {
                errors.bookingLimit = "Booking limit must be a positive number";
            }

            return errors;
        });

        setErrors(newErrors);
        return newErrors.every((error) => Object.keys(error).length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            timeSlots.forEach((slot) => {
                const obj = {
                    userId: userDetails?.user_id,
                    email: userDetails?.email,
                    start_time: slot.startTime ? dayjs(slot.startTime).format("hh:mm A") : '',
                    end_time: slot.endTime ? dayjs(slot.endTime).format("hh:mm A") : '',
                    booking_limit: slot.bookingLimit
                };

                postRequestWithToken('charger-add-time-slot', obj, (response) => {
                    if (response.code === 200) {
                        toast(response.message[0], { type: "success" });
                        navigate('/portable-charger/charger-booking-time-slot-list');
                    } else {
                        console.log('error in charger-slot-list api', response);
                    }
                });
            });
        } else {
            console.log('Validation error');
        }
    };

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
        }
    }, [userDetails, navigate]);

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Add Slot</h2>

            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.addSection}>
                        <button type="button" className={styles.buttonSec} onClick={addTimeSlot}>
                            <img src={Add} alt="Add" className={styles.addImg} />
                            <span className={styles.addContent}>Add</span>
                        </button>
                    </div>
                    {timeSlots.map((slot, index) => (
                        <div key={index} className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Date Picker</label>
                                <DatePicker className={styles.inputCharger} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Start Time</label>
                                <input
                                    type="text"
                                    className={styles.inputCharger}
                                    value={slot.startTime}
                                    onChange={(e) => handleStartTimeChange(index, e.target.value)}
                                    placeholder="HH:MM" // Placeholder to show time format
                                />
                                {errors[index]?.startTime && <span className={styles.error} style={{ color: 'red' }}>{errors[index].startTime}</span>}
                            </div>

                            {/* End Time Input with Placeholder */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>End Time</label>
                                <input
                                    type="text"
                                    className={styles.inputCharger}
                                    value={slot.endTime}
                                    onChange={(e) => handleEndTimeChange(index, e.target.value)}
                                    placeholder="HH:MM" // Placeholder to show time format
                                />
                                {errors[index]?.endTime && <span className={styles.error} style={{ color: 'red' }}>{errors[index].endTime}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Booking Limit</label>
                                <input
                                    className={styles.inputCharger}
                                    type="text"
                                    placeholder="Enter Booking Limit"
                                    maxLength="4"
                                    value={slot.bookingLimit}
                                    onChange={(e) => handleBookingLimitChange(index, e)}
                                    onKeyPress={handleBookingLimitKeyPress}
                                />
                                {errors[index]?.bookingLimit && <span className={styles.error} style={{ color: 'red' }}>{errors[index].bookingLimit}</span>}
                            </div>

                            {timeSlots.length > 1 && (
                                <button type="button" className={styles.buttonContainer} onClick={() => removeTimeSlot(index)}>
                                    <FaTimes className={styles.removeContent} />
                                </button>
                            )}
                        </div>
                    ))}

                    <div className={styles.actions}>
                        <button className={styles.cancelBtn} type="button" onClick={handleCancel}>Cancel</button>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div>
                </form >
            </div>
        </div >
    );
};

export default AddPortableChargerTimeSlot;
