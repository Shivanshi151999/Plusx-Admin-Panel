import React, { useEffect, useState } from 'react';
import styles from './addpickanddroptimeslot.module.css';
import Add from '../../../assets/images/Add.svg';
import Calendar from '../../../assets/images/Calender.svg'
import Delete from '../../../assets/images/Delete.svg'
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { postRequestWithToken } from '../../../api/Requests';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

dayjs.extend(isSameOrAfter);

const EditPickAndDropTimeSlot = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const { slotDate } = useParams();
    const navigate = useNavigate();
    
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");

    const [date, setDate] = useState(new Date()); // Separate state for the date
    const [timeSlots, setTimeSlots] = useState([
        { id: "", slotId: "", startTime: null, endTime: null, bookingLimit: "", remainingLimit: "", status: "" }
    ]);

    const [errors, setErrors] = useState({});
    const [slotDetails, setSlotDetails] = useState();

    const fetchDetails = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            slot_date: slotDate
        };

        postRequestWithToken('pick-and-drop-slot-details', obj, (response) => {
            if (response.code === 200) {
                // const data = response.data || {};
                // setSlotDetails(data);
                // setStartDate(data.slot_date);
                // setStartTime(moment(data.start_time, 'HH:mm:ss').format('HH:mm'));
                // setEndTime(moment(data.end_time, 'HH:mm:ss').format('HH:mm'));
                // setBookingLimit(data.booking_limit || "");
                // setIsActive(data.status)
                const slots = response.data || [];
                if (slots.length > 0) {
                    setTimeSlots(
                        slots.map(slot => ({
                            slotId: slot.slot_id,
                            startTime: moment(slot.start_time, 'HH:mm:ss').format('HH:mm'),
                            endTime: moment(slot.end_time, 'HH:mm:ss').format('HH:mm'),
                            bookingLimit: slot.booking_limit.toString(),
                            remainingLimit: slot.booking_limit.toString()- slot.slot_booking_count.toString(),
                            id: slot.id,
                            // status: setIsActive(slot.status)
                            status: slot.status === 1,
                        }))
                    );
    
                    
                    setDate(new Date(slots[0].slot_date));
                    setStartDate(new Date(slots[0].slot_date)); 
                    setIsActive(slots[0].status === 1);
                }
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

    const handleTimeInput = (e) => {
        const value = e.target.value;
        const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        return isValidTime || value === '' ? value : null; 
    };

    // const handleStartTimeChange = (e) => {
    //     const formattedTime = e.target.value; 
    //     setStartTime(formattedTime);
    //     setErrors((prev) => ({ ...prev, startTime: "" }));
    // };

    const handleStartTimeChange = (index, newTime) => {
        const validatedTime = handleTimeInput({ target: { value: newTime } });
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].startTime = validatedTime === '' ? null : validatedTime; 
        setTimeSlots(newTimeSlots);
    };

    // const handleEndTimeChange = (e) => {
    //     const formattedTime = e.target.value; 
    //     setEndTime(formattedTime);
    //     setErrors((prev) => ({ ...prev, endTime: "" }));
    // };

    const handleEndTimeChange = (index, newTime) => {
        const validatedTime = handleTimeInput({ target: { value: newTime } });
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].endTime = validatedTime === '' ? null : validatedTime; 
        setTimeSlots(newTimeSlots);
    };

    // const handleBookingLimitChange = (e) => {
    //     const value = e.target.value;
    //     if (/^\d{0,4}$/.test(value)) {
    //         setBookingLimit(value);
    //         setErrors((prev) => ({ ...prev, bookingLimit: "" }));
    //     }
    // };

    const handleBookingLimitChange = (index, e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            const newTimeSlots = [...timeSlots];
            newTimeSlots[index].bookingLimit = value;
            setTimeSlots(newTimeSlots);
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
            const slot_id       = timeSlots.map(slot => slot.slotId);
            const slot_date     = dayjs(date).format("DD-MM-YYYY"); 
            const id            = timeSlots.map(slot => slot.id);
            const start_time    = timeSlots.map(slot => slot.startTime);
            const end_time      = timeSlots.map(slot => slot.endTime);
            const booking_limit = timeSlots.map(slot => slot.bookingLimit);
            const status        = timeSlots.map(slot => (slot.status ? 1 : 0));
            const obj = {
                userId: userDetails?.user_id,
                email: userDetails?.email,
                // slot_id: slotId,
                // status: isActive ? "1" : "0",
                // slot_date: moment(startDate).format('DD-MM-YYYY'),
                // // slot_date: startDate,
                // start_time: startTime ,
                // end_time: endTime ,
                // booking_limit: bookingLimit
                id,
                slot_id,
                slot_date, 
                start_time, 
                end_time, 
                booking_limit ,
                status
            };

            postRequestWithToken('pick-and-drop-edit-slot', obj, (response) => {
                if (response.code === 200) {
                    toast(response.message || response.message[0], { type: "success" });
                   
                    setTimeout(() => {
                        navigate('/pick-and-drop/time-slot-list');
                    },2000)
                } else {
                    console.log('error in charger-edit-time-slot API', response);
                }
            });
        }
    };

    const [isActive, setIsActive] = useState(false);

    // const handleToggle = () => {
    //     setIsActive(!isActive);
    // };

    const handleToggle = (index) => {
        setTimeSlots((prevSlots) =>
            prevSlots.map((slot, i) =>
                i === index ? { ...slot, status: slot.status === 1 ? 0 : 1 } : slot
            )
        );
    };

    return (
        <div className={styles.containerCharger}>
             <ToastContainer/>
             <div className={styles.slotHeaderSection}>
                <h2 className={styles.title}>Edit Slot</h2>
                <button type="button" className={styles.buttonSec} onClick={addTimeSlot}>
                    <img src={Add} alt="Add" className={styles.addImg} />
                    <span className={styles.addContent}>Add</span>
                </button>
            </div>
            
                {/* <form className={styles.form} onSubmit={handleSubmit}>
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
                </form> */}

                <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.chargerSection}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Select Date</label>
                        <div className={styles.datePickerWrapper}>
                        <DatePicker
                            className={styles.inputCharger}
                            selected={date}
                            onChange={(date) => setDate(date)}
                            minDate={new Date()}
                            maxDate={new Date().setDate(new Date().getDate() + 14)}
                            readOnly
                        />
                         <img className={styles.datePickerImg} src={Calendar} alt="calendar" />
                         </div>
                        {errors.date && <span className="error">{errors.date}</span>}
                    </div>
                    </div>
                    

                    {timeSlots.map((slot, index) => (
                         <div key={index} className={styles.slotMainFormSection}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Start Time</label>
                                <InputMask
                                    mask="99:99"
                                    className={styles.inputCharger}
                                    value={slot.startTime}
                                    onChange={(e) => handleStartTimeChange(index, e.target.value)}
                                    placeholder="HH:MM"
                                />
                                {errors[index]?.startTime && <span className="error">{errors[index].startTime}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>End Time</label>
                                <InputMask
                                    mask="99:99"
                                    className={styles.inputCharger}
                                    value={slot.endTime}
                                    onChange={(e) => handleEndTimeChange(index, e.target.value)}
                                    placeholder="HH:MM"
                                />
                                {errors[index]?.endTime && <span className="error">{errors[index].endTime}</span>}
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
                                />
                                {errors[index]?.bookingLimit && <span className="error">{errors[index].bookingLimit}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Available Limit</label>
                                <input
                                    className={styles.inputCharger}
                                    type="text"
                                    placeholder="Enter Available Limit"
                                    maxLength="4"
                                    value={slot.remainingLimit}
                                    disabled
                                    // onChange={(e) => handleBookingLimitChange(index, e)}
                                />
                                {/* {errors[index]?.bookingLimit && <span className="error">{errors[index].bookingLimit}</span>} */}
                            </div>

                            <div className={styles.toggleContainer}>
                                <label className={styles.statusLabel}>Status</label>
                                <div
                                    className={styles.toggleSwitch}
                                    onClick={() => handleToggle(index)} // Pass the index to identify the slot
                                >
                                    
                                    <div className={`${styles.toggleButton} ${slot.status ? styles.active : styles.inactive}`}>
                                        <div className={styles.slider}></div>
                                    </div>
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
                </form >
            </div>
        
    );
};

export default EditPickAndDropTimeSlot;
