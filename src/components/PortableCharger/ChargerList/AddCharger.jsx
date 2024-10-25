import React, { useState } from 'react';
import styles from './addcharger.module.css';
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'; 
import UploadIcon from '../../../assets/images/uploadicon.svg'; 

const AddPortableCharger = () => {
    const [file, setFile] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);  

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

       
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
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

    return (
        <div className={styles.containerCharger}>
            <h2 className={styles.title}>Add Charger</h2>
            <div className={styles.chargerSection}>
                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Name</label>
                            <input className={styles.inputCharger} type="text" placeholder="Super Charger" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Price</label>
                            <input className={styles.inputCharger} type="text" placeholder="AED 150" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Type</label>
                            <div className={styles.selectContainer}>
                                <select
                                    className={styles.select}
                                    onClick={toggleDropdown}  
                                >
                                    <option>Select</option>
                                    <option>On Demand Service</option>
                                    <option>Scheduled Service</option>
                                </select>
                             
                                <div className={styles.iconContainer}>
                                    {isDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Charger Feature</label>
                            <input className={styles.inputCharger} type="text" placeholder="For AED 150 Per Charger" />
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
                                    <button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
                                        <AiOutlineClose size={20} style={{ padding: '2px' }} />
                                    </button>
                                </div>
                            )}
                        </div>
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
