import React, { useState, useRef, useEffect } from "react";
import styles from './addshoplist.module.css';
import { MultiSelect } from "react-multi-select-component";
<<<<<<< Updated upstream:src/components/EVSpecializedShops/ShopList/ShopList/AddShopListForm.jsx
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
=======
import Add from "../../../assets/images/Add.svg"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
>>>>>>> Stashed changes:src/components/EVSpecializedShops/ShopList/AddShopListForm.jsx

const AddShopListForm = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const brandDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };
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


  return (
    <div className={styles.addShopContainer}>
      <div className={styles.addHeading}>Add Shop</div>
      <div className={styles.addShopFormSection}>
        <form className={styles.formSection}>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="shopName">Shop Name</label>
              <input type="text" id="shopName" placeholder="Shop Name" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="contactNo">Contact No</label>
              <input type="text" id="contactNo" placeholder="Contact No" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="website">Website</label>
              <input type="text" id="website" placeholder="Website" className={styles.inputField} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="availableBrands">Available Brands</label>
              <div ref={brandDropdownRef}>
                <MultiSelect
                  className={styles.addShopSelect}
                  options={brandOptions}
                  value={selectedBrands}
                  onChange={setSelectedBrands}
                  labelledBy="Select Brands"
                  closeOnChangedValue={false}
                  closeOnSelect={false}
                />
              </div>
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="services">Services</label>
              <div ref={serviceDropdownRef}>
                <MultiSelect
                  className={styles.addShopSelect}
                  options={serviceOptions}
                  value={selectedServices}
                  onChange={setSelectedServices}
                  labelledBy="Select Services"
                  closeOnChangedValue={false}
                  closeOnSelect={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="email">Description</label>
              <textarea name="postContent" className={styles.textAreaField} rows={4} cols={40} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.addShopAddressSection}>
              <label className={styles.addShopLabel} htmlFor="shopAddress">Shop Address</label>
              <div className={styles.addShopAddress}>
                <input type="text" id="shopAddress" placeholder="Shop Address" className={styles.inputField} />
                <button type="button" className={styles.addButton}>
                  <img src={Add} alt="Add" />
                  <span>  Add</span></button>
              </div>
            </div>
          </div>
          <div className={styles.locationRow}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="location">Location</label>
              <div className={styles.selectWrapper}>
                <select
                  id="location"
                  className={`${styles.selectField} ${styles.customSelect}`}
                  onClick={handleDropdownClick} 
                  onBlur={() => setIsOpen(false)} 
                >
                  <option>Location</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
                {isOpen ? (
                  <FaChevronUp className={styles.dropdownIcon} />
                ) : (
                  <FaChevronDown className={styles.dropdownIcon} />
                )}
              </div>
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="area">Area</label>
              <input type="text" id="area" placeholder="Area" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="latitude">Latitude</label>
              <input type="text" id="latitude" placeholder="Latitude" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="longitude">Longitude</label>
              <input type="text" id="longitude" placeholder="Longitude" className={styles.inputField} />
            </div>
          </div>
          <div className={styles.scheduleSection}>
                                        
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
              <div className={styles.dayRow} key={day}>
                <label htmlFor={`${day}OpenTime`}>{day} Open Time</label>
                <input type="time" id={`${day}OpenTime`} className={styles.timeField} />
                <label htmlFor={`${day}CloseTime`}>{day} Close Time</label>
                <input type="time" id={`${day}CloseTime`} className={styles.timeField} />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShopListForm;
