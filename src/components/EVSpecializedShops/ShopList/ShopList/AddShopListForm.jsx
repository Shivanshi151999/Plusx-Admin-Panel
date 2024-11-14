import React, { useState, useRef } from "react";
import styles from './addshoplist.module.css';
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AiOutlineClose } from 'react-icons/ai';
import UploadIcon from "../../../../assets/images/uploadicon.svg";

const AddShopListForm = () => {
  const navigate = useNavigate();

  // State variables
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const locationOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
  ];
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  const handleInputChange = (e) => {
    setMapLocation(e.target.value);
  };
  const handleAddClick = () => {
    if (mapLocation.trim() !== "") {
      // Create Google Maps Embed URL with your API key
      const googleEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(mapLocation)}`;
      setEmbedUrl(googleEmbedUrl);
    } else {
      alert("Please enter a location before clicking Add.");
    }
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

  // Brand and service options
  const brandOptions = [
    { label: "BMW", value: "BMW" },
    { label: "Honda City", value: "Honda City" },
    { label: "Range Rover", value: "Range Rover" }
  ];

  const serviceOptions = [
    { label: "Delivery", value: "delivery" },
    { label: "Home Service", value: "home_service" },
    { label: "Online Payment", value: "online_payment" }
  ];

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
                value={selectedBrands}
                onChange={setSelectedBrands}
                labelledBy="Select Brands"
                className={styles.addShopSelect}
              />
            </div>
            <div className={styles.addShopInputContainer}>
              <label htmlFor="services" className={styles.addShopLabel}>Services</label>
              <MultiSelect
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
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
                value={selectedLocation}
                onChange={handleLocationChange}
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
                className={styles.addButtons}
                onClick={handleAddClick}
              >
                Add
              </button>
            </div>

            {/* Display map below the input */}
            {embedUrl && (
              <div className={styles.mapContainer}>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="400"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            )}
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
