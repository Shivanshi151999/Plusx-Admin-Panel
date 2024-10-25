import React, { useState } from 'react';
import styles from './addtimeslot.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import { postRequestWithToken } from '../../../api/Requests';


// const AddPortableChargerTimeSlot = () => {
//     const [startTime, setStartTime] = useState(null);
//     const [endTime, setEndTime] = useState(null);
//     const [bookingLimit, setBookingLimit] = useState("");

//     const handleStartTimeChange = (newTime) => {
//         setStartTime(newTime);
//     };

//     const handleEndTimeChange = (newTime) => {
//         setEndTime(newTime);
//     };

//     const handleBookingLimitChange = (e) => {
//         setBookingLimit(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Start Time:", startTime ? dayjs(startTime).format("hh:mm A") : "Not set");
//         console.log("End Time:", endTime ? dayjs(endTime).format("hh:mm A") : "Not set");
//         console.log("Booking Limit:", bookingLimit);
//     };
//     return (
//         <div className={styles.containerCharger}>
//             <h2 className={styles.title}>Add Slot</h2>
//             <div className={styles.chargerSection}>
//                 <form className={styles.form} onSubmit={handleSubmit}>
//                     <div className={styles.row}>
//                         <div className={styles.inputGroup}>
//                             <label className={styles.label}>Start Time</label>
//                             {/* <input className={styles.inputCharger} type="text" placeholder="Start Time" /> */}
//                             <LocalizationProvider dateAdapter={AdapterDayjs} >
//                                 <DemoContainer components={['TimePicker']} className={styles.label}>
//                                     <TimePicker
//                                     label="With Time Clock"
//                                     value={startTime}
//                                     onChange={handleStartTimeChange}
//                                     viewRenderers={{
//                                         hours: renderTimeViewClock,
//                                         minutes: renderTimeViewClock,
//                                         seconds: renderTimeViewClock,
//                                     }}
//                                     />
//                                 </DemoContainer>
//                             </LocalizationProvider>

//                         </div>
//                         <div className={styles.inputGroup}>
//                             <label className={styles.label}>End Time</label>
//                             {/* <input className={styles.inputCharger} type="text" placeholder="End Time" /> */}
                            // <LocalizationProvider dateAdapter={AdapterDayjs}>
                            //     <DemoContainer components={['TimePicker']}>
                            //         <TimePicker
                            //         label="With Time Clock"
                            //         value={endTime}
                            //         onChange={handleEndTimeChange}
                            //         viewRenderers={{
                            //             hours: renderTimeViewClock,
                            //             minutes: renderTimeViewClock,
                            //             seconds: renderTimeViewClock,
                            //         }}
                            //         />
                            //     </DemoContainer>
                            // </LocalizationProvider>
//                         </div>
                        // <div className={styles.inputGroup}>
                        //     <label className={styles.label}>Booking Limit</label>
                        //     <input className={styles.inputCharger} type="text" placeholder="Enter Booking Limit" onChange={handleBookingLimitChange}/>
                        // </div>
//                     </div>
//                     <div className={styles.actions}>
//                         <button className={styles.cancelBtn} type="button">Cancel</button>
//                         <button className={styles.submitBtn} type="submit">Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };



const AddPortableChargerTimeSlot = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");
    const [errors, setErrors] = useState({});

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
        setErrors((prev) => ({ ...prev, startTime: "" })); // Clear start time error
    };

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
        setErrors((prev) => ({ ...prev, endTime: "" })); // Clear end time error
    };

    const handleBookingLimitChange = (e) => {
        setBookingLimit(e.target.value);
        setErrors((prev) => ({ ...prev, bookingLimit: "" })); // Clear booking limit error
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!startTime) {
            newErrors.startTime = "Start time is required";
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
                userId : "1",
                email : "admin@shunyaekai.com",
                start_time : startTime ? dayjs(startTime).format("hh:mm A") : '',
                end_time : endTime ? dayjs(endTime).format("hh:mm A") : '',
                booking_limit : bookingLimit
            }
    
            postRequestWithToken('charger-add-time-slot', obj, async(response) => {
                if (response.code === 200) {
                    // setTimeSlotList(response?.data)
                    // setTotalPages(response?.total_page || 1); 
                } else {
                    // toast(response.message, {type:'error'})
                    console.log('error in charger-slot-list api', response);
                }
            })
            // Further form submission logic
        } else {
            console.log('error');
        }
    };

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
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                 <DemoContainer components={['TimePicker']} className={styles.label}>
                                    <TimePicker
                                     label="With Time Clock"
                                     value={startTime}
                                     onChange={handleStartTimeChange}
                                    viewRenderers={{
                                         hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,                                      
                                        seconds: renderTimeViewClock,
                                     }}
                                    />
                               </DemoContainer>
                           </LocalizationProvider>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Booking Limit</label>
                            <input className={styles.inputCharger} type="text" placeholder="Enter Booking Limit" onChange={handleBookingLimitChange}/>
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

export default AddPortableChargerTimeSlot;
