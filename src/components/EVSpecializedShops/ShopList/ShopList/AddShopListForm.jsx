import React, { useState, useRef, useEffect } from "react";
import styles from './addshoplist.module.css';
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import Add from "../../../../assets/images/Add.svg"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
>>>>>>> Stashed changes

const AddShopListForm = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate = useNavigate()
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const brandDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);

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
          </div>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="website">Website</label>
              <input type="text" id="website" placeholder="Website" className={styles.inputField} />
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" className={styles.inputField} />
            </div>
          </div>
          <div className={styles.row}>
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
            <label className={styles.addShopLabel} htmlFor="shopAddress">Shop Address</label>
            <input type="text" id="shopAddress" placeholder="Shop Address" className={styles.inputFieldFull} />
          </div>
          <div className={styles.locationRow}>
            <div>
              <label className={styles.addShopLabel} htmlFor="location">Location</label>
              <select id="location" className={styles.dropdown}>
                <option>Location</option>
              </select>
            </div>
            <div>
              <label className={styles.addShopLabel} htmlFor="area">Area</label>
              <input type="text" id="area" placeholder="Area" className={styles.inputField} />
            </div>
            <div>
              <label className={styles.addShopLabel} htmlFor="latitude">Latitude</label>
              <input type="text" id="latitude" placeholder="Latitude" className={styles.inputField} />
            </div>
            <div>
              <label className={styles.addShopLabel} htmlFor="longitude">Longitude</label>
              <input type="text" id="longitude" placeholder="Longitude" className={styles.inputField} />
            </div>
            <button type="button" className={styles.addButton}>+Add</button>
          </div>
          <div className={styles.scheduleSection}>
            <div className={styles.alwaysOpen}>
              <input type="checkbox" id="alwaysOpen" />
              <label htmlFor="alwaysOpen">Always Open</label>
            </div>
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
