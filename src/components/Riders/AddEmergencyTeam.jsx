import React, { useState } from 'react';
import styles from './addemergency.module.css';
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'; 
import UploadIcon from '../../assets/images/uploadicon.svg'; 
import { postRequestWithTokenAndFile } from '../../api/Requests';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddEmergencyTeam = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [rsaName, setRsaName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

        if (!rsaName) {
            newErrors.rsaName = "RSA Name is required.";
            formIsValid = false;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid Email ID.";
            formIsValid = false;
        }

        if (!mobileNo || isNaN(mobileNo) || mobileNo.length < 10) {
            newErrors.mobileNo = "Please enter a valid Mobile No.";
            formIsValid = false;
        }

        if (!serviceType) {
            newErrors.serviceType = "Service Type is required.";
            formIsValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required.";
            formIsValid = false;
        }

        if (!confirmPassword || confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match.";
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
            formData.append("rsa_email", email);
            formData.append("rsa_name", rsaName);
            formData.append("mobile", mobileNo);
            formData.append("service_type", serviceType);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);
            
            if (file) {
                formData.append("profile_image", file);
            }

            postRequestWithTokenAndFile('rsa-add', formData, async(response) => {
                if (response.code === 200) {
                    toast(response.message[0], { type: "success" });
                    navigate('/rider-list')
                } else {
                    console.log('error in rider-list api', response);
                }
            });
            
        } else {
            console.log("Form validation failed.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add Emergency Team</h2>
            <div className={styles.section}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>RSA Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="RSA Name"
                                value={rsaName}
                                onChange={(e) => setRsaName(e.target.value.slice(0, 50))}
                            />
                            {errors.rsaName && <p className={styles.error}>{errors.rsaName}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email ID</label>
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.slice(0, 50))}
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Mobile No</label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Mobile No"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value.slice(0, 20))}
                            />
                            {errors.mobileNo && <p className={styles.error}>{errors.mobileNo}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Service Type</label>
                            <div className={styles.selectContainer}>
                                <select
                                    className={styles.select}
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    onClick={toggleDropdown}
                                >
                                    <option value="">Select</option>
                                    <option value="Charger Installation">Charger Installation</option>
                                    <option value="EV Pre-Sale">EV Pre-Sale</option>
                                    <option value="Portable Charger">Portable Charger</option>
                                    <option value="Roadside Assistance">Roadside Assistance</option>
                                    <option value="Valet Charging">Valet Charging</option>
                                </select>
                                <div className={styles.iconContainer}>
                                    {isDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                                </div>
                            </div>
                            {errors.serviceType && <p className={styles.error}>{errors.serviceType}</p>}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className={styles.error}>{errors.password}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
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
                                        <AiOutlineClose size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.file && <p className={styles.error}>{errors.file}</p>}
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.submitBtn} type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default AddEmergencyTeam;
