import React, { useEffect, useState } from 'react';
import styles from './addtimeslot.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

dayjs.extend(isSameOrAfter);

const AddPortableChargerTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");
    const [errors, setErrors] = useState({});

    const handleCancel = () => {
        navigate('/portable-charger/charger-booking-time-slot-list')
    }

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
        setErrors((prev) => ({ ...prev, startTime: "" })); 
    };

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
        setErrors((prev) => ({ ...prev, endTime: "" })); 
    };

    const handleBookingLimitChange = (e) => {
        const value = e.target.value;

        // Only allow digits and restrict length to 4
        if (/^\d{0,4}$/.test(value)) {
            setBookingLimit(value);
            setErrors((prev) => ({ ...prev, bookingLimit: "" })); 
        }
    };

    const handleBookingLimitKeyPress = (e) => {
        // Prevent non-numeric input
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
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
            console.log("Start Time:", startTime ? dayjs(startTime).format("hh:mm A") : "Not set");
            console.log("End Time:", endTime ? dayjs(endTime).format("hh:mm A") : "Not set");
            console.log("Booking Limit:", bookingLimit);

            const obj = {
                userId : userDetails?.user_id,
                email : userDetails?.email,
                start_time : startTime ? dayjs(startTime).format("hh:mm A") : '',
                end_time : endTime ? dayjs(endTime).format("hh:mm A") : '',
                booking_limit : bookingLimit
            }
    
            postRequestWithToken('charger-add-time-slot', obj, async(response) => {
                if (response.code === 200) {
                    toast(response.message[0], { type: "success" });
                    navigate('/portable-charger/charger-booking-time-slot-list')
                } else {
                    // toast(response.message, {type:'error'})
                    console.log('error in charger-slot-list api', response);
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
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                <div className={styles.inputCharger}> 
                                    <TimePicker
                                        label="With Time Clock"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        renderInput={(params) => <input {...params} />}
                                    />
                                </div>
                                </DemoContainer>
                            </LocalizationProvider>
                            {errors.startTime && <span className={styles.error} style={{color: 'red'}}>{errors.startTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                 <DemoContainer components={['TimePicker']} className={styles.label}>
                                 <div className={styles.inputCharger}>
                                    <TimePicker
                                     label="With Time Clock"
                                     value={endTime}
                                     onChange={handleEndTimeChange}
                                    viewRenderers={{
                                         hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,                                      
                                        seconds: renderTimeViewClock,
                                     }}
                                    />
                                    </div>
                               </DemoContainer>
                           </LocalizationProvider>
                           {errors.endTime && <span className={styles.error} style={{color: 'red'}}>{errors.endTime}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Booking Limit</label>
                            <input className={styles.inputCharger} type="text" 
                            placeholder="Enter Booking Limit" 
                            maxLength="4"
                            onChange={handleBookingLimitChange}
                            onKeyPress={handleBookingLimitKeyPress}
                            />
                            {errors.bookingLimit && <span className={styles.error} style={{color: 'red'}}>{errors.bookingLimit}</span>}
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

export default AddPortableChargerTimeSlot;
