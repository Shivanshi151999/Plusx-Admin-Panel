import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import styles from './addcoupon.module.css';
import UploadIcon from '../../assets/images/uploadicon.svg';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { postRequestWithTokenAndFile, postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCoupon = () => {
  const userDetails                     = JSON.parse(sessionStorage.getItem('userDetails')); 
  const navigate                        = useNavigate()
  const [errors, setErrors]             = useState({});
  const [couponName, setCouponName]       = useState()
  const [couponCode, setCouponCode]   = useState()
  const [couponPercentage, setCouponPercentage]   = useState()
  const [expiryDate, setExpiry]         = useState()
  const [perCustomer, setPerCustomer]               = useState()
  const [serviceType, setServiceType]   = useState(null);

    const typeOpetions = [
        // { value: "", label: "Select Vehicle Type" },
        { value: "Charger Installation", label: "Charger Installation" },
        { value: "EV Pre-Sale", label: "EV Pre-Sale" },
        { value: "POD-On Demand Service", label: "POD-On Demand Service" },
        { value: "POD-Get Monthly Subscription", label: "POD-Get Monthly Subscription" },
        { value: "Roadside Assistance", label: "Roadside Assistance" },
        { value: "Valet Charging", label: "Valet Charging" },
    ];

    const handleVehicleType = (selectedOption) => {
        setServiceType(selectedOption)
    }

const validateForm = () => {
    const fields = [
        { name: "couponName", value: couponName, errorMessage: "Coupon Name is required." },
        { name: "couponCode", value: couponCode, errorMessage: "Coupon Code is required." },
        { name: "serviceType", value: serviceType, errorMessage: "Service Type is required." },
        { name: "perCustomer", value: perCustomer, errorMessage: "Usage Per Customer is required." },
        { name: "couponPercentage", value: couponPercentage, errorMessage: "Percentagae is required."},
        { name: "expiryDate", value: expiryDate, errorMessage: "Expiry Date is required."},
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
        formData.append("coupan_name", couponName);
        formData.append("coupan_code", couponCode);
        formData.append("coupan_percentage", couponPercentage);
        const convertToDateFormat = (date) => {
            const [day, month, year] = date.split('-');
            return `${year}-${month}-${day}`;
          };
        const formattedExpiryDate = convertToDateFormat(expiryDate);
          
        formData.append("expiry_date", formattedExpiryDate);
        formData.append("user_per_user", perCustomer);
        if (serviceType) {
            formData.append("service_type", serviceType.value);
        }
      
        postRequestWithToken('add-coupan', formData, async (response) => {
            if (response.status === 1) {
                toast(response.message || response.message[0], {type:'success'})
                setTimeout(() => {
                    navigate('/coupon-list');
                }, 1000);
            } else {
                toast(response.message || response.message[0], {type:'error'})
                console.log('Error in add-coupan API:', response);
            }
        } )
    }
};

const handleCancel = () => {
    navigate('/coupon-list')
}

  return (
    <div className={styles.addShopContainer}>
         <ToastContainer />
      <div className={styles.addHeading}>Add Coupon</div>
      <div className={styles.addShopFormSection}>
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="modelName">Coupon Name</label>
              <input type="text" id="couponName" 
                placeholder="Coupon Name" 
                className={styles.inputField} 
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                />
                {errors.couponName && <p className={styles.error} style={{ color: 'red' }}>{errors.couponName}</p>}
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="couponCode">Coupon Code</label>
              <input type="text" 
              id="couponCode" 
              placeholder="Coupon Code" 
              className={styles.inputField} 
              value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {errors.couponCode && <p className={styles.error} style={{ color: 'red' }}>{errors.couponCode}</p>}
            </div>
          </div>
         
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
                <label className={styles.addShopLabel} htmlFor="serviceType">Service Type</label>
                <Select
                    options={typeOpetions}
                    value={serviceType}
                    onChange={handleVehicleType}
                    placeholder="Select"
                    isClearable
                    className={styles.addShopSelect}
                />
                {errors.serviceType && <p className={styles.error} style={{ color: 'red' }}>{errors.serviceType}</p>}
            </div>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="perCustomer">Usage Per Customer</label>
              <input type="text"
               id="perCustomer" 
               placeholder="Usage Per Customer" 
               className={styles.inputField} 
               value={perCustomer}
                onChange={(e) => setPerCustomer(e.target.value)}
               />
               {errors.perCustomer && <p className={styles.error} style={{ color: 'red' }}>{errors.perCustomer}</p>}
            </div>
          </div>
         
          <div className={styles.row}>
            <div className={styles.addShopInputContainer}>
              <label className={styles.addShopLabel} htmlFor="couponPercentage">Coupon Percentage</label>
              <input 
              type="text" 
              id="couponPercentage" 
              placeholder="Coupon Percentage" 
              className={styles.inputField} 
              value={couponPercentage}
                // onChange={(e) => setCouponPercentage(e.target.value)}
                onChange={(e) => {
                    const value = e.target.value;
                    // Regular expression to allow only numbers and one decimal point
                    const decimalPattern = /^\d*\.?\d*$/;
              
                    // Allow value if it matches the pattern (only numbers and one decimal point)
                    if (decimalPattern.test(value)) {
                      setCouponPercentage(value);
                      // Clear error if the format is correct
                      if (errors.couponPercentage) {
                        setErrors((prevErrors) => ({ ...prevErrors, couponPercentage: "" }));
                      }
                    } else {
                      // Set error message if format is incorrect
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        couponPercentage: "Only numbers and decimal point are allowed",
                      }));
                    }
                  }}
              />
              {errors.couponPercentage && <p className={styles.error} style={{ color: 'red' }}>{errors.couponPercentage}</p>}
            </div>
            

<div className={styles.addShopInputContainer}>
  <label className={styles.addShopLabel} htmlFor="expiryDate">Expiry Date</label>
  <InputMask
    mask="99-99-9999"
    value={expiryDate}
    onChange={(e) => {
      setExpiry(e.target.value);
      // Clear error if the format is correct
      if (errors.expiryDate && e.target.value.length === 10) {
        setErrors((prevErrors) => ({ ...prevErrors, expiryDate: "" }));
      }
    }}
    onBlur={() => {
      // Validate the date format when the user leaves the input
      if (expiryDate.length === 10) {
        const [day, month, year] = expiryDate.split('-');
        const isValidDate =
          !isNaN(Date.parse(`${year}-${month}-${day}`)) &&
          day <= 31 && month <= 12; // Basic day/month range check
        if (!isValidDate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            expiryDate: "Invalid date in DD-MM-YYYY format",
          }));
        }
      }
    }}
    placeholder="DD-MM-YYYY"
    className={styles.inputField}
  />
  {errors.expiryDate && <p className={styles.error} style={{ color: 'red' }}>{errors.expiryDate}</p>}
</div>

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

export default AddCoupon;