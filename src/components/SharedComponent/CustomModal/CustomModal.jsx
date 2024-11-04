import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './custommodal.module.css';

const Custommodal = ({ isOpen, onClose, driverList, onSelectDriver }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          Select Driver <span>( SERVICE12345 )</span>
        </div>
        <div className={styles.driverSelect}>
          <select
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setIsDropdownOpen(false)}
            onChange={(e) => onSelectDriver(e.target.value)}
          >
            {driverList.map((driver, index) => (
              <option key={index} value={driver.name} disabled={driver.isUnavailable}>
                {driver.name} {driver.isUnavailable ? '(Unavailable)' : ''}
              </option>
            ))}
          </select>
          <span className={styles.dropdownIcon}>
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeBtn} onClick={onClose}>
            Close
          </button>
          <button className={styles.assignBtn} onClick={() => alert('Assigned!')}>
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custommodal;
