import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker } from "@react-google-maps/api";
import styles from './addshoplist.module.css';
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AiOutlineClose } from 'react-icons/ai';
import UploadIcon from "../../../../assets/images/uploadicon.svg";
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Add from '../../../../assets/images/Plus.svg'
import Remove from '../../../../assets/images/remove.svg'
import ReactInputMask from "react-input-mask"
const AddShopListForm = () => {
  const navigate = useNavigate();

  // State variables
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationOptions, setLocationOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [location, setLocation] = useState([])
  const [services, setServices] = useState([])
  const [brands, setBrands] = useState([])
  const [mapLocation, setMapLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [shopName, setShopName] = useState('')
  const [contact, setContact] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [area, setArea] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [addresses, setAddresses] = useState([{ address: "", location: "", area_name: "", latitude: "", longitude: "" }])
  const [loader, setLoader] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const handleInputChange = (e) => {
    setMapLocation(e.target.value);
  };

  const handleAddClick = () => {
    const lastAddress = addresses[addresses.length - 1];

    // Check if all fields in the last address are filled
    if (
      !lastAddress.address.trim() ||
      !lastAddress.location ||
      !lastAddress.area_name.trim() ||
      !lastAddress.latitude ||
      !lastAddress.longitude
    ) {
      alert("Please fill out all fields in the current address before adding a new one.");
      return;
    }

    setAddresses((prev) => [
      ...prev,
      { address: "", location: "", area_name: "", latitude: "", longitude: "" },
    ]);
  };
  const handleRemoveClick = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };
  const handleAddressInputChange = (index, field, value) => {
    if (field === "location") {

      value = value?.label || "";
    }
    setAddresses((prev) =>
      prev.map((addr, i) =>
        i === index ? { ...addr, [field]: value } : addr
      )
    );
  };


  const handleOnBlur = (index) => {
    const currentAddress = addresses[index].address;

    if (!currentAddress.trim()) {
      setErrors((prev) => ({ ...prev, [`mapLocation_${index}`]: 'Address is required' }));
      return;
    }

    setLoading(true);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: currentAddress }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setAddresses((prev) =>
          prev.map((addr, i) =>
            i === index ? { ...addr, latitude: lat, longitude: lng } : addr
          )
        );

        setCenter({ lat, lng });
        setShowMap(true);
        setLoading(false);
      } else {
        setLoading(false);
        setErrors((prev) => ({
          ...prev,
          [`mapLocation_${index}`]: 'Unable to fetch coordinates. Please try again.',
        }));
      }
    });
  };



  const handleCloseClick = () => {
    setShowMap(false); // This should hide the map
  };

  const [timeSlots, setTimeSlots] = useState({
    Monday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Tuesday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Wednesday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Thursday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Friday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Saturday: { open: '', close: '', openMandatory: false, closeMandatory: false },
    Sunday: { open: '', close: '', openMandatory: false, closeMandatory: false },
  });
  const [errors, setErrors]             = useState({});
  const [file, setFile]                 = useState(null);
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
        if (value) {
          updatedTimeSlots[day].closeMandatory = true;
        } else {
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
    navigate("/ev-specialized/shop-list");
  };

  const validateForm = () => {
    const fields = [
      { name: "shopName",  value: shopName, errorMessage: "Shop name is required." },
      { name: "contactNo", value: contact, errorMessage: "Please enter a valid contact no.", isMobile: true },
      { name: "brands",    value: brands, errorMessage: "Brand is required.", isArray: true },
      { name: "services",  value: services, errorMessage: "Service is required.", isArray: true },
      { name: "email",     value: email, errorMessage: "Please enter a valid email.", isEmail: true },
      // { name: "file",      value: file, errorMessage: "Image is required." },
    ];

    const newErrors = fields.reduce((errors, { name, value, errorMessage, isMobile, isArray, isEmail }) => {
      if (!value && !isEmail) {
        // Field is required (except email)
        errors[name] = errorMessage;
      } else if (isMobile && (isNaN(value) || value.length < 9 || value.length > 12)) {
        // Validate mobile number
        errors[name] = errorMessage;
      } else if (isEmail && value && !/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        // Validate email format if a value exists
        errors[name] = errorMessage;
      } else  if ((isArray && (!value || value.length === 0)) || (!isArray && !value)) {
        errors[name] = errorMessage;
    }
      return errors;
    }, {});

    addresses.forEach((addr, index) => {
      if (!addr.address.trim()) {
        newErrors[`address_${index}`] = "Address is required.";
      }
      if (!addr.location) {
        newErrors[`location_${index}`] = "Location is required.";
      }
      if (!addr.area_name) {
        newErrors[`area_name_${index}`] = "Area name is required.";
      }
      if (!addr.latitude) {
        newErrors[`latitude_${index}`] = "Latitude is required.";
      }
      if (!addr.longitude) {
        newErrors[`longitude_${index}`] = "Longitude is required.";
      }
    });

    const hasValidTimeSlot = Object.values(timeSlots).some(
      (times) => times.open && times.close
  );

    if (!isAlwaysOpen && !hasValidTimeSlot) {
      newErrors["timeSlots"] = "Either select 'Always Open' or fill at least one time slot.";
  }
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
    setLoader(true);

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
      let addressArray = []
      let areaNameArray = []
      let locationArray = []
      let latitudeArray = []
      let longitudeArray = []

      addressArray = addresses.map((item) => item.address);
      areaNameArray = addresses.map((item) => item.area_name);
      locationArray = addresses.map((item) => item.location);
      latitudeArray = addresses.map((item) => item.latitude);
      longitudeArray = addresses.map((item) => item.longitude);


      const formData = new FormData();
      formData.append("userId", userDetails?.user_id);
      formData.append("email", userDetails?.email);
      formData.append("shop_name", shopName);
      formData.append("contact_no", contact);
      formData.append("store_email", email);
      formData.append("store_website", website);
      formData.append("description", description);


      addressArray.forEach(item => formData.append("address[]", item));
      areaNameArray.forEach(item => formData.append("area_name[]", item));
      locationArray.forEach(item => formData.append("location[]", item));
      latitudeArray.forEach(item => formData.append("latitude[]", item));
      longitudeArray.forEach(item => formData.append("longitude[]", item));

      if (brands && brands.length > 0) {
        const selectedBrandsString = brands.map(brand => brand.value).join(', ');
        formData.append("brands", selectedBrandsString);
      }
      if (services && services.length > 0) {
        const selectedServices = services.map(brand => brand.value).join(', ');
        formData.append("services", selectedServices);
      }
      //   if (location) {
      //     formData.append("location", location.value);
      // }
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

      postRequestWithTokenAndFile('shop-add', formData, async (response) => {
        if (response.status === 1) {
          toast(response.message || response.message[0], { type: 'success' })
          setTimeout(() => {
            setLoader(false);
            navigate('/ev-specialized/shop-list');
          }, 1000);
        } else {
          toast(response.message || response.message[0], { type: 'error' })
          console.log('Error in shop-add API:', response);
          setLoader(false);
        }
      })
      // toast.success("Shop details submitted successfully!");
    } else {
      toast.error("Some fields are missing");
      setLoader(false);
    }
  };

  const fetchDetails = () => {
    const obj = {
      userId  : userDetails?.user_id,
      email   : userDetails?.email,
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

        setServiceOptions(formattedServices);

        const brands = response.brands || [];
        const formattedBrands = brands.map(brand => ({
          value: brand,
          label: brand
        }));
        setBrandOptions(formattedBrands);

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

    <>

      <div className={styles.addShopContainer}>
        <div className={styles.addHeading}>Add Shop</div>
        <div className={styles.addShopFormSection}>
          <form className={styles.formSection} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.addShopInputContainer}>
                <label htmlFor="shopName" className={styles.addShopLabel}>Shop Name</label>
                <input type="text" id="shopName"
                autoComplete="off"
                  placeholder="Shop Name"
                  className={styles.inputField}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
                {errors.shopName && shopName == '' && <p className={styles.error} style={{ color: 'red' }}>{errors.shopName}</p>}
              </div>
              <div className={styles.addShopInputContainer}>
                <label htmlFor="contactNo" className={styles.addShopLabel}>Contact No</label>
                <input type="text" id="contactNo"
                autoComplete="off"
                  placeholder="Contact No"
                  className={styles.inputField}
                  value={contact}
                  // onChange={(e) => setContact(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,12}$/.test(value)) {
                      setContact(value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.contactNo && contact.length < 9 && <p className={styles.error} style={{ color: 'red' }}>{errors.contactNo}</p>}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.addShopInputContainer}>
                <label htmlFor="website" className={styles.addShopLabel}>Website</label>
                <input type="text" id="website"
                autoComplete="off"
                  placeholder="Website"
                  className={styles.inputField}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                {errors.website && <p className={styles.error} style={{ color: 'red' }}>{errors.shopName}</p>}
              </div>
              <div className={styles.addShopInputContainer}>
                <label htmlFor="email" className={styles.addShopLabel}>Email</label>
                <input  id="contactNo"
                  placeholder="Email"
                  autoComplete="off"
                  type="email"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && email == '' && <p className={styles.error} style={{ color: 'red' }}>{errors.email}</p>}
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
                {errors.brands && (!brands || brands.length === 0) && <p className={styles.error} style={{ color: 'red' }}>{errors.brands}</p>}
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
                {errors.services && (!services || services.length === 0) && <p className={styles.error} style={{ color: 'red' }}>{errors.services}</p>}
              </div>
            </div>

            <div className={styles.textarea}>
              <div className={styles.mapMainContainer}>
                <div className={styles.addShopInputContainer}>
                  <label htmlFor="description" className={styles.addShopLabel}>
                    Description
                  </label>
                  <textarea
                  autoComplete="off"
                    type="text"
                    id="description"
                    placeholder="Description"
                    className={styles.inputField}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <p className={styles.error} style={{ color: 'red' }}>{errors.description}</p>}
                </div>

              </div>
            </div>
            <div className={styles.mainAddSection}>
              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddClick}
                disabled={loading}
              >
                <img className={styles.imageShopList} src={Add} alt="add" />
               <span className={styles.addSpan}>Add</span> 
              </button>
              {addresses.length > 1 && (
                <button
                  type="button"
                  className={styles.formRemoveButton}
                  onClick={() => handleRemoveClick(addresses.length - 1)} 
                >
                  <img className={styles.imageShopList} src={Remove} alt="add" />
                  <span className={styles.removesection}>Remove</span>
                </button>
              )}
            </div>
            {addresses.map((addr, index) => (
              <div className={styles.mainShopContainer} key={index}>
                <div className={styles.row}>
                  <div className={styles.textarea}>
                    <div className={styles.mapMainContainer}>
                      <div className={styles.addShopInputContainer}>
                        <label htmlFor="mapLocation" className={styles.addShopLabel}>
                          Full Address
                        </label>
                        <input
                        autoComplete="off"
                          type="text"
                          id="mapLocation"
                          placeholder="Enter Address"
                          className={styles.inputField}
                          value={addr.address}
                          onChange={(e) =>
                            handleAddressInputChange(index, "address", e.target.value)
                          }
                          // onBlur={handleOnBlur}
                          onBlur={() => handleOnBlur(index)}
                        />
                        {errors[`address_${index}`] && addr.address === "" &&  <p className={styles.error}>{errors[`address_${index}`]}</p>}
                    

                        {errors[`mapLocation_${index}`] && (
                          <p className={styles.error} style={{ color: "red" }}>
                            {errors[`mapLocation_${index}`]}
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                  <div className={styles.addShopInputContainer}>
                    <label htmlFor="shopName" className={styles.addShopLabel}>Location</label>
                    <Select
                      options={locationOptions}
                      // value={location}
                      value={addr.location?.value}
                      // onChange={handleLocation}
                      onChange={(selectedOption) =>
                        handleAddressInputChange(index, "location", selectedOption)
                      }
                      placeholder="Select Location"
                      isClearable={true}
                    />
                    {errors[`location_${index}`] && addr.location === "" &&  <p className={styles.error}>{errors[`location_${index}`]}</p>}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.addShopInputContainer}>
                    <label htmlFor="area" className={styles.addShopLabel}>Area</label>
                    <input type="text" id="area"
                    autoComplete="off"
                      placeholder="Area"
                      className={styles.inputField}
                      // value={area}
                      value={addr.area_name}
                      // onChange={(e) => setArea(e.target.value)}
                      onChange={(e) =>
                        handleAddressInputChange(index, "area_name", e.target.value)
                      }
                    />
                    {errors[`area_name_${index}`] && addr.area_name === "" && <p className={styles.error}>{errors[`area_name_${index}`]}</p>}
                  </div>
                  <div className={styles.addShopInputContainer}>
                    <label htmlFor="latitude" className={styles.addShopLabel}>Latitude</label>
                    <input type="text" id="latitude"
                    autoComplete="off"
                      placeholder="Latitide"
                      className={styles.inputField}
                      // value={latitude || ''}
                      value={addr.latitude || ""}
                      // onChange={(e) => setLatitude(e.target.value)}
                      onChange={(e) =>
                        handleAddressInputChange(index, "latitude", e.target.value)
                      }
                    />
                    {errors[`latitude_${index}`] && addr.latitude === "" && <p className={styles.error}>{errors[`latitude_${index}`]}</p>}
                  </div>
                  <div className={styles.addShopInputContainer}>
                    <label htmlFor="longitude" className={styles.addShopLabel}>Longitude</label>
                    <input type="text" id="longitude"
                    autoComplete="off"
                      placeholder="Longitude"
                      className={styles.inputField}
                      // value={longitude || ''}
                      value={addr.longitude || ""}
                      // onChange={(e) => setLongitude(e.target.value)}
                      onChange={(e) =>
                        handleAddressInputChange(index, "longitude", e.target.value)
                      }
                    />
                    {errors[`longitude_${index}`] && addr.longitude === "" && <p className={styles.error}>{errors[`longitude_${index}`]}</p>}
                  </div>
                </div>
              </div>
            ))}
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
                    zoom={14}
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
                         <span className={styles.openSection}> Open Time</span>
                          <ReactInputMask
                           mask="99:99"
                            id={`${day}OpenTime`}
                            placeholder="Enter time"
                            className={styles.timeField}
                            value={timeSlots[day].open}
                            onChange={handleTimeChange(day, 'open')}
                          />
                          {errors[`${day}OpenTime`] && <p className={styles.error} style={{ color: 'red' }}>{errors[`${day}OpenTime`]}</p>}
                        </label>


                        <label htmlFor={`${day}CloseTime`} className={styles.inputLabel}>
                        <span className={styles.openSection}>Close Time</span>
                         
                          <ReactInputMask
                            mask="99:99"
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
                {errors.timeSlots && <p className={styles.error} style={{ color: 'red' }}>{errors.timeSlots}</p>}
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
                <label htmlFor="galleryFileUpload" className={styles.fileUploadLabel}>
                  <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                  <p>Select Files to Upload <br /> or Drag & Drop, Copy & Paste Files</p>
                </label>
              </div>
              {galleryFiles && (
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
              {errors.gallery && <p className={styles.error} style={{ color: 'red' }}>{errors.gallery}</p>}
            </div>

            <div className={styles.editButton}>
              <button className={styles.editCancelBtn} onClick={() => handleCancel()}>Cancel</button>
              <button disabled={loader} type="submit" className={styles.editSubmitBtn}>
                {loader ? (
                      <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submit...
                      </>
                  ) : (
                      "Submit"
                  )}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddShopListForm;

