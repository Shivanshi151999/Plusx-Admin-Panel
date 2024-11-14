import React, { useEffect, useState } from 'react';
import styles from './addslot.module.css';
import Select from "react-select";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Add from '../../../assets/images/Add.svg';
import { FaTimes } from 'react-icons/fa';

dayjs.extend(isSameOrAfter);

const AddEvPreSaleTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate    = useNavigate();
    const [timeSlots, setTimeSlots] = useState([
        { 
            date         : new Date(), 
            startTime    : null, 
            endTime      : null, 
            bookingLimit : "" 
        }
    ]);
    const [startDate, setStartDate] = useState(new Date());
    const [errors, setErrors]       = useState([]);

    const handleCancel = () => {
        navigate('/ev-pre-sales-testing/time-slot-list')
    }
    const handleDateChange = (index, date) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].date = date;
        setTimeSlots(newTimeSlots);
    };

    const handleTimeInput = (e) => {
        const value = e.target.value;
        const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        return isValidTime || value === '' ? value : null; 
    };
    

    const handleStartTimeChange = (index, newTime) => {
        const validatedTime = handleTimeInput({ target: { value: newTime } });
        const newTimeSlots  = [...timeSlots];
        newTimeSlots[index].startTime = validatedTime === '' ? null : validatedTime; 
        setTimeSlots(newTimeSlots);
    };
    
    const handleEndTimeChange = (index, newTime) => {
        const validatedTime = handleTimeInput({ target: { value: newTime } });
        const newTimeSlots  = [...timeSlots];
        newTimeSlots[index].endTime = validatedTime === '' ? null : validatedTime; 
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
        setTimeSlots([...timeSlots, { date: null, startTime: null, endTime: null, bookingLimit: "" }]);
    };

    const removeTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
    };

    const validateForm = () => {
        const newErrors = timeSlots.map((slot) => {
            const errors = {};
    
            if (!slot.date) {
                errors.date = "Date is required";
            }
            
            if (!slot.startTime) {
                errors.startTime = "Start time is required";
            }
            
            if (!slot.endTime) {
                errors.endTime = "End time is required";
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
            const obj = {
                userId        : userDetails?.user_id,
                email         : userDetails?.email,
                slot_date     : timeSlots.map(slot => slot.date ? dayjs(slot.date).format("DD-MM-YYYY") : ''),
                start_time    : timeSlots.map(slot => slot.startTime),
                end_time      : timeSlots.map(slot => slot.endTime),
                booking_limit : timeSlots.map(slot => slot.bookingLimit),
            };
    
            postRequestWithToken('ev-pre-sale-add-time-slot-list', obj, async(response) => {
                if (response.code === 200) {
                    toast(response.message[0], { type: "success" });
                    setTimeout(() => {
                        navigate('/ev-pre-sales-testing/time-slot-list')
                    }, 2000)
                } else {
                    toast(response.message || response.message[0], { type: "error" });
                    console.log('error in ev-pre-sale-add-time-slot-list api', response);
                }
            })
        } else {
            console.log('error');
        }
    };

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login'); 
            return; 
        }
    }, []);

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Add Slot</h2>
            <ToastContainer />
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
                                <DatePicker 
                                className={styles.inputCharger} 
                                selected={slot.date} 
                                onChange={(date) => handleDateChange(index, date)}
                                minDate={new Date()}
                                maxDate={new Date().setDate(new Date().getDate() + 14)}
                                />
                                {errors[index]?.date && <span className={styles.error} style={{ color: 'red' }}>{errors[index].date}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Start Time</label>
                                <input
                                    type="text"
                                    className={styles.inputCharger}
                                    value={slot.startTime}
                                    onChange={(e) => handleStartTimeChange(index, e.target.value)}
                                    placeholder="HH:MM"
                                />
                                {errors[index]?.startTime && <span className={styles.error} style={{ color: 'red' }}>{errors[index].startTime}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>End Time</label>
                                <input
                                    type="text"
                                    className={styles.inputCharger}
                                    value={slot.endTime}
                                    onChange={(e) => handleEndTimeChange(index, e.target.value)}
                                    placeholder="HH:MM" 
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

export default AddEvPreSaleTimeSlot;
