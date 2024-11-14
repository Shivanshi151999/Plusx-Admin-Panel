<<<<<<< Updated upstream
import React, { useState, useRef, useEffect } from "react";
=======
import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
>>>>>>> Stashed changes
import styles from './addshoplist.module.css';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AiOutlineClose } from 'react-icons/ai';
import UploadIcon from "../../../../assets/images/uploadicon.svg";
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddShopListForm = () => {
  const navigate = useNavigate();

  // State variables
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
<<<<<<< Updated upstream
  const [locationOptions, setLocationOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [serviceOptions, setServiceOptions]           = useState([])
  const [location, setLocation]         = useState([])
  const [services, setServices]         = useState([])
  const [brands, setBrands]         = useState([])

  // const locationOptions = [
  //   { value: 'delhi', label: 'Delhi' },
  //   { value: 'mumbai', label: 'Mumbai' },
  //   { value: 'bangalore', label: 'Bangalore' },
  //   { value: 'chennai', label: 'Chennai' },
  // ];
=======
  const [mapLocation, setMapLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India coordinates
  const [loading, setLoading] = useState(false);

  const locationOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
  ];
>>>>>>> Stashed changes
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "", // Leave empty if you don't have an API key
  });

  const handleInputChange = (e) => {
    setMapLocation(e.target.value);
  };

  const handleAddClick = () => {
    if (mapLocation.trim().toLowerCase() === "india") {
      setCenter({ lat: 20.5937, lng: 78.9629 }); // Center map to India
      setShowMap(true);
    } else {
      alert("Please enter 'India' to view the map.");
    }
  };

  const handleCloseClick = () => {
    setShowMap(false); // This should hide the map
  };

  const [timeSlots, setTimeSlots] = useState({
    Monday: { open: "", close: "" },
    Tuesday: { open: "", close: "" },
    Wednesday: { open: "", close: "" },
    Thursday: { open: "", close: "" },
    Friday: { open: "", close: "" },
    Saturday: { open: "", close: "" },
    Sunday: { open: "", close: "" },
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // Dropdown references
  const brandDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);

  const handleLocation = (selectedOption) => {
    setLocation(selectedOption)
}
  const handleBrand = (selectedOption) => {
    setBrands(selectedOption)
}

const handleService = (selectedOption) => {
  setServices(selectedOption)
}

  // Event Handlers
  const handleAlwaysOpenChange = () => {
    setIsAlwaysOpen(!isAlwaysOpen);
  };

  const handleTimeChange = (day, type) => (e) => {
    setTimeSlots({
      ...timeSlots,
      [day]: { ...timeSlots[day], [type]: e.target.value }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors({ ...errors, file: null });
  };

  const handleRemoveImage = () => {
    setFile(null);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setErrors({ ...errors, gallery: null });
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedFiles = galleryFiles.filter((_, i) => i !== index);
    setGalleryFiles(updatedFiles);
  };

  const handleCancel = () => {
    navigate("/shop-list");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation or submit the data
    toast.success("Shop details submitted successfully!");
  };

  const fetchDetails = () => {
    const obj = {
        userId: userDetails?.user_id,
        email: userDetails?.email,
        shop_id : ''
    };

    postRequestWithToken('shop-data', obj, (response) => {
        if (response.code === 200) {
            const locations = response.location[0];
            const formattedLocations = locations.map(loc => ({
                value: loc.location_name,
                label: loc.location_name
            }));
            setLocationOptions(formattedLocations);

            const services = response.services || [];
            const formattedServices = services.map(item => ({
                value: item,
                label: item
            }));
            setBrandOptions(formattedServices);
            
            const brands = response.brands || []; 
            const formattedBrands = brands.map(brand => ({
                value: brand,
                label: brand
            }));
            setServiceOptions(formattedBrands);
            
        } else {
            console.log('error in shop-data API', response);
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
      <div className={styles.addHeading}>Add Shop</div>
      <div className={styles.addShopFormSection}>
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="shopName" className={styles.addShopLabel}>Shop Name</label>
              <input type="text" id="shopName" placeholder="Shop Name" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="contactNo" className={styles.addShopLabel}>Contact No</label>
              <input type="text" id="contactNo" placeholder="Contact No" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="availableBrands" className={styles.addShopLabel}>Available Brands</label>
              <MultiSelect
                options={brandOptions}
                value={brands}
                onChange={handleBrand}
                labelledBy="Select Brands"
                className={styles.addShopSelect}
              />
            </div>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="services" className={styles.addShopLabel}>Services</label>
              <MultiSelect
                options={serviceOptions}
                value={services}
                onChange={handleService}
                labelledBy="Select Services"
                className={styles.addShopSelect}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="shopName" className={styles.addShopLabel}>Location</label>
              <Select
                options={locationOptions}
                value={location}
                onChange={handleLocation}
                placeholder="Select Location"
                isClearable={true}
              />
            </div>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="contactNo" className={styles.addShopLabel}>Area</label>
              <input type="text" id="contactNo" placeholder="Contact No" className={styles.inputField} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="shopName" className={styles.addShopLabel}>Latitude</label>
              <input type="text" id="shopName" placeholder="Shop Name" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="contactNo" className={styles.addShopLabel}>Longitude</label>
              <input type="text" id="contactNo" placeholder="Contact No" className={styles.inputField} />
            </div>

          </div>
          <div className={styles.textarea}>
            <div className={styles.mapMainContainer}>
              <div className={styles.addShopInputContainer}>
                <label htmlFor="mapLocation" className={styles.addShopLabel}>
                  Full Address
                </label>
                <input
                  type="text"
                  id="mapLocation"
                  placeholder="Enter Location"
                  className={styles.inputField}
                  value={mapLocation}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddClick}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.mapEmbedContainer}>
            {showMap && isLoaded && (
              <div className={styles.mapContainer}>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseClick}
                  title="Close Map"
                >
                  ✖
                </button>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "300px", borderRadius: "8px" }}
                  center={center}
                  zoom={4}
                >
                  <Marker position={center} />
                </GoogleMap>
              </div>
            )}

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
                        {errors[`${day}OpenTime`] && <p className={styles.error} style={{ color: 'red' }}>{errors[`${day}OpenTime`]}</p>}
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
                        {errors[`${day}CloseTime`] && <p className={styles.error} style={{ color: 'red' }}>{errors[`${day}CloseTime`]}</p>}
                      </label>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.fileUpload}>
            <label className={styles.fileLabel}>Cover Image</label>
            <div className={styles.fileDropZone}>
              <input
                type="file"
                id="coverFileUpload"
                // accept="image/*"
                accept=".jpeg,.jpg"
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
                // accept="image/*"
                accept=".jpeg,.jpg"
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

          <div className={styles.editButton}>
            <button className={styles.editCancelBtn} onClick={() => handleCancel()}>Cancel</button>
            <button type="submit" className={styles.editSubmitBtn}>Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddShopListForm;
