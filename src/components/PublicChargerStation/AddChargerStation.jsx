import React, { useState, useRef } from "react";
import Select from "react-select";
import UploadIcon from '../../assets/images/uploadicon.svg';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './addcharger.module.css';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from 'react-router-dom';

const AddChargerStation = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]); // State for Station Gallery
    const [errors, setErrors] = useState({});
    const [selectedBrands, setSelectedBrands] = useState([]);
    const brandDropdownRef = useRef(null);
    const serviceDropdownRef = useRef(null);
    const serviceOptions = [
        { value: "service1", label: "Service 1" },
        { value: "service2", label: "Service 2" },
        { value: "service3", label: "Service 3" },
    ];

    const chargingFor = [
        { label: "BMW", value: "BMW" },
        { label: "Honda City", value: "Honda City" },
        { label: "Range Rover", value: "Range Rover" },
        { label: "Porsche", value: "Porsche" },
        { label: "Volvo", value: "Volvo" },
        { label: "Tesla", value: "Tesla" }
    ];

    const [selectedService, setSelectedService] = useState(null);
    const handleServiceChange = (selectedOption) => setSelectedService(selectedOption);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const locationOptions = [
        { value: "Free", label: "Free" },
        { value: "Paid", label: "Paid" },
    ];
    const handleLocationChange = (selectedOption) => setSelectedLocation(selectedOption);

    // Handle Cover Image upload
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setErrors((prev) => ({ ...prev, file: "" }));
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const handleRemoveImage = () => setFile(null);

    // Handle Station Gallery upload
    const handleGalleryChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

        if (validFiles.length !== selectedFiles.length) {
            alert('Please upload only valid image files.');
            return;
        }

        setGalleryFiles((prevFiles) => [...prevFiles, ...validFiles]);
        setErrors((prev) => ({ ...prev, gallery: "" }));
    };

    const handleRemoveGalleryImage = (index) => {
        setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addShopContainer}>
            <div className={styles.addHeading}>Add Shop</div>
            <div className={styles.addShopFormSection}>
                <form className={styles.formSection}>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="shopName">Station Name</label>
                            <input type="text" id="shopName" placeholder="Shop Name" className={styles.inputField} />
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="availableBrands">Charging For</label>
                            <div ref={brandDropdownRef}>
                                <MultiSelect
                                    className={styles.addShopSelect}
                                    options={chargingFor}
                                    value={selectedBrands}
                                    onChange={setSelectedBrands}
                                    labelledBy="Select Brands"
                                    closeOnChangedValue={false}
                                    closeOnSelect={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="services">
                                Charger Type
                            </label>
                            <div ref={serviceDropdownRef}>
                                <Select
                                    className={styles.addShopSelect}
                                    options={serviceOptions}
                                    value={selectedService}
                                    onChange={handleServiceChange}
                                    placeholder="Select Service"
                                    isClearable={true}
                                />
                            </div>
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="email">Charging Point</label>
                            <input type="email" id="email" placeholder="Charging Point" className={styles.inputField} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter description"
                                className={styles.inputField}
                                rows="4"
                            />
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="fullAddress">Full Address</label>
                            <textarea
                                id="fullAddress"
                                placeholder="Enter full address"
                                className={styles.inputField}
                                rows="4"
                            />
                        </div>
                    </div>
                    <div className={styles.locationRow}>

                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="latitude">Latitude</label>
                            <input type="text" id="latitude" placeholder="Latitude" className={styles.inputField} />
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="longitude">Longitude</label>
                            <input type="text" id="longitude" placeholder="Longitude" className={styles.inputField} />
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="location">Price</label>
                            <Select
                                options={locationOptions}
                                value={selectedLocation}
                                onChange={handleLocationChange}
                                placeholder="Select Location"
                                isClearable
                                className={styles.addShopSelect}
                            />
                        </div>
                    </div>
                    <div className={styles.scheduleSection}>
                        <div className={styles.alwaysOpen}>
                            <input type="checkbox" id="alwaysOpen" />
                            <label htmlFor="alwaysOpen">Always Open</label>
                        </div>
                        <div className={styles.timeSlotContainer}>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                <div className={styles.dayRow} key={day}>
                                    <span className={styles.dayLabel}>{day}</span>

                                    <label htmlFor={`${day}OpenTime`} className={styles.inputLabel}>
                                        Open Time
                                        <input
                                            type="text"
                                            id={`${day}Time`}
                                            placeholder="Enter times"
                                            className={styles.timeField}
                                        />
                                    </label>

                                    <label htmlFor={`${day}CloseTime`} className={styles.inputLabel}>
                                        Close Time
                                        <input
                                            type="text"
                                            id={`${day}Time`}
                                            placeholder="Enter times"
                                            className={styles.timeField}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Cover Image Upload */}
<div className={styles.fileUpload}>
    <label className={styles.fileLabel}>Cover Image</label>
    <div className={styles.fileDropZone}>
        <input
            type="file"
            id="coverFileUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
        />
        {!file ? (
            <label htmlFor="coverFileUpload" className={styles.fileUploadLabel}>
                <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                <p>Select File to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
            </label>
        ) : (
            <div className={styles.imageContainer}>
                <img src={URL.createObjectURL(file)} alt="Preview" className={styles.previewImage} />
                <button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
                    <AiOutlineClose size={20} style={{ padding: '2px' }} />
                </button>
            </div>
        )}
    </div>
    {errors.file && <p className={styles.error} style={{ color: 'red' }}>{errors.file}</p>}
</div>

{/* Station Gallery Multiple Image Upload */}
<div className={styles.fileUpload}>
    <label className={styles.fileLabel}>Station Gallery</label>
    <div className={styles.fileDropZone}>
        <input
            type="file"
            id="galleryFileUpload"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            style={{ display: 'none' }}
        />
        {galleryFiles.length === 0 ? (  // Use `galleryFiles` to check the gallery upload
            <label htmlFor="galleryFileUpload" className={styles.fileUploadLabel}>
                <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                <p>Select Files to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
            </label>
        ) : (
            <div className={styles.galleryContainer}>
                {galleryFiles.map((image, index) => (
                    <div className={styles.imageContainer} key={index}>
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className={styles.previewImage} />
                        <button type="button" className={styles.removeButton} onClick={() => handleRemoveGalleryImage(index)}>
                            <AiOutlineClose size={20} style={{ padding: '2px' }} />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
    {errors.gallery && <p className={styles.error} style={{ color: 'red' }}>{errors.gallery}</p>}
</div>

                </form>
            </div>
        </div>
    );
};

export default AddChargerStation;
