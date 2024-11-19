import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import UploadIcon from '../../assets/images/uploadicon.svg';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './addcharger.module.css';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditPublicChargerStation = () => {
    const {stationId} = useParams()
    const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                            = useNavigate();
    const [details, setDetails]               = useState()
    const [file, setFile]                     = useState(null);
    const [galleryFiles, setGalleryFiles]     = useState([]); 
    const [errors, setErrors]                 = useState({});
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedType, setSelectedType]     = useState([])

    const [stationName, setStationName]     = useState()
    const [chargingFor, setChargingFor]     = useState([])
    const [chargingType, setChargingType]   = useState()
    const [chargingPoint, setChargingPoint] = useState()
    const [description, setDescription]     = useState()
    const [address, setAddress]             = useState()
    const [latitude, setLatitude]           = useState()
    const [longitude, setLongitude]         = useState()
    const [open, setOpen]                   = useState(false)
    const [isAlwaysOpen, setIsAlwaysOpen]   = useState(false);
    const [status, setStatus]               = useState(true)
    const [openDays, setOpenDays]           = useState()

    const [timeSlots, setTimeSlots] = useState({
        Monday    : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Tuesday   : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Wednesday : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Thursday  : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Friday    : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Saturday  : { open: '', close: '', openMandatory: false, closeMandatory: false },
        Sunday    : { open: '', close: '', openMandatory: false, closeMandatory: false },
    });
    const handleTimeChange = (day, timeType) => (event) => {

        const value = event.target.value.replace(/[^0-9:-]/g, '');

        setTimeSlots((prev) => {
            const updatedTimeSlots = {
                ...prev,
                [day]: {
                    ...prev[day],
                    [timeType]: value,
                },
            };
            if (timeType === 'open') {
                updatedTimeSlots[day].closeMandatory = !!value;
            } else if (timeType === 'close') {
                updatedTimeSlots[day].openMandatory = !!value;
            }

            return updatedTimeSlots;
        });
    };
    const brandDropdownRef = useRef(null);
    const serviceDropdownRef = useRef(null);

    const handleAlwaysOpenChange = (event) => {
        setIsAlwaysOpen(event.target.checked);
    };
    const [selectedService, setSelectedService] = useState(null);

    const handleChargingFor = (selectedOptions) => {
        setSelectedBrands(selectedOptions);
    };
    const handleServiceChange = (selectedOption) => setSelectedService(selectedOption);

    const handleChargingType = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const [price, setPrice] = useState(null);
    const priceOptions = [
        { value: "Free", label: "Free" },
        { value: "Paid", label: "Paid" },
    ];
    const handleLocationChange = (selectedOption) => setPrice(selectedOption);

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
    useEffect(() => {
        return () => {
            galleryFiles.forEach((image) => URL.revokeObjectURL(image));
        };
    }, [galleryFiles]);


    const validateForm = () => {
        const fields = [
            { name: "stationName", value: stationName, errorMessage: "Station Name is required." },
            { name: "chargerType", value: selectedType, errorMessage: "Charging Type is required.", isArray: true },
            { name: "chargingFor", value: selectedBrands, errorMessage: "Charging For is required.", isArray: true },
            { name: "chargingPoint", value: chargingPoint, errorMessage: "Charging Point is required." },
            { name: "description", value: description, errorMessage: "Description is required." },
            { name: "address", value: address, errorMessage: "Address is required." },
            { name: "latitude", value: latitude, errorMessage: "Latitude is required." },
            { name: "longitude", value: longitude, errorMessage: "Longitude is required." },
            // { name: "file", value: file, errorMessage: "Image is required." },
            // { name: "gallery", value: galleryFiles, errorMessage: "Station Gallery is required.", isArray: true },
            { name: "price", value: price, errorMessage: "Price selection is required." }
        ];
    
        const newErrors = fields.reduce((errors, { name, value, errorMessage, isArray }) => {
            if ((isArray && (!value || value.length === 0)) || (!isArray && !value)) {
                errors[name] = errorMessage;
            }
            return errors;
        }, {});
    
        // Validate time slots only if not always open
        if (!isAlwaysOpen) {
            Object.entries(timeSlots).forEach(([day, times]) => {
                if (times.open && !times.close) {
                    newErrors[`${day}CloseTime`] = `${day} Close Time is required`;
                }
                if (times.close && !times.open) {
                    newErrors[`${day}OpenTime`] = `${day} Open Time is required`;
                }
            });
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formattedData = isAlwaysOpen ? { always_open: 1, days: [] }
                : Object.entries(timeSlots).reduce((acc, [day, times]) => {
                    if (times.open && times.close) {
                        acc.days.push(day.toLowerCase());
                        acc[`${day.toLowerCase()}_open_time`] = times.open;
                        acc[`${day.toLowerCase()}_close_time`] = times.close;
                    }
                    return acc;
                }, { days: [] });

            const formData = new FormData();
            formData.append("userId", userDetails?.user_id);
            formData.append("email", userDetails?.email);
            formData.append("station_id", stationId);
            formData.append("station_name", stationName);

            if (selectedBrands && selectedBrands.length > 0) {
                const selectedBrandsString = selectedBrands.map(brand => brand.value).join(', ');
                formData.append("charging_for", selectedBrandsString);
            }
            if (selectedType) {
                let selected = '';

                if (Array.isArray(selectedType)) {
                    selected = selectedType.map(type => type.value).join('');
                } else {
                    selected = selectedType.value;
                }
                formData.append("charger_type", selected);
            }
            formData.append("charging_point", chargingPoint);
            formData.append("description", description);
            formData.append("address", address);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("status", isActive === true ? 1 : 0);

            if (price) {
                formData.append("price", price.value);
            }
            formData.append("always_open", formattedData.always_open || 0);

            if (isAlwaysOpen) {
                formData.append("days[]", formattedData.days);
            } else {
                formattedData.days.forEach(day => formData.append("days[]", day));
            }
            if (!isAlwaysOpen) {
                Object.keys(formattedData).forEach(key => {
                    if (key !== 'days' && key !== 'always_open') {
                        formData.append(key, formattedData[key]);
                    }
                });
            }
            if (file) {
                formData.append("cover_image", file);
            }
            if (galleryFiles.length > 0) {
                galleryFiles.forEach((galleryFile) => {
                    formData.append("shop_gallery", galleryFile);
                });
            }
            postRequestWithTokenAndFile('public-charger-edit-station', formData, async (response) => {
                if (response.status === 1) {
            
                    toast(response.message || response.message[0], {type:'success'})
                    setTimeout(() => {
                        navigate('/public-charger-station-list');
                    }, 1000);
                } else {
                    toast(response.message || response.message[0], {type:'error'})
                    console.log('Error in public-charger-add-station API:', response);
                }
            });
        } else {
            toast.error("Some fields are missing");
        }
    };

    const fetchDetails = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            station_id : stationId
        };
        postRequestWithToken('public-charger-station-details', obj, (response) => {
            
            if (response.code === 200) {
                const data = response?.data || {};
                
                const openDays = data.open_days.split('_') .map(day => {
                    const trimmedDay = day.trim();
                    return trimmedDay.charAt(0).toUpperCase() + trimmedDay.slice(1).toLowerCase();
                });

                const openTimings = data.open_timing.split('_');
                const updatedTimeSlots = { ...timeSlots };

                openDays.forEach((day, index) => {
                    if (updatedTimeSlots[day] && openTimings[index]) {
                        const [openTime, closeTime] = openTimings[index].split('-');
                        updatedTimeSlots[day].open = openTime;
                        updatedTimeSlots[day].close = closeTime;
                        updatedTimeSlots[day].openMandatory = true;
                        updatedTimeSlots[day].closeMandatory = true;
                    }
                });
                setIsAlwaysOpen(data.always_open === 0);
                const selectedPrice = priceOptions.find(option => option.value === data.price);
                setPrice(selectedPrice);
                setTimeSlots(updatedTimeSlots);
                setDetails(data);
                setStationName(data?.station_name || "");
                setChargingFor(data?.charging_for || []);
                setChargingType(data?.charger_type || []);
                setChargingPoint(data?.charging_point || "");
                setDescription(data?.description || "");
                setAddress(data?.address || "");
                setLatitude(data?.latitude || "");
                setLongitude(data?.longitude || "");
                setFile(data?.station_image || "");
                setGalleryFiles(response?.gallery_data || []);
                setIsAlwaysOpen(data?.always_open === 1 ? true : false)
                setIsActive(data?.status)
                const transformedChargingFor = (response?.result?.chargingFor || []).map(item => ({
                    label: item,
                    value: item
                }));
                setChargingFor(transformedChargingFor);

                // const initialSelectedBrands = transformedChargingFor.length ?
                //     [{ label: transformedChargingFor[0].label, value: transformedChargingFor[0].value }] : [];

                const initialSelectedBrands = ( data?.charging_for.split(", ") || []).map(item => ({ 
                    label: item,
                    value: item
                }));
                setSelectedBrands(initialSelectedBrands);

                const transformedChargingType = (response?.result?.chargerType || []).map(item => ({
                    label: item,
                    value: item
                }));
                const initialChargerType = transformedChargingType.find(item => item.value === data.charger_type) || {};

                setChargingType(transformedChargingType);
                setSelectedType(initialChargerType);

            } else {
                console.error('Error in public-charger-station-details API', response);
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
        navigate('/public-charger-station-list')
    }

    // Start the toogle button function
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.addShopContainer}>
            <div className={styles.addHeading}>Edit Public Chargers</div>
            <div className={styles.addShopFormSection}>
                <ToastContainer />
                <form className={styles.formSection} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="shopName">Station Name</label>
                            <input
                                type="text"
                                id="shopName"
                                placeholder="Shop Name"
                                className={styles.inputField}
                                value={stationName}
                                onChange={(e) => setStationName(e.target.value)}
                            />
                            {errors.stationName && <p className="error">{errors.stationName}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="availableBrands">Charging For</label>
                            <div ref={brandDropdownRef}>
                                <MultiSelect
                                    className={styles.addShopSelect}
                                    options={chargingFor}
                                    value={selectedBrands}
                                    onChange={handleChargingFor}
                                    labelledBy="Charging For"
                                    closeOnChangedValue={false}
                                    closeOnSelect={false}
                                />
                                {errors.chargingFor && <p className="error">{errors.chargingFor}</p>}
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
                                    options={chargingType}
                                    value={selectedType}
                                    onChange={handleChargingType}
                                    placeholder="Select Service"
                                    isClearable={true}
                                />
                                {errors.chargerType && <p className="error">{errors.chargerType}</p>}
                            </div>
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="email">Charging Point</label>

                            <input
                                type="text"
                                id="chargingPoint"
                                placeholder="Charging Point"
                                className={styles.inputField}
                                value={chargingPoint}
                                // onChange={(e) => setChargingPoint(e.target.value)} 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setChargingPoint(value);
                                    }
                                }}
                            />
                            {errors.chargingPoint && <p className="error">{errors.chargingPoint}</p>}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && <p className="error">{errors.description}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="fullAddress">Full Address</label>
                            <textarea
                                id="fullAddress"
                                placeholder="Enter full address"
                                className={styles.inputField}
                                rows="4"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && <p className="error">{errors.address}</p>}
                        </div>
                    </div>
                    <div className={styles.locationRow}>

                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="latitude">Latitude</label>
                            <input type="text"
                                id="latitude"
                                placeholder="Latitude"
                                className={styles.inputField}
                                value={latitude}
                                // onChange={(e) => setLatitude(e.target.value)}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^-?\d*\.?\d{0,8}$/.test(value)) {
                                        setLatitude(value);
                                    }
                                }}
                            />
                            {errors.latitude && <p className="error">{errors.latitude}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="longitude">Longitude</label>
                            <input type="text"
                                id="longitude"
                                placeholder="Longitude"
                                className={styles.inputField}
                                value={longitude}
                                // onChange={(e) => setLongitude(e.target.value)}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^-?\d*\.?\d{0,8}$/.test(value)) {
                                        setLongitude(value);
                                    }
                                }}
                            />
                            {errors.longitude && <p className="error">{errors.longitude}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="location">Price</label>
                            <Select
                                options={priceOptions}
                                value={price}
                                onChange={handleLocationChange}
                                placeholder="Select"
                                isClearable
                                className={styles.addShopSelect}
                            />
                            {errors.price && <p className="error">{errors.price}</p>}
                        </div>
                    </div>
                    <div className={styles.scheduleSection}>
                        <div className={styles.alwaysOpen}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id="alwaysOpen"
                                    checked={isAlwaysOpen}
                                    onChange={handleAlwaysOpenChange}
                                />
                                <span className={styles.checkmark}></span>
                                <div className={styles.checkboxText}>Always Open</div>
                            </label>
                        </div>


                        {!isAlwaysOpen && (
                            <div className={styles.timeSlotContainer}>
                                {Object.keys(timeSlots).map(day => (
                                    <div className={styles.dayRow} key={day}>
                                        <span className={styles.dayLabel}>{day}</span>

                                        <label htmlFor={`${day}OpenTime`} className={styles.inputLabel}>
                                            Open Time
                                            <input
                                                type="text"
                                                id={`${day}OpenTime`}
                                                placeholder="Enter time"
                                                className={styles.timeField}
                                                value={timeSlots[day].open}
                                                onChange={handleTimeChange(day, 'open')}
                                            />
                                            {errors[`${day}OpenTime`] && <p className="error">{errors[`${day}OpenTime`]}</p>}
                                        </label>

                                        <label htmlFor={`${day}CloseTime`} className={styles.inputLabel}>
                                            Close Time
                                            <input
                                                type="text"
                                                id={`${day}CloseTime`}
                                                placeholder="Enter time"
                                                className={styles.timeField}
                                                value={timeSlots[day].close}
                                                onChange={handleTimeChange(day, 'close')}
                                            />
                                            {errors[`${day}CloseTime`] && <p className="error">{errors[`${day}CloseTime`]}</p>}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.toggleContainer}>
                        <label className={styles.statusLabel}>Status</label>
                        <div className={styles.toggleSwitch} onClick={handleToggle}>
                            <span className={`${styles.toggleLabel} ${!isActive ? styles.inactive : ''}`}>
                                Occupied
                            </span>
                            <div className={`${styles.toggleButton} ${isActive ? styles.active : ''}`}>
                                <div className={styles.slider}></div>
                            </div>
                            <span className={`${styles.toggleLabel} ${isActive ? styles.active : ''}`}>
                                Available
                            </span>
                        </div>
                    </div>
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
                                    {/* <img src={URL.createObjectURL(file)} alt="Preview" className={styles.previewImage} /> */}
                                    <img
                                        src={
                                            typeof file === 'string'
                                                ? `${process.env.REACT_APP_SERVER_URL}uploads/charging-station-images/${file}`
                                                : URL.createObjectURL(file)
                                        }
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
                                    <button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
                                        <AiOutlineClose size={20} style={{ padding: '2px' }} />
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.file && <p className="error">{errors.file}</p>}
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
                            {galleryFiles.length === 0 ? (
                                <label htmlFor="galleryFileUpload" className={styles.fileUploadLabel}>
                                    <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                                    <p>Select Files to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
                                </label>
                            ) : (
                                <div className={styles.galleryContainer}>


                                    {Array.isArray(galleryFiles) && galleryFiles.length > 0 ? (
                                        galleryFiles.map((file, index) => (
                                            <img
                                                key={index}
                                                src={
                                                    typeof file === 'string'
                                                        ? `${process.env.REACT_APP_SERVER_URL}uploads/charging-station-images/${file}`
                                                        : URL.createObjectURL(file)
                                                }
                                                alt={`Preview ${index + 1}`}
                                                className={styles.previewImage}
                                            />
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {errors.gallery && <p className="error">{errors.gallery}</p>}
                    </div>
                    {/* <div className={styles.actions}>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div> */}

                    <div className={styles.editButton}>
                        <button className={styles.editCancelBtn} onClick={() => handleCancel()}>Cancel</button>
                        <button type="submit" className={styles.editSubmitBtn}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPublicChargerStation;
