import React, { useState } from 'react';
import styles from './addcharger.module.css';
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'; 
import UploadIcon from '../../../assets/images/uploadicon.svg'; 
import { postRequestWithTokenAndFile } from '../../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddPortableCharger = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [chargerName, setChargerName] = useState("");
    const [chargerPrice, setChargerPrice] = useState("");
    const [chargerType, setChargerType] = useState("");
    const [chargerFeature, setChargerFeature] = useState("");
    const [errors, setErrors] = useState({});


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setErrors((prev) => ({ ...prev, file: "" }));
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
    };
   
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const validateForm = () => {
        const newErrors = {};
        let formIsValid = true;

        if (!chargerName) {
            newErrors.chargerName = "Charger Name is required.";
            formIsValid = false;
        }

        if (!chargerPrice || isNaN(chargerPrice) || chargerPrice <= 0) {
            newErrors.chargerPrice = "Please enter a valid Charger Price.";
            formIsValid = false;
        }

        if (!chargerType) {
            newErrors.chargerType = "Charger Type is required.";
            formIsValid = false;
        }

        if (!chargerFeature) {
            newErrors.chargerFeature = "Charger Feature is required.";
            formIsValid = false;
        }

        if (!file) {
            newErrors.file = "Image is required.";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            const formData = new FormData();
            formData.append("userId", "1");
            formData.append("email", "admin@shunyaekai.com");
            formData.append("charger_name", chargerName);
            formData.append("charger_price", chargerPrice);
            formData.append("charger_feature", chargerFeature);
            formData.append("charger_type", chargerType);
            
            if (file) {
                formData.append("charger_image", file);
            }
    
            postRequestWithTokenAndFile('add-charger', formData, async(response) => {
                if (response.code === 200) {
                    toast(response.message[0], { type: "success" });
                    navigate('/portable-charger/charger-list')
                } else {
                    // toast(response.message, {type:'error'})
                    console.log('error in add-charger api', response);
                }
            })
            
        } else {
            console.log("Form validation failed.");
        }
    };

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Add Charger</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Name</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="Super Charger"
                                value={chargerName}
                                onChange={(e) => 
                                    setChargerName(e.target.value.slice(0, 50)) 
                                }
                            />
                            {errors.chargerName && <p className={styles.error} style={{color: 'red'}}>{errors.chargerName}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Price</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="AED 150"
                                value={chargerPrice}
                                onChange={(e) => {
                                    const priceValue = e.target.value.replace(/\D/g, ""); 
                                    setChargerPrice(priceValue.slice(0, 5)); 
                                }}
                            />
                            {errors.chargerPrice && <p className={styles.error} style={{color: 'red'}}>{errors.chargerPrice}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Type</label>
                            <div className={styles.selectContainer}>
                                <select
                                    className={styles.select}
                                    value={chargerType}
                                    onChange={(e) => setChargerType(e.target.value)}
                                    onClick={toggleDropdown}
                                >
                                    <option value="">Select</option>
                                    <option value="On Demand Service">On Demand Service</option>
                                    <option value="Scheduled Service">Scheduled Service</option>
                                </select>
                                <div className={styles.iconContainer}>
                                    {isDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                                </div>
                            </div>
                            {errors.chargerType && <p className={styles.error} style={{color: 'red'}}>{errors.chargerType}</p>}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Feature</label>
                            <input
                                className={styles.inputCharger}
                                type="text"
                                placeholder="For AED 150 Per Charger"
                                value={chargerFeature}
                                onChange={(e) => setChargerFeature(e.target.value)}
                            />
                            {errors.chargerFeature && <p className={styles.error} style={{color: 'red'}}>{errors.chargerFeature}</p>}
                        </div>
                    </div>

                    <div className={styles.fileUpload}>
                        <label className={styles.fileLabel}>Image</label>
                        <div className={styles.fileDropZone}>
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {!file ? (
                                <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                                    <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                                    <p>Select File to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
                                </label>
                            ) : (
                                <div className={styles.imageContainer}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={handleRemoveImage}
                                    >
                                        <AiOutlineClose size={20} style={{ padding: '2px' }} />
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.file && <p className={styles.error} style={{color: 'red'}}>{errors.file}</p>}
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


export default AddPortableCharger;
