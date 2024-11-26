import React, { useEffect, useState } from 'react';
import styles from './adddevice.module.css';
// import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
// import UploadIcon from '../../../assets/images/uploadicon.svg';
import { postRequestWithToken } from '../../../api/Requests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import moment from 'moment'; 

const EditPodDevice = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate    = useNavigate()
    
    const { podId }                 = useParams();
    const [podName, setPodName]     = useState("");
    const [deviceId, setDeviceId]   = useState("");
    const [modalName, setModalName] = useState("");
    const [capacity, setcapacity]   = useState("");
    const [inverter, setInverter]   = useState("");
    const [charger, setCharger]     = useState("");
    const [dateOfManufacturing, setDateOfManufacturing] = useState("");
    const [errors, setErrors]                           = useState({});  
    
    const backButtonClick = () => {
        navigate('/pod-device/device-list')
    };
    
    const validateForm = () => {
        const fields = [
            { 
                name         : "podId", 
                value        : podId, 
                errorMessage : "POd Id is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "podName", 
                value        : podName, 
                errorMessage : "Pod Name is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "deviceId", 
                value        : deviceId, 
                errorMessage : "Device Id is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "modalName", 
                value        : modalName, 
                errorMessage : "Modal Name is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "capacity", 
                value        : capacity, 
                errorMessage : "Capacity is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "inverter", 
                value        : inverter, 
                errorMessage : "Inverter is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "charger", 
                value        : charger, 
                errorMessage : "Charger is required.", 
                isValid      : val => val.trim() !== "" 
            },
            { 
                name         : "dateOfManufacturing", 
                value        : dateOfManufacturing, 
                errorMessage : "Date Of Manufacturing is required.", 
                isValid      : val => val.trim() !== "" 
            }
        ]; //
    
        const newErrors = fields.reduce((errors, { name, value, errorMessage, isValid }) => {
            if (!isValid(value)) {
                errors[name] = errorMessage;
            }
            return errors;
        }, {});
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            const formData = new FormData();
            formData.append("userId", "1");
            formData.append("email", "admin@shunyaekai.com");
            formData.append("podId", podId);
            formData.append("podName", podName);
            formData.append("deviceId", deviceId);
            formData.append("device_model", modalName);
            formData.append("capacity", capacity);
            formData.append("charger", charger);
            formData.append("inverter", inverter);  
            formData.append("date_of_manufacturing", dateOfManufacturing);

            postRequestWithToken('edit-pod-brand', formData, async (response) => {
                if (response.code === 200) {
                    toast(response.message[0], { type: "success" });
                    setTimeout(() => {
                        navigate('/pod-device/device-list')
                    }, 2000);
                } else {
                    toast(response.message, {type:'error'})
                    console.log('error in add-device api', response);
                }
            })

        } else {
            console.log("Form validation failed.");
        }
    };
    const fetchDetails = () => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            pod_id  : podId
        };
        postRequestWithToken('pod-device-details', obj, (response) => {
            
            if (response.status === 1) {
                const data = response?.data || {};
                
                setPodName(data?.pod_name);
                setDeviceId(data?.device_id);
                setModalName(data?.design_model);
                setcapacity(data?.capacity);
                setInverter(data?.inverter);
                setCharger(data?.charger); 
                
                const formattedDate = moment(data?.date_of_manufacturing).format('DD-MM-YYYY');
                setDateOfManufacturing(formattedDate);

                // setIsActive(data?.status === '1' ? true : false)               
                // status, current, voltage, percentage

            } else {
                console.error('Error in electric-bike-detail API', response);
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

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Edit Device</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>POD Id</label>
                            <input className={styles.inputCharger} type="text" placeholder="Device Id"
                                value={podId}
                                readonly
                            />
                            {errors.podId && podId =='' && <p className="error">{errors.podId}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>POD Name</label>
                            <input className={styles.inputCharger} type="text" placeholder="Modal Name V1, V2"
                                value={podName}
                                onChange={(e) => setPodName(e.target.value) }
                            />
                            {errors.podName && podName =='' && <p className="error">{errors.podName}</p>}
                        </div>  
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Device Id</label>
                            <input className={styles.inputCharger} type="text" placeholder="Device Id"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value) }
                            />
                            {errors.deviceId && deviceId =='' && <p className="error">{errors.deviceId}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Modal Name</label>
                            <input className={styles.inputCharger} type="text" placeholder="Modal Name V1, V2"
                                value={modalName}
                                onChange={(e) =>
                                    setModalName(e.target.value)
                                }
                            />
                            {errors.modalName && modalName =='' && <p className="error">{errors.modalName}</p>}
                        </div>  
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Capacity</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Capacity"
                                value={capacity}
                                onChange={(e) => {
                                    setcapacity(e.target.value);
                                }}
                            />
                            {errors.capacity && capacity =='' && <p className="error">{errors.capacity}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}> Inverter </label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Pahse 1, Phase 2"
                                value={inverter}
                                onChange={(e) => setInverter(e.target.value)}
                            />
                            {errors.inverter && inverter =='' && <p className="error">{errors.inverter}</p>}
                        </div>
                        
                    </div>
                   
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}> Charger </label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Charger"
                                value={charger}
                                onChange={(e) => setCharger(e.target.value)}
                            />
                            {errors.charger && charger =='' && <p className="error">{errors.charger}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}> Date Of Manufacturing  </label>
                            <InputMask
                                mask="99-99-9999"
                                value={dateOfManufacturing}
                                onChange={(e) => {
                                    setDateOfManufacturing(e.target.value);
                                    if (errors.dateOfManufacturing && e.target.value.length === 10) {
                                        setErrors((prevErrors) => ({ ...prevErrors, dateOfManufacturing: "" }));
                                    }
                                }}
                                onBlur={() => {
                                    if (dateOfManufacturing.length === 10) {
                                        const [day, month, year] = dateOfManufacturing.split('-');
                                        const isValidDate =
                                        !isNaN(Date.parse(`${year}-${month}-${day}`)) &&
                                        day <= 31 && month <= 12; 
                                        if (!isValidDate) {
                                            setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                dateOfManufacturing: "Invalid date in DD-MM-YYYY format",
                                            }));
                                        }
                                    }
                                }}
                                placeholder="DD-MM-YYYY"
                                className={styles.inputCharger}
                            />
                            {errors.dateOfManufacturing && <p className="error">{errors.dateOfManufacturing}</p>}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button onClick={backButtonClick} className={styles.cancelBtn} type="button">Cancel</button>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditPodDevice;
