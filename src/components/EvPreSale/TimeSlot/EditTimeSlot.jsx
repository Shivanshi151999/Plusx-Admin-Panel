import React, { useEffect, useState } from 'react';
import styles from './addslot.module.css';
import Calendar from '../../../assets/images/Calender.svg'
import Delete from '../../../assets/images/Delete.svg'
import Add from '../../../assets/images/Add.svg';
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

const EditEvPreSaleTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const { slotId } = useParams();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");
    const [date, setDate] = useState(new Date()); // Separate state for the date
    const [timeSlots, setTimeSlots] = useState([
        { id: "", startTime: null, endTime: null, bookingLimit: "", remainingLimit: "", status: "" }
    ]);


    const [errors, setErrors] = useState({});
    const [slotDetails, setSlotDetails] = useState();

    const fetchDetails = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            slot_id: slotId
        };

        postRequestWithToken('ev-pre-sale-time-slot-details', obj, (response) => {
            if (response.code === 200) {
                const data = response.data || {};
                setSlotDetails(data);
                setStartDate(data.slot_date);
                setStartTime(moment(data.start_time, 'HH:mm:ss').format('HH:mm'));
                setEndTime(moment(data.end_time, 'HH:mm:ss').format('HH:mm'));
                setBookingLimit(data.booking_limit || "");
                setIsActive(data.status)
            } else {
                console.log('error in ev-pre-sale-time-slot-details API', response);
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

    const addTimeSlot = () => {
        // setTimeSlots([...timeSlots, { date: null, startTime: null, endTime: null, bookingLimit: "" }]);
        setTimeSlots([...timeSlots, { startTime: null, endTime: null, bookingLimit: "" }]);
    };
    const removeTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    };
    // const validateForm = () => {
    //     let formIsValid = true;
    //     const newErrors = {};
    //     const now = dayjs();

    //     if (!startDate) {
    //         newErrors.startDate = "Date is required";
    //         formIsValid = false;
    //     }
    //     if (!startTime) {
    //         newErrors.startTime = "Start time is required";
    //         formIsValid = false;
    //     }
    //     if (!endTime) {
    //         newErrors.endTime = "End time is required";
    //         formIsValid = false;
    //     }

    //     if (!bookingLimit) {
    //         newErrors.bookingLimit = "Booking limit is required";
    //         formIsValid = false;
    //     } else if (isNaN(bookingLimit) || bookingLimit <= 0) {
    //         newErrors.bookingLimit = "Booking limit must be a positive number";
    //         formIsValid = false;
    //     }

    //     setErrors(newErrors);
    //     return formIsValid;
    // };
    const validateForm = () => {
        const errors = [];
        if (!date) {
            errors.push({ date: "Date is required" });
        }
        timeSlots.forEach((slot, index) => {
            const slotErrors = {};
            if (!slot.startTime) slotErrors.startTime = "Start time is required";
            if (!slot.endTime) slotErrors.endTime = "End time is required";
            if (!slot.bookingLimit) {
                slotErrors.bookingLimit = "Booking limit is required";
            } else if (isNaN(slot.bookingLimit) || slot.bookingLimit <= 0) {
                slotErrors.bookingLimit = "Booking limit must be a positive number";
            }
            errors[index] = slotErrors;
        });
        setErrors(errors);
        return !errors.some((error) => Object.keys(error).length > 0);
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
                start_time: startTime,
                end_time: endTime,
                booking_limit: bookingLimit
            };

            postRequestWithToken('ev-pre-sale-edit-time-slot-list', obj, (response) => {
                if (response.code === 200) {
                    toast(response.message[0] || response.message, { type: "success" });

                    setTimeout(() => {
                        navigate('/ev-pre-sales-testing/time-slot-list');
                    }, 2000)
                } else {
                    console.log('error in ev-pre-sale-edit-time-slot-list API', response);
                }
            });
        }
    };

    const [isActive, setIsActive] = useState(true);

    const handleToggle = (index) => {
        setTimeSlots((prevSlots) =>
            prevSlots.map((slot, i) =>
                i === index ? { ...slot, status: slot.status === 1 ? 0 : 1 } : slot
            )
        );
    };

    return (
        <div className={styles.containerCharger}>
            <ToastContainer />
            <div className={styles.slotHeaderSection}>
                <h2 className={styles.title}>Edit Slot</h2>
                <button type="button" className={styles.buttonSec} onClick={addTimeSlot}>
                    <img src={Add} alt="Add" className={styles.addImg} />
                    <span className={styles.addContent}>Add</span>
                </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.chargerSection}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Select Date</label>
                        <div className={styles.datePickerWrapper}>
                            <DatePicker
                                className={styles.inputCharger}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            <img className={styles.datePickerImg} src={Calendar} alt="calendar" />
                        </div>
                        {errors.startDate && <span className="error">{errors.startDate}</span>}
                    </div>
                </div>
                {timeSlots.map((slot, index) => (
                    <div key={index} className={styles.slotMainFormSection}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <InputMask
                                mask="99:99"
                                className={styles.inputCharger}
                                value={startTime}
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
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Available Limit</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Enter Available Limit"
                                maxLength="4"
                                value={'0'}
                                disabled
                            // onChange={(e) => handleBookingLimitChange(index, e)}
                            />
                            {/* {errors[index]?.bookingLimit && <span className="error">{errors[index].bookingLimit}</span>} */}
                        </div>
                        <div className={styles.toggleContainer}>
                            <label className={styles.statusLabel}>Status</label>
                            <div
                                className={styles.toggleSwitch}
                                onClick={() => handleToggle(index)}
                            >
                                {/* Toggle Button */}
                                <div className={`${styles.toggleButton} ${slot.status ? styles.active : styles.inactive}`}>
                                    <div className={styles.slider}></div>
                                </div>

                                {/* Text for Active or Inactive */}
                                <span className={`${styles.toggleText} ${slot.status ? styles.activeText : styles.inactiveText}`}>
                                    {slot.status ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        {timeSlots.length > 1 && (
                            <button type="button" className={styles.buttonContainer} onClick={() => removeTimeSlot(index)}>
                                <img className={styles.removeContent} src={Delete} alt="delete" />
                            </button>
                        )}
                    </div>
                ))}
                <div className={styles.actions}>
                    <button className={styles.cancelBtn} type="button" onClick={handleCancel}>Cancel</button>
                    <button className={styles.submitBtn} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditEvPreSaleTimeSlot;
