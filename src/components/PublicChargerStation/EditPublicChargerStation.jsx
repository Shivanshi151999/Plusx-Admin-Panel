import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import UploadIcon from '../../assets/images/uploadicon.svg';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './addcharger.module.css';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../api/Requests';

const EditPublicChargerStation = () => {
    const {stationId} = useParams()
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const [details, setDetails] = useState()
    const [file, setFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]); 
    const [errors, setErrors] = useState({});
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedType, setSelectedType] = useState([])

    const [stationName, setStationName] = useState()
    const [chargingFor, setChargingFor] = useState([])
    const [chargingType, setChargingType] = useState()
    const [chargingPoint, setChargingPoint] = useState()
    const [description, setDescription] = useState()
    const [address, setAddress] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [open, setOpen] = useState(false)
    const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);

    const [openDays, setOpenDays] = useState()

    const [timeSlots, setTimeSlots] = useState({
        Monday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Tuesday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Wednesday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Thursday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Friday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Saturday: { open: '', close: '', openMandatory: false, closeMandatory: false },
        Sunday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    });
    

    const handleTimeChange = (day, timeType) => (event) => {
        const value = event.target.value;
    
        setTimeSlots((prev) => {
            const updatedTimeSlots = {
                ...prev,
                [day]: {
                    ...prev[day],
                    [timeType]: value,
                },
            };

            if (timeType === 'open') {
                if (value) {
                    updatedTimeSlots[day].closeMandatory = true; 
                    updatedTimeSlots[day].closeMandatory = false; 
                }
            } else if (timeType === 'close') {
                if (value) {
                    updatedTimeSlots[day].openMandatory = true; 
                } else if (!updatedTimeSlots[day].open) {
                    updatedTimeSlots[day].openMandatory = false; 
                }
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
        const newErrors = {};
        let formIsValid = true;

        if (!stationName) {
            newErrors.stationName = "Station Name is required.";
            formIsValid = false;
        }
        
        if (!selectedType || selectedType.length === 0) {
            newErrors.chargerType = "Charging Type is required.";
            formIsValid = false;
        }

        if (!selectedBrands || selectedBrands.length === 0) {
            newErrors.chargingFor = "Charging For is required.";
            formIsValid = false;
        }
        if (!chargingPoint) {
            newErrors.chargingPoint = "Charging Point is required.";
            formIsValid = false;
        }
        if (!description) {
            newErrors.description = "Description is required.";
            formIsValid = false;
        }
        if (!address) {
            newErrors.address = "Address is required.";
            formIsValid = false;
        }
        if (!latitude) {
            newErrors.latitude = "Latitude is required.";
            formIsValid = false;
        }
        if (!longitude) {
            newErrors.longitude = "Longitude is required.";
            formIsValid = false;
        }

        if (!file) {
            newErrors.file = "Image is required.";
            formIsValid = false;
        }
        if (!galleryFiles || galleryFiles.length === 0) {
            newErrors.gallery = "Station Gallery is required.";
            formIsValid = false;
        }
        if (!price) {
            newErrors.price = "Price selection is required.";
            formIsValid = false;
        }

        if (!isAlwaysOpen) {
            Object.entries(timeSlots).forEach(([day, times]) => {
                if (times.open && !times.close) {
                    newErrors[`${day}CloseTime`] = ` Close Time is required `;
                    formIsValid = false;
                }
                if (times.close && !times.open) {
                    newErrors[`${day}OpenTime`] = ` Open Time is required `;
                    formIsValid = false;
                }
            });
        }
       

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            const formattedData = isAlwaysOpen
            ? { always_open: 1, days: [] } 
            : Object.entries(timeSlots).reduce((acc, [day, times]) => {
                if (times.open && times.close) {
                    acc.days.push(day.toLowerCase());
                    acc[`${day.toLowerCase()}_open_time`] = times.open;
                    acc[`${day.toLowerCase()}_close_time`] = times.close;
                }
                return acc;
            }, { days: [] });
    
        console.log(formattedData);
    
        const formData = new FormData();
        formData.append("userId", userDetails?.user_id);
        formData.append("email", userDetails?.email);
        formData.append("station_name", stationName);
    
        if (selectedBrands && selectedBrands.length > 0) {
            const selectedBrandsString = selectedBrands.map(brand => brand.value).join(', ');
            formData.append("charging_for", selectedBrandsString);
        }
    
        if (selectedType) {
            formData.append("charger_type", selectedType.value);
        }
        
        formData.append("charging_point", chargingPoint);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
    
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
    
        postRequestWithTokenAndFile('public-charger-add-station', formData, async (response) => {
            if (response.status === 1) {
                navigate('/public-charger-station-list');
            } else {
                console.log('Error in public-charger-add-station API:', response);
            }
        });
        } else {

        }
    };

    const fetchDetails = () => {
        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            station_id: stationId
        };
        let data

        postRequestWithToken('public-charger-station-details', obj, (response) => {
            if (response.code === 200) {
                 data = response?.data || {};
                setDetails(data);  
                setStationName(data?.station_name || "");
                setChargingFor(data?.charging_for || []);
                setChargingType(data?.charger_type || []);
                setChargingPoint(data?.charging_point || "");
                setDescription(data?.description || "");
                setAddress(data?.address || "");
                setLatitude(data?.latitude || "");
                setLongitude(data?.longitude || "");
                setFile(data?.station_image || "")
                setGalleryFiles(data?.gallery_data[0] || "")
                   
            } else {
                console.log('error in public-charger-station-detailsAPI', response);
            }
        });
    };
    
    
    const fetchChargingData = () => {
         const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            station_id: stationId
        };
        postRequestWithToken('public-charger-station-data', obj, (response) => {
         
            let data = response?.data || {};
            if (response.code === 200) {
                const transformedChargingFor = (response?.data?.chargerType || []).map(item => ({
                    label: item,
                    value: item
                }));
                const transformedChargingType = (response?.data?.chargingFor || []).map(item => ({
                    value: item,
                    label: item
                }));
    
                setChargingFor(transformedChargingFor);
                setChargingType(transformedChargingType);
    console.log('chargingFor',chargingFor);
    
                const initialSelectedBrands = chargingFor ? [{ label: chargingFor, value: chargingFor }] : [];
                setSelectedBrands(initialSelectedBrands);
            } else {
                console.error('Error in public-charger-station-data API:', response);
            }
        });
    };
    

      useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
          navigate('/login'); 
          return; 
        }
        fetchDetails();
        fetchChargingData()
      }, []);
    return (
        <div className={styles.addShopContainer}>
            <div className={styles.addHeading}>Edit Public Chargers</div>
            <div className={styles.addShopFormSection}>
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
                             {errors.stationName && <p className={styles.error}>{errors.stationName}</p>}
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
                                {errors.chargingFor && <p className={styles.error}>{errors.chargingFor}</p>}
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
                                {errors.chargerType && <p className={styles.error}>{errors.chargerType}</p>}
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
                                onChange={(e) => setChargingPoint(e.target.value)} 
                            />
                            {errors.chargingPoint && <p className={styles.error}>{errors.chargingPoint}</p>}
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
                            {errors.description && <p className={styles.error}>{errors.description}</p>}
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
                            {errors.address && <p className={styles.error}>{errors.address}</p>}
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
                                onChange={(e) => setLatitude(e.target.value)} 
                             />
                             {errors.latitude && <p className={styles.error}>{errors.latitude}</p>}
                        </div>
                        <div className={styles.addShopInputContainer}>
                            <label className={styles.addShopLabel} htmlFor="longitude">Longitude</label>
                            <input type="text" 
                            id="longitude"
                             placeholder="Longitude"
                              className={styles.inputField} 
                              value={longitude}
                                onChange={(e) => setLongitude(e.target.value)} 
                              />
                              {errors.longitude && <p className={styles.error}>{errors.longitude}</p>}
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
                             {errors.price && <p className={styles.error}>{errors.price}</p>}
                        </div>
                    </div>
                    <div className={styles.scheduleSection}>
                        <div className={styles.alwaysOpen}>
                        <input
                            type="checkbox"
                            id="alwaysOpen"
                            checked={isAlwaysOpen}
                            onChange={handleAlwaysOpenChange}
                        />
                            <label htmlFor="alwaysOpen">Always Open</label>
                        </div>
                        {!isAlwaysOpen && (
                            <div className={styles.timeSlotContainer}>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
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
                                            {errors[`${day}OpenTime`] && <p className={styles.error}>{errors[`${day}OpenTime`]}</p>}
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
                                            {errors[`${day}CloseTime`] && <p className={styles.error}>{errors[`${day}CloseTime`]}</p>}
                                        </label>
                                        
                                    </div>
                                ))}
                            </div>

                         )}
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
                    {galleryFiles.length === 0 ? (
                        <label htmlFor="galleryFileUpload" className={styles.fileUploadLabel}>
                            <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                            <p>Select Files to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
                        </label>
                    ) : (
                        <div className={styles.galleryContainer}>
                            {galleryFiles.map((image, index) => (
                                <div className={styles.imageContainer} key={index}>
                                    {/* <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className={styles.previewImage} /> */}

                                    <img
                                        src={
                                            typeof galleryFiles === 'string' 
                                                ? `${process.env.REACT_APP_SERVER_URL}uploads/charging-station-images/${galleryFiles}` 
                                                : URL.createObjectURL(galleryFiles)
                                        } 
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
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
<div className={styles.actions}>
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPublicChargerStation;