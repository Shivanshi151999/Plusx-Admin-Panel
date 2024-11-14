import React, { useEffect, useRef, useState } from 'react';
import styles from './addemergency.module.css';
import Select from "react-select";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import UploadIcon from '../../assets/images/uploadicon.svg';
import { postRequestWithToken, postRequestWithTokenAndFile } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmergencyTeam = () => {
    const userDetails                           = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                              = useNavigate();
    const { rsaId }                             = useParams()
    const [file, setFile]                       = useState();
    const [isDropdownOpen, setIsDropdownOpen]   = useState(false);
    const [details, setDetails]                 = useState()
    const [rsaName, setRsaName]                 = useState("");
    const [email, setEmail]                     = useState("");
    const [mobileNo, setMobileNo]               = useState("");
    const [serviceType, setServiceType]         = useState(null);
    const [password, setPassword]               = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors]                   = useState({});

    const typeOpetions = [
        // { value: "", label: "Select Vehicle Type" },
        { value: "Charger Installation", label: "Charger Installation" },
        { value: "EV Pre-Sale",          label: "EV Pre-Sale" },
        { value: "Portable Charger",     label: "Portable Charger" },
        { value: "Roadside Assistance",  label: "Roadside Assistance" },
        { value: "Valet Charging",       label: "Valet Charging" },
    ];

    const handleType = (selectedOption) => {
        setServiceType(selectedOption)
    }

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

    const serviceDropdownRef = useRef(null);

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

        // if (!password) {
        //     newErrors.password = "Password is required.";
        //     formIsValid = false;
        // }

        // if (!confirmPassword || confirmPassword !== password) {
        //     newErrors.confirmPassword = "Passwords do not match.";
        //     formIsValid = false;
        // }

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
            formData.append("userId", userDetails?.user_id);
            formData.append("email", userDetails?.email);
            formData.append("rsa_id", rsaId);
            formData.append("rsa_email", email);
            formData.append("rsa_name", rsaName);
            formData.append("mobile", mobileNo);
            if (serviceType) {
                formData.append("service_type", serviceType.value);
            }
            formData.append("password", password);

            if (file) {
                formData.append("profile_image", file);
            }

            postRequestWithTokenAndFile('rsa-update', formData, async (response) => {
                if (response.status === 1) {
                    toast(response.message || response.message[0], {type:'success'})
                    setTimeout(() => {
                        navigate('/rider-list')
                    }, 1000);
                } else {
                    console.log('error in rsa-update api', response);
                }
            });

        } else {
            console.log("Form validation failed.");
        }
    };

    const fetchDetails = () => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            rsa_id: rsaId
        };

        postRequestWithToken('rsa-data', obj, (response) => {
            if (response.code === 200) {
                const data = response?.rsaData || {};
                setDetails(data);
                setRsaName(data?.rsa_name || "");
                setEmail(data?.email || "");
                setMobileNo(data?.mobile || "");
                // setServiceType(data?.booking_type || "");
                // setPassword(data?.password || "");
                // setConfirmPassword(data?.confirm_passwprd || "");
                setFile(data?.profile_img || "")
                const initialType = data.booking_type ? { label: data.booking_type, value: data.booking_type } : null;
                setServiceType(initialType);

            } else {
                console.log('error in rsa-details API', response);
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
        <div className={styles.addShopContainer}>
            <ToastContainer />
            <div className={styles.addHeading}>Edit Driver</div>
            <div className={styles.addShopFormSection}>
                <form className={styles.formSection} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>RSA Name</label>
                            <input
                                className={styles.inputField}
                                type="text"
                                placeholder="RSA Name"
                                value={rsaName}
                                onChange={(e) => setRsaName(e.target.value.slice(0, 50))}
                            />
                            {errors.rsaName && <p className={styles.error}>{errors.rsaName}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>Email ID</label>
                            <input
                                className={styles.inputField}
                                type="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.slice(0, 50))}
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>Mobile No</label>
                            <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Mobile No"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value.slice(0, 20))}
                            />
                            {errors.mobileNo && <p className={styles.error}>{errors.mobileNo}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>Service Type</label>
                            <div ref={serviceDropdownRef}>
                                <Select
                                    className={styles.addShopSelect}
                                    options={typeOpetions}
                                    value={serviceType}
                                    onChange={handleType}
                                    placeholder="Select Service"
                                    isClearable={true}
                    
                                />
                            </div>
                            {errors.serviceType && <p className={styles.error}>{errors.serviceType}</p>}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>Password</label>
                            <input
                                className={styles.inputField}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className={styles.error}>{errors.password}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel}>Confirm Password</label>
                            <input
                                className={styles.inputField}
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
                                        src={
                                            typeof file === 'string'
                                                ? `${process.env.REACT_APP_SERVER_URL}uploads/rsa_images/${file}`
                                                : URL.createObjectURL(file)
                                        }
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
                    <div className={styles.editButton}>
                        <button className={styles.editSubmitBtn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default EditEmergencyTeam;
