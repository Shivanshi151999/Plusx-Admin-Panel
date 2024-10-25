import React, { useEffect, useState }  from 'react';
import styles from './addtimeslot.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import { postRequestWithToken } from '../../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';

const EditPortableChargerTimeSlot = () => {

    const {slotId} = useParams()
    const navigate = useNavigate()
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bookingLimit, setBookingLimit] = useState("");
    const [errors, setErrors] = useState({});
    const [slotDetails, setSlotDetails] = useState()
  
  const fetchDetails = () => {
    const obj = {
        userId: "1",
        email: "admin@shunyaekai.com",
        slot_id : slotId
    };

    postRequestWithToken('charger-slot-details', obj, (response) => {
        if (response.code === 200) {
            const data = response.data || {};
                setSlotDetails(data);  

                // setStartTime(data.start_time ? dayjs(data.start_time, "hh:mm A") : null);
                setStartTime(dayjs(data.start_time, "HH:mm:ss")); 
                // setEndTime(data.end_time ? dayjs(data.end_time, "hh:mm A") : null);
                setEndTime(dayjs(data.end_time, "HH:mm:ss")); 
                setBookingLimit(data.booking_limit || "");
        } else {
            console.log('error in charger-slot-details API', response);
        }
    });
};

  useEffect(() => {
    fetchDetails();
  }, []);

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
    setBookingLimit(e.target.value);
    setErrors((prev) => ({ ...prev, bookingLimit: "" })); 
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
            slot_id: slotId,
            status: "0",
            start_time : startTime ? dayjs(startTime).format("hh:mm A") : '',
            end_time : endTime ? dayjs(endTime).format("hh:mm A") : '',
            booking_limit : bookingLimit
        }

        postRequestWithToken('charger-edit-time-slot', obj, async(response) => {
            if (response.code === 200) {
                toast(response.message, { type: "success" });
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

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Edit Slot</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Start Time</label>
                            {/* <input className={styles.inputCharger} type="text" placeholder="Start Time" /> */}
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
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>End Time</label>
                            {/* <input className={styles.inputCharger} type="text" placeholder="End Time" /> */}
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
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Booking Limit</label>
                            <input className={styles.inputCharger} type="text" 
                            placeholder="Enter Booking Limit" value={bookingLimit}
                            onChange={handleBookingLimitChange}
                             />
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
