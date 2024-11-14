import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import styles from './addbike.module.css';
import UploadIcon from '../../assets/images/uploadicon.svg';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddElectricBike = () => {
  const userDetails                     = JSON.parse(sessionStorage.getItem('userDetails')); 
  const navigate                        = useNavigate()
  const [file, setFile]                 = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [errors, setErrors]             = useState({});
  const [carName, setCarName]       = useState()
  const [availableOn, setAvailableOn]   = useState()
  const [description, setDescription]   = useState()
  const [url, setUrl]         = useState()
  const [price, setPrice]               = useState()
  const [carType, setCarType]   = useState(null);
  const [contract, setContract]         = useState([])
  const [feature, setFeature]         = useState([])

  const contractDropdownRef = useRef(null);
  const featureDropdownRef = useRef(null);

    const typeOpetions = [
        // { value: "", label: "Select Vehicle Type" },
        { value: "Lease", label: "Lease" },
        { value: "Rent", label: "Rent" },
    ];

    const contractOptions = [
        { value: "1 Month", label: "1 Month" },
        { value: "6 Months", label: "6 Months" },
        { value: "1 Year", label: "1 Year" },
    ];
    const featureOptions = [
        { value: "5 Seater", label: "5 Seater" },
        { value: "Electric", label: "Electric" },
        { value: "Fully Automatic", label: "Fully Automatic" },
    ];

    const handleVehicleType = (selectedOption) => {
        setCarType(selectedOption)
    }

    const handleContract = (selectedOption) => {
        setContract(selectedOption)
    }

    const handleFeature = (selectedOption) => {
        setFeature(selectedOption)
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

const validateForm = () => {
    const fields = [
        { name: "carName", value: carName, errorMessage: "Bike Name is required." },
        { name: "availableOn", value: availableOn, errorMessage: "Available On is required." },
        { name: "carType", value: carType, errorMessage: "Bike Type is required." },
        { name: "price", value: price, errorMessage: "Price is required." },
        { name: "contract", value: contract, errorMessage: "Contract is required.", isArray: true},
        { name: "feature", value: feature, errorMessage: "Feature is required.", isArray: true },
        { name: "price", value: price, errorMessage: "Price is required." },
        { name: "description", value: description, errorMessage: "Description is required." },
        { name: "url", value: url, errorMessage: "Lease URL is required." },
        { name: "file", value: file, errorMessage: "Image is required." },
        { name: "gallery", value: galleryFiles, errorMessage: "Vehicle Gallery is required.", isArray: true },
    ];

    const newErrors = fields.reduce((errors, { name, value, errorMessage, isArray }) => {
        if ((isArray && (!value || value.length === 0)) || (!isArray && !value)) {
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
        formData.append("userId", userDetails?.user_id);
        formData.append("email", userDetails?.email);
        formData.append("bike_name", carName);
        formData.append("available_on", availableOn);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("lease_url", url);
        if (carType) {
            formData.append("bike_type", carType.value);
        }
        if (contract && contract.length > 0) {
            const selectedContracts = contract.map(item => item.value).join(', ');
            formData.append("contract", selectedContracts);
        }
        if (feature && feature.length > 0) {
            const selectedFeatures = feature.map(item => item.value).join(', ');
            formData.append("feature", selectedFeatures);
        }
        if (file) {
            formData.append("cover_image", file);
        }
        if (galleryFiles.length > 0) {
            galleryFiles.forEach((galleryFile) => {
                formData.append("rental_gallery", galleryFile);
            });
        }
        postRequestWithTokenAndFile('electric-bike-add', formData, async (response) => {
            if (response.status === 1) {
                toast(response.message || response.message[0], {type:'success'})
                setTimeout(() => {
                    navigate('/electric-bike-list');
                }, 1000);
            } else {
                toast(response.message || response.message[0], {type:'error'})
                console.log('Error in electric-bike-add API:', response);
            }
        } )
    }
};

const handleCancel = () => {
    navigate('/electric-bike-list')
}

  return (
    <div className={styles.addShopContainer}>
         <ToastContainer />
      <div className={styles.addHeading}>Add Electric Bike</div>
      <div className={styles.addShopFormSection}>
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="modelName">Bike Name</label>
              <input type="text" id="carName" 
                placeholder="Car Name" 
                className={styles.inputField} 
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                />
                {errors.carName && <p className={styles.error} style={{ color: 'red' }}>{errors.carName}</p>}
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="contactNo">Available On</label>
              <input type="text" 
              id="availableOn" 
              placeholder="Available On" 
              className={styles.inputField} 
              value={availableOn}
                onChange={(e) => setAvailableOn(e.target.value)}
              />
              {errors.availableOn && <p className={styles.error} style={{ color: 'red' }}>{errors.availableOn}</p>}
            </div>
          </div>
         
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
                <label className={styles.addShopLabel} htmlFor="vehicleType">Bike Type</label>
                <Select
                    options={typeOpetions}
                    value={carType}
                    onChange={handleVehicleType}
                    placeholder="Select"
                    isClearable
                    className={styles.addShopSelect}
                />
                {errors.carType && <p className={styles.error} style={{ color: 'red' }}>{errors.carType}</p>}
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="email">Price</label>
              <input type="text"
               id="engine" 
               placeholder="Price" 
               className={styles.inputField} 
               value={price}
                onChange={(e) => setPrice(e.target.value)}
               />
               {errors.price && <p className={styles.error} style={{ color: 'red' }}>{errors.price}</p>}
            </div>
          </div>
          <div className={styles.locationRow}>
               <div className={styles.addShopInputContainer}>
                    <label className={styles.addShopLabel} htmlFor="availableBrands">Contract</label>
                    <div ref={contractDropdownRef}>
                        <MultiSelect
                            className={styles.addShopSelect}
                            options={contractOptions}
                            value={contract}
                            onChange={handleContract}
                            labelledBy="Charging For"
                            closeOnChangedValue={false}
                            closeOnSelect={false}
                        />
                        {errors.contract && <p className={styles.error} style={{ color: 'red' }}>{errors.contract}</p>}
                    </div>
                </div>

                <div className={styles.addShopInputContainer}>
                    <label className={styles.addShopLabel} htmlFor="availableBrands">Feature</label>
                    <div ref={featureDropdownRef}>
                        <MultiSelect
                            className={styles.addShopSelect}
                            options={featureOptions}
                            value={feature}
                            onChange={handleFeature}
                            labelledBy="Feature"
                            closeOnChangedValue={false}
                            closeOnSelect={false}
                        />
                        {errors.feature && <p className={styles.error} style={{ color: 'red' }}>{errors.feature}</p>}
                    </div>
                </div>
            
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="modelName">Description</label>
              <input 
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
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="modelName">Lease URL</label>
              <input 
              type="text" 
              id="feature" 
              placeholder="Lease URL" 
              className={styles.inputField} 
              value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {errors.url && <p className={styles.error} style={{ color: 'red' }}>{errors.url}</p>}
            </div>
            
          </div>
          <div className={styles.fileUpload}>
                <label className={styles.fileLabel}>Cover Image</label>
                <div className={styles.fileDropZone}>
                    <input
                        type="file"
                        id="coverFileUpload"
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
            <div className={styles.fileUpload}>
                <label className={styles.fileLabel}>Bike Rental Gallery</label>
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
    </div>
  );
};

export default AddElectricBike;